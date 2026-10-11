# CLAUDE.md

This file gives Claude Code guidance when working in this repository.

## About Justin

This is background for Claude only. It is not website copy.

- Justin has worked in **hotel marketing** (La Jolla Shores Hotel; he shoots for its Instagram, @ljshoreshotel). He knows the hospitality business from the inside.
- In that job he saw a real gap: hotels often don't have enough **high-quality photos** for
  Instagram, their website, and other marketing. Budgets, scheduling, and the hassle of
  hiring photographers all get in the way.
- He is starting a **photography business** to fix that. He wants hotels to capture their
  best moments at an **affordable price**, with a process that is **very easy** for them.
- **Brand feel:** high-end, polished, and luxurious, with a refined luxury color palette. The site
  should look like it belongs next to the hotels he wants to work with.
- **Selling point:** he is a marketer who shoots, not just a photographer. He understands
  what a hotel's marketing team actually needs: images that work on social media, the
  website, booking sites, and in campaigns.

When writing anything for this project, keep this perspective in mind so it sounds like
it comes from Justin.

## Communication style

How Claude should write and explain things to Justin:

- Write in clear, conventional English. Use simple words whenever possible.
- Avoid buzzwords, corporate jargon, and vague statements.
- Focus on practical examples and real takeaways.
- Choose clarity over sophistication.
- Explain concepts as if talking to an intelligent beginner.
- Use short paragraphs and a strong, easy-to-scan structure.
- In chat, keep replies very short: give a clear suggestion, not long lists to read through.

## Rules

### Working rules

- **Before any complex task, ask at least three clarifying questions.**
- **Present a plan before doing the work**, and wait for Justin to approve it.
- **Never assume missing information.** If important details are missing or unclear
  (when importing content, writing copy, or anything else), ask instead of guessing.
- **If uncertain, ask before proceeding.**
- **When there is more than one way to do something, explain the trade-offs** and
  give a recommendation.
- **Keep outputs concise and relevant.** No filler content added just to make it longer.
- **Stay within requested word counts and formats.**
- **Use practical examples** whenever possible.
- **Review outputs before final delivery.** Check for mistakes, gaps, and anything that
  doesn't match the request.

### File naming and organization

- **Use lowercase file names**, with hyphens between words (e.g., `about-page.md`,
  `hotel-lobby-01.jpg`). The one exception is `CLAUDE.md`, which must keep that exact name.
- **`Justin's Website/` is the main hub.** All project files live inside it.
- **Split work into separate files by area** (e.g., brand notes, page content, portfolio
  data, components) instead of piling everything into one file.
- Use good judgment to create new files and folders as needed, and keep the structure easy
  to navigate. Record any important new files or folders in the Structure section below.

## Project

**Justin Close Media**: a hotel photography business (photos, video, drone). The website is LIVE at
https://justinclosemedia.com. Contact email: **justinclosemedia@gmail.com** (Gmail; no email on the
domain itself, by Justin's choice).

### Current status (keep this updated)

- Live site and preview are in sync as of the last "publish".
- **Waiting on Justin:**
  1. **Instagram pool photo** (ljshoreshotel post, Aug 26: loungers with striped towels, blue tile
     wall, drinks). Not reachable logged out. Needs the post link (single posts load logged out),
     an Instagram login in the browser pane, or Claude in Chrome connected. Then add it to Pools
     and make it the home page Pools tile.
  2. **Web3Forms access key** (free, for justinclosemedia@gmail.com). Put it in
     `site/js/config.js` → `web3formsKey`. Until then the forms tell visitors to email instead.
  3. Facts for copy (from `research/marketing-brief.md`): reply time, delivery turnaround, number
     of photos delivered, FAA Part 107 license / insurance, whether to show a starting price.
     Never invent these.
  4. Optional: a home page background video (set `HERO.video` in `site/js/photos.js`).
- Newsletter signup is on the Contact page but not connected (no email tool chosen yet).

### Costs

Hosting (Cloudflare Workers, static assets), GitHub private repo, Web3Forms, and Google Fonts are
all free. The only cost is the domain: **$13/year at WordPress.com**, renews July 9, 2027
(auto-renew on). Optional: transfer the domain to Cloudflare (~$10.50/yr). The old WordPress.com
site (justinclosemedia-pbefw) is unused; don't delete the domain registration there.

## Design decisions (from Justin's feedback, keep following them)

- **Simple and compact.** Six short pages (Home, Photos, Video, Drone, About, Contact). No long
  scroll effects, pinned sections, loaders, giant headlines or word-by-word reveals. Justin found
  those "AI-looking" and too much scrolling.
- **Luxury, restrained look** (modeled on Four Seasons / Ritz-Carlton sites): warm cream `#F8F5EF`,
  near-black `#1B1A17`, one antique-brass accent `#9A7B4F`. Square corners, thin lines, small
  spaced-out uppercase labels. Cormorant Garamond (headings) + Inter (body).
- **Home:** full-screen cover photo (currently `coastline-resort-aerial`) with a centered headline,
  then 6 small tiles (Pools, Dining, Video, Drone, Lifestyle, Spa), "How it works", and the booking bar.
- **Hover:** the whole image grows slightly. No glow/ripple/WebGL effects.
- **Galleries:** square tiles (like coastlinecollective.us/photography). Click opens the full,
  uncropped photo in a viewer.
- **Booking bar** at the bottom of every page has the form fields inline. Never use the words
  "Check availability". The nav says "Contact".
