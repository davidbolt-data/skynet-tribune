const EDITION_KEY = "current-edition";
const SITE = {
  name: "The Skynet Tribune",
  tagline: "AI News, Human Suspicion.",
  description: "A fast, human-curated front page for artificial intelligence news.",
};

const FEEDS = [
  { name: "WIRED", url: "https://www.wired.com/feed/tag/ai/latest/rss", priority: 5 },
  { name: "TechCrunch", url: "https://techcrunch.com/category/artificial-intelligence/feed/", priority: 4 },
  { name: "The Verge", url: "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml", priority: 4 },
  { name: "Engadget", url: "https://www.engadget.com/rss.xml", priority: 2 },
  { name: "Google AI News", url: "https://www.google.com/alerts/feeds/11659971937080533643/17708980133697934505", priority: 3 },
];

const DEFAULT_EDITION = {
  generatedAt: "2026-08-17T13:30:00.000Z",
  lead: {
    title: "The AI News Cycle Never Sleeps. Neither Does the Machine Watching It.",
    url: "#model-wars",
    source: "Skynet Tribune",
    publishedAt: "2026-08-17T13:00:00.000Z",
    image: "/hero-ai-news.png",
    description: "A denser, faster front page for the model wars, money, machines, policy, and the stranger edges of artificial intelligence.",
  },
  rail: [
    story("The model race shifts from benchmark wins to products people will pay for", "Signal Desk", "Model Wars", 1),
    story("Robots leave the demo floor and enter factories, warehouses, and homes", "Machine Watch", "Robots & Hardware", 2),
    story("Governments argue over who should carry the risk when AI gets it wrong", "Policy Wire", "Policy & Safety", 3),
  ],
  sections: {
    "Model Wars": [
      story("Open models keep closing the gap—and changing the business equation", "Model Wire", "Model Wars", 4),
      story("Context windows grow while the fight moves to memory and reliability", "AI Daily", "Model Wars", 5),
      story("The new interface battle: agents that can actually finish the job", "Product Signal", "Model Wars", 6),
      story("Benchmarks are getting harder to trust", "Evaluation Desk", "Model Wars", 7),
    ],
    "AI Business": [
      story("AI infrastructure spending redraws the map of the cloud", "Market Watch", "AI Business", 8),
      story("Publishers look for leverage in licensing talks", "Media Ledger", "AI Business", 9),
      story("Startups discover that inference bills are the new rent", "Venture Wire", "AI Business", 10),
      story("Enterprise buyers want proof, not another pilot", "CIO Signal", "AI Business", 11),
    ],
    "Robots & Hardware": [
      story("Humanoid robots get cheaper, steadier, and harder to ignore", "Machine Watch", "Robots & Hardware", 12),
      story("The chip race spreads from training clusters to the edge", "Silicon Desk", "Robots & Hardware", 13),
      story("Smart glasses try again—with AI as the interface", "Device Report", "Robots & Hardware", 14),
      story("Data centers chase power wherever they can find it", "Grid Watch", "Robots & Hardware", 15),
    ],
    "Policy & Safety": [
      story("Regulators move from principles to enforcement", "Policy Wire", "Policy & Safety", 16),
      story("Deepfake defenses face their first real election-scale tests", "Trust Desk", "Policy & Safety", 17),
      story("Labs publish more safety frameworks—and face sharper questions", "Risk Report", "Policy & Safety", 18),
      story("Courts begin defining the boundaries of training data", "Legal Signal", "Policy & Safety", 19),
    ],
    "Weird Machine": [
      story("An AI-generated mystery becomes the internet's favorite rabbit hole", "Odd Feed", "Weird Machine", 20),
      story("Synthetic influencers learn the oldest trick in show business", "Culture Scan", "Weird Machine", 21),
      story("People are building tiny religions around chatbots again", "Human Error", "Weird Machine", 22),
      story("The week's most uncanny machine-made artifact", "Montanimation", "Weird Machine", 23),
    ],
    "More Signals": [
      story("Five papers worth knowing before Monday", "Research Wire", "More Signals", 24),
      story("The practical AI tools that survived this week's hype cycle", "Toolbox", "More Signals", 25),
      story("What changed in the major model APIs", "Developer Desk", "More Signals", 26),
      story("A short history of machines predicting their own importance", "Archive", "More Signals", 27),
    ],
  },
};

