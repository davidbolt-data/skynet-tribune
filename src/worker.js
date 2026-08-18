const EDITION_KEY = "current-edition";
const ARCHIVE_INDEX_KEY = "archive:index";
const ARCHIVE_KEY_PREFIX = "archive:";
const SITE = {
  name: "The Skynet Tribune",
  shortName: "Skynet Tribune",
  tagline: "AI News, Human Suspicion.",
  description: "A fast, human-curated front page for artificial intelligence news.",
};

const CATEGORY_ROUTES = {
  "/model-wars/": "Model Wars",
  "/ai-business/": "AI Business",
  "/robots-hardware/": "Robots & Hardware",
  "/policy-safety/": "Policy & Safety",
  "/weird-machine/": "Weird Machine",
  "/more-signals/": "More Signals",
};

const CATEGORY_DESCRIPTIONS = {
  "Model Wars": "The companies, models, benchmarks, agents, and releases competing to define the next generation of AI.",
  "AI Business": "The money behind artificial intelligence, from infrastructure spending and licensing battles to startups and enterprise adoption.",
  "Robots & Hardware": "Robots, chips, devices, data centers, and the physical machinery required to make artificial intelligence work.",
  "Policy & Safety": "The laws, court fights, safety debates, copyright questions, and public consequences surrounding AI.",
  "Weird Machine": "The stranger edges of machine culture, including synthetic personalities, viral experiments, and ideas that escaped the laboratory.",
  "More Signals": "Research, tools, developer news, and important AI stories that do not fit neatly into the other wires.",
};

