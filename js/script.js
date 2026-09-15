// Everflow Logistics — site behavior

// Progressive enhancement: content stays visible if JavaScript is unavailable.
document.documentElement.classList.add('js');

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
    mobileNav.id = mobileNav.id || 'mobile-navigation';
    mobileNav.setAttribute('role', 'dialog');
    mobileNav.setAttribute('aria-modal', 'true');
    mobileNav.setAttribute('aria-label', 'Mobile navigation');
    mobileNav.setAttribute('aria-hidden', 'true');
    mobileNav.setAttribute('inert', '');
    navToggle.setAttribute('aria-controls', mobileNav.id);
    navToggle.setAttribute('aria-expanded', 'false');

    const focusableSelector = 'a[href], button:not([disabled])';
    const openMobileNav = () => {
      mobileNav.removeAttribute('inert');
      mobileNav.classList.add('open');
      mobileNav.setAttribute('aria-hidden', 'false');
      navToggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('nav-open');
      mobileNavClose?.focus();
    };
    const closeMobileNav = (restoreFocus = true) => {
      mobileNav.classList.remove('open');
      mobileNav.setAttribute('aria-hidden', 'true');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
      mobileNav.setAttribute('inert', '');
      if (restoreFocus) navToggle.focus();
    };

    navToggle.addEventListener('click', openMobileNav);
    mobileNavClose?.addEventListener('click', () => closeMobileNav());
    mobileNav.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => closeMobileNav(false))
    );
    mobileNav.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMobileNav();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = Array.from(mobileNav.querySelectorAll(focusableSelector));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
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
            successBox?.setAttribute('tabindex', '-1');
            successBox?.focus();
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
            errorBox.setAttribute('role', 'alert');
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
    if (href === path) {
      a.classList.add('active');
      a.setAttribute('aria-current', 'page');
    }
  });

  /* Footer year */
  const yearEl = document.querySelector('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
