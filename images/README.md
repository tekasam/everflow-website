# Real Photos — Drop-In Guide

This site currently uses styled placeholder boxes (dashed border, camera icon, "Photo coming soon") instead of real photos, so nothing fake or stock is shown. When real Everflow photos are ready, add them here and swap each placeholder for a real `<img>` tag inside its existing `.photo-frame` wrapper — the layout, sizing, and responsive behavior are already built to accept a photo with no other changes needed.

## Expected files

| File to add here | Used on | Suggested shape |
|---|---|---|
| `hero-vehicle.jpg` | Homepage hero | 4:3 (e.g. 1200×900) |
| `about-owner.jpg` | About page | 4:3 (e.g. 1200×900) |
| `services-handoff.jpg` | Services page (banner under the page hero) | wide, ~21:8 on desktop (e.g. 2000×760) — falls back to 4:3 on mobile automatically |
| `recurring-cargo.jpg` | Recurring Routes page | 4:3 (e.g. 1200×900) |
| `philadelphia-area.jpg` | Industries page hero | 1:1 (e.g. 1000×1000) |

Any reasonably sharp, well-lit photo close to these proportions will work — the frame crops to fit (`object-fit: cover`), so exact pixel dimensions don't need to be perfect.

## How to swap one in

Each placeholder looks like this in the HTML:

```html
<div class="photo-frame">
  <div class="photo-placeholder">
    <svg class="cam-ic" ...></svg>
    <strong>Photo coming soon</strong>
    <span>Everflow delivery vehicle</span>
  </div>
</div>
```

Replace the `.photo-placeholder` div with an `<img>`, keeping the `.photo-frame` wrapper:

```html
<div class="photo-frame">
  <img src="images/hero-vehicle.jpg" alt="Everflow Logistics delivery vehicle in Philadelphia">
</div>
```

That's it — no CSS or layout changes needed. Write a real, descriptive `alt` text each time (what's actually in the photo), since that also helps search engines and screen-reader users.
