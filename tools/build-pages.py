"""Builds the site's HTML pages from one shared header and footer.

Run after editing this file:  python3 -I tools/build-pages.py
Each page's main content lives in the PAGES list below.
"""
from pathlib import Path
import hashlib

SITE = Path(__file__).resolve().parent.parent / 'site'
EMAIL = 'justinclosemedia@gmail.com'
SITE_URL = 'https://justinclosemedia.com'

# Version stamp so browsers fetch fresh CSS/JS after every change
VER = hashlib.md5(b''.join((SITE / f).read_bytes() for f in
      ['css/styles.css', 'js/main.js', 'js/photos.js', 'js/config.js'])).hexdigest()[:8]

HEAD = """<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <meta name="description" content="{desc}">
  <meta property="og:title" content="{title}">
  <meta property="og:description" content="{desc}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="{site_url}/{file}">
  <meta property="og:image" content="{site_url}/images/portfolio/coastline-resort-aerial.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Inter:wght@300;400;500&family=Pinyon+Script&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css?v={ver}">
</head>
<body data-page="{page}">
  <a class="skip" href="#main">Skip to content</a>
  <header class="bar">
    <div class="wrap">
      <a class="logo" href="index.html">Justin Close Media</a>
      <button class="menu-btn" aria-expanded="false" aria-controls="nav">Menu</button>
      <nav class="nav" id="nav" aria-label="Main">
        <a href="photos.html" data-nav="photos">Photos</a>
        <a href="video.html" data-nav="video">Video</a>
        <a href="drone.html" data-nav="drone">Drone</a>
        <a href="about.html" data-nav="about">About</a>
        <a href="contact.html" data-nav="contact">Contact</a>
      </nav>
    </div>
  </header>
  <main id="main">
"""

CTA = """  <section class="dark">
    <div class="wrap cta">
      <div>
        <p class="meta">Book a shoot</p>
        <h2 class="h2">Let’s plan your shoot.</h2>
        <p class="lead">Tell me a little about your property and I’ll reply with ideas, timing and pricing. Or email me at <a class="link" href="mailto:{email}">{email}</a>.</p>
        <p class="signature" aria-hidden="true">Justin</p>
      </div>
      <form class="quick" data-inquiry novalidate>
        <div class="field"><label for="q-name">Name</label><input id="q-name" name="name" autocomplete="name" required></div>
        <div class="field"><label for="q-email">Email</label><input id="q-email" name="email" type="email" autocomplete="email" required></div>
        <div class="field"><label for="q-property">Hotel or property</label><input id="q-property" name="property" autocomplete="organization"></div>
        <div class="field"><label for="q-message">What do you need?</label><input id="q-message" name="message" placeholder="Photos, video, drone…"></div>
        <button class="btn" type="submit">Send inquiry</button>
        <p class="status" role="status"></p>
      </form>
    </div>
"""

FOOT = """    <footer class="footer">
      <div class="wrap">
        <span>© <span data-year></span> Justin Close Media · Hotel photography, video and drone</span>
        <a href="mailto:{email}">{email}</a>
      </div>
    </footer>
  </section>
  {extra}
  <script src="js/config.js?v={ver}"></script>
  <script src="js/photos.js?v={ver}"></script>
  {scripts}<script src="js/main.js?v={ver}"></script>
</body>
</html>
"""

VIEWER = """<div class="viewer" id="viewer" role="dialog" aria-modal="true" aria-label="Viewer">
    <div class="viewer__top"><span class="num" id="v-count"></span><button id="v-close">Close ✕</button></div>
    <div class="viewer__stage" id="v-stage"></div>
    <div class="viewer__bottom">
      <span id="v-title"></span>
      <div class="thumbs" id="v-thumbs"></div>
      <span><button id="v-prev">← Prev</button>&nbsp;&nbsp;&nbsp;<button id="v-next">Next →</button></span>
    </div>
  </div>"""