function story(title, source, category, hoursAgo) {
  return {
    title,
    source,
    category,
    url: "#",
    publishedAt: new Date(Date.parse("2026-08-17T13:30:00.000Z") - hoursAgo * 3600000).toISOString(),
  };
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/api/edition") {
      const edition = await getEdition(env);
      return Response.json(edition, { headers: { "cache-control": "public, max-age=60" } });
    }
    if (url.pathname === "/") {
      const edition = await getEdition(env);
      return new Response(renderPage(edition, url.origin), {
        headers: {
          "content-type": "text/html; charset=UTF-8",
          "cache-control": "public, max-age=120, stale-while-revalidate=900",
          "x-content-type-options": "nosniff",
          "referrer-policy": "strict-origin-when-cross-origin",
        },
      });
    }
    if (url.pathname === "/sitemap.xml") {
      const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escapeXml(url.origin)}/</loc></url></urlset>`;
      return new Response(xml, { headers: { "content-type": "application/xml; charset=UTF-8" } });
    }
    return env.ASSETS.fetch(request);
  },

  async scheduled(_event, env, ctx) {
    ctx.waitUntil(refreshEdition(env));
  },
};

async function getEdition(env) {
  if (!env.HEADLINES) return DEFAULT_EDITION;
  return (await env.HEADLINES.get(EDITION_KEY, "json")) || DEFAULT_EDITION;
}

async function refreshEdition(env) {
  if (!env.HEADLINES) return;
  const settled = await Promise.allSettled(FEEDS.map(fetchFeed));
  const items = settled.flatMap((result) => result.status === "fulfilled" ? result.value : []);
  const clean = deduplicate(items.filter(isAiRelevant))
    .filter((item) => item.title && item.url)
    .sort((a, b) => score(b) - score(a));
  if (clean.length < 8) return;

  const leadIndex = clean.findIndex((item) => item.image);
  const lead = clean.splice(leadIndex >= 0 ? leadIndex : 0, 1)[0];
  const rail = clean.splice(0, 3);
  const sectionNames = ["Model Wars", "AI Business", "Robots & Hardware", "Policy & Safety", "Weird Machine", "More Signals"];
  const sections = Object.fromEntries(sectionNames.map((name) => [name, []]));
  for (const item of clean) {
    const category = classify(item.title + " " + (item.description || ""));
    if (sections[category].length < 7) sections[category].push({ ...item, category });
  }
  const assignedUrls = new Set(Object.values(sections).flat().map((item) => item.url));
  const leftovers = clean.filter((item) => !assignedUrls.has(item.url));
  for (const name of sectionNames) {
    while (sections[name].length < 4 && leftovers.length) sections[name].push(leftovers.shift());
  }
  await env.HEADLINES.put(EDITION_KEY, JSON.stringify({ generatedAt: new Date().toISOString(), lead, rail, sections }));
}

async function fetchFeed(feed) {
  const response = await fetch(feed.url, { headers: { "user-agent": "SkynetTribune/1.0 (+AI news index)" } });
  if (!response.ok) throw new Error(`${feed.name}: ${response.status}`);
  const xml = await response.text();
  const blocks = [...xml.matchAll(/<(item|entry)\b[\s\S]*?<\/\1>/gi)].slice(0, 20).map((match) => match[0]);
  return blocks.map((block) => {
    const title = textTag(block, "title");
    const directLink = textTag(block, "link");
    const atomLink = block.match(/<link\b[^>]*href=["']([^"']+)["']/i)?.[1];
    const description = textTag(block, "description") || textTag(block, "summary") || textTag(block, "content");
    const image = block.match(/<(?:media:content|media:thumbnail)\b[^>]*url=["']([^"']+)["']/i)?.[1]
      || block.match(/<enclosure\b[^>]*url=["']([^"']+)["'][^>]*type=["']image\//i)?.[1]
      || description.match(/<img\b[^>]*src=["']([^"']+)["']/i)?.[1];
    return {
      title: stripHtml(title),
      url: decodeEntities(atomLink || directLink),
      source: feed.name,
      sourcePriority: feed.priority,
      publishedAt: safeDate(textTag(block, "pubDate") || textTag(block, "published") || textTag(block, "updated")),
      description: stripHtml(description).slice(0, 240),
      image: image ? decodeEntities(image) : undefined,
    };
  });
}

function textTag(block, tag) {
  const safeTag = tag.replace(":", "\\:");
  const match = block.match(new RegExp(`<${safeTag}\\b[^>]*>([\\s\\S]*?)<\\/${safeTag}>`, "i"));
  return match?.[1]?.replace(/^<!\[CDATA\[|\]\]>$/g, "").trim() || "";
}

function stripHtml(value = "") {
  return decodeEntities(value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
}

function decodeEntities(value = "") {
  return value
    .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
}

function safeDate(value) {
  const date = new Date(value || Date.now());
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function deduplicate(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = item.title.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 90);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function isAiRelevant(item) {
  const text = `${item.title || ""} ${item.description || ""}`;
  return /\b(?:AI|A\.I\.|artificial intelligence|machine learning|deep learning|generative|LLM|large language model|chatbot|OpenAI|ChatGPT|Anthropic|Claude|Gemini|DeepMind|Copilot|neural|deepfake|synthetic media|agentic|inference|humanoid|robotics?)\b/i.test(text);
}

function score(item) {
  const ageHours = Math.max(0, (Date.now() - Date.parse(item.publishedAt)) / 3600000);
  return (item.sourcePriority || 1) * 8 + (item.image ? 8 : 0) + Math.max(0, 48 - ageHours);
}

function classify(text) {
  const t = text.toLowerCase();
  if (/robot|humanoid|chip|gpu|semiconductor|device|glasses|data center|hardware/.test(t)) return "Robots & Hardware";
  if (/law|regulat|court|copyright|safety|risk|policy|government|deepfake/.test(t)) return "Policy & Safety";
  if (/fund|revenue|startup|business|enterprise|market|invest|deal|licens/.test(t)) return "AI Business";
  if (/weird|strange|bizarre|culture|viral|meme|companion|influencer/.test(t)) return "Weird Machine";
  if (/openai|anthropic|gemini|google|meta|mistral|model|chatgpt|claude/.test(t)) return "Model Wars";
  return "More Signals";
}

function renderPage(edition, origin) {
  const lead = edition.lead || DEFAULT_EDITION.lead;
  const updated = new Date(edition.generatedAt || Date.now());
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: `${origin}/`,
    description: SITE.description,
    publisher: { "@type": "Organization", name: SITE.name, url: `${origin}/` },
  }).replace(/</g, "\\u003c");
  const sections = Object.entries(edition.sections || DEFAULT_EDITION.sections)
    .map(([name, stories]) => sectionHtml(name, stories)).join("");
  return `<!doctype html>
