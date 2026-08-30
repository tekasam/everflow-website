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
