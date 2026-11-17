import { NextResponse, type NextRequest } from "next/server";

// Engangslenker til forhåndsvisningene.
//
// Forhåndsvisningene på Vercel (VERCEL_ENV=preview) er lukket. En engangslenke ser slik ut:
//   https://<forhåndsvisning>/en?access=<id>
// Første gang noen åpner den og trykker på knappen, slettes <id> fra databasen, og nettleseren
// får en signert informasjonskapsel som gir tilgang i 24 timer. Etter det virker lenken ikke mer.
//
// Lenken brukes først når man trykker på knappen (POST). Chat-apper og e-postfiltre som henter
// lenken for å lage en forhåndsvisning (GET), bruker den derfor ikke opp.
//
// Lenker lages med scripts/preview-link.mjs. Databasen er Upstash Redis (REST-API), satt opp
// som integrasjon i Vercel. Produksjonen (VERCEL_ENV=production) påvirkes ikke.
//
// Vakten slår seg først på når databasen er koblet til. Til da beskytter Vercel Authentication
// forhåndsvisningene som før, så eieren ser dem bare ved å logge inn på Vercel.

const COOKIE = "senay_preview";
const PARAM = "access";
const CONSUME_PATH = "/preview-access";
const ACCESS_SECONDS = 24 * 60 * 60;
const LINK_KEY = (id: string) => `preview-link:${id}`;

export const config = {
  // Alt unntatt filer (bilder, skrifter, robots.txt …) og Next sine statiske filer.
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};

function gateActive() {
  const preview =
    process.env.VERCEL_ENV === "preview" ||
    process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" ||
    process.env.PREVIEW_ACCESS_GATE === "on";
  return preview && redisConfig() !== null;
}