const INFO_PAGES = {
  "/about/": {
    title: "About",
    eyebrow: "Behind the signal",
    description: `<p>${SITE.shortName} is an independent index of artificial intelligence news. It watches a deliberately varied group of technology and general-interest publishers, organizes the strongest stories by subject, and links readers to the original reporting.</p>
      <p>The front page is built for speed. It updates throughout the day without pretending every press release is the arrival of our new machine emperor.</p>
      <h2>What this site is</h2><p>This is a curated news discovery project. Headlines and short descriptions help readers decide what deserves attention. Full reporting remains with the original publishers.</p>
      <h2>Who operates it</h2><p>${SITE.shortName} is an independent Montanimation news experiment.</p>`,
  },
  "/editorial-standards/": {
    title: "Editorial Standards",
    eyebrow: "How the wires are handled",
    description: `<p>${SITE.shortName} collects public headlines from selected feeds and sorts them into topical sections. Automation helps gather and organize the material. Human judgment determines the site structure, source list, editorial language, and corrections.</p>
      <h2>Sourcing</h2><p>Every aggregated headline links to its original publisher. The source name is shown beside the story. This site does not present linked reporting as its own work.</p>
      <h2>Headlines and summaries</h2><p>Feed headlines may be cleaned for broken formatting, but their meaning should not be materially changed. Original briefs and commentary will be clearly distinguished from aggregated links.</p>
      <h2>Artificial intelligence</h2><p>AI-assisted tools may support organization, coding, research, and drafting. Material intended as original editorial work is reviewed before publication. Automation is useful. Unsupervised confidence is how the robot ends up driving through the garage door.</p>
      <h2>Corrections</h2><p>Substantive corrections will be acknowledged on the <a href="/corrections/">Corrections page</a>.</p>`,
  },
  "/contact/": {
    title: "Contact",
    eyebrow: "Send a signal",
    description: `<p>For corrections, source questions, partnership inquiries, or general feedback, contact the project through Montanimation.</p>
      <p><a class="button-link" href="https://montanimation.studio/" target="_blank" rel="noopener noreferrer">Visit Montanimation</a></p>
      <p class="small-note">A dedicated publication email will be added after the permanent domain is connected.</p>`,
  },
  "/privacy/": {
    title: "Privacy Policy",
    eyebrow: "The non-sinister kind of monitoring",
    description: `<p>${SITE.shortName} does not require an account and does not directly sell personal information.</p>
      <h2>Basic server information</h2><p>Cloudflare may process routine technical information needed to deliver and protect the site, including IP address, browser information, requested pages, and security events.</p>
      <h2>Analytics</h2><p>The site may use Cloudflare Web Analytics to understand visits, referrals, countries, and page performance. If additional analytics, advertising, newsletters, or contact forms are added, this policy will be updated before those services are activated.</p>
      <h2>External links</h2><p>Headlines lead to independent publishers with their own privacy practices. ${SITE.shortName} is not responsible for how those external sites collect or use information.</p>
      <p class="small-note">Last updated August 17, 2026.</p>`,
  },
  "/corrections/": {
    title: "Corrections",
    eyebrow: "Machines make mistakes. So do editors.",
    description: `<p>Substantive errors in original descriptions, labels, or editorial material will be corrected promptly and recorded here. Typographical fixes and automatic feed changes that do not alter meaning may be corrected without a separate notice.</p>
      <div class="notice-box"><strong>No published corrections.</strong><br>This page will be updated when a correction requires a public note.</div>
      <p>To report a problem, visit the <a href="/contact/">Contact page</a> and include the headline, source, and a description of the issue.</p>`,
  },
  "/sources/": {
    title: "Sources",
    eyebrow: "Where the signals originate",
    description: `<p>The front page currently monitors public feeds from the following publishers and services. Inclusion does not imply endorsement, and the list may change as feeds become available or stop behaving themselves.</p>
      <ul class="source-list"><li><a href="https://www.wired.com/tag/artificial-intelligence/" target="_blank" rel="noopener noreferrer">WIRED</a></li><li><a href="https://techcrunch.com/category/artificial-intelligence/" target="_blank" rel="noopener noreferrer">TechCrunch AI</a></li><li><a href="https://www.theverge.com/ai-artificial-intelligence" target="_blank" rel="noopener noreferrer">The Verge AI</a></li><li><a href="https://www.engadget.com/ai/" target="_blank" rel="noopener noreferrer">Engadget AI</a></li><li>Google Alerts for additional AI coverage</li></ul>
      <p>Headlines link directly to their original publishers. Articles remain the property of those publishers.</p>`,
  },
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
  lead: { title: "The AI News Cycle Never Sleeps. Neither Does the Machine Watching It.", url: "/model-wars/", source: SITE.shortName, publishedAt: "2026-08-17T13:00:00.000Z", image: "/hero-ai-news.png", description: "A denser, faster front page for the model wars, money, machines, policy, and the stranger edges of artificial intelligence." },
  rail: [
    story("The model race shifts from benchmark wins to products people will pay for", "Signal Desk", "Model Wars", 1),
    story("Robots leave the demo floor and enter factories, warehouses, and homes", "Machine Watch", "Robots & Hardware", 2),
    story("Governments argue over who should carry the risk when AI gets it wrong", "Policy Wire", "Policy & Safety", 3),
  ],
  sections: {
    "Model Wars": [story("Open models keep closing the gap—and changing the business equation", "Model Wire", "Model Wars", 4), story("Context windows grow while the fight moves to memory and reliability", "AI Daily", "Model Wars", 5), story("The new interface battle: agents that can actually finish the job", "Product Signal", "Model Wars", 6), story("Benchmarks are getting harder to trust", "Evaluation Desk", "Model Wars", 7)],
    "AI Business": [story("AI infrastructure spending redraws the map of the cloud", "Market Watch", "AI Business", 8), story("Publishers look for leverage in licensing talks", "Media Ledger", "AI Business", 9), story("Startups discover that inference bills are the new rent", "Venture Wire", "AI Business", 10), story("Enterprise buyers want proof, not another pilot", "CIO Signal", "AI Business", 11)],
    "Robots & Hardware": [story("Humanoid robots get cheaper, steadier, and harder to ignore", "Machine Watch", "Robots & Hardware", 12), story("The chip race spreads from training clusters to the edge", "Silicon Desk", "Robots & Hardware", 13), story("Smart glasses try again—with AI as the interface", "Device Report", "Robots & Hardware", 14), story("Data centers chase power wherever they can find it", "Grid Watch", "Robots & Hardware", 15)],
    "Policy & Safety": [story("Regulators move from principles to enforcement", "Policy Wire", "Policy & Safety", 16), story("Deepfake defenses face their first real election-scale tests", "Trust Desk", "Policy & Safety", 17), story("Labs publish more safety frameworks—and face sharper questions", "Risk Report", "Policy & Safety", 18), story("Courts begin defining the boundaries of training data", "Legal Signal", "Policy & Safety", 19)],
    "Weird Machine": [story("An AI-generated mystery becomes the internet's favorite rabbit hole", "Odd Feed", "Weird Machine", 20), story("Synthetic influencers learn the oldest trick in show business", "Culture Scan", "Weird Machine", 21), story("People are building tiny religions around chatbots again", "Human Error", "Weird Machine", 22), story("The week's most uncanny machine-made artifact", "Montanimation", "Weird Machine", 23)],
    "More Signals": [story("Five papers worth knowing before Monday", "Research Wire", "More Signals", 24), story("The practical AI tools that survived this week's hype cycle", "Toolbox", "More Signals", 25), story("What changed in the major model APIs", "Developer Desk", "More Signals", 26), story("A short history of machines predicting their own importance", "Archive", "More Signals", 27)],
  },
};

