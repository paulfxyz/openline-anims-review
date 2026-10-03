/* Local, reversible interactions in redesign previews. No purchases,
   account actions or emails are sent by this review layer. */
const root = document.querySelector('.rx-main');
if (root) {
  const toast = document.createElement('div');
  toast.className = 'rx-toast'; toast.hidden = true; toast.setAttribute('role', 'status');
  document.body.append(toast);
  let timer;
  const notify = (message) => {
    toast.textContent = message; toast.hidden = false;
    clearTimeout(timer); timer = setTimeout(() => { toast.hidden = true; }, 5000);
  };
  const catalogue = root.querySelector('.rx-mode-catalog .rx-grid');
  const destinations = catalogue ? [...catalogue.children].filter(c => c.querySelector('h3')) : [];
  const destinationInput = root.dataset.rx === 'home' ? root.querySelector('.rx-hero input') : null;
  let catalogueStatus;
  if (destinations.length) {
    catalogueStatus = document.createElement('p');
    catalogueStatus.className = 'rx-preview-note';
    catalogueStatus.setAttribute('role', 'status');
    catalogue.before(catalogueStatus);
    catalogueStatus.textContent = 'Six featured destinations shown in this design preview.';
  }
  const searchDestinations = (value) => {
    const q = value.trim().toLowerCase().replace(/^usa$/, 'united states');
    destinations.forEach(c => { c.hidden = !c.querySelector('h3').textContent.toLowerCase().includes(q); c.style.display = c.hidden ? 'none' : ''; });
    const count = destinations.filter(c => !c.hidden).length;
    if (catalogueStatus) catalogueStatus.textContent = `${count} featured destination${count === 1 ? '' : 's'}${q ? ' matching your search' : ' in this preview'}.`;
    catalogue?.closest('.rx-chapter').scrollIntoView({ behavior: 'smooth' });
  };
  destinationInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); searchDestinations(destinationInput.value); }
  });
  root.addEventListener('click', (event) => {
    const slide = event.target.closest('[data-rx-slide]');
    if (slide) {
      const gallery = slide.closest('.rx-gallery');
      gallery.querySelectorAll('[data-rx-frame]').forEach(img => img.classList.toggle('is-active', img.dataset.rxFrame === slide.dataset.rxSlide));
      gallery.querySelectorAll('[data-rx-slide]').forEach(b => b.setAttribute('aria-pressed', String(b === slide)));
      return;
    }
    const el = event.target.closest('[data-rx-action]');
    if (!el || el.hasAttribute('data-ol-open')) return;
    event.preventDefault();
    const text = el.textContent.trim().replace(/\s+/g, ' ');
    if (destinationInput && el.closest('.rx-hero') && /Search|USA|Spain|Japan|France|All 190/.test(text)) {
      const q = /Search/.test(text) ? destinationInput.value : /All 190/.test(text) ? '' : text.replace(/^[^\p{L}]+/u, '');
      destinationInput.value = q;
      searchDestinations(q);
      return;
    }
    if (/\?$/.test(text)) { window.Openline?.open('kb', { q: text }); return; }
    if (root.dataset.rx === 'installation-guide') {
      if (/Android|Install Manually/.test(text)) {
        window.Openline?.open('kb', { q: /Android/.test(text) ? 'install Android eSIM' : 'install iPhone manually' });
        return;
      }
      if (/View Activation Guide/.test(text)) { root.querySelector('.rx-chapter:last-child')?.scrollIntoView({ behavior: 'smooth' }); return; }
      if (/^iPhone/.test(text) || /Install with QR Code/.test(text)) { root.querySelector('.rx-mode-guide')?.scrollIntoView({ behavior: 'smooth' }); return; }
    }
    if (root.dataset.rx === 'login' && /^(Email|Phone)$/.test(text)) {
      let form = root.querySelector('[data-rx-login-form]');
      if (!form) { form = document.createElement('form'); form.dataset.rxLoginForm = ''; root.querySelector('.rx-signin').append(form); }
      const email = text === 'Email';
      form.innerHTML = `<label class="rx-copy">${email ? 'Email address' : 'Phone number'}<input class="rx-input" style="display:block;width:100%;margin:10px 0" required type="${email ? 'email' : 'tel'}" autocomplete="${email ? 'email' : 'tel'}" placeholder="${email ? 'you@example.com' : '+1 202 555 0148'}"></label><button type="submit" class="rx-button">Continue (preview)</button><p class="rx-preview-note">Local preview only. No sign-in code will be sent.</p>`;
      form.querySelector('input').focus();
      return;
    }
    const action = el.dataset.rxAction;
    if (action === 'plans') {
      location.href = '/qa/home-redesign#rx-chapter-1';
    } else if (action === 'contact') {
      location.href = '/qa/contact-redesign';
    } else if (action === 'next') {
      (el.closest('.rx-chapter')?.nextElementSibling || root.querySelector('.rx-chapter'))?.scrollIntoView({ behavior: 'smooth' });
    } else {
      notify('Design preview only. No account action, purchase or message has been submitted.');
    }
  });
  // Keep forms inert and explicit: the redesign is not a production checkout.
  root.addEventListener('submit', (event) => {
    event.preventDefault();
    if (event.target.reportValidity()) notify('Preview received locally. Nothing was sent or purchased.');
  });
  const chapters = [...root.querySelectorAll('.rx-chapter')];
  if (root.dataset.rx === 'installation-guide') {
    const note = document.createElement('p');
    note.className = 'rx-preview-note';
    note.textContent = 'This captured walkthrough follows iPhone QR setup. Android and manual setup open the relevant knowledge-base guides.';
    root.querySelector('.rx-mode-guide .rx-section-head')?.append(note);
  }
  const nav = root.querySelector('.rx-chapters');
  if (nav && chapters.length) {
    const observer = new IntersectionObserver((entries) => {
      const item = entries.find(e => e.isIntersecting);
      if (!item) return;
      nav.querySelectorAll('a').forEach(a => {
        if (a.hash === '#' + item.target.id) a.setAttribute('aria-current', 'location');
        else a.removeAttribute('aria-current');
      });
    }, { rootMargin: '-15% 0px -65% 0px' });
    chapters.forEach(c => observer.observe(c));
  }
  // Preview source uses native tables; give their viewport a keyboard stop.
  root.querySelectorAll('.rx-table').forEach(table => {
    table.parentElement.tabIndex = 0;
    table.parentElement.setAttribute('aria-label', 'Scrollable comparison table');
  });
  // Expose source article summaries as filterable editorial cards.
  const articles = root.querySelector('.rx-mode-editorial .rx-grid');
  if (articles) {
    const form = document.createElement('form');
    form.className = 'rx-row'; form.style.marginBottom = '28px';
    form.innerHTML = '<input type="search" class="rx-input" aria-label="Filter articles" placeholder="Find an article by topic, title or keyword"><span class="rx-muted" role="status"></span>';
    articles.before(form);
    const cards = [...articles.children], status = form.querySelector('[role=status]');
    const filter = () => {
      const q = form.querySelector('input').value.trim().toLowerCase();
      cards.forEach(c => { c.hidden = !c.textContent.toLowerCase().includes(q); c.style.display = c.hidden ? 'none' : ''; });
      const count = cards.filter(c => !c.hidden).length;
      status.textContent = `${count} article${count === 1 ? '' : 's'}`;
    };
    form.addEventListener('input', filter);
    form.addEventListener('submit', e => e.preventDefault());
    filter();
  }
}
