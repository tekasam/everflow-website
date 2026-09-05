// Everflow Logistics — central contact configuration.
// Change the business phone/email/form endpoint in ONE place here; every
// page pulls from this file at load time instead of hard-coding values.

window.EVERFLOW_CONFIG = {
  businessName: "Everflow Logistics LLC",
  shortDescription: "Local courier and delivery service for businesses in Philadelphia, PA and the surrounding suburbs — same-day, rush, scheduled and recurring business delivery.",
  areaServed: "Philadelphia, PA and surrounding suburbs",
  phoneDisplay: "929-236-7216",
  phoneE164: "+19292367216",
  phoneHref: "tel:+19292367216",
  email: "Everflowlogistics947@gmail.com",

  // Quote-form submission endpoint (Formspree). The form POSTs directly here;
  // if this ever fails or is unset, the site falls back to a mailto link so
  // no request is ever silently lost.
  formEndpoint: "https://formspree.io/f/xkjngdde",
};

// Quote-form requirements.
// Pickup address, delivery address, delivery frequency, and preferred date
// are essential to quoting and scheduling a delivery, so they are required.
(function configureQuoteFormRequirements() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const pickup = document.getElementById("pickup");
  const dropoff = document.getElementById("dropoff");
  const frequency = document.getElementById("delivery-frequency");
  const preferredDate = document.getElementById("pickup-time");

  const makeRequired = (field) => {
    if (!field) return;
    field.required = true;
    field.setAttribute("aria-required", "true");
  };

  makeRequired(pickup);
  makeRequired(dropoff);
  makeRequired(frequency);
  makeRequired(preferredDate);

  if (pickup) {
    pickup.placeholder = "Exact pickup address";
    pickup.setAttribute("autocomplete", "street-address");
  }

  if (dropoff) {
    dropoff.placeholder = "Exact delivery address";
    dropoff.setAttribute("autocomplete", "street-address");
  }

  if (preferredDate) {
    preferredDate.placeholder = "e.g. Today ASAP, Sep 8, or another preferred date";
  }

  if (frequency) {
    const unsureOption = Array.from(frequency.options).find(
      (option) => option.textContent.trim().toLowerCase() === "not sure yet"
    );
    if (unsureOption) unsureOption.remove();
  }

  const updateLabel = (fieldId, labelText) => {
    const label = document.querySelector(`label[for="${fieldId}"]`);
    if (!label) return;
    label.textContent = labelText;
  };

  updateLabel("pickup", "Exact Pickup Address");
  updateLabel("dropoff", "Exact Delivery Address");
  updateLabel("delivery-frequency", "One-Time or Recurring Delivery");
  updateLabel("pickup-time", "Preferred Date");
})();
