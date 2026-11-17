// Sjekker reglene for bevegelse (se CLAUDE.md) i en ekte nettleser, på mobil og PC:
//   - uten JavaScript er alt innhold synlig
//   - med «redusert bevegelse» er ingenting skjult, og ingen animasjoner kjører
//   - ingenting over skjermkanten skjules ved lasting, og alt er synlig etter scrolling
//   - parallaksen går bare på store skjermer
//   - lenker starter en sideovergang
//
//   npm run build && npx next start -p 3200 &
//   node scripts/motion-check.mjs            (BASE=http://localhost:3200)
//
// Bruker Playwright som er installert globalt (slik det er i skyøktene).
import { createRequire } from "node:module";
import { execSync } from "node:child_process";
const npmRoot = process.env.NPM_ROOT ?? execSync("npm root -g").toString().trim();
const { chromium, devices } = createRequire(npmRoot + "/")("playwright");
const BASE = process.env.BASE ?? "http://localhost:3200";
const pages = ["/", "/en", "/priser", "/tjenester", "/om", "/prosess", "/hvorfor", "/kontakt", "/demo/frisor", "/en/demo/restaurant", "/nettside-for/frisor"];
const fails = [];
const ok = (cond, msg) => { if (!cond) fails.push(msg); };

// Synlighet: tekst/bilder i <main> som er usynlige (opasitet < 0.4 et sted i kjeden).
const hiddenContent = () => {
  const out = [];
  for (const el of document.querySelectorAll("main h1, main h2, main h3, main p, main li, main img, main a")) {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    // Pynt som er skjult for skjermlesere (illustrasjoner, forhåndsvisninger) har egne lag som byttes på.
    if (el.closest("[aria-hidden=true]")) continue;
    // Klippet bort av en ramme: kan aldri sees.
    let clipped = false;
    for (let c = el.parentElement; c && c !== document.body && !clipped; c = c.parentElement) {
      if (getComputedStyle(c).overflow === "visible") continue;
      const b = c.getBoundingClientRect();
      clipped = r.top >= b.bottom || r.bottom <= b.top || r.left >= b.right || r.right <= b.left;
    }
    if (clipped) continue;
    let o = 1, n = el;
    while (n && n !== document.body) { o *= Number(getComputedStyle(n).opacity); n = n.parentElement; }
    if (o < 0.4) out.push(`${el.tagName.toLowerCase()} "${(el.textContent || el.getAttribute("alt") || "").trim().slice(0, 30)}" opacity=${o.toFixed(2)}`);
  }
  return out;
};

async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = Math.round(innerHeight * 0.6);
    for (let y = 0; y < document.body.scrollHeight; y += step) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
    scrollTo(0, document.body.scrollHeight);
  });
  await page.waitForTimeout(1400);
}

const browser = await chromium.launch();
const profiles = { mobile: devices["iPhone 13"], desktop: { viewport: { width: 1440, height: 900 } } };

