# Everflow Logistics LLC — Business & Website Brief

Source of truth for real business facts, positioning, and strategy. Referenced by CLAUDE.md before any copy, positioning, service, or major design decision.

Confirmed by the owner. Anything still marked `[TBD]` or `[PLACEHOLDER]` has not been confirmed and must not be invented — ask the owner instead.

## Confirmed Contact & Operating Details

- Phone: 929-236-7216 — public business contact number. Stored centrally in `js/site-config.js`; never hard-code it elsewhere.
- Email: Everflowlogistics947@gmail.com — public contact address and quote-form delivery address. Also stored in `js/site-config.js`.
- Physical address: none published. Owner-operated/mobile business — service-area description only, no street address.
- Service area: Philadelphia and surrounding suburbs, described generally (no specific county/town list at this time).
- Hours: no fixed hours published. Framed as flexible scheduling — "contact us to arrange a time that works for your business."
- Insurance/licensing/certifications: nothing confirmed to publish yet. Not mentioned anywhere on the site until the owner confirms specifics.
- Medical courier: offered as a real, scoped service — transport of appropriate medical office documents, general supplies, and equipment. Everflow does NOT hold specimen-transport certification, pharmaceutical licensing, or HIPAA-specific certification, and must never claim regulated specimen or controlled-substance transport capability. This scope note must accompany the service wherever it's listed (see `services.html#medical`).
- Legal/document delivery: business document courier only. Never imply formal, licensed process-server delivery of legal summons or subpoenas — that is a separate regulated service Everflow does not offer.
- Logo/branding: no real logo yet — site uses a placeholder mark/wordmark.
- Pricing: custom quotes only, no published rate structure.
- Hosting: not yet decided. Quote-form solution must work regardless of eventual host.

## Company

- Business name: Everflow Logistics LLC
- Business type: Small owner-operated delivery and logistics business
- Current stage: Early growth stage
- Primary operating area: Philadelphia, Pennsylvania and surrounding suburbs
- Current delivery vehicle: Honda CR-V (one vehicle — do not imply a fleet)
- Vehicle/capacity expansion: Planned as contracts and revenue justify it — not current capability

## Business Direction

Everflow is being developed to pursue direct delivery work rather than depending entirely on gig-delivery apps. The long-term goal is recurring business relationships and delivery contracts.

Priority opportunities, in order:

1. Direct business delivery contracts
2. Scheduled and recurring routes
3. Same-day delivery
4. Rush/urgent courier service
5. Business-to-business courier service
6. Medical courier services — appropriate items only (documents, general supplies, equipment); no specimen/pharma/HIPAA certification claims
7. Legal and document delivery
8. Auto-parts delivery
9. Last-mile and overflow delivery support (subcontracting/partnership opportunities)
10. Event and trade-show transportation/delivery
11. Retail/business delivery
12. Independent contractor courier opportunities (to help establish relationships and revenue while scaling)

## Ideal Customers

- Medical practices
- Laboratories
- Pharmacies
- Law offices
- Accounting and professional offices
- Auto dealerships
- Auto-parts stores
- Repair shops
- Local retailers
- Print shops
- Event companies
- Expo/trade-show companies
- Small manufacturers
- Wholesalers
- Warehouses and distributors
- Property management companies
- Offices
- Other businesses needing items moved locally

The site should especially appeal to organizations that need reliable **recurring** service — this is a bigger priority than one-off jobs.

## Value Proposition

Compete on:

- Reliability
- Responsiveness
- Personal service
- Direct communication
- Flexibility
- Careful handling
- Professional service
- Local knowledge
- Willingness to build customized delivery arrangements

**Being small should not be hidden.** Communicate the advantages of dealing directly with an owner-operator: no call centers, no dispatcher relay, direct accountability.

## Website Goal

The website is a **sales tool**, not a portfolio piece. A visitor should quickly understand:

1. What Everflow does
2. Where Everflow operates
3. Whether Everflow can solve their delivery problem
4. How to request a quote
5. How to contact Everflow
6. How to discuss a recurring delivery route

## Website Structure (target)

### Homepage
Lead with: "Everflow Logistics provides dependable local courier and delivery solutions for businesses throughout Philadelphia and surrounding areas." Strong, clear calls to action.

### Services (9, all listed as current offerings on `services.html`)
- Same-Day Delivery
- Rush / On-Demand Courier
- Scheduled & Recurring Routes
- Business-to-Business Delivery
- Medical Courier Services (scoped — see accuracy note above)
- Legal & Document Delivery (business courier only, not process-serving)
- Auto Parts Delivery
- Last-Mile & Overflow Delivery
- Event & Trade Show Logistics

