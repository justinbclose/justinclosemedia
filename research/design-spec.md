# Design spec: compact multi-page site

Aligned with `marketing-brief.md` (changes are listed at the end).

## 1. Why it reads as "AI/templated" (remove)

- **Giant serif headlines** (104-150px). Use one serif line per page, max 56px.
- **Line-mask and word-by-word text reveals** (very common online).
- **Loader % counter, footer wordmark, "Scroll" drip, "View" cursor bubble, magnetic buttons.**
- **Italic punchline endings** ("feel them."). Write plain sentences.
- **Pinned story, drone pin-zoom, horizontal strip, 200px padding**, which cause the long scroll.
- **WebGL on big images** (see 8).

## 2. Site map and navigation

Pages: `index`, `photos`, `video`, `drone`, `about`, `contact`.

- **Fixed 64px top bar**, bone background with a hairline. On the left, the name in Inter 13px caps. On the right, the 5 links plus a small champagne-outline **"Check availability"** button (the main button wording everywhere).
- Active page: a 4px champagne dot under the link.
- Mobile: "Menu" opens a sheet with 32px serif links.
- **Transitions:** fade out 250ms, then fade in and rise 8px over 400ms (`@view-transition`). No wipe.

## 3. Home page (about 2.5 screens)

**Hero (1 screen):** one image, the oceanfront pool aerial at blue hour, inset in the gutter, not rotating. On the left, the brief's headline (option 1) at 44-56px, a subhead, then "Check availability" and a text link "See the work". A caption sits underneath.

**6 tiles (half a screen):** a single row of 6 on desktop (3×2 tablet, 2×3 phone), tiles max 200px wide, 4:5 ratio. Lead with pool, restaurant (its tile plays the muted clip), coastline resort, and palms. Each links to Photos, Video or Drone. Hover: scale 1.03 and a label slides up ("Video →"). Alternate tiles drop 24px.

**How it works + why me (half a screen):** 3 numbered steps in a row (call, shot list, shoot and delivery), then 2 lines about working in hotel marketing.

**Contact bar:** one line, "Check availability", and the email.

## 4. Photos page

- Title (40px) on the left and filter tabs on the right, with counts: All · Pools · Dining · Rooms · Lifestyle · Property. Hide empty filters. The brief's intro line goes under the title.
- **Grid:** 4 columns desktop, 3 tablet, 2 phone, 12px gap. Real aspect ratios (CSS columns). **Max tile width 360px** (about 22vw).
- Hover: scale 1.03 and the caption fades in. Filtering fades (200ms).
- **Viewer:** dark overlay, image max 86vh × 80vw, a 56px thumbnail strip, and a "04 / 17" counter. Keys, swipe, Esc.

## 5. Video page

- One wide 16:9 clip on top (max 960px), then 3 columns of 9:16 tiles, **max 300px wide**.
- The poster shows until hover, then a muted loop plays (`preload="none"`). It pauses on leave. A thin progress line runs along the bottom.
- Click opens full screen (muted, with an Unmute button).
- Phones: tap plays the clip; a second tap opens it full screen.

## 6. Drone page

**One stage image and a filmstrip**. Hotel and coastline aerials come first; mountains and lakes go at the end of the strip, never on the stage by default.

- Stage: 16:9, max 1200px × 62vh.
- Below it, a draggable strip of 160px thumbs. Hover previews, click sets. Clips are marked ▶.
- Beside the stage, a data line in 12px caps (place · altitude · time, real values only).

## 7. About and Contact

**About** (about 1.5 screens): a 4:5 portrait (max 380px) next to a 560px text column with a short story. Below that, two hairline-split columns: "What hotels get" (deliverables, turnaround, usage rights) and "How booking works" (4 steps). End with "Check availability".

**Contact:** on the left, one serif line, the email, the reply time, then the newsletter signup. On the right, the brief's form (7 fields, using chips for Need and Timing) with bottom-border inputs.

## 8. Scales and motion

**Type**
- Display: `clamp(32px, 4vw, 56px)` serif 300, line-height 1.05
- H2: `clamp(26px, 2.6vw, 40px)`
- Body: 16px Inter 300 / 1.6
- Meta: 12px, letter spacing 0.08em

**Spacing:** 4, 8, 12, 16, 24, 32, 48, 64, 96. Gutter `clamp(16px, 3vw, 40px)`. Max width 1320px.

**Images:** hero max 1320px × 78vh, thumbs max 360px, viewer max 86vh.

**Motion**
- Hover 200ms, pages 400ms, viewer 600ms. Easing `cubic-bezier(0.22,1,0.36,1)`.
- Keep still: text, nav, layout, and scroll (no parallax or pinning). Drop Lenis.
- **WebGL:** only a faint mouse ripple on the home hero image (desktop only, off with reduced motion). Remove it everywhere else.
- Reduced motion: crossfades only, no autoplay.

## 9. Hand-made details

- **Real captions** with space, place, and time. Add these fields, plus `subcategory` (pools/dining/rooms), to `photos.js`.
- **Contact-sheet counters** ("07 / 17") in tabular numbers.
- **Champagne only** for the nav dot, focus rings, and hover underlines. Never as a fill.
- **Slight asymmetry:** the first tile in the "All" view spans 2 columns, and the home tiles are offset.

## Changed to match the brief

- Home: one pool-aerial hero (was rotating), 6 tiles (was a category index), added how-it-works, moved the newsletter to Contact.
- Photos filters are now Pools/Dining/Rooms/Lifestyle/Property; Video gets a wide clip and tap-to-play; Drone puts hotels first.
- About adds deliverables and booking steps; the Contact form uses the brief's fields.
- "Check availability" is the main button everywhere, WebGL moved to the hero, and invented facts were removed.
