import { fallback, topics, type Topic } from "@/content/chat-knowledge";
import type { Lang } from "@/lib/routes";

// Finner det emnet i kunnskapsbasen som passer best til spørsmålet.
// Ren tekstmatching i nettleseren – ingen AI og ingen nettverkskall.

const STRONG = 3;
const WEAK = 1;
const THRESHOLD = 2;

function normalize(text: string) {
  return ` ${text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ")
    .replace(/(\d)\s+(?=\d{3}\b)/g, "$1") // «4 599» → «4599»
    .replace(/\s+/g, " ")
    .trim()} `;
}

// Tillater én skrivefeil i lange ord («domne», «hostng»).
function oneEditAway(a: string, b: string) {
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  let j = 0;
  let edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i++;
      j++;
      continue;
    }
    if (++edits > 1) return false;
    if (a.length > b.length) i++;
    else if (b.length > a.length) j++;
    else {
      i++;
      j++;
    }
  }
  return edits + (a.length - i) + (b.length - j) <= 1;
}

function wordMatches(keyword: string, word: string) {
  // Lengre ord matcher også bøyninger og sammensetninger: «domene» → «domenet».
  return (
    word.startsWith(keyword) ||
    (word.length >= 4 && keyword.startsWith(word) && keyword.length - word.length <= 2) ||
    (keyword.length >= 6 && oneEditAway(word, keyword))
  );
}

// Ordene i teksten, der sammensatte ord med bindestrek også deles opp.
function toWords(text: string) {
  return text
    .trim()
    .split(" ")
    .flatMap((word) => (word.includes("-") ? [word, ...word.split("-").filter(Boolean)] : [word]));
}

// Hvert ord i spørsmålet teller bare én gang per emne, så varianter av
// samme nøkkelord («domene», «domenet») ikke gir ekstra poeng.
function score(topic: Topic, text: string, words: string[]) {
  const used = new Set<number>();
  let total = 0;
  const weighted: [string, number][] = [
    ...topic.strong.map((k): [string, number] => [k, STRONG]),
    ...(topic.weak ?? []).map((k): [string, number] => [k, WEAK]),
  ];
  for (const [keyword, weight] of weighted) {
    // Fraser og korte ord må stå som hele ord.
    if (keyword.includes(" ") || keyword.length < 4) {
      if (text.includes(` ${keyword} `)) total += weight;
      continue;
    }
    const index = words.findIndex((word, i) => !used.has(i) && wordMatches(keyword, word));
    if (index >= 0) {
      used.add(index);
      total += weight;
    }
  }
  return total;
}

const englishWords = new Set(["what", "how", "the", "do", "does", "is", "are", "my", "you", "your", "can", "website", "need", "cost", "much", "who", "why", "and", "get", "an", "it"]);
const norwegianWords = new Set(["hva", "hvordan", "er", "jeg", "du", "dere", "det", "kan", "trenger", "koster", "nettside", "nettsiden", "hvem", "hvorfor", "og", "på", "en", "et", "med", "har", "meg"]);

/** Språket i spørsmålet, med sidens språk som standard. */
export function detectLang(question: string, pageLang: Lang): Lang {
  const words = normalize(question).trim().split(" ");
  const enHits = words.filter((w) => englishWords.has(w)).length;
  const noHits = words.filter((w) => norwegianWords.has(w)).length;
  if (enHits > noHits) return "en";
  if (noHits > enHits) return "no";
  return pageLang;
}

export function findTopic(question: string): Topic {
  const text = normalize(question);
  const words = toWords(text);
  let best = fallback;
  let bestScore = 0;
  for (const topic of topics) {
    const s = score(topic, text, words);
    if (s > bestScore) {
      best = topic;
      bestScore = s;
    }
  }
  return bestScore >= THRESHOLD ? best : fallback;
}

export function answer(question: string, pageLang: Lang) {
  const lang = detectLang(question, pageLang);
  const topic = findTopic(question);
  return {
    lang,
    topic: topic.id,
    text: topic.answer[lang],
    links: topic.links ?? [],
    followUps: topic.followUps?.[lang] ?? [],
  };
}