### Business Solutions (`business-solutions.html`)
Consolidates what used to be separate Industries and Recurring Routes pages. Leads with a "Looking for a delivery partner?" section covering: recurring delivery contracts, business accounts, overflow delivery support, local delivery partnerships, and subcontracting opportunities. Also includes industries served (framed as capability/fit, not existing-client claims), recurring-route scheduling options, and the medical-courier accuracy note. This is the primary page for business-contract positioning.

Industries referenced: Medical & Healthcare, Law Firms & Legal, Auto Parts & Repair, Retail, Warehouses & Distributors, Event & Trade Show Businesses, Property Management, Small & Mid-Sized Businesses.

### Service Area (`service-area.html`)
States plainly that Everflow is a service-area business (no storefront/public office), serving Philadelphia and surrounding suburbs, with regional delivery available depending on the job.

### About Everflow
Tell the real story: a growing local logistics business built around dependable service and long-term relationships, currently operated directly by its owner. No fake corporate language, no invented history.

### Request a Delivery / Get a Business Quote (`contact.html`)
Lead-generation form. Fields:
- Name
- Company Name
- Phone
- Email
- Pickup Location
- Delivery Location
- Service Needed (dropdown: Same-Day Delivery, Rush Delivery, Scheduled Route, Recurring Business Delivery, Medical Courier, Legal / Document Delivery, Auto Parts Delivery, Last-Mile / Overflow Delivery, Event / Trade Show Delivery, Other)
- One-Time or Recurring Delivery
- Preferred Date
- Message / Delivery Details
- Checkbox: "I'm interested in a recurring route or business partnership."

Avoid collecting sensitive information (e.g. patient/PHI details) unless and until Everflow has confirmed the compliance requirements to handle it.

Contact info (phone/email) is shown directly on this page too. **Quote-form backend is not yet configured** — see Open Items below; the form honestly tells visitors this and offers a working mailto fallback rather than faking a success message.

## Design Direction

Feel: modern, clean, confident, trustworthy, business-oriented, easy to navigate, excellent on mobile.

Avoid looking like:
- A generic template
- A trucking company with tractor-trailers
- A multinational shipping corporation
- A gig-driver profile
- An overly flashy startup landing page

Imagery should be consistent with local courier/business delivery — never imagery implying Everflow owns vehicles, vans, or facilities it does not own.

**Vehicle:** the delivery vehicle is a black 2019 Honda CR-V EX-L. The site currently uses stylized SVG illustrations of this vehicle (not photos) at 5 locations — homepage hero, Services, Business Solutions, About, Service Area — built specifically so they can never be mistaken for real photos. No image-generation or stock-photo tool is available in this project, and even if one were, generating/sourcing a photo and presenting it as "the Everflow vehicle" would violate this project's own accuracy rules — so photos were never fabricated. When real photos of the actual CR-V exist, swap them in per `images/README.md`. Never depict a newer-generation CR-V or a different SUV, and never show/imply commercial equipment, refrigeration, cargo branding/decals, or certifications on the vehicle that haven't been confirmed. No owner photo is required or used — the vehicle is the primary visual representation of the business.

## Growth Strategy

Website should be able to grow with the business without a rebuild. Future possibilities (NOT current capabilities — never present as available today):

- Additional vehicles, including cargo vans/Sprinter-style vans
- Additional drivers
- Client accounts
- Online booking
- Delivery tracking
- Automated quotes
- Recurring-route management
- Customer portal
- Dispatch functionality

## Accuracy Rule (restated from CLAUDE.md)

Accuracy is more important than making the company appear larger. When information is unknown, ask the owner. Never fabricate business history, customer counts, testimonials, certifications, partnerships, addresses, phone numbers, email addresses, pricing, or capabilities.

## Open Items — Needed From Owner Before Publishing

- [x] Public phone number — 929-236-7216
- [x] Public email address — Everflowlogistics947@gmail.com
- [x] Business address / service-area boundary — no address published; service area described generally as Philadelphia + surrounding suburbs
- [x] Hours of availability — no fixed hours; flexible scheduling by request
- [x] Insurance and licensing details — none confirmed; not published
- [x] Medical courier qualifications status — not yet qualified; mentioned only as future interest
- [x] Pricing/quote model — custom quotes only, no published rate structure
- [ ] Any existing customer or contractor relationship willing to be referenced (no testimonials until real and permitted)
- [x] Preferred contact method for quote requests — single combined form on the Contact/Quote page, with phone and email also displayed directly
- [ ] Quote-form backend account (e.g. Formspree) — needs to be created under Everflowlogistics947@gmail.com; site is wired to accept the endpoint once created, see `js/site-config.js`
