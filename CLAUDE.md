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

- **Preview is ahead of live (Nov 17):** the mounted-print galleries (see Design decisions) are
  on `preview` only, waiting for Justin to say "publish". Live is at the Nov 16 polish pass.
  Open question to Justin: how far to take the reference site's warm, personal feel beyond the
  galleries (home page tiles, colors and copy are unchanged so far).
- **Nov 16 polish pass** (same layout, colors and fonts): new button details, full-screen phone
  menu, swipeable filter row, even photo grids, larger photos in the phone viewer, form error and
  sending states, Contact page shows the inquiry form before "Email updates" on phones, fixes for
  320–360px phones. Notes in `research/ux_spec.md`. It was tested with Playwright at 320–1440px
  (fonts supplied locally, the form service mocked so no real inquiry is sent).
- **Nov 16, 2026 incident (fixed):** Cloudflare builds silently stopped for ~17 days because the
  Cloudflare Workers and Pages GitHub App's repository list was changed to only `lj-marketing-hub`,
  dropping this repo. Re-added at github.com/settings/installations. If builds ever stop again
  (pushes don't appear in the worker's Deployments), check that list FIRST, and when connecting any
  new repo to Cloudflare, ADD it to the selection instead of replacing it.
- Justin now also works on this repo from chat sessions (repo attached via GitHub); his Mac is not
  the only place changes come from. Photos arriving through chat are ~325px thumbnails: never add
  those to the site; get the originals into `New Photos/` (he can drag-drop on github.com) first.
- Removed at Justin's request (Nov 16): room-balcony-view, rooftops-palm-ocean, beach-up-the-coast
  photos and the beachside-lunch-clip video (files deleted). Home tiles now: Rooms =
  bedroom-shell-art, Property = coastal-palms-dusk. Added: beachfront-window-lunch (Dining).
  Still in `New Photos/`: IMG_1186.jpeg (cabin/sauna window; was cut from Spa before, held back).
- **Waiting on Justin:**
  1. **Instagram pool photo** (ljshoreshotel post, Aug 26: loungers with striped towels, blue tile
     wall, drinks). Not reachable logged out. Needs the post link (single posts load logged out),
     an Instagram login in the browser pane, or Claude in Chrome connected. Then add it to Pools
     and make it the home page Pools tile.
  2. ~~Web3Forms key~~ Done: forms are connected (key in `site/js/config.js`); inquiries go to
     justinclosemedia@gmail.com. Free plan: 250 submissions/month.
  3. Facts for copy (from `research/marketing-brief.md`): reply time, delivery turnaround, number
     of photos delivered, FAA Part 107 license / insurance, whether to show a starting price.
     Never invent these.
  4. Optional: a home page background video (set `HERO.video` in `site/js/photos.js`).
- Newsletter signup is on the Contact page but not connected (no email tool chosen yet).
- **HubSpot tracking code** is on every page (added in `tools/build-pages.py` head; portal 247843142, na2). It records visits and UTM campaigns (outreach links use `utm_campaign=sd-free-shoot`). Justin opts out of tracking his own visits per browser with `?notrack=1` (`?notrack=0` undoes it); HubSpot's IP-exclusion setting was not available on his account.
- **Outreach (next phase):** plan in `outreach/hotel-outreach-plan.md`: 2 free day shoots, then
  2–3 overnight guest-journey shoots, then paid clients (hotel groups first). Max 4 free shoots.
  After the first shoots, add a "Worked with" section to the site (with each hotel's permission).
- Gym photo in Downloads ("Modern, airy gym with bright lighting.png") was held back: the file name
  suggests AI generation/editing. Add only if Justin confirms it's his real, unedited photo.

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
  spaced-out uppercase labels.
- **Typography:** Cormorant Garamond (headlines, italic for quotes and buttons), Inter (body and
  labels), Pinyon Script only for Justin's signature. Bodoni Moda + Jost were tried and reverted:
  the hero text was hard to read over photos.
- **Buttons are editorial text links** (italic serif, hairline underline, sliding arrow), never filled
  boxes or pill buttons. Details (Nov 16 polish pass): the arrow is a drawn hairline (`--arrow` in
  `styles.css`, reused in tiles, phone menu and viewer), every button is at least 44px tall, on
  hover the underline wipes out and redraws once, `.btn--lg` is the larger size for the hero and
  the "Send inquiry" buttons. No looping animations anywhere (a looping hero scroll cue was tried
  in review and removed; the cue is a still arrow).
- **Phone menu:** full-screen list of large serif links with the email at the bottom. Links appear
  together, not one by one. The page behind is locked and can't be reached with Tab.
- **Filters:** one swipeable row on phones (not stacked rows), taller chips on touch screens.
- **Photo grids:** with a mouse the title shows on the photo on hover, so spacing is even; on touch
  screens captions sit under each photo. The viewer sizes each photo from its shape (`--ar`), so
  photos fill the screen width on phones.
- **Forms:** brass line under the field in focus; fields that need fixing turn the error color
  (`--error`); the button locks while sending.
- **Personality** (inspired by coastlinecollective.us): first-person voice, a "Hi, I'm Justin" note
  with his photo and script signature on the home page, signature in the booking bar.
- **Home:** full-screen cover photo (currently `coastline-resort-aerial`) with a centered headline,
  then "Recent work" (6 tiles: Pools, Dining, Video, Drone, Lifestyle, Spa), the personal note,
  "How it works", and the booking bar ("Let's plan your shoot.").
- **Keep the current home layout.** Justin tried a version with the headline bottom-left, one large
  lead tile, no small labels and list-style steps, and preferred this one (it was reverted).
- **Hover:** every image grows gently (scale ~1.05–1.06, 0.9s). No glow/ripple/WebGL effects.
- **Galleries: mounted prints** (Nov 17, 2026; replaced the square tiles). Justin liked how
  marko-everyday.com/hospitality frames its photos and its warm, personal feel. His version: each
  photo sits on a paper mat (`--mat`) in its own shape, never cropped, with a soft shadow, a slight
  tilt that straightens on hover, the title in italic serif and the category in small brass caps
  (`--brass-text`) on the mat. Photos and Drone pages deal the prints into columns in `main.js`
  (`deal()`: 3 columns, 2 on phones, always into the shortest column so the first photos stay on
  top). Video page clips use the same frame. Click still opens the full photo in the viewer.
  Don't copy the reference's polaroid look, handwriting font or colors.
- **Booking bar** at the bottom of every page has the form fields inline. Never use the words
  "Check availability". The nav says "Contact".
- **About:** even 50/50 split, sticky portrait. Voice: "I've worked in hotel marketing and travel."
  **Never mention usage rights, ownership, expired rights or restrictions anywhere on the site:**
  Justin negotiates rights per contract. Keep the tone confident, not problem-focused.
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
- `outreach/`: `hotel-outreach-plan.md` (target hotels, phases, pitch)
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