function story(title, source, category, hoursAgo) {
  return { title, source, category, url: "#", publishedAt: new Date(Date.parse("2026-08-17T13:30:00.000Z") - hoursAgo * 3600000).toISOString() };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = normalizePath(url.pathname);
    if (path === "/api/edition/") return Response.json(await getEdition(env), { headers: { "cache-control": "public, max-age=60" } });
    if (path === "/") return htmlResponse(renderHome(await getEdition(env), url.origin));
    if (CATEGORY_ROUTES[path]) return htmlResponse(renderCategoryPage(CATEGORY_ROUTES[path], await getEdition(env), url.origin));
    if (INFO_PAGES[path]) return htmlResponse(renderInfoPage(INFO_PAGES[path], path, url.origin));
    if (path === "/archive/") {
      const [edition, dates] = await Promise.all([getEdition(env), getArchiveDates(env)]);
      return htmlResponse(renderArchiveIndex(edition, dates, url.origin));
    }
    const archiveMatch = path.match(/^\/archive\/(\d{4}-\d{2}-\d{2})\/$/);
    if (archiveMatch) {
      const edition = await getArchivedEdition(env, archiveMatch[1]);
      return edition ? htmlResponse(renderArchivedEdition(edition, archiveMatch[1], url.origin)) : htmlResponse(renderNotFound(url.origin), 404);
    }
    if (path === "/sitemap.xml") return sitemapResponse(renderSitemap(url.origin, await getArchiveDates(env)));
    if (path === "/robots.txt") return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${url.origin}/sitemap.xml\n`, { headers: { "content-type": "text/plain; charset=UTF-8", "cache-control": "public, max-age=3600" } });
    const assetResponse = await env.ASSETS.fetch(request);
    return assetResponse.status === 404 ? htmlResponse(renderNotFound(url.origin), 404) : assetResponse;
  },
  async scheduled(_event, env, ctx) { ctx.waitUntil(refreshEdition(env)); },
};

function normalizePath(pathname) {
  if (pathname === "/" || pathname.includes(".")) return pathname;
  return pathname.endsWith("/") ? pathname : `${pathname}/`;
}

function htmlResponse(html, status = 200) {
  return new Response(html, { status, headers: { "content-type": "text/html; charset=UTF-8", "cache-control": "public, max-age=120, stale-while-revalidate=900", "x-content-type-options": "nosniff", "referrer-policy": "strict-origin-when-cross-origin" } });
}
function sitemapResponse(xml) { return new Response(xml, { headers: { "content-type": "application/xml; charset=UTF-8", "cache-control": "public, max-age=3600" } }); }

async function getEdition(env) {
  if (!env.HEADLINES) return DEFAULT_EDITION;
  return (await env.HEADLINES.get(EDITION_KEY, "json")) || DEFAULT_EDITION;
}
async function getArchiveDates(env) {
  if (!env.HEADLINES) return [];
  const dates = await env.HEADLINES.get(ARCHIVE_INDEX_KEY, "json");
  return Array.isArray(dates) ? dates : [];
}
async function getArchivedEdition(env, date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return null;
  const current = await getEdition(env);
  if (editionDate(current) === date) return current;
  return env.HEADLINES ? env.HEADLINES.get(`${ARCHIVE_KEY_PREFIX}${date}`, "json") : null;
}

async function refreshEdition(env) {
  if (!env.HEADLINES) return;
  const previousEdition = await env.HEADLINES.get(EDITION_KEY, "json");
  const settled = await Promise.allSettled(FEEDS.map(fetchFeed));
  const items = settled.flatMap((result) => result.status === "fulfilled" ? result.value : []);
  const clean = deduplicate(items.filter(isAiRelevant)).filter((item) => item.title && item.url).sort((a, b) => score(b) - score(a));
  if (clean.length < 8) return;
  const leadIndex = clean.findIndex((item) => item.image);
  const lead = clean.splice(leadIndex >= 0 ? leadIndex : 0, 1)[0];
  const rail = clean.splice(0, 3);
  const sectionNames = Object.values(CATEGORY_ROUTES);
  const sections = Object.fromEntries(sectionNames.map((name) => [name, []]));
  for (const item of clean) {
    const category = classify(item.title + " " + (item.description || ""));
    if (sections[category].length < 7) sections[category].push({ ...item, category });
  }
  const assignedUrls = new Set(Object.values(sections).flat().map((item) => item.url));
  const leftovers = clean.filter((item) => !assignedUrls.has(item.url));
  for (const name of sectionNames) while (sections[name].length < 4 && leftovers.length) sections[name].push({ ...leftovers.shift(), category: name });
  const nextEdition = { generatedAt: new Date().toISOString(), lead, rail, sections };
  if (previousEdition && editionDate(previousEdition) !== editionDate(nextEdition)) await archiveEdition(env, previousEdition);
  await env.HEADLINES.put(EDITION_KEY, JSON.stringify(nextEdition));
}

async function archiveEdition(env, edition) {
  const date = editionDate(edition);
  if (!date) return;
  const dates = await getArchiveDates(env);
  if (dates.includes(date)) return;
  const nextDates = [date, ...dates].sort().reverse().slice(0, 90);
  await Promise.all([env.HEADLINES.put(`${ARCHIVE_KEY_PREFIX}${date}`, JSON.stringify(edition)), env.HEADLINES.put(ARCHIVE_INDEX_KEY, JSON.stringify(nextDates))]);
}
function editionDate(edition) {
  const date = new Date(edition?.generatedAt || "");
  if (Number.isNaN(date.getTime())) return "";
  const parts = Object.fromEntries(new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(date).map((part) => [part.type, part.value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
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
    const image = block.match(/<(?:media:content|media:thumbnail)\b[^>]*url=["']([^"']+)["']/i)?.[1] || block.match(/<enclosure\b[^>]*url=["']([^"']+)["'][^>]*type=["']image\//i)?.[1] || description.match(/<img\b[^>]*src=["']([^"']+)["']/i)?.[1];
    return { title: stripHtml(title), url: decodeEntities(atomLink || directLink), source: feed.name, sourcePriority: feed.priority, publishedAt: safeDate(textTag(block, "pubDate") || textTag(block, "published") || textTag(block, "updated")), description: stripHtml(description).slice(0, 240), image: image ? decodeEntities(image) : undefined };
  });
}

function textTag(block, tag) {
  const safeTag = tag.replace(":", "\\:");
  const match = block.match(new RegExp(`<${safeTag}\\b[^>]*>([\\s\\S]*?)<\\/${safeTag}>`, "i"));
  return match?.[1]?.replace(/^<!\[CDATA\[|\]\]>$/g, "").trim() || "";
}
function stripHtml(value = "") { return decodeEntities(value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()); }
function decodeEntities(value = "") {
  let decoded = value;
  for (let i = 0; i < 2; i += 1) decoded = decoded.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
  return decoded;
}
function safeDate(value) { const date = new Date(value || Date.now()); return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString(); }
function deduplicate(items) {
  const seen = new Set();
  return items.filter((item) => { const key = item.title.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 90); if (!key || seen.has(key)) return false; seen.add(key); return true; });
}
function isAiRelevant(item) { const text = `${item.title || ""} ${item.description || ""}`; return /\b(?:AI|A\.I\.|artificial intelligence|machine learning|deep learning|generative|LLM|large language model|chatbot|OpenAI|ChatGPT|Anthropic|Claude|Gemini|DeepMind|Copilot|neural|deepfake|synthetic media|agentic|inference|humanoid|robotics?)\b/i.test(text); }
function score(item) { const ageHours = Math.max(0, (Date.now() - Date.parse(item.publishedAt)) / 3600000); return (item.sourcePriority || 1) * 8 + (item.image ? 8 : 0) + Math.max(0, 48 - ageHours); }
function classify(text) {
  const t = text.toLowerCase();
  if (/robot|humanoid|chip|gpu|semiconductor|device|glasses|data center|hardware/.test(t)) return "Robots & Hardware";
  if (/law|regulat|court|copyright|safety|risk|policy|government|deepfake/.test(t)) return "Policy & Safety";
  if (/fund|revenue|startup|business|enterprise|market|invest|deal|licens/.test(t)) return "AI Business";
  if (/weird|strange|bizarre|culture|viral|meme|companion|influencer/.test(t)) return "Weird Machine";
  if (/openai|anthropic|gemini|google|meta|mistral|model|chatgpt|claude/.test(t)) return "Model Wars";
  return "More Signals";
}

function renderHome(edition, origin) {
  const lead = edition.lead || DEFAULT_EDITION.lead;
  const updated = new Date(edition.generatedAt || Date.now());
  const sections = Object.entries(edition.sections || DEFAULT_EDITION.sections).map(([name, stories]) => sectionHtml(name, stories, true)).join("");
  const body = `<div class="topline"><div class="topline__inner"><span><span class="live-dot">●</span> Machine watch active</span><span>Updated ${formatDate(updated)} · Refreshes every 30 minutes</span></div></div>${siteHeader("/")}
    <main><article class="hero"><a class="hero__image-link" href="${safeUrl(lead.url)}" target="_blank" rel="noopener noreferrer"><img class="hero__image" src="${safeImage(lead.image)}" alt="" width="1536" height="864" fetchpriority="high" referrerpolicy="no-referrer"></a><div class="hero__copy"><span class="kicker">Lead Signal</span><h1 class="hero__headline"><a href="${safeUrl(lead.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(lead.title)}</a></h1><p class="dek">${escapeHtml(lead.description || "The most consequential AI story on the wire right now.")}</p>${metaHtml(lead)}</div></article>
    <section class="signal-rail" aria-label="Top developing stories">${(edition.rail || []).slice(0, 3).map((item, i) => `<article class="signal"><span class="kicker">0${i + 1} / Developing</span><h2><a href="${safeUrl(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.title)}</a></h2>${metaHtml(item)}</article>`).join("")}</section><div class="section-grid">${sections}</div></main>${siteFooter()}`;
  return documentHtml({ title: lead.title, description: SITE.description, canonical: `${origin}/`, image: lead.image, origin, body });
}

function renderCategoryPage(name, edition, origin) {
  const route = categoryRoute(name);
  const stories = edition.sections?.[name] || [];
  const body = `${siteHeader(route)}<main class="interior-main"><header class="page-header"><span class="kicker">Live topic wire</span><h1>${escapeHtml(name)}</h1><p>${escapeHtml(CATEGORY_DESCRIPTIONS[name])}</p></header><section class="category-feed" aria-label="${escapeHtml(name)} headlines">${stories.map((item, index) => storyCard(item, index + 1)).join("") || `<p class="empty-note">Waiting for the next signal.</p>`}</section><p class="updated-note">This section reflects the edition updated ${formatDate(new Date(edition.generatedAt || Date.now()))}.</p></main>${siteFooter()}`;
  return documentHtml({ title: name, description: CATEGORY_DESCRIPTIONS[name], canonical: `${origin}${route}`, origin, body });
}

function renderInfoPage(page, path, origin) {
  const body = `${siteHeader(path)}<main class="interior-main"><header class="page-header"><span class="kicker">${escapeHtml(page.eyebrow)}</span><h1>${escapeHtml(page.title)}</h1></header><article class="prose">${page.description}</article></main>${siteFooter()}`;
  return documentHtml({ title: page.title, description: stripHtml(page.description).slice(0, 155), canonical: `${origin}${path}`, origin, body });
}

function renderArchiveIndex(currentEdition, dates, origin) {
  const currentDate = editionDate(currentEdition);
  const allDates = [...new Set([currentDate, ...dates].filter(Boolean))].sort().reverse();
  const entries = allDates.map((date, index) => `<li><a href="/archive/${date}/"><span>${formatArchiveDate(date)}</span><small>${index === 0 && date === currentDate ? "Current edition" : "Saved daily edition"}</small></a></li>`).join("");
  const body = `${siteHeader("/archive/")}<main class="interior-main"><header class="page-header"><span class="kicker">Previous transmissions</span><h1>Edition Archive</h1><p>Daily snapshots preserve the stories that led the AI news cycle. The archive begins collecting automatically after this update is deployed.</p></header><ul class="archive-list">${entries || `<li class="empty-note">The first saved edition will appear here after the next daily rollover.</li>`}</ul></main>${siteFooter()}`;
  return documentHtml({ title: "Edition Archive", description: `Daily archived editions of ${SITE.shortName}.`, canonical: `${origin}/archive/`, origin, body });
}

function renderArchivedEdition(edition, date, origin) {
  const sections = Object.entries(edition.sections || {}).map(([name, stories]) => sectionHtml(name, stories, false)).join("");
  const body = `${siteHeader("/archive/")}<main class="interior-main archived-edition"><header class="page-header"><span class="kicker">Archived transmission</span><h1>${formatArchiveDate(date)}</h1><p>This frozen edition reflects the front page as it appeared on this date. Headlines lead to their original publishers.</p></header><div class="section-grid">${sections}</div></main>${siteFooter()}`;
  return documentHtml({ title: `${formatArchiveDate(date)} Archive`, description: `Archived AI news edition for ${formatArchiveDate(date)}.`, canonical: `${origin}/archive/${date}/`, origin, body });
}

function renderNotFound(origin) {
  const body = `${siteHeader("")}<main class="interior-main"><header class="page-header"><span class="kicker">Signal lost</span><h1>404</h1><p>The machine looked everywhere. This page is not in the system.</p><p><a class="button-link" href="/">Return to the front page</a></p></header></main>${siteFooter()}`;
  return documentHtml({ title: "Page Not Found", description: "The requested page could not be found.", canonical: `${origin}/404`, origin, body, robots: "noindex,follow" });
}

function documentHtml({ title, description, canonical, image = "/hero-ai-news.png", origin, body, robots = "index,follow" }) {
  const jsonLd = JSON.stringify({ "@context": "https://schema.org", "@type": "WebSite", name: SITE.name, url: `${origin}/`, description: SITE.description, publisher: { "@type": "Organization", name: SITE.name, url: `${origin}/` } }).replace(/</g, "\\u003c");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)} | ${SITE.name}</title><meta name="description" content="${escapeHtml(description)}"><meta name="robots" content="${robots}"><meta property="og:type" content="website"><meta property="og:title" content="${escapeHtml(title)} | ${SITE.name}"><meta property="og:description" content="${escapeHtml(description)}"><meta property="og:image" content="${absoluteUrl(image, origin)}"><link rel="canonical" href="${escapeHtml(canonical)}"><link rel="stylesheet" href="/styles.css?v=20260817-2"><script type="application/ld+json">${jsonLd}</script></head><body>${body}<script type="module" src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token":"88ad5d22c43c436381016f49cc2827f9"}'></script></body></html>`;
}

