# CLAUDE.md

This file gives Claude Code guidance when working in this repository.

## About Justin

This is background for Claude only. It is not website copy.

- Justin works in **marketing at a hotel**. He knows the hospitality business from the inside.
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

Justin's photography portfolio website, focused on **hospitality / hotel photography**.

Justin is starting out in hotel photography and is building a portfolio to win clients
(hotels, resorts, boutique properties, hospitality brands and agencies). He has some work
to show now and will add a lot more over time.

### Services / photo categories

- **Interiors**: rooms, suites, lobbies, restaurants, spas, architectural details
- **Lifestyle**: people using the space, such as guests, dining, pool and amenities
- **Property**: exteriors, grounds, full property coverage
- **Drone / aerial**: gets its own dedicated section

## Goals

- **High end and distinctive.** It must stand out from other photographers' portfolios and
  never look like a generic template. It should feel like a luxury hotel brand.
- **Dynamic and interactive.** Content flows as you scroll, elements reveal and animate in,
  and sections respond to the user (scroll-driven animation, parallax, image reveals,
  hover interactions, smooth transitions between pages and sections).
- **Photos come first.** The design should frame the photography and never compete with it.
- **Easy to add work later.** Adding photos or a new project should be simple, ideally
  dropping images into a folder and/or editing one data file. No layout code changes needed.
- **Works with only a few photos for now.** Layouts need to look strong with a small number
  of images and scale up as the portfolio grows.

## Required sections / pages

- **Hero / home**: a strong first impression with full-bleed imagery and motion
- **Portfolio / work**: browsable by category (Interiors, Lifestyle, Property, Drone),
  with optional individual project/property pages
- **Drone**: a dedicated aerial section (stills and possibly video)
- **About**: Justin's story, approach, and why hotels should hire him
- **Contact / inquiry form**: for potential clients to reach out (name, email, property,
  type of shoot, message)
- **Email newsletter signup**: lets visitors subscribe to updates

## Tech stack

**Decided:** plain HTML/CSS/JS (no build step), hosted on Cloudflare Pages (free).
- GSAP + ScrollTrigger (cdnjs) for scroll animation, Lenis (unpkg) for smooth scrolling
- Fonts: Cormorant Garamond (headings) + Inter (body), from Google Fonts
- Palette: neutral luxury (bone, ink, warm ivory, champagne accent) so it suits any hotel brand
- Contact form: Web3Forms. Newsletter: Kit. Both are set in `site/js/config.js` (not connected yet)
- Node.js is not installed on Justin's Mac. Photos are resized with macOS `sips`, video with `avconvert`

Requirements this stack covers:
- Smooth scroll-driven animation (e.g., GSAP + ScrollTrigger, Lenis smooth scroll)
- Optimized, responsive images (modern formats, lazy loading, multiple sizes), since this
  is an image-heavy site where performance matters
- Content-driven portfolio data (e.g., a JSON/Markdown collection per project)
- Working form submission and email-list integration (provider TBD)
- Easy hosting/deploys (e.g., Vercel or Netlify)

## Commands

_Fill in once the project is set up._

```bash
# install dependencies
# run dev server
# build for production
```

## Structure

- `research/`: planning research (not part of the website)
  - `hosting-options.md`: platform comparison, costs, and recommendation
  - `design-inspiration.md`: example websites and ideas to borrow
  - `color-palettes.md`: luxury color palette options with hex codes

- `site/`: the website (this folder is what gets deployed)
  - `index.html`: home page (hero, intro, selected work, services, drone & video, about, contact)
  - `work.html`: full portfolio with category filters and photo viewer
  - `css/styles.css`: all styles and color tokens
  - `js/photos.js`: **the list of portfolio photos** (the only file to edit when adding work)
  - `js/config.js`: form and newsletter settings
  - `js/main.js`: galleries, animations, forms
  - `images/portfolio/`: web-sized photos (`name.jpg` large, `name-sm.jpg` small)
  - `images/about/`, `video/`: about portrait and video clips
- `tools/optimize-photo.sh`: resizes a photo into `site/images/portfolio/`

**To add a photo:** run `tools/optimize-photo.sh "<photo path>" <lowercase-name>`, then add one
line to `site/js/photos.js`.

## Publishing (Cloudflare Workers + GitHub)

- Repo: `github.com/justinbclose/justinclosemedia` (private). Claude pushes over SSH with the
  deploy key `~/.ssh/justinclosemedia_github` (set in this repo's `core.sshCommand`).
- `wrangler.jsonc` makes Cloudflare publish only `site/`. Everything else stays private.
- **`preview` branch** → https://preview-justinclosemedia.justinbclose.workers.dev
  (anyone with the link can view it, but it isn't listed anywhere)
- **`main` branch** → live site: https://justinclosemedia.justinbclose.workers.dev
  (justinclosemedia.com once the domain is connected)
- **Workflow (Justin's choice):** make changes on `preview`, push, send Justin the preview
  link. Merge into `main` only after he approves. Builds take about 30 seconds.
- Domain justinclosemedia.com is registered at WordPress.com.

**Local preview:** run `python3 -m http.server 4322` from inside `site/`, then open
http://127.0.0.1:4322.

**Source photos:** `~/Desktop/Photo for website/`. Placeholders came from here.
`Generated-image_-Elegant-poolside-retreat-with-loungers.webp` was left out because it's an
AI-generated image, not Justin's work.

## Conventions

- Mobile-first and fully responsive. Animations must also feel good on phones.
- Respect `prefers-reduced-motion`: provide calmer fallbacks for animations.
- Performance matters: compress and size images properly, avoid layout shift, and keep
  animation smooth (60fps, animate transform/opacity).
- Use semantic HTML, meaningful alt text on every photo, and accessible forms.
- Keep SEO in mind (page titles, meta descriptions, Open Graph images) so hotels can find
  and share the work.
- Prefer simple, maintainable solutions. Add dependencies only when they clearly help.

## Open questions

- Business name is **Justin Close Media**. Still need: logo, and the domain name and where it's registered
- Web3Forms key and Kit account to connect the forms
- Which placeholder photos are Justin's own work (some look AI-edited)
- Real drone footage (yes, drone includes video). The current clip is an interior restaurant video
- Website copy is a draft written from Justin's notes and needs his review
