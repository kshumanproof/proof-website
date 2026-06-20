# Proof Site Audit — Efficiency, Layout, Copy

Scanned: 16 HTML pages, shared-shell.js/css, images, root assets. Total folder size: **1.1 GB** (this is huge for a static marketing site — see Efficiency below).

---

## 1. Efficiency

### Dead weight in the repo root
- **5 untouched AI-generation drafts** (`u3318617226_*.png`), totaling **~22 MB**, are not referenced by any HTML, JS, or CSS file. They're leftover image-gen exports sitting in the live site root.
- **3 stale JS/HTML backups** are tracked alongside production files: `shared-shell.backup.js`, `shared-shell.before-mobile-menu-cleanup.js`, `shared-shell.js.bak-footer-logo-size`, plus `index-old.html` (120 KB, duplicate `<title>`/meta of `index.html`). None are needed for the live site to function.
- **`pitch-asset-checklist.png` (5 MB)** is the lead-magnet PDF-replacement download — fine to keep, but 5 MB for a single checklist image is large; a compressed PNG or PDF would be far smaller.

**Recommendation:** delete the 5 unreferenced AI drafts and the 3 `.bak`/`-old` files from the live root (move to a local `/archive` folder outside the deployed site, or just rely on git history — they're already in version control).

### Unoptimized images
- Every photo in `/images`, `/logos`, and the root averages **2–7 MB** as raw PNG (`proof-trailer.png` 3.4 MB, `proof-sizzle.png` 3.4 MB, `proof-dev.png` 3.4 MB, `why-three.png` 2.7 MB, `eighty-west.jpg` 4.8 MB, etc.). None appear to be compressed or served as WebP/AVIF.
- These are loaded as decorative background art, panel images, and partner logos — none need to be photographic-quality PNGs. Re-exporting as WebP at 75–85% quality would typically cut each file by 80–95% with no visible difference.

**Recommendation:** batch-convert `/images`, `/logos`, and root marketing photos to WebP, and resize to the actual rendered dimensions (most are displayed well under 1000px wide).

### Tailwind loaded via CDN on every page
All 16 pages load Tailwind via `<script src="https://cdn.tailwindcss.com">` (the "Play CDN"). This compiles the entire Tailwind framework in the visitor's browser on every page load — Tailwind's own docs flag this as **not suitable for production**: it's slower, ships far more CSS/JS than needed, and can't be cached as an optimized static stylesheet.

**Recommendation:** run the Tailwind CLI build step once and ship a single purged, minified `.css` file instead. This is the single biggest performance win available on this site.

### Heavy, duplicated video load on the homepage hero
`index.html` renders a desktop hero *and* a mobile hero, each with two looping HLS video elements (`heroBlurVideo`/`heroBgVideo` and their `Mobile` twins) — 4 `<video>` tags wired to `hls.js` on one page load, even though only one set is ever visible at a time (the other is just CSS-hidden via `hidden lg:block` / `flex lg:hidden`). Confirm whether the hidden set still buffers video in the background — if so, that's double the bandwidth for nothing.

**Recommendation:** only mount/attach HLS to the currently-visible hero set (check `window.matchMedia` before calling `attachHls`), or use a single responsive video element instead of two parallel DOM trees.

### Third-party scripts loading unthrottled in `<head>`
Every page loads Microsoft Clarity, Crisp Chat, Google Analytics, and Tailwind's CDN script in the `<head>`, none deferred. That's 4 third-party origins blocking/competing with first paint on every single page.

**Recommendation:** add `defer` to Clarity/GA where possible, and consider lazy-loading Crisp chat on first user interaction (scroll/click) rather than on initial load.

---

## 2. Layout / structure

### Duplicate CSS rules in `index.html`
The inline `<style>` block in `index.html` defines `.trust-lens-card` and `.trust-strip` **twice** (once near line 275, again near line 337/419) with overlapping but not identical rules. This is a sign the page has been edited in place repeatedly without cleanup — it works today by accident of cascade order, but it's fragile and bloats the page by ~250 lines of redundant CSS.

**Recommendation:** consolidate into one rule set per class before the next edit pass.

### A "rescue" patch sitting on top of the shared shell
`index.html` ships its own inline mobile-menu wiring (`wireMobileMenuRescue`), with the comment *"Keeps this page usable until shared-shell.js is cleaned."* Meanwhile `shared-shell.js` **also** wires the same `#menuBtn`/`#mobileMenu` elements independently. Both check a `dataset.rescueWired` flag so they don't double-bind today, but this is two separate systems patched together rather than one. It's the kind of thing that silently breaks the next time either file is edited.

**Recommendation:** finish the cleanup the comment refers to — move all menu logic into `shared-shell.js` and delete the inline rescue block.

### `shared-shell.css` is nearly empty
It contains only 8 lines (background color + scroll-lock helper). Given the file is linked on every page, this is fine as-is, but worth knowing it's not actually carrying shared component styles — those all live duplicated inline per-page instead.

### Aggressive, stacked popups
On every page (via `shared-shell.js`), visitors who haven't closed or subscribed get an email popup triggered by **both** exit-intent (mouse leaving the top of the viewport) **and** a 25-second timer — whichever fires first. Combined with the always-visible floating "Get a free project review" bar and the Crisp chat bubble, a first-time visitor can have three competing CTAs on screen within 25 seconds.

**Recommendation:** pick one popup trigger (exit-intent is usually enough) and consider giving the floating bar more breathing room before the popup competes with it.

### Heading hierarchy is reasonable but inconsistent
Most pages have one clear `<h1>` (some, like `trailer.html`, `scene.html`, `sizzle.html`, `success.html`, `development.html`, `concept.html`, have **2** — worth a quick check that the second isn't a duplicate/redundant heading hurting SEO clarity).

---

## 3. Copy

### `index-old.html` duplicates `index.html`'s title and meta description verbatim
It's correctly blocked in `robots.txt`, but it's still sitting in the live root and isn't linked from anywhere — pure orphaned content. Safe to delete.

### Three near-duplicate "thank you" pages
`submitted.html`, `success.html`, and `review-submitted.html` all serve a similar post-action confirmation purpose but with different copy and, in `success.html`'s case, an entirely different mechanism (a client-side access-token gate — see security note below). Worth confirming all three are still actually linked from active flows; if any are leftover from an earlier funnel, consolidate to cut confusion for future edits.

### Footer legal disclaimer is dense
The footer copyright block is a single ~95-word legal paragraph in 11px text. Functionally fine, but worth a once-over to confirm it still matches current product claims (it mentions financing/distribution/talent-attachment disclaimers — make sure that still matches what PROOF promises elsewhere on the site).

### Tone is consistent and clear
Across the homepage, FAQ, and product pages, the copy itself ("No one says yes to a project they can't picture," "We review the pitch like the room will") is sharp, on-brand, and consistent in voice — no rewrite needed there. The FAQ intro in particular does good work pre-empting the "is this replacing filmmakers?" objection.

---

## 4. Other findings worth flagging

### Hardcoded access token, visible in page source
`success.html` checks a URL parameter against a hardcoded string (`proof_access_7XqP91LmK2vRa8NzQ4TyF0bWsJcE63HdMpL9UaYtC5KrVx81Qn`) entirely in client-side JavaScript. Anyone who views page source gets the "secret" token and can construct a valid URL themselves — this offers no real access control. If this is meant to gate real content, it needs to move server-side; if it's just a soft deterrent, that's fine to leave as-is, but worth knowing it's not secure.

### `robots.txt` / `sitemap.xml` look correct
`index-old.html` is properly disallowed, and the sitemap matches the pages meant to be indexed. No action needed.

### Git working tree shows everything as modified
`git status` currently shows nearly every tracked file as modified, including ones like `proof-ai-training.csv` and `README.md` that wouldn't normally need touching. Worth a `git diff` pass to confirm nothing unintended (e.g. line-ending changes) snuck in before the next commit.

---

## Suggested priority order

1. Delete the 5 unreferenced AI-draft images and the 3 backup/`-old` files (instant ~140 MB+ cleanup, zero risk).
2. Swap the Tailwind CDN script for a built/purged stylesheet (biggest real performance win, touches all 16 pages).
3. Compress and convert images to WebP across `/images`, `/logos`, and root.
4. Finish the mobile-menu cleanup so `index.html` doesn't carry a parallel "rescue" script.
5. Decide on one popup trigger instead of two.
6. Move the `success.html` access check server-side if it's meant to actually restrict access.

Happy to start on any of these — the file cleanup and popup/menu fixes are quick; the Tailwind build and image conversion are the higher-effort, higher-payoff items.
