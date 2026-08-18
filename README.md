The Skynet Tribune — Cloudflare prototype

An image-led, Drudge-inspired AI news front page built for Cloudflare Workers. The page is server-rendered so headlines are visible to search engines, while a Cron Trigger refreshes one shared edition every 30 minutes.

What is working

Responsive image-led hybrid layout

Server-rendered homepage, metadata, canonical URL, and WebSite structured data

Searchable category pages for each news section

About, Editorial Standards, Contact, Privacy, Corrections, and Sources pages

Daily KV-backed edition archive with a 90-day index

Dynamic robots.txt and an expanded XML sitemap

Feed fetching, basic RSS/Atom parsing, deduplication, recency scoring, and topic classification

One KV record for the full edition

Safe fallback edition when feeds or KV are unavailable

Static CSS and image served through Workers Static Assets

Preview locally

Install Node.js 20 or newer.

Run npm install.

Run npm run dev.

Open the local address Wrangler prints.

Without KV, the prototype intentionally displays its sample edition.

Connect KV and scheduled updates

In Cloudflare, create a Workers KV namespace named skynet-tribune-headlines.

Copy its namespace ID.

In wrangler.jsonc, set the HEADLINES binding to the namespace ID.

Run npm run deploy.

In Workers & Pages → your Worker → Triggers, confirm the */30 * * * * cron exists.

Trigger the scheduled handler once from Cloudflare or wait for the next half-hour. Until then, the sample edition remains visible.

At a 30-minute interval, the site writes 48 current editions per day. At the first update of a new UTC date, the final edition from the previous date is saved to the archive with two additional KV writes.

Connect a domain

In the Worker, open Settings → Domains & Routes → Add → Custom Domain. The domain must use Cloudflare DNS. The Worker generates robots.txt and its sitemap URL from the active domain automatically.

After the permanent domain is chosen, change the canonical URL handling so the workers.dev address redirects to that domain rather than presenting a duplicate copy.

Page routes

/about/

/editorial-standards/

/contact/

/privacy/

/corrections/

/sources/

/archive/

/model-wars/, /ai-business/, /robots-hardware/, /policy-safety/, /weird-machine/, and /more-signals/

Editorial controls

Feeds and source priority: FEEDS in src/worker.js

Topic rules: classify()

Lead-story scoring: score()

Masthead, tagline, and metadata: SITE

Colors and layout: public/styles.css

Before launch, confirm that each source permits the way its image and feed data are displayed. The included original image is a safe fallback; set a story's image to /hero-ai-news.png to use it.

Next production pass

Add a small protected editor override for pinning the lead story

Store feed health and last-success information

Add original brief/article pages and an editorial publishing workflow

Add Organization logo markup after the final logo/domain are chosen

Add analytics and Search Console after launch