function siteHeader(activePath) {
  const categories = Object.entries(CATEGORY_ROUTES).map(([route, label]) => navLink(route, label, activePath)).join("");
  return `<header class="site-header"><div class="brand-row"><a class="brand" href="/">Skynet <span>Tribune</span></a><p class="tagline">${SITE.tagline}<br>Independent AI news index</p></div><nav class="nav" aria-label="News sections">${categories}</nav><nav class="utility-nav" aria-label="Publication information">${navLink("/archive/", "Archive", activePath)}${navLink("/about/", "About", activePath)}${navLink("/editorial-standards/", "Standards", activePath)}${navLink("/sources/", "Sources", activePath)}${navLink("/contact/", "Contact", activePath)}<a class="montanimation-link" href="https://montanimation.studio/" target="_blank" rel="noopener noreferrer">Montanimation ↗</a></nav></header>`;
}
function navLink(route, label, activePath) { return `<a href="${route}"${activePath === route ? ` aria-current="page"` : ""}>${escapeHtml(label)}</a>`; }
function siteFooter() { return `<footer class="footer"><div class="footer__inner"><div><strong>${SITE.name}</strong><br>${SITE.tagline}<br>A <a href="https://montanimation.studio/" target="_blank" rel="noopener noreferrer">Montanimation</a> news experiment.</div><nav aria-label="Footer"><a href="/about/">About</a><a href="/editorial-standards/">Editorial Standards</a><a href="/corrections/">Corrections</a><a href="/privacy/">Privacy</a><a href="/contact/">Contact</a><a href="https://montanimation.studio/" target="_blank" rel="noopener noreferrer">Montanimation ↗</a></nav></div></footer>`; }

