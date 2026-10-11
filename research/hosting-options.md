# Hosting and platform options

Researched October 2026. Prices come from third-party 2026 pricing guides, and they sometimes
disagree. Check each official pricing page before buying.

## The short version

**Recommendation: a custom-coded site (Astro + GSAP), hosted free on Cloudflare Pages.**

- It gives you the most unique, animated site. There are no template limits.
- It costs about **$0/month**, plus your domain.
- Claude builds it and adds new photos for you. You drop photos in a folder and ask.

**Runner-up: Framer (~$10/month).** Pick this if you want to log in and edit the site yourself
in a visual editor.

## Why not just HTML on WordPress?

You're right that every website ends up as HTML in the browser. The difference is **who controls
that HTML.**

- **WordPress:** the theme and page builder (Elementor, etc.) generate the HTML. Custom scroll
  animations mean fighting the builder or writing code inside it. Sites built this way tend to be
  heavier and slower, which matters for a photo-heavy site.
- **Custom code:** every line is written for your site, so animations and image loading can be
  tuned exactly. It's also plain files in this folder, which is the setup Claude works with best.

WordPress can work. It's just the harder path to the look you described.

## Option comparison

| Option | Cost (annual billing) | Scroll animations | Adding photos later | Notes |
|---|---|---|---|---|
| **Custom code (Astro) on Cloudflare Pages** | **$0/mo** hosting | Best: full control with GSAP | Drop photos in a folder, Claude updates | Free tier allows commercial use, unlimited bandwidth |
| **Framer** | Basic ~$10/mo, Pro ~$30/mo | Very good, built into the editor | Visual editor, simple CMS | Often recommended for portfolios. Basic CMS is limited (~1,000 items). |
| **Webflow** | Basic ~$15/mo (no CMS), Premium ~$25/mo | Very good: GSAP-powered interactions | Visual editor with strong CMS | Steeper learning curve |
| **WordPress.com Business** | ~$25/mo | Possible, but needs plugins or custom code | Familiar dashboard | Custom code and themes need Business plan or higher |
| **Managed WordPress (WP Engine, Kinsta)** | ~$30–35/mo | Same as above | Familiar dashboard | More control than WordPress.com, but you maintain it |
| **Squarespace Core** | ~$29/mo | Limited: mostly template effects | Very easy | Hardest to make stand out from other sites |

## Trade-offs of the recommendation

**Pros**
- The most distinctive design and smoothest motion
- Fast loading, which helps with Google and with impressing hotel marketing teams
- Lowest cost by far, leaving your budget for gear or ads
- You own every file, so there's no platform lock-in

**Cons**
- There's no login dashboard. Updates go through Claude, or through a free editing tool
  (such as Decap CMS) that can be added later if you want one.
- If you ever hire a web designer, they'll need to know code. With a site builder, they wouldn't.

## Full cost breakdown (recommended setup)

| Item | Service | Cost |
|---|---|---|
| Hosting | Cloudflare Pages (free tier, commercial use allowed) | $0 |
| Domain | You already own one | Your current renewal (a .com is ~$10/yr at Cloudflare) |
| Contact / inquiry form | Web3Forms free plan (250 submissions/mo) | $0 |
| Email newsletter | Kit free plan (up to 10,000 subscribers) | $0 |
| Animation library | GSAP (now free, including scroll plugins) | $0 |
| **Total** | | **~$0/mo + domain** |

**Email list note:** Kit's free plan allows up to 10,000 subscribers but only 1 automation.
MailerLite's free plan has more features but caps at 250 subscribers (cut in June 2026). Kit is
the better fit to start.

**Room in your budget ($15–40/mo):** if you later want a dashboard, Framer Basic (~$10/mo) still
fits. Or upgrade the email tool once your list grows.

## Sources

- [Webflow pricing 2026 (Creative Corner)](https://www.creativecorner.studio/blog/webflow-pricing-overview)
- [Webflow pricing 2026 (Waida Studio)](https://waidastudio.com/learn/webflow-pricing)
- [Framer pricing 2026 (nocode.mba)](https://www.nocode.mba/articles/framer-pricing)
- [Framer pricing 2026 (Flowout)](https://www.flowout.com/blog/framer-pricing)
- [Squarespace pricing 2026 (Style Factory)](https://www.stylefactoryproductions.com/squarespace-pricing)
- [WordPress.com plans, October 2026 (eSEOspace)](https://eseospace.com/blog/wordpress-com-plans/)
- [WordPress vs custom website cost (Insemantic)](https://insemantic.com/blog/wordpress-vs-custom-website/)
- [Best managed WordPress hosting 2026](https://easymcpai.com/blog/best-wordpress-hosting)
- [Netlify vs Vercel vs Cloudflare Pages 2026 (Toolchase)](https://toolchase.com/blog/netlify-vs-vercel-vs-cloudflare/)
- [Free tier showdown (DevCraft)](https://devcraftblog.com/tools/vercel-vs-netlify-vs-cloudflare-pages/)
- [Webflow vs Framer 2026 (Flowout)](https://www.flowout.com/blog/webflow-vs-framer)
- [Webflow vs Framer for portfolios (UX Guides)](https://www.uxguides.com/compare/webflow-vs-framer-for-portfolios)
- [MailerLite pricing 2026 (Mailmodo)](https://www.mailmodo.com/guides/mailerlite-pricing/)
- [Kit vs MailerLite 2026](https://marcandrews.com/kit-vs-mailerlite-2026-best-email-tool-for-creators/)
- [Formspree vs Web3Forms](https://splitforms.com/blog/formspree-vs-web3forms)
- [Moving a domain from Squarespace to Cloudflare (at-cost .com pricing)](https://wellstsai.com/en/post/transfer-domain-to-cloudflare/)
