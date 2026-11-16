// Lager en engangslenke til en forhåndsvisning (se src/proxy.ts).
//
//   node scripts/preview-link.mjs <forhåndsvisningens adresse> [side] [timer]
//   node scripts/preview-link.mjs https://senaywebstudios-abc123.vercel.app /en 24
//
// Trenger samme database som forhåndsvisningen, i miljøvariablene
// KV_REST_API_URL og KV_REST_API_TOKEN (eller UPSTASH_REDIS_REST_URL og UPSTASH_REDIS_REST_TOKEN).
// Hent dem fra Vercel: Storage → databasen → .env.local.
//
// Lenken virker én gang. Brukes den ikke, slutter den å virke etter [timer] (standard 24).

import { randomBytes } from "node:crypto";

const [base, page = "/", hoursArg = "24"] = process.argv.slice(2);
const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
const hours = Number(hoursArg);

if (!base || !/^https?:\/\//.test(base)) {
  console.error("Skriv inn adressen til forhåndsvisningen, for eksempel https://senaywebstudios-abc123.vercel.app");
  process.exit(1);
}
if (!url || !token) {
  console.error("Mangler KV_REST_API_URL og KV_REST_API_TOKEN (fra Upstash-databasen i Vercel).");
  process.exit(1);
}
if (!Number.isFinite(hours) || hours <= 0 || hours > 24 * 7) {
  console.error("Timer må være et tall mellom 1 og 168.");
  process.exit(1);
}

const id = randomBytes(16).toString("hex");
const response = await fetch(url, {
  method: "POST",
  headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  body: JSON.stringify(["SET", `preview-link:${id}`, new Date().toISOString(), "EX", String(Math.round(hours * 3600)), "NX"]),
});
const data = await response.json().catch(() => ({}));
if (!response.ok || data.result !== "OK") {
  console.error("Databasen godtok ikke lenken:", response.status, data.error ?? JSON.stringify(data));
  process.exit(1);
}

const link = new URL(page.startsWith("/") ? page : `/${page}`, base);
link.searchParams.set("access", id);
console.log(link.toString());