function sectionHtml(name, stories = [], linkTitle = false) {
  const heading = linkTitle ? `<a href="${categoryRoute(name)}">${escapeHtml(name)}</a>` : escapeHtml(name);
  return `<section class="news-section"><h2 class="section-title"><span>//</span> ${heading}</h2><ul class="story-list">${stories.slice(0, 7).map((item) => `<li><a href="${safeUrl(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.title)}</a>${metaHtml(item)}</li>`).join("") || `<li class="empty-note">Waiting for the next signal.</li>`}</ul></section>`;
}
function storyCard(item, number) { return `<article class="category-story"><span class="story-number">${String(number).padStart(2, "0")}</span><div><h2><a href="${safeUrl(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.title)}</a></h2>${item.description ? `<p>${escapeHtml(item.description)}</p>` : ""}${metaHtml(item)}</div></article>`; }
function categoryRoute(name) { return Object.entries(CATEGORY_ROUTES).find(([, label]) => label === name)?.[0] || "/more-signals/"; }
function metaHtml(item) { return `<span class="meta"><b>${escapeHtml(item.source || "Source")}</b> · ${timeAgo(item.publishedAt)}</span>`; }
function timeAgo(value) {
  const hours = Math.max(0, Math.floor((Date.now() - Date.parse(value || Date.now())) / 3600000));
  if (hours < 1) return "Just now";
  if (hours === 1) return "1 hour ago";
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}
function formatDate(date) { return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: "America/New_York", timeZoneName: "short" }).format(date); }
function formatArchiveDate(value) { const date = new Date(`${value}T12:00:00Z`); return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(date); }
function renderSitemap(origin, dates) {
  const paths = ["/", ...Object.keys(CATEGORY_ROUTES), ...Object.keys(INFO_PAGES), "/archive/", ...dates.map((date) => `/archive/${date}/`)];
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `<url><loc>${escapeXml(`${origin}${path}`)}</loc></url>`).join("")}</urlset>`;
}
function escapeHtml(value = "") { return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]); }
function escapeXml(value = "") { return escapeHtml(value); }
function safeUrl(value = "#") { try { const u = new URL(value, "https://example.com"); return ["http:", "https:"].includes(u.protocol) ? escapeHtml(value) : "#"; } catch { return "#"; } }
function safeImage(value = "") { return value && (/^https?:\/\//i.test(value) || /^\/[a-z0-9/_-]+\.(png|jpe?g|webp|gif)$/i.test(value)) ? escapeHtml(value) : "/hero-ai-news.png"; }
function absoluteUrl(value, origin) { try { return escapeHtml(new URL(value, origin).href); } catch { return `${origin}/hero-ai-news.png`; } }
