import Anthropic from "@anthropic-ai/sdk";
import { chatSystemPrompt } from "@/lib/chat-prompt";

// AI-chatten på nettsiden. Tar imot samtalen fra ChatWidget og strømmer
// svaret fra Claude tilbake som ren tekst. Krever ANTHROPIC_API_KEY i miljøet.

export const runtime = "nodejs";

const MODEL = "claude-opus-5-5";
const MAX_MESSAGES = 20;
const MAX_CHARS = 2000;

// Enkel grense per IP. Ligger i minnet, så den gjelder per serverinstans – godt nok
// til å stoppe misbruk fra én kilde, ikke en full beskyttelse.
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT;
}

const messagesText = {
  no: {
    refusal: "Det kan jeg dessverre ikke svare på. Spør meg gjerne om noe annet om nettsider.",
    error: "Noe gikk galt. Prøv igjen om litt, eller ta kontakt med oss direkte.",
  },
  en: {
    refusal: "Sorry, I can't help with that. Feel free to ask me something else about websites.",
    error: "Something went wrong. Please try again shortly, or contact us directly.",
  },
};

type ChatBody = { lang: "no" | "en"; messages: Anthropic.Beta.BetaMessageParam[] };

function parseBody(body: unknown): ChatBody | null {
  if (!body || typeof body !== "object") return null;
  const { lang, messages } = body as Record<string, unknown>;
  if (lang !== "no" && lang !== "en") return null;
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) return null;

  const clean: Anthropic.Beta.BetaMessageParam[] = [];
  for (const [i, m] of messages.entries()) {
    if (!m || typeof m !== "object") return null;
    const { role, content } = m as Record<string, unknown>;
    if (typeof content !== "string" || content.trim() === "" || content.length > MAX_CHARS) return null;
    // Samtalen må veksle mellom bruker og assistent, og starte og slutte med brukeren.
    const expected = i % 2 === 0 ? "user" : "assistant";
    if (role !== expected) return null;
    clean.push({ role: expected, content });
  }
  if (clean[clean.length - 1].role !== "user") return null;
  return { lang, messages: clean };
}

function json(status: number, error: string) {
  return Response.json({ error }, { status });
}

// Bare forespørsler fra egen nettside (nettlesere sender alltid Origin på POST).
function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return json(403, "forbidden");

  if (!process.env.ANTHROPIC_API_KEY) return json(503, "not_configured");

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return json(429, "rate_limited");

  let body: ChatBody | null = null;
  try {
    body = parseBody(await request.json());
  } catch {
    body = null;
  }
  if (!body) return json(400, "bad_request");

  const text = messagesText[body.lang];
  const client = new Anthropic();
  const stream = client.beta.messages.stream({
    model: MODEL,
    max_tokens: 2000,
    output_config: { effort: "low" },
    // Hvis modellen avslår et spørsmål, svarer en reservemodell automatisk.
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    system: [{ type: "text", text: chatSystemPrompt, cache_control: { type: "ephemeral" } }],
    messages: body.messages,
  });

  const encoder = new TextEncoder();
  const output = new ReadableStream<Uint8Array>({
    async start(controller) {
      let wrote = false;
      try {
        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(event.delta.text));
            wrote = true;
          }
        }
        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal") {
          controller.enqueue(encoder.encode(`${wrote ? "\n\n" : ""}${text.refusal}`));
        }
      } catch (error) {
        if (error instanceof Anthropic.RateLimitError) {
          console.error("chat: rate limited by API");
        } else if (error instanceof Anthropic.APIError) {
          console.error(`chat: API error ${error.status}`, error.message);
        } else {
          console.error("chat: unexpected error", error);
        }
        controller.enqueue(encoder.encode(`${wrote ? "\n\n" : ""}${text.error}`));
      } finally {
        controller.close();
      }
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(output, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