for (const [name, profile] of Object.entries(profiles)) {
  // A. Uten JavaScript: alt synlig.
  {
    const ctx = await browser.newContext({ ...profile, javaScriptEnabled: false });
    const page = await ctx.newPage();
    for (const path of pages) {
      await page.goto(BASE + path, { waitUntil: "load" });
      await page.waitForTimeout(1200); // CSS-inntoningen i toppen er ferdig
      const pending = await page.locator("[data-motion-pending]").count();
      ok(pending === 0, `[${name} no-JS ${path}] ${pending} elementer merket som skjult`);
      await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(300);
      const hidden = await page.evaluate(hiddenContent);
      ok(hidden.length === 0, `[${name} no-JS ${path}] skjult innhold: ${hidden.slice(0, 3).join(" | ")}`);
    }
    await ctx.close();
  }
  // B. Redusert bevegelse: ingenting skjult, ingenting beveger seg.
  {
    const ctx = await browser.newContext({ ...profile, reducedMotion: "reduce" });
    const page = await ctx.newPage();
    for (const path of pages) {
      await page.goto(BASE + path, { waitUntil: "networkidle" });
      const pending = await page.locator("[data-motion-pending]").count();
      ok(pending === 0, `[${name} reduced ${path}] ${pending} elementer skjult`);
      await scrollThrough(page);
      const running = await page.evaluate(() => document.getAnimations().filter((a) => a.playState === "running").map((a) => a.animationName || a.constructor.name));
      ok(running.length === 0, `[${name} reduced ${path}] animasjoner kjører: ${running.slice(0, 5).join(", ")}`);
      const hidden = await page.evaluate(hiddenContent);
      ok(hidden.length === 0, `[${name} reduced ${path}] skjult innhold: ${hidden.slice(0, 3).join(" | ")}`);
    }
    await ctx.close();
  }
  // C. Vanlig: ingenting over skjermkanten skjules, alt synlig etter scrolling, ingen rester.
  {
    const ctx = await browser.newContext({ ...profile });
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    for (const path of pages) {
      await page.goto(BASE + path, { waitUntil: "networkidle" });
      const aboveFold = await page.evaluate(() => [...document.querySelectorAll("[data-motion-pending]")].filter((el) => el.getBoundingClientRect().top < innerHeight).length);
      ok(aboveFold === 0, `[${name} ${path}] ${aboveFold} skjulte elementer over skjermkanten`);
      const pendingAtLoad = await page.locator("[data-motion-pending]").count();
      await scrollThrough(page);
      // Elementer som er klippet bort av en ramme (f.eks. nederst i en nedskalert forhåndsvisning), kan aldri sees og teller ikke.
      const pending = await page.evaluate(() => [...document.querySelectorAll("[data-motion-pending]")].filter((el) => {
        const r = el.getBoundingClientRect();
        for (let n = el.parentElement; n && n !== document.body; n = n.parentElement) {
          if (getComputedStyle(n).overflow === "visible") continue;
          const c = n.getBoundingClientRect();
          if (r.top >= c.bottom || r.bottom <= c.top || r.left >= c.right || r.right <= c.left) return false;
        }
        return true;
      }).length);
      ok(pending === 0, `[${name} ${path}] ${pending} av ${pendingAtLoad} fortsatt skjult etter scrolling`);
      const leftovers = await page.evaluate(() => [...document.querySelectorAll("main [style*='opacity: 0;'], main [style*='opacity:0;']")].filter((el) => !el.closest("[aria-hidden=true]")).length);
      ok(leftovers === 0, `[${name} ${path}] ${leftovers} elementer med inline opacity 0`);
      const hidden = await page.evaluate(hiddenContent);
      ok(hidden.length === 0, `[${name} ${path}] skjult innhold etter scrolling: ${hidden.slice(0, 3).join(" | ")}`);
      console.log(`${name.padEnd(7)} ${path.padEnd(22)} skjult ved lasting: ${String(pendingAtLoad).padStart(2)} → etter scrolling: ${pending}`);
    }
    ok(errors.length === 0, `[${name}] konsollfeil: ${errors.slice(0, 3).join(" | ")}`);

    // Parallakse: bare på store skjermer.
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    await page.evaluate(() => document.getElementById("eksempler")?.scrollIntoView());
    await page.waitForTimeout(800);
    const layers = await page.evaluate(() => [...document.querySelectorAll("#eksempler li a > div > div")].map((el) => el.getAnimations().length + (el.style.transform ? 1 : 0)));
    const moving = layers.filter((n) => n > 0).length;
    if (name === "desktop") ok(moving === layers.length && moving > 0, `[desktop] parallakse: ${moving}/${layers.length} lag beveger seg`);
    else ok(moving === 0, `[mobile] parallakse skal være av, men ${moving} lag beveger seg`);
    console.log(`${name.padEnd(7)} parallakse-lag i bevegelse: ${moving}/${layers.length}`);

    // Sideovergang: klikk en lenke og se at View Transition startes.
    await page.addInitScript(() => {
      window.__vt = 0;
      const orig = document.startViewTransition?.bind(document);
      if (orig) document.startViewTransition = (...a) => { window.__vt++; return orig(...a); };
    });
    await page.goto(BASE + "/", { waitUntil: "networkidle" });
    const link = page.locator('main a[href="/priser"]').first();
    await link.scrollIntoViewIfNeeded();
    await link.click();
    await page.waitForURL("**/priser");
    await page.waitForTimeout(800);
    const vt = await page.evaluate(() => window.__vt);
    ok(vt >= 1, `[${name}] sideovergang ble ikke startet (startViewTransition kalt ${vt} ganger)`);
    const h1 = await page.locator("h1").first().textContent();
    console.log(`${name.padEnd(7)} sideovergang / → /priser: startViewTransition × ${vt}, h1 «${h1?.trim()}»`);
    await ctx.close();
  }
}
await browser.close();
console.log(fails.length ? `\nFEIL (${fails.length}):\n- ` + fails.join("\n- ") : "\nAlle sjekker bestått.");
process.exit(fails.length ? 1 : 0);
