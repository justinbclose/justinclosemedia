# UX enhancement spec: "Slow Tide" (Nov 16, 2026)

## Direction

**Slow Tide.** The site's approved design language (cream / ink / brass, Cormorant + Inter,
square corners, editorial links) does not change. This pass adds the cinematic layer the best
luxury hospitality sites share: slow moving water on arrival, images that fade in softly instead
of popping, and a bigger, calmer phone experience. Researched against Aman/Nucleus's "architecture
of digital luxury" (24fps cinematic video, motion controlled and single-direction, sound off),
Mediaboom's luxury hotel site teardowns, and Fstoppers' portfolio-UX mistakes (small mobile
imagery, janky loading). Every change is quiet; nothing competes with the photographs.

## Changes (all within existing tokens; no new colors, fonts or layouts)

1. **Hero video — the signature moment.** `HERO.video = 'hero-dolphins'`: the existing dolphins
   aerial, re-encoded to 322KB (CRF 30, muted, faststart) so it costs less than the hero photo.
   The photo stays as poster and as the reduced-motion/slow-connection fallback — the mechanism
   already built in main.js. Slow turquoise water + a dolphin pod reads as pure San Diego and
   moves at luxury pace. Reversible by clearing HERO.video.

2. **Soft image arrival.** Lazy-loaded images fade from 0 → 1 over 600ms (opacity only, the
   site's own ease) once loaded. Delegated `load` listener in capture phase + a `pageshow`
   sweep so back/forward-cache restores never leave images invisible. No transform, no blur-up,
   nothing "AI-looking".

3. **Bigger phone tiles.** Home "Recent work" tiles go 2-across under 620px (they were 3-across
   down to 375px ≈ 110px tiles). Matches the photos grid breakpoint and Justin's phone-first,
   big-imagery preference.

4. **Instant viewer stepping.** When the lightbox opens or steps, preload the neighboring
   photos, so swiping on a phone never shows a loading pop. Invisible performance luxury.

## Don'ts (reconfirmed from CLAUDE.md)

No scroll-jacking, loaders, word reveals, parallax, glow, or new effects. No layout changes.
Motion only via opacity/transform, all off under `prefers-reduced-motion` (already global).

## Review checklist

Hero video plays muted/looped on desktop + phone width, poster shows first; images fade in on
photos page including after filter changes; tiles 2-across at 375px with labels legible; viewer
swipe shows next image instantly; no console errors; reduced-motion shows static hero photo.