function redisConfig() {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

async function redis(command: string[]): Promise<unknown> {
  const cfg = redisConfig();
  if (!cfg) throw new Error("Redis er ikke satt opp");
  const response = await fetch(cfg.url, {
    method: "POST",
    headers: { Authorization: `Bearer ${cfg.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  const data = (await response.json()) as { result?: unknown; error?: string };
  if (!response.ok || data.error) throw new Error(data.error ?? `Redis svarte ${response.status}`);
  return data.result;
}

// ---------------------------------------------------------------- Signert tilgang

const encoder = new TextEncoder();

function toBase64Url(bytes: ArrayBuffer) {
  let text = "";
  for (const byte of new Uint8Array(bytes)) text += String.fromCharCode(byte);
  return btoa(text).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(text: string) {
  const base64 = text.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(base64 + "=".repeat((4 - (base64.length % 4)) % 4));
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function signingKey() {
  // Egen nøkkel hvis den er satt, ellers databasens hemmelige nøkkel (finnes bare på serveren).
  const secret = process.env.PREVIEW_ACCESS_SECRET ?? redisConfig()?.token;
  if (!secret) return null;
  return crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

/** Informasjonskapselen: «utløpstid.id.signatur». */
async function createPass(id: string, expires: number) {
  const key = await signingKey();
  if (!key) return null;
  const payload = `${expires}.${id}`;
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return `${payload}.${toBase64Url(signature)}`;
}

async function validPass(value: string | undefined) {
  if (!value) return false;
  const match = value.match(/^(\d{10})\.([a-f0-9]{32})\.([A-Za-z0-9_-]{43})$/);
  if (!match) return false;
  const [, expires, id, signature] = match;
  if (Number(expires) * 1000 < Date.now()) return false;
  const key = await signingKey();
  if (!key) return false;
  try {
    return await crypto.subtle.verify("HMAC", key, fromBase64Url(signature), encoder.encode(`${expires}.${id}`));
  } catch {
    return false;
  }
}

const validId = (id: string) => /^[a-f0-9]{32}$/.test(id);

/** Bare stier på samme nettsted, aldri «//annet-nettsted». */
function safePath(path: string) {
  return path.startsWith("/") && !path.startsWith("//") && !path.startsWith("/\\") ? path : "/";
}

// ---------------------------------------------------------------- Sidene som vises før tilgang

type GateState = "locked" | "confirm" | "used" | "setup" | "error";

const copy: Record<GateState, { en: [string, string]; no: [string, string] }> = {
  locked: {
    en: ["This preview is private", "You need an access link to see it. Ask the person who sent you here for a new link."],
    no: ["Denne forhåndsvisningen er lukket", "Du trenger en tilgangslenke for å se den. Be den som sendte deg hit om en ny lenke."],
  },
  confirm: {
    en: ["You have been sent a preview link", "The link only works once. When you press the button, this browser gets access to the preview for 24 hours."],
    no: ["Du har fått en lenke til en forhåndsvisning", "Lenken virker bare én gang. Når du trykker på knappen, får denne nettleseren tilgang i 24 timer."],
  },
  used: {
    en: ["This link has already been used", "One-time links only work once, and they expire after 24 hours. Ask the person who sent it for a new link."],
    no: ["Denne lenken er allerede brukt", "Engangslenker virker bare én gang, og de utløper etter 24 timer. Be den som sendte den om en ny lenke."],
  },
  setup: {
    en: ["Access links are not set up yet", "The database for one-time links is missing on this preview."],
    no: ["Tilgangslenker er ikke satt opp ennå", "Databasen for engangslenker mangler på denne forhåndsvisningen."],
  },
  error: {
    en: ["Something went wrong", "The link was not used. Wait a moment and try again."],
    no: ["Noe gikk galt", "Lenken ble ikke brukt opp. Vent litt og prøv igjen."],
  },
};

const escape = (text: string) =>
  text.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] as string);

function gatePage(state: GateState, status: number, form?: { id: string; next: string }) {
  const { en, no } = copy[state];
  const button = form
    ? `<form method="post" action="${CONSUME_PATH}">
        <input type="hidden" name="access" value="${escape(form.id)}">
        <input type="hidden" name="next" value="${escape(form.next)}">
        <button type="submit">Open the preview <span lang="nb">· Åpne forhåndsvisningen</span></button>
      </form>`
    : "";
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${escape(en[0])} · Senay Studio</title>
<style>
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 24px 16px; background: #f4f6fa; color: #071630; font: 17px/1.55 system-ui, -apple-system, "Segoe UI", sans-serif; }
  main { width: 100%; max-width: 520px; background: #fff; border: 1px solid #e3e8f0; border-radius: 24px; padding: 36px 28px; }
  .brand { font: 22px/1 Georgia, "Times New Roman", serif; letter-spacing: .01em; margin: 0 0 28px; }
  h1 { font: 30px/1.15 Georgia, "Times New Roman", serif; margin: 0; }
  p { margin: 12px 0 0; color: #46536b; }
  .no { margin-top: 28px; padding-top: 22px; border-top: 1px solid #e3e8f0; }
  .no h2 { font: 20px/1.25 Georgia, "Times New Roman", serif; margin: 0; color: #071630; }
  form { margin-top: 28px; }
  button { width: 100%; min-height: 52px; border: 0; border-radius: 999px; background: #071630; color: #fff; font: 600 16px/1.2 system-ui, sans-serif; padding: 14px 22px; cursor: pointer; }
  button:hover { background: #13264a; }
  button:focus-visible { outline: 3px solid #93c5fd; outline-offset: 3px; }
  button span { font-weight: 400; opacity: .8; }
</style>
</head>
<body>
<main>
  <p class="brand">Senay Studio</p>
  <h1>${escape(en[0])}</h1>
  <p>${escape(en[1])}</p>
  ${button}
  <div class="no" lang="nb">
    <h2>${escape(no[0])}</h2>
    <p>${escape(no[1])}</p>
  </div>
</main>
</body>
</html>`;
  return new NextResponse(html, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow",
      "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'",
      "Referrer-Policy": "no-referrer",
    },
  });
}

// ---------------------------------------------------------------- Selve vakten

export async function proxy(request: NextRequest) {
  if (!gateActive()) return NextResponse.next();

  const url = request.nextUrl;
  const hasAccess = await validPass(request.cookies.get(COOKIE)?.value);

  // Knappen på bekreftelsessiden: her brukes lenken opp.
  if (url.pathname === CONSUME_PATH) {
    if (request.method !== "POST") return NextResponse.redirect(new URL("/", request.url), 303);
    const form = await request.formData().catch(() => null);
    const id = String(form?.get(PARAM) ?? "");
    const next = safePath(String(form?.get("next") ?? "/"));
    if (hasAccess) return NextResponse.redirect(new URL(next, request.url), 303);
    if (!validId(id)) return gatePage("used", 410);
    if (!redisConfig()) return gatePage("setup", 503);

    let result: unknown;
    try {
      // GETDEL er atomisk: bare én forespørsel kan få verdien, alle andre får null.
      result = await redis(["GETDEL", LINK_KEY(id)]);
    } catch {
      return gatePage("error", 503);
    }
    if (result === null || result === undefined) return gatePage("used", 410);

    const expires = Math.floor(Date.now() / 1000) + ACCESS_SECONDS;
    const pass = await createPass(id, expires);
    if (!pass) return gatePage("setup", 503);
    const response = NextResponse.redirect(new URL(next, request.url), 303);
    response.cookies.set(COOKIE, pass, {
      httpOnly: true,
      secure: url.protocol === "https:",
      sameSite: "lax",
      path: "/",
      maxAge: ACCESS_SECONDS,
    });
    return response;
  }

  // Lenken åpnes: vis bekreftelsessiden. Ingenting brukes opp før knappen trykkes.
  const id = url.searchParams.get(PARAM);
  if (id !== null) {
    const clean = url.clone();
    clean.searchParams.delete(PARAM);
    if (hasAccess) return NextResponse.redirect(clean, 303);
    if (!validId(id)) return gatePage("used", 410);
    if (!redisConfig()) return gatePage("setup", 503);
    try {
      const exists = await redis(["EXISTS", LINK_KEY(id)]);
      if (exists !== 1) return gatePage("used", 410);
    } catch {
      return gatePage("error", 503);
    }
    return gatePage("confirm", 200, { id, next: safePath(clean.pathname + clean.search) });
  }

  if (hasAccess) return NextResponse.next();
  return gatePage("locked", 401);
}