PAGES = [
  dict(file='index.html', page='home',
       title='Justin Close Media | Hotel Photography, Video and Drone',
       desc='Hotel assets your marketing team will actually use. Interiors, lifestyle and drone, shot by someone who works in hotel marketing.',
       body="""    <section class="hero" id="hero">
      <div class="hero__media">
        <img src="images/portfolio/coastline-resort-aerial.jpg" srcset="images/portfolio/coastline-resort-aerial-sm.jpg 1000w, images/portfolio/coastline-resort-aerial.jpg 2000w" sizes="100vw" alt="Aerial view of a red-roofed beachfront resort along the coast at sunset" fetchpriority="high">
      </div>
      <div class="hero__content">
        <p class="meta">Hotel photography · Video · Drone</p>
        <h1 class="display">Hotel assets your marketing team will actually use.</h1>
        <a class="btn btn--light" href="photos.html">View the work</a>
      </div>
      <a class="hero__down" href="#work" aria-label="Scroll to the work">↓</a>
    </section>

    <section class="wrap section" id="work">
      <div class="page-head" style="padding-top:0">
        <h2 class="h2">Recent work</h2>
        <a class="btn" href="photos.html">All photos</a>
      </div>
      <div class="tiles" id="home-tiles"></div>
    </section>

    <section class="wrap section note" style="padding-top:0">
      <div class="note__photo"><img src="images/about/justin-portrait.jpg" alt="Justin Close" loading="lazy"></div>
      <div class="note__text">
        <p class="meta">Hi, I’m Justin</p>
        <p class="note__quote">I’ve worked in hotel marketing and travel, so I know what makes someone book: the view from the balcony, the first drink by the pool, the light at golden hour. That’s what I capture.</p>
        <p class="signature" aria-hidden="true">Justin Close</p>
        <a class="btn" href="about.html">More about me</a>
      </div>
    </section>

    <section class="wrap section" style="padding-top:0">
      <div class="how">
        <div>
          <p class="meta">How it works</p>
          <h2 class="h2" style="margin:10px 0 14px">Simple, start to finish.</h2>
          <p style="color:var(--muted)">I’ve worked in hotel marketing and travel, so I know the shots your team actually needs: images for your website, Instagram, booking sites and ads.</p>
        </div>
        <ol class="steps">
          <li><span class="meta num">01</span><b>Tell me about your property</b><p>Tell me what you’d like photos of, and where you’ll use them: website, Instagram, ads.</p></li>
          <li><span class="meta num">02</span><b>Send a shot list or the vibe</b><p>If you have one, send a shot list or a few examples of the look you want. No list? We’ll plan it together.</p></li>
          <li><span class="meta num">03</span><b>Shoot day</b><p>Photos, video and drone in one visit, including the area around the property, with little disruption to guests.</p></li>
          <li><span class="meta num">04</span><b>Delivery</b><p>Edited files sized for your website, social media and booking sites.</p></li>
        </ol>
      </div>
    </section>
"""),
  dict(file='photos.html', page='photos',
       title='Photos | Justin Close Media',
       desc='Hotel photography: pools, dining, rooms, lifestyle and property. Shot for your website, booking sites and Instagram.',
       extra=VIEWER,
       body="""    <section class="wrap">
      <div class="page-head">
        <div>
          <h1 class="display">Photos</h1>
          <p class="lead">Pools, dining, rooms and the people who use them. Shot for your website, booking sites and Instagram.</p>
        </div>
        <div class="filters" id="filters" role="group" aria-label="Filter photos"></div>
      </div>
      <div class="grid" id="grid"></div>
    </section>
"""),
  dict(file='video.html', page='video',
       title='Video | Justin Close Media',
       desc='Short hotel video clips made for Reels, Stories and your website. Vertical and wide, ready to post.',
       extra=VIEWER,
       body="""    <section class="wrap">
      <div class="page-head">
        <div>
          <h1 class="display">Video</h1>
          <p class="lead">Short clips made for Reels, Stories and your website. Vertical and wide, ready to post. Hover or tap to play.</p>
        </div>
        <nav class="filters" id="page-tabs" aria-label="Browse the work"></nav>
      </div>
      <div id="videos"></div>
    </section>
"""),
  dict(file='drone.html', page='drone',
       title='Drone | Justin Close Media',
       desc='Hotel drone photography and video of your property and the area around it: the beach, the views and the neighborhood your guests come for.',
       extra=VIEWER,
       body="""    <section class="wrap">
      <div class="page-head">
        <div>
          <h1 class="display">Drone</h1>
          <p class="lead">Your property from above, and everything around it. Guests don’t just book a room; they come for the beach, the views and the neighborhood too. Aerial photos and video show it all. Click any shot to see it full size.</p>
        </div>
        <nav class="filters" id="page-tabs" aria-label="Browse the work"></nav>
      </div>
      <div class="grid grid--drone" id="drone-grid"></div>
    </section>
"""),
  dict(file='about.html', page='about',
       title='About | Justin Close Media',
       desc='Justin Close has worked in hotel marketing and travel and creates photo, video and drone content for hotels and resorts.',
       body="""    <section class="wrap about">
      <div class="about__photo"><img src="images/about/justin-portrait.jpg" alt="Justin Close standing on a mountain trail"></div>
      <div class="about__text">
        <h1 class="display">I’ve worked in hotel marketing and travel.</h1>
        <p class="lead">I know what makes someone book a stay, and I shoot for it.</p>
        <p>Hotels need fresh, high-quality images for their website, Instagram, booking sites and ads. I create them with a marketer’s eye, planning every shot around how your team will actually use it.</p>
        <p>I shoot interiors, lifestyle, property, drone and video, with a process that's easy for your team.</p>

        <h2 class="h2">What hotels get</h2>
        <ul class="list">
          <li><b>·</b>Edited photos of rooms, amenities, dining and the property</li>
          <li><b>·</b>Short vertical video for Reels and Stories</li>
          <li><b>·</b>Drone photos and video of the property and the area around it, because guests come for that too</li>
          <li><b>·</b>Files sized for your website, social media and booking sites</li>
        </ul>

        <h2 class="h2">How booking works</h2>
        <ul class="list">
          <li><b class="num">01</b>Tell me about your property and what you’d like photos of</li>
          <li><b class="num">02</b>Send a shot list or the vibe you want, if you have one</li>
          <li><b class="num">03</b>Shoot day</li>
          <li><b class="num">04</b>Your edited photos and video are delivered</li>
        </ul>
        <p style="margin-top:32px"><a class="btn" href="contact.html">Get in touch</a></p>
      </div>
    </section>

    <section class="wrap gear">
      <div class="gear__photo"><img src="images/about/camera-gear.jpg" alt="Justin's camera gear: Sony mirrorless camera and zoom lens, DJI Mini 4 Pro drone with controller and batteries, GoPro, 360 camera and lens filters" loading="lazy"></div>
      <div class="gear__text">
        <h2 class="h2">What I shoot with</h2>
        <p style="color:var(--muted)">Professional gear that covers every part of a property, from the rooms to the view from above.</p>
        <ul class="list">
          <li><b>·</b>Sony full-frame mirrorless camera with a 20–70mm G lens, for interiors and lifestyle</li>
          <li><b>·</b>DJI Mini 4 Pro drone, for aerial photos and video</li>
          <li><b>·</b>GoPro and 360° camera, for immersive walkthroughs and social clips</li>
          <li><b>·</b>Lens filters, for clean, natural light around windows and water</li>
        </ul>
      </div>
    </section>
"""),
  dict(file='contact.html', page='contact', cta=False,
       title='Contact | Justin Close Media',
       desc='Book a hotel photo, video or drone shoot with Justin Close Media.',
       body="""    <section class="wrap contact">
      <div>
        <h1 class="display">Let’s talk about your property</h1>
        <p class="lead">Tell me about your property and what you need. I'll reply with ideas, timing and pricing.</p>
        <a class="contact__email" href="mailto:{email}">{email}</a>

        <div style="margin-top:56px">
          <p class="meta">Email updates</p>
          <p class="muted" style="color:var(--muted);margin:6px 0 0">New work and hotel marketing ideas, now and then. No spam.</p>
          <form id="newsletter-form" novalidate>
            <label class="sr-only" for="n-email">Email address</label>
            <div class="news">
              <input id="n-email" name="email_address" type="email" placeholder="Your email" autocomplete="email" required>
              <button type="submit">Subscribe →</button>
            </div>
            <p class="status" role="status"></p>
          </form>
        </div>
      </div>

      <form class="form" id="contact-form" data-inquiry novalidate>
        <div class="field"><label for="f-name">Name</label><input id="f-name" name="name" autocomplete="name" required></div>
        <div class="field"><label for="f-email">Email</label><input id="f-email" name="email" type="email" autocomplete="email" required></div>
        <div class="field"><label for="f-property">Hotel or property</label><input id="f-property" name="property" autocomplete="organization"></div>
        <div class="field"><label for="f-city">City</label><input id="f-city" name="city" autocomplete="address-level2"></div>
        <fieldset class="field field--full">
          <legend>What do you need?</legend>
          <div class="chips">
            <label class="chip"><input type="checkbox" name="need" value="Photos"><span>Photos</span></label>
            <label class="chip"><input type="checkbox" name="need" value="Video"><span>Video</span></label>
            <label class="chip"><input type="checkbox" name="need" value="Drone"><span>Drone</span></label>
            <label class="chip"><input type="checkbox" name="need" value="Not sure"><span>Not sure</span></label>
          </div>
        </fieldset>
        <fieldset class="field field--full">
          <legend>Timing</legend>
          <div class="chips">
            <label class="chip"><input type="radio" name="timing" value="This month"><span>This month</span></label>
            <label class="chip"><input type="radio" name="timing" value="1-3 months"><span>1–3 months</span></label>
            <label class="chip"><input type="radio" name="timing" value="Just looking"><span>Just looking</span></label>
          </div>
        </fieldset>
        <div class="field field--full"><label for="f-message">Message (optional)</label><textarea id="f-message" name="message" rows="3"></textarea></div>
        <div class="field--full"><button class="btn" type="submit">Send inquiry</button></div>
        <p class="status" role="status"></p>
      </form>
    </section>
"""),
]

for p in PAGES:
    html = HEAD.format(site_url=SITE_URL, ver=VER, **p)
    html += p['body'].replace('{email}', EMAIL)
    html += '  </main>\n'
    if p.get('cta', True):
        html += CTA.format(email=EMAIL)
    else:
        html += '  <section class="dark">\n'
    html += FOOT.format(email=EMAIL, ver=VER, extra=p.get('extra', ''), scripts=p.get('scripts', ''))
    (SITE / p['file']).write_text(html)
    print('wrote', p['file'])

# Old link /work.html now points to the photo gallery
(SITE / 'work.html').write_text('<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=photos.html"><link rel="canonical" href="photos.html"><title>Photos</title><a href="photos.html">Photos</a>\n')
print('wrote work.html (redirect)')
