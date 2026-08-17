# The Skynet Tribune — Cloudflare prototype

An image-led, Drudge-inspired AI news front page built for Cloudflare Workers. The page is server-rendered so headlines are visible to search engines, while a Cron Trigger refreshes one shared edition every 30 minutes.

## What is working

- Responsive image-led hybrid layout
- Server-rendered homepage, metadata, canonical URL, and WebSite structured data
- Feed fetching, basic RSS/Atom parsing, deduplication, recency scoring, and topic classification
- One KV record for the full edition
- Safe fallback edition when feeds or KV are unavailable
- Static CSS and image served through Workers Static Assets

## Preview locally

1. Install Node.js 20 or newer.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open the local address Wrangler prints.

Without KV, the prototype intentionally displays its sample edition.

## Connect KV and scheduled updates

1. In Cloudflare, create a Workers KV namespace named `skynet-tribune-headlines`.
2. Copy its namespace ID.
3. In `wrangler.jsonc`, add the commented `kv_namespaces` block and replace `YOUR_NAMESPACE_ID`.
4. Run `npm run deploy`.
5. In Workers & Pages → your Worker → Triggers, confirm the `*/30 * * * *` cron exists.
6. Trigger the scheduled handler once from Cloudflare or wait for the next half-hour. Until then, the sample edition remains visible.

At a 30-minute interval, the site writes only 48 editions per day. Page visitors read the same stored edition; they do not trigger feed downloads.

## Connect a domain

In the Worker, open Settings → Domains & Routes → Add → Custom Domain. The domain must use Cloudflare DNS. Update `public/robots.txt` after the final domain is chosen.

## Editorial controls

- Feeds and source priority: `FEEDS` in `src/worker.js`
- Topic rules: `classify()`
- Lead-story scoring: `score()`
- Masthead, tagline, and metadata: `SITE`
- Colors and layout: `public/styles.css`

Before launch, confirm that each source permits the way its image and feed data are displayed. The included original image is a safe fallback; set a story's `image` to `/hero-ai-news.png` to use it.

## Next production pass

- Add a small protected editor override for pinning the lead story
- Store feed health and last-success information
- Add article archive pages if original summaries or commentary will be published
- Add Organization logo markup after the final logo/domain are chosen
- Add analytics and Search Console after launch
