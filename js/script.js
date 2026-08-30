// Everflow Logistics — site behavior

document.addEventListener('DOMContentLoaded', () => {
  const config = window.EVERFLOW_CONFIG || {};

  /* Inject central contact config wherever it's referenced in markup */
  document.querySelectorAll('[data-config="phone"]').forEach(el => {
    el.textContent = config.phoneDisplay || '';
  });
  document.querySelectorAll('[data-config="phone-href"]').forEach(el => {
    el.setAttribute('href', config.phoneHref || '#');
  });
  document.querySelectorAll('[data-config="email"]').forEach(el => {
    el.textContent = config.email || '';
  });
  document.querySelectorAll('[data-config="email-href"]').forEach(el => {
    el.setAttribute('href', config.email ? `mailto:${config.email}` : '#');
  });

  /* Structured data (LocalBusiness) — built from confirmed facts only,
     single-sourced from site-config.js so it never drifts from the visible
     phone/email shown on the page. */
  if (config.businessName) {
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: config.businessName,
      description: config.shortDescription,
      areaServed: {
        '@type': 'Place',
        name: config.areaServed,
      },
      url: window.location.href,
    };
    if (config.phoneE164) ld.telephone = config.phoneE164;
    if (config.email) ld.email = config.email;
    const ldScript = document.createElement('script');
    ldScript.type = 'application/ld+json';
    ldScript.textContent = JSON.stringify(ld);
    document.head.appendChild(ldScript);
  }

  /* Sticky header */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (window.scrollY > 30) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');

    const backTop = document.querySelector('.back-to-top');
    if (backTop) {
      if (window.scrollY > 500) backTop.classList.add('show');
      else backTop.classList.remove('show');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile nav */
  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavClose = document.querySelector('.mobile-nav-close');
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => mobileNav.classList.add('open'));
    mobileNavClose?.addEventListener('click', () => mobileNav.classList.remove('open'));
    mobileNav.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => mobileNav.classList.remove('open'))
    );
  }

  /* Back to top */
  document.querySelector('.back-to-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* Scroll reveal */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('in-view'), (i % 3) * 90);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* FAQ accordion — real buttons with aria-expanded for keyboard/screen-reader use */
  const setFaqState = (item, isOpen) => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    item.classList.toggle('open', isOpen);
    q?.setAttribute('aria-expanded', String(isOpen));
    if (a) {
      if (isOpen) a.removeAttribute('aria-hidden');
      else a.setAttribute('aria-hidden', 'true');
    }
  };
  document.querySelectorAll('.faq-item').forEach(item => {
    setFaqState(item, item.classList.contains('open'));
    const q = item.querySelector('.faq-q');
    q?.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(o => setFaqState(o, false));
      if (!wasOpen) setFaqState(item, true);
    });
  });

  /* Pre-fill quote form from a CTA's intent (Business Solutions page links here with ?type=recurring) */
  const params = new URLSearchParams(window.location.search);
  if (params.get('type') === 'recurring') {
    const frequencyField = document.querySelector('#delivery-frequency');
    const serviceField = document.querySelector('#service-type');
    const partnershipField = document.querySelector('#partnership');
    if (frequencyField) frequencyField.value = 'Recurring delivery';
    if (serviceField) serviceField.value = 'Recurring Business Delivery';
    if (partnershipField) partnershipField.checked = true;
  }

  /* Contact / quote form — honest submission handling, no fake success */
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    const successBox = document.querySelector('.form-success');
    const fallbackBox = document.querySelector('.form-fallback');
    const errorBox = document.querySelector('.form-error');
    const endpoint = config.formEndpoint;
    const isConfigured = endpoint && !endpoint.includes('REPLACE_WITH_REAL_FORM_ENDPOINT');

    const hideAllNotices = () => {
      successBox?.classList.remove('show');
      fallbackBox?.classList.remove('show');
      errorBox?.classList.remove('show');
    };

    const buildMailtoFallback = () => {
      const data = new FormData(contactForm);
      const lines = [];
      for (const [key, value] of data.entries()) {
        if (value) lines.push(`${key}: ${value}`);
      }
      const subject = encodeURIComponent('Delivery Quote Request — Everflow Logistics website');
      const body = encodeURIComponent(lines.join('\n'));
      return `mailto:${config.email}?subject=${subject}&body=${body}`;
    };

    if (isConfigured) {
      contactForm.setAttribute('action', endpoint);
      contactForm.setAttribute('method', 'POST');
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const submitBtnDefaultHTML = submitBtn ? submitBtn.innerHTML : '';
      let isSubmitting = false;

      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (isSubmitting) return; // guard against duplicate/rapid submits
        isSubmitting = true;
        hideAllNotices();
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.setAttribute('aria-busy', 'true');
          submitBtn.textContent = 'Sending…';
        }
        try {
          const response = await fetch(endpoint, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { Accept: 'application/json' },
          });
          if (response.ok) {
            successBox?.classList.add('show');
            contactForm.reset();
            successBox?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            throw new Error('Form service returned an error');
          }
        } catch (err) {
          // Logged so the real cause is visible in DevTools instead of only
          // showing the generic fallback message on the page.
          console.error('Everflow contact form: submission to Formspree failed.', err);
          if (window.location.protocol === 'file:') {
            console.warn(
              'Everflow contact form: this page was opened as a local file (file://). ' +
              'Browsers block cross-origin fetch() requests from file:// pages, so the ' +
              'Formspree submission cannot succeed here. Serve the site over http:// ' +
              '(e.g. "python -m http.server" from the project folder, then open ' +
              'http://localhost:8000/contact.html) and test again from there.'
            );
          }
          if (errorBox) {
            const mailtoLink = errorBox.querySelector('a[data-mailto-fallback]');
            if (mailtoLink) mailtoLink.href = buildMailtoFallback();
            errorBox.classList.add('show');
            errorBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        } finally {
          isSubmitting = false;
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.removeAttribute('aria-busy');
            submitBtn.innerHTML = submitBtnDefaultHTML;
          }
        }
      });
    } else {
      // No form-delivery service configured yet — hand off to email directly
      // so the request still genuinely reaches Everflow today, with no
      // external account required. This is a real, working submission path
      // (opens the visitor's email app, addressed and pre-filled), not a
      // fake success message.
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        hideAllNotices();
        const mailtoLink = buildMailtoFallback();
        if (fallbackBox) {
          const link = fallbackBox.querySelector('a[data-mailto-fallback]');
          if (link) link.href = mailtoLink;
          fallbackBox.classList.add('show');
          fallbackBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        window.location.href = mailtoLink;
      });
    }
  }

  /* Set active nav link based on current page */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a, .mobile-nav a').forEach(a => {
    const href = a.getAttribute('href').split('#')[0] || 'index.html';
    if (href === path) a.classList.add('active');
  });

  /* Footer year */
  const yearEl = document.querySelector('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
