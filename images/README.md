# Vehicle Imagery — Current State

The site currently uses no photographs or illustrations anywhere. Every section that once held vehicle/delivery imagery has been redesigned as a text/UI-only panel (dark navy `panel-card` with orange accents and stat highlights), per the owner's decision to keep the site fully photo-free for now.

There is one image file in this folder, currently unused by any page:

**`cr-v-delivery-vehicle.webp`** (1024×768, WebP, ~78KB) — a real photo of the black 2019 Honda CR-V EX-L used for Everflow deliveries.

## Adding a real photo later

If the owner decides to reintroduce photography, the simplest approach is a standard `<img>` dropped into a relevant section (e.g. next to a `panel-card`), sized responsively:

```html
<img src="images/cr-v-delivery-vehicle.webp"
     alt="Black Honda CR-V representing Everflow Logistics delivery service in Philadelphia"
     width="1024" height="768" loading="lazy"
     style="width:100%;height:auto;border-radius:var(--radius-lg);">
```

- Use `loading="lazy"` on everything except a page's own hero image (load that one eagerly, with `fetchpriority="high"`).
- Prefer `.webp` for file size.
- Write a real, specific `alt` for each photo — don't reuse the same alt text everywhere.
- Match the `width`/`height` attributes to the actual file dimensions (prevents layout shift on load).