- **About:** even 50/50 split, sticky portrait. Says "I've worked in hotel marketing" and that hotels
  **own the rights to every photo** (website, Instagram, ads, "no ifs, ands or buts").

## Photo rules

- Only real photos and video by Justin. **No AI-generated or AI-edited images.**
- **No gray, overcast or dull shots.** Bright, warm, hotel-relevant images only.
- **Food and drinks go under Dining**, not Lifestyle. Lifestyle = people/beach/leisure moments.
- Spa = spa only (the cabin window was removed for not fitting).
- Mountains and lakes go at the end of the Drone page, never as a lead image.
- A small portfolio is fine; Justin is just starting. Quality over quantity.
- **Don't comb his Photos library** (it uses up his usage). Use what he hands over: the
  `Photos/` folder in this project, or specific Instagram posts he points to (he took the photos
  on @ljshoreshotel and @themarineroom).
- Always strip GPS: the photo/video tools do this automatically.

## Tech

Plain HTML/CSS/JS, no libraries and no build step except the page builder. Node.js is not installed
on Justin's Mac; photos are resized with macOS `sips`, video with `avconvert`.
CSS/JS links carry a version stamp (`?v=...`) set by the page builder so browsers always load the
newest files.

## Structure

- `site/`: the website (this folder is what gets deployed)
  - `index.html`, `photos.html`, `video.html`, `drone.html`, `about.html`, `contact.html`:
    **generated by `tools/build-pages.py`**. Edit page text there, then run
    `python3 -I tools/build-pages.py`. Don't edit the HTML files directly.
  - `js/photos.js`: **every photo and video on the site** (PHOTOS, VIDEOS, DRONE, HOME_TILES)
  - `js/main.js`: nav, home tiles, galleries, viewer, video hover-play, forms
  - `css/styles.css`: all styles and color tokens. `js/config.js`: form settings
  - `images/portfolio/` (`name.jpg` 2000px + `name-sm.jpg` 1000px), `images/about/`, `video/`
- `tools/`: `build-pages.py`, `optimize-photo.sh`, `optimize-video.sh`, `strip-gps.py`,
  `strip-video-location.py` (photo and video tools remove GPS location data)
- `.claude/agents/`: helper roles (hotel-marketer, web-designer, photo-curator, qa-reviewer)
- `research/`: `marketing-brief.md`, `design-spec.md` (some of its details were later changed;
  the "Design decisions" section above wins), plus early research (hosting, inspiration, palettes)
- `Photos/`: Justin's source photos/videos (git-ignored). `Photos/instagram/` = images downloaded
  from his Instagram posts.

**To add a photo:** `tools/optimize-photo.sh "<photo path>" <lowercase-name>`, then add one line
to `site/js/photos.js` (check the true width/height; phone photos may be rotated by an EXIF flag).
**To add a video:** `tools/optimize-video.sh "<path>" <name> [seconds, default 6]`; use
`PRESET=Preset1280x720` for drone clips. Then rebuild pages (`python3 -I tools/build-pages.py`)
so the version stamp updates.

**Photo search:** Justin asked to stop combing his Photos library (it uses up his usage fast).
Keep the portfolio small for now; he will hand over specific photos to add. Exports already on his
Desktop: `drone photos export`, `pool export`, `hotel favorites export`,
`restaurant favorites export`, `drone favorites export`.

## Publishing (Cloudflare Workers + GitHub)

- Repo: `github.com/justinbclose/justinclosemedia` (private). Claude pushes over SSH with the
  deploy key `~/.ssh/justinclosemedia_github` (set in this repo's `core.sshCommand`).
- `wrangler.jsonc` makes Cloudflare publish only `site/`. Everything else stays private.
- **`preview` branch** → https://preview-justinclosemedia.justinbclose.workers.dev
- **`main` branch** → live site: https://justinclosemedia.com (also www, and
  https://justinclosemedia.justinbclose.workers.dev)
- **Workflow (Justin's choice):** make changes on `preview`, push, send Justin the preview
  link. Merge into `main` only after he says "publish". Builds take about 30 seconds.
- Domain: registered at WordPress.com; nameservers point to Cloudflare
  (candy/marty.ns.cloudflare.com). The root and www are custom domains on the Worker.
  Old WordPress A/CNAME records were deleted; the TXT records were kept.
- `Photos/` (Justin's source photos and videos) is git-ignored. Never push it.

**Local preview:** run `python3 -m http.server 4322` from inside `site/`, then open
http://127.0.0.1:4322.

**Local preview:** the Browser pane can't start a server from the Desktop folder (macOS
permissions), so start it with Bash in the background (`python3 -m http.server 4322 --bind 127.0.0.1`
from `site/`) and use the `site` entry in `~/Desktop/.claude/launch.json` (attaches to that port).

**Accounts:** GitHub `justinbclose`; Cloudflare and WordPress.com are logged in on the built-in
browser pane (Justin signs in himself; never type his passwords). Deleting DNS records needs his
explicit OK in chat.

## Conventions

- Mobile-first and fully responsive. Respect `prefers-reduced-motion`.
- Keep images light: 2000px max, ~72% JPEG quality; videos short (≤6s) and small.
- Semantic HTML, alt text on every photo, accessible forms, page titles and descriptions.
- Prefer simple, maintainable solutions. Add dependencies only when they clearly help.
- Before calling something done, check it in the browser (desktop and phone width) and look
  for console errors. The `qa-reviewer` helper can do a full review.