<html lang="en"><head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHtml(lead.title)} | ${SITE.name}</title>
  <meta name="description" content="${escapeHtml(SITE.description)}">
  <meta property="og:type" content="website"><meta property="og:title" content="${escapeHtml(SITE.name)}">
  <meta property="og:description" content="${escapeHtml(SITE.description)}"><meta property="og:image" content="${absoluteUrl(lead.image || "/hero-ai-news.png", origin)}">
  <link rel="canonical" href="${origin}/"><link rel="stylesheet" href="/styles.css">
  <script type="application/ld+json">${jsonLd}</script>
</head><body>
  <div class="topline"><div class="topline__inner"><span><span class="live-dot">●</span> Machine watch active</span><span>Updated ${formatDate(updated)} · Refreshes every 30 minutes</span></div></div>
  <header class="site-header">
    <div class="brand-row"><p class="brand">Skynet <span>Tribune</span></p><p class="tagline">${SITE.tagline}<br>Independent AI news index</p></div>
    <nav class="nav" aria-label="Sections"><a href="#model-wars">Model Wars</a><a href="#ai-business">AI Business</a><a href="#robots-hardware">Robots & Hardware</a><a href="#policy-safety">Policy & Safety</a><a href="#weird-machine">Weird Machine</a></nav>
  </header>
  <main>
    <article class="hero">
      <a class="hero__image-link" href="${safeUrl(lead.url)}" target="_blank" rel="noopener noreferrer"><img class="hero__image" src="${safeImage(lead.image)}" alt="" width="1536" height="864" fetchpriority="high" referrerpolicy="no-referrer"></a>
      <div class="hero__copy"><span class="kicker">Lead Signal</span><h1 class="hero__headline"><a href="${safeUrl(lead.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(lead.title)}</a></h1><p class="dek">${escapeHtml(lead.description || "The most consequential AI story on the wire right now.")}</p>${metaHtml(lead)}</div>
    </article>
    <section class="signal-rail" aria-label="Top developing stories">${(edition.rail || []).slice(0, 3).map((item, i) => `<article class="signal"><span class="kicker">0${i + 1} / Developing</span><h2><a href="${safeUrl(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.title)}</a></h2>${metaHtml(item)}</article>`).join("")}</section>
    <div class="section-grid">${sections}</div>
  </main>
  <footer class="footer"><div class="footer__inner"><div><strong>The Skynet Tribune</strong><br>${SITE.tagline}</div><div>Headlines link to their original publishers.<br>A Montanimation news experiment.</div></div></footer>
</body></html>`;
}

function sectionHtml(name, stories = []) {
  const id = name.toLowerCase().replace(/&/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `<section class="news-section" id="${id}"><h2 class="section-title"><span>//</span> ${escapeHtml(name)}</h2><ul class="story-list">${stories.slice(0, 7).map((item) => `<li><a href="${safeUrl(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.title)}</a>${metaHtml(item)}</li>`).join("") || `<li class="empty-note">Waiting for the next signal.</li>`}</ul></section>`;
}

function metaHtml(item) {
  return `<span class="meta"><b>${escapeHtml(item.source || "Source")}</b> · ${timeAgo(item.publishedAt)}</span>`;
}

function timeAgo(value) {
  const hours = Math.max(0, Math.floor((Date.now() - Date.parse(value || Date.now())) / 3600000));
  if (hours < 1) return "Just now";
  if (hours === 1) return "1 hour ago";
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: "America/New_York", timeZoneName: "short" }).format(date);
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}
function escapeXml(value = "") { return escapeHtml(value); }
function safeUrl(value = "#") { try { const u = new URL(value, "https://example.com"); return ["http:", "https:"].includes(u.protocol) ? escapeHtml(value) : "#"; } catch { return "#"; } }
function safeImage(value = "") { return value && (/^https?:\/\//i.test(value) || /^\/[a-z0-9/_-]+\.(png|jpe?g|webp|gif)$/i.test(value)) ? escapeHtml(value) : "/hero-ai-news.png"; }
function absoluteUrl(value, origin) { try { return escapeHtml(new URL(value, origin).href); } catch { return `${origin}/hero-ai-news.png`; } }
