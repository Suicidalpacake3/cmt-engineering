/* ==========================================================================
   CMT Engineering: shared site behaviour
   Header, mega menu, mobile menu, footer, icons, reveal, lightbox,
   reader drawer, accordions, custom dropdowns, project index, hero.
   ========================================================================== */
(function () {
  'use strict';
  const qs = (s, r = document) => r.querySelector(s);
  const qsa = (s, r = document) => Array.from(r.querySelectorAll(s));
  const ROOT = document.body.dataset.root || '';
  const PAGE = document.body.dataset.page || '';

  /* ---------- Company details (single source) ---------- */
  const CMT = {
    name: 'CMT Engineering',
    phone: '+27 82 409 4836', phoneHref: 'tel:+27824094836', phoneWho: 'Rudolph',
    email: 'rudolph@cmtengineering.co.za',
    whatsapp: 'https://api.whatsapp.com/send?phone=27646809585',
    hours: 'Mon to Fri: 7:30am to 4:30pm',
    social: {
      facebook: 'https://www.facebook.com/cmtengineeringcc',
      instagram: 'https://www.instagram.com/cmtengineeringcc/',
      youtube: 'https://www.youtube.com/channel/UCyFLx1BmKZd2uC8652mP9Lg',
      linkedin: 'https://www.linkedin.com/company/cmt-engineering-cc'
    },
    offices: [
      { id: 'head-office', label: 'Head Office', city: 'Pretoria', lines: ['75 Sable Avenue, Moregloed', 'Pretoria, South Africa'], lat: -25.70913, lng: 28.25584 },
      { id: 'botswana', label: 'Botswana', city: 'Maun', lines: ['Plot 2469, Botseja', 'Maun, Botswana'], lat: -20.03353, lng: 23.40119 }
    ]
  };
  CMT.dir = (o) => 'https://www.google.com/maps/dir/?api=1&destination=' + o.lat + ',' + o.lng;
  window.CMT = CMT;

  /* ---------- Thin line icons ---------- */
  const P = {
    phone: '<path d="M5 4h3.5l1.6 4.3-2.2 1.4a11 11 0 0 0 6.4 6.4l1.4-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="m3.5 6 8.5 7 8.5-7"/>',
    pin: '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    arrow: '<path d="M4 12h15M13 6l6 6-6 6"/>',
    diag: '<path d="M7 17 17 7M8.5 7H17v8.5"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    crumb: '<path d="m9 6 6 6-6 6"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h10"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    download: '<path d="M12 4v11M7 10.5l5 5 5-5M5 20h14"/>',
    nav: '<path d="M4.5 11.2 19.5 4.5l-6.7 15-1.9-6.4z"/>',
    expand: '<path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7"/>',
    reset: '<path d="M4 12a8 8 0 1 0 2.6-5.9M4 4.5V9h4.5"/>',
    doc: '<path d="M6.5 3h7.5l5 5v12a1 1 0 0 1-1 1H6.5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v5h5M8.5 13h7M8.5 16.5h7"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15" rx="1.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.6 3.5 5.4 3.5 8.5s-1 5.9-3.5 8.5c-2.5-2.6-3.5-5.4-3.5-8.5s1-5.9 3.5-8.5z"/>',
    facebook: '<path d="M14 8.5h2.5V5H14a3.5 3.5 0 0 0-3.5 3.5V11H8v3.5h2.5V21H14v-6.5h2.5l.5-3.5h-3V9a.5.5 0 0 1 .5-.5z"/>',
    instagram: '<rect x="4" y="4" width="16" height="16" rx="4.5"/><circle cx="12" cy="12" r="3.6"/><circle cx="16.8" cy="7.2" r=".6" fill="currentColor"/>',
    youtube: '<path d="M21 8.2a2.6 2.6 0 0 0-1.8-1.8C17.6 6 12 6 12 6s-5.6 0-7.2.4A2.6 2.6 0 0 0 3 8.2 27 27 0 0 0 2.6 12 27 27 0 0 0 3 15.8a2.6 2.6 0 0 0 1.8 1.8C6.4 18 12 18 12 18s5.6 0 7.2-.4a2.6 2.6 0 0 0 1.8-1.8 27 27 0 0 0 .4-3.8 27 27 0 0 0-.4-3.8z"/><path d="m10.2 14.6 4.4-2.6-4.4-2.6z"/>',
    linkedin: '<rect x="3.5" y="3.5" width="17" height="17" rx="2.5"/><path d="M8 10.5V16M8 7.6v.1M11.5 16v-5.5M11.5 13c0-1.6 1-2.6 2.4-2.6s2.1.9 2.1 2.6V16"/>',
    whatsapp: '<path d="M4.5 19.5 5.6 16A8 8 0 1 1 8.4 18.6z"/><path d="M9.2 8.6c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .5.4l.7 1.6c.1.2 0 .4-.1.6l-.5.6c-.1.1-.2.3 0 .5a5.6 5.6 0 0 0 2.6 2.3c.2.1.4 0 .5-.1l.6-.7c.2-.2.3-.2.6-.1l1.5.7c.3.1.4.2.4.4 0 .6-.3 1.3-.8 1.6-.6.4-1.5.5-2.7 0a9 9 0 0 1-4.2-3.8c-.6-1-.7-2-.3-2.8z"/>'
  };
  const icon = (n, cls = '') => '<svg class="icon ' + cls + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (P[n] || '') + '</svg>';
  window.CMT.icon = icon;
  const hydrateIcons = (root = document) => qsa('i[data-icon]', root).forEach((el) => { el.outerHTML = icon(el.dataset.icon, el.className || ''); });
  window.CMT.hydrateIcons = hydrateIcons;

  /* Arc motif, taken from the crescent in the CMT mark */
  const arc = (cls) => '<svg class="arc ' + cls + '" viewBox="0 0 600 600" fill="none" aria-hidden="true"><defs><linearGradient id="arcg-' + cls + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5fcff2" stop-opacity=".9"/><stop offset="1" stop-color="#3e4095" stop-opacity="0"/></linearGradient></defs><path d="M520 140A250 250 0 1 0 540 420" stroke="url(#arcg-' + cls + ')" stroke-width="1.5"/><path d="M470 170A200 200 0 1 0 486 395" stroke="url(#arcg-' + cls + ')" stroke-width="1"/></svg>';

  /* ---------- Navigation model ---------- */
  const S = ROOT + 'our-services/';
  const services = [
    ['ht-lt-electrical', 'HT & LT Electrical'],
    ['borehole-testing', 'Borehole Testing & Water Treatment Plants'],
    ['environmental-solutions', 'Environmental Solutions'],
    ['diesel-pumps-generators', 'Mobile Diesel Pumps & Diesel Generators'],
    ['hdpe-pipe', 'HDPE Pipe Installations & Welding'],
    ['system-automation', 'System Automation'],
    ['booster-borehole-pumps', 'Booster & Borehole Pumps'],
    ['water-resource-strategy', 'Water Resource Strategy Formulation'],
    ['legal-compliance', 'Legal Compliance'],
    ['wc-wdm', 'Integrated Water Resource Conservation & Demand Management']
  ];
  const svcLink = (s) => '<a href="' + S + '#' + s[0] + '">' + s[1] + icon('arrow') + '</a>';
  const navItems = [
    { id: 'home', label: 'Home', href: ROOT || './' },
    { id: 'services', label: 'Our Services', href: S, mega: true },
    { id: 'projects', label: 'Our Projects', href: ROOT + 'our-projects/' }
  ];
  const mega = `
    <div class="mega" role="region" aria-label="Our Services">
      <div class="mega-inner">
        <div class="mega-col"><h6>Electrical, Power &amp; Pumping</h6>${[0, 3, 4, 5, 6].map((i) => svcLink(services[i])).join('')}</div>
        <div class="mega-col"><h6>Water &amp; Environment</h6>${[1, 2, 7, 8, 9].map((i) => svcLink(services[i])).join('')}</div>
        <div class="mega-side">
          <img src="${ROOT}assets/img/services/booster-borehole-pumps.jpg" alt="" loading="lazy">
          <h4>Our Services Includes</h4>
          <p>All products are sourced from reputable internationally resourced suppliers and carries the appropriate guarantees and warranties.</p>
          <a class="btn btn-light btn-sm" href="${S}">View all services ${icon('arrow')}</a>
        </div>
      </div>
    </div>`;
  const socialLinks = (cls) => ['facebook', 'instagram', 'youtube', 'linkedin'].map((k) => '<a href="' + CMT.social[k] + '" target="_blank" rel="noopener" aria-label="CMT Engineering on ' + k.charAt(0).toUpperCase() + k.slice(1) + '">' + icon(k) + '</a>').join('') + '<a href="' + CMT.whatsapp + '" target="_blank" rel="noopener" aria-label="WhatsApp CMT Engineering">' + icon('whatsapp') + '</a>';

  const header = `
    <a class="skip-link" href="#main">Skip to content</a>
    <div class="progress-bar" aria-hidden="true"></div>
    <div class="utility">
      <div class="container">
        <div class="u-left">
          <a href="${CMT.phoneHref}">${icon('phone')} ${CMT.phone} <span class="u-hide-sm">(${CMT.phoneWho})</span></a>
          <span class="u-sep u-hide-sm"></span>
          <a class="u-hide-sm" href="mailto:${CMT.email}">${icon('mail')} ${CMT.email}</a>
        </div>
        <div class="u-right">
          <span class="u-hide-md">${icon('pin')} Pretoria, South Africa &nbsp;&amp;&nbsp; Maun, Botswana</span>
          <span class="u-sep u-hide-md"></span>
          <div class="u-social">${socialLinks()}</div>
        </div>
      </div>
    </div>
    <header class="site-header">
      <div class="container nav-wrap">
        <a class="brand" href="${ROOT || './'}" aria-label="CMT Engineering home">
          <img src="${ROOT}assets/img/brand/cmt-logo-light.png" alt="CMT Engineering (Pty) Ltd" width="600" height="153">
        </a>
        <nav class="main-nav" aria-label="Main">
          ${navItems.map((n) => `
            <div class="nav-item ${n.mega ? 'has-mega' : ''}">
              <a class="nav-link ${PAGE === n.id ? 'active' : ''}" href="${n.href}" ${n.mega ? 'aria-haspopup="true" aria-expanded="false"' : ''}>${n.label}${n.mega ? icon('chevron') : ''}</a>
              ${n.mega ? mega : ''}
            </div>`).join('')}
          <a class="nav-phone" href="${CMT.phoneHref}"><span><small>Call ${CMT.phoneWho}</small><strong>${CMT.phone}</strong></span></a>
          <a class="btn btn-primary btn-sm nav-cta" href="${ROOT}contact-us/">Contact Us</a>
        </nav>
        <button class="menu-toggle" aria-label="Open menu" aria-expanded="false">${icon('menu')}</button>
      </div>
    </header>
    <div class="mobile-nav" aria-hidden="true" role="dialog" aria-label="Menu">
      <div class="mn-top">
        <img src="${ROOT}assets/img/brand/cmt-logo-light.png" alt="CMT Engineering (Pty) Ltd">
        <button class="menu-toggle mn-close" style="display:grid" aria-label="Close menu">${icon('x')}</button>
      </div>
      <nav aria-label="Mobile">
        <a href="${ROOT || './'}">Home ${icon('arrow')}</a>
        <div class="mn-group">
          <button type="button" aria-expanded="false">Our Services ${icon('plus')}</button>
          <div class="mn-sub"><div><a href="${S}">All services</a>${services.map((s) => '<a href="' + S + '#' + s[0] + '">' + s[1] + '</a>').join('')}</div></div>
        </div>
        <a href="${ROOT}our-projects/">Our Projects ${icon('arrow')}</a>
        <a href="${ROOT}contact-us/">Contact Us ${icon('arrow')}</a>
      </nav>
      <div class="mn-contact">
        <a href="${CMT.phoneHref}">${icon('phone')} ${CMT.phone} (${CMT.phoneWho})</a>
        <a href="mailto:${CMT.email}">${icon('mail')} ${CMT.email}</a>
        <span style="display:flex;gap:12px;align-items:center">${icon('clock')} ${CMT.hours}</span>
        <div class="mn-social">${socialLinks()}</div>
      </div>
    </div>`;

  const year = new Date().getFullYear();
  const officeAddr = (o) => `
    <address>
      <b>${o.label}</b>
      ${o.lines.join('<br>')}
      <a href="${CMT.phoneHref}" style="margin-top:10px">${CMT.phone} (${CMT.phoneWho})</a>
      <a href="mailto:${CMT.email}">${CMT.email}</a>
    </address>
    <a class="f-dir" href="${CMT.dir(o)}" target="_blank" rel="noopener">${icon('nav')} Directions</a>`;
  const footer = `
    <footer class="site-footer">
      ${arc('f')}
      <div class="container">
        <div class="f-top">
          <div class="f-brand">
            <img src="${ROOT}assets/img/brand/cmt-logo-light.png" alt="CMT Engineering (Pty) Ltd" loading="lazy" width="600" height="153">
            <p>In an unpredictable industry where national and international economic situations influence the demand for Water &amp; Electrical Reticulation, CMT Engineering has grown into a strong, stable company.</p>
            <div class="f-social">${socialLinks()}</div>
          </div>
          <div class="f-col"><h4>Head Office</h4>${officeAddr(CMT.offices[0])}</div>
          <div class="f-col"><h4>Botswana</h4>${officeAddr(CMT.offices[1])}</div>
          <div class="f-col">
            <h4>Explore</h4>
            <ul class="f-links">
              <li><a href="${ROOT || './'}">Home</a></li>
              <li><a href="${S}">Our Services</a></li>
              <li><a href="${ROOT}our-projects/">Our Projects</a></li>
              <li><a href="${ROOT}contact-us/">Contact Us</a></li>
              <li><a href="${ROOT}assets/docs/CMT-Engineering-Company-Profile.pdf" target="_blank" rel="noopener">Company Profile (PDF)</a></li>
            </ul>
            <div class="f-hours"><b>Opening hours</b>${CMT.hours}</div>
          </div>
        </div>
        <div class="f-bottom">
          <span>&copy; ${year} CMT Engineering (Pty) Ltd. All Rights Reserved.</span>
          <span>Pretoria, South Africa &nbsp;&middot;&nbsp; Maun, Botswana</span>
        </div>
      </div>
    </footer>
    <a class="wa-float" href="${CMT.whatsapp}" target="_blank" rel="noopener" aria-label="Chat to us on WhatsApp">${icon('whatsapp')}<span>WhatsApp us</span></a>
    <button class="to-top" aria-label="Back to top">${icon('arrow')}</button>`;

  document.body.insertAdjacentHTML('afterbegin', header);
  document.body.insertAdjacentHTML('beforeend', footer);
  qsa('[data-arc]').forEach((el) => el.insertAdjacentHTML('afterbegin', arc(el.dataset.arc)));
  hydrateIcons();

  /* ---------- Header behaviour ---------- */
  const hdr = qs('.site-header');
  const bar = qs('.progress-bar');
  const toTop = qs('.to-top');
  const wa = qs('.wa-float');
  const onScroll = () => {
    const y = window.scrollY;
    hdr.classList.toggle('scrolled', y > 30);
    document.body.classList.toggle('scrolled-far', y > 140);
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    toTop.classList.toggle('show', y > 800);
    if (wa) wa.classList.toggle('show', y > 500);
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  // Mega menu: hover with intent delay, click and keyboard
  qsa('.nav-item.has-mega').forEach((item) => {
    let t;
    const link = qs('.nav-link', item);
    const open = (on) => { item.classList.toggle('open', on); link.setAttribute('aria-expanded', on); };
    item.addEventListener('mouseenter', () => { clearTimeout(t); t = setTimeout(() => open(true), 90); });
    item.addEventListener('mouseleave', () => { clearTimeout(t); t = setTimeout(() => open(false), 160); });
    link.addEventListener('keydown', (e) => { if (e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); open(true); const f = qs('.mega a', item); if (f) f.focus(); } });
    item.addEventListener('keydown', (e) => { if (e.key === 'Escape') { open(false); link.focus(); } });
    item.addEventListener('focusout', (e) => { if (!item.contains(e.relatedTarget)) open(false); });
    qsa('.mega a', item).forEach((a) => a.addEventListener('click', () => open(false)));
  });

  // Mobile nav
  const mnav = qs('.mobile-nav');
  const setMobile = (on) => {
    mnav.classList.toggle('open', on); mnav.setAttribute('aria-hidden', !on);
    qs('.site-header .menu-toggle').setAttribute('aria-expanded', on);
    document.body.style.overflow = on ? 'hidden' : '';
    if (on) setTimeout(() => qs('.mn-close').focus(), 50);
  };
  qs('.site-header .menu-toggle').addEventListener('click', () => setMobile(true));
  qs('.mn-close').addEventListener('click', () => setMobile(false));
  qsa('.mobile-nav a').forEach((a) => a.addEventListener('click', () => setMobile(false)));
  qsa('.mn-group > button').forEach((b) => b.addEventListener('click', () => {
    const g = b.parentElement; const on = !g.classList.contains('open');
    g.classList.toggle('open', on); b.setAttribute('aria-expanded', on);
  }));
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && mnav.classList.contains('open')) setMobile(false); });

  /* ---------- Reveal on scroll ---------- */
  const io = 'IntersectionObserver' in window ? new IntersectionObserver((en) => en.forEach((x) => {
    if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); }
  }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }) : null;
  qsa('.reveal').forEach((el) => (io ? io.observe(el) : el.classList.add('in')));

  /* ---------- Home hero slides ---------- */
  const slides = qsa('.hero-slides img');
  if (slides.length) {
    let i = 0, timer;
    const dots = qs('.hero-dots');
    if (dots) {
      dots.innerHTML = slides.map((_, k) => '<button type="button" aria-label="Show photo ' + (k + 1) + '"></button>').join('');
    }
    const go = (k) => {
      slides[i].classList.remove('on'); i = (k + slides.length) % slides.length; slides[i].classList.add('on');
      if (dots) qsa('button', dots).forEach((b, n) => b.classList.toggle('on', n === i));
    };
    const play = () => { clearInterval(timer); timer = setInterval(() => go(i + 1), 6500); };
    requestAnimationFrame(() => go(0));
    if (dots) qsa('button', dots).forEach((b, n) => b.addEventListener('click', () => { go(n); play(); }));
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) play();
  }

  /* ---------- Project index (hover preview) ---------- */
  qsa('.pi').forEach((pi) => {
    const frame = qs('.pi-frame', pi);
    if (!frame) return;
    const rows = qsa('.pi-row', pi);
    const cap = qs('.pi-cap', pi);
    const imgs = rows.map((r) => {
      const im = document.createElement('img');
      im.src = r.dataset.img; im.alt = ''; im.loading = 'lazy'; im.decoding = 'async';
      frame.insertBefore(im, cap); return im;
    });
    const show = (k) => {
      rows.forEach((r, n) => r.classList.toggle('on', n === k));
      imgs.forEach((im, n) => im.classList.toggle('on', n === k));
      const r = rows[k];
      cap.innerHTML = '<small>' + r.dataset.years + '</small><b>' + qs('.t b', r).textContent + '</b>';
    };
    rows.forEach((r, k) => { r.addEventListener('mouseenter', () => show(k)); r.addEventListener('focusin', () => show(k)); });
    show(0);
  });

  /* ---------- Accordions (Learn More) ---------- */
  qsa('.more').forEach((m) => {
    const b = qs('.more-btn', m); const label = qs('.lbl', b); const base = label ? label.textContent : '';
    b.addEventListener('click', () => {
      const on = !m.classList.contains('open');
      m.classList.toggle('open', on); b.setAttribute('aria-expanded', on);
      if (label) label.textContent = on ? 'Close' : base;
    });
  });

  /* ---------- Reader drawer ---------- */
  const drawer = qs('.drawer');
  if (drawer) {
    const body = qs('.drawer-body', drawer); const kicker = qs('.drawer-head small', drawer);
    let last = null;
    const close = () => { drawer.classList.remove('open'); drawer.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; if (last) last.focus(); };
    qsa('[data-read]').forEach((btn) => btn.addEventListener('click', () => {
      const tpl = document.getElementById(btn.dataset.read); if (!tpl) return;
      last = btn; body.innerHTML = ''; body.appendChild(tpl.content.cloneNode(true)); body.scrollTop = 0;
      kicker.textContent = btn.dataset.kicker || 'Learn more';
      drawer.classList.add('open'); drawer.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden';
      setTimeout(() => qs('.drawer-close', drawer).focus(), 60);
    }));
    qsa('.drawer-close, .drawer-bg', drawer).forEach((el) => el.addEventListener('click', close));
    addEventListener('keydown', (e) => { if (e.key === 'Escape' && drawer.classList.contains('open')) close(); });
  }

  /* ---------- Lightbox (project galleries) ---------- */
  const groups = {};
  qsa('[data-lb]').forEach((el) => { (groups[el.dataset.lb] = groups[el.dataset.lb] || []).push(el); });
  if (Object.keys(groups).length) {
    document.body.insertAdjacentHTML('beforeend', `
      <div class="lightbox" aria-hidden="true" role="dialog" aria-label="Photo viewer">
        <div class="lb-top"><span><span class="mono lb-count"></span> &nbsp; <span class="lb-title"></span></span><button class="lb-btn lb-close" aria-label="Close">${icon('x')}</button></div>
        <div class="lb-stage"><button class="lb-btn lb-prev" aria-label="Previous photo">${icon('arrow')}</button><img alt=""><button class="lb-btn lb-next" aria-label="Next photo">${icon('arrow')}</button></div>
        <div class="lb-cap"></div>
      </div>`);
    const lb = qs('.lightbox'); const img = qs('.lb-stage img', lb);
    let g = null, k = 0, last = null;
    const render = () => {
      const el = groups[g][k];
      img.src = el.dataset.src; img.alt = el.dataset.cap || '';
      qs('.lb-cap', lb).textContent = el.dataset.cap || '';
      qs('.lb-count', lb).textContent = String(k + 1).padStart(2, '0') + ' / ' + String(groups[g].length).padStart(2, '0');
      qs('.lb-title', lb).textContent = el.dataset.title || '';
      const many = groups[g].length > 1;
      qs('.lb-prev', lb).hidden = !many; qs('.lb-next', lb).hidden = !many;
    };
    const open = (grp, n, from) => { g = grp; k = n; last = from; render(); lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; qs('.lb-close', lb).focus(); };
    const close = () => { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; if (last) last.focus(); };
    const step = (d) => { k = (k + d + groups[g].length) % groups[g].length; render(); };
    Object.entries(groups).forEach(([grp, els]) => els.forEach((el, n) => el.addEventListener('click', (e) => { e.preventDefault(); open(grp, n, el); })));
    qsa('[data-open-gallery]').forEach((b) => b.addEventListener('click', () => { const f = qs('.cm-main [data-lb]', b.closest('.case')); if (f) open(f.dataset.lb, 0, b); }));
    qs('.lb-close', lb).addEventListener('click', close);
    qs('.lb-prev', lb).addEventListener('click', () => step(-1));
    qs('.lb-next', lb).addEventListener('click', () => step(1));
    lb.addEventListener('click', (e) => { if (e.target === lb || e.target.classList.contains('lb-stage')) close(); });
    addEventListener('keydown', (e) => {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1);
    });
    let sx = null;
    lb.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', (e) => { if (sx === null) return; const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1); sx = null; });
  }

  /* ---------- Services page: index scroll spy ---------- */
  const idx = qsa('.svc-index ol a');
  if (idx.length && 'IntersectionObserver' in window) {
    const map = new Map(idx.map((a) => [a.getAttribute('href').slice(1), a]));
    const spy = new IntersectionObserver((en) => en.forEach((x) => {
      if (x.isIntersecting) {
        idx.forEach((a) => a.classList.remove('on'));
        const a = map.get(x.target.id);
        if (a) { a.classList.add('on'); const ol = a.closest('ol'); if (ol && ol.scrollWidth > ol.clientWidth) ol.scrollTo({ left: a.offsetLeft - 20, behavior: 'smooth' }); }
      }
    }), { rootMargin: '-30% 0px -60% 0px' });
    qsa('.svc-block').forEach((b) => spy.observe(b));
  }

  /* ---------- Custom dropdowns ---------- */
  qsa('.dd').forEach((dd) => {
    const btn = qs('.dd-btn', dd); const list = qs('.dd-list', dd); const input = qs('input[type=hidden]', dd);
    const opts = qsa('li', list); let hl = -1;
    const setOpen = (on) => { dd.classList.toggle('open', on); btn.setAttribute('aria-expanded', on); if (on) { hl = Math.max(0, opts.findIndex((o) => o.getAttribute('aria-selected') === 'true')); mark(); } };
    const mark = () => opts.forEach((o, n) => o.classList.toggle('hl', n === hl));
    const pick = (o) => {
      opts.forEach((x) => x.setAttribute('aria-selected', x === o));
      input.value = o.dataset.value; qs('.dd-val', btn).textContent = o.dataset.label || o.firstChild.textContent.trim();
      qs('.dd-val', btn).classList.remove('ph'); setOpen(false); btn.focus();
      dd.closest('.f-field') && dd.closest('.f-field').classList.remove('invalid');
      dd.dispatchEvent(new CustomEvent('change', { detail: o.dataset.value }));
    };
    btn.addEventListener('click', () => setOpen(!dd.classList.contains('open')));
    opts.forEach((o) => o.addEventListener('click', () => pick(o)));
    btn.addEventListener('keydown', (e) => {
      const isOpen = dd.classList.contains('open');
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); if (!isOpen) return setOpen(true); hl = (hl + (e.key === 'ArrowDown' ? 1 : -1) + opts.length) % opts.length; mark(); }
      else if ((e.key === 'Enter' || e.key === ' ') && isOpen) { e.preventDefault(); pick(opts[hl]); }
      else if (e.key === 'Escape') setOpen(false);
    });
    document.addEventListener('click', (e) => { if (!dd.contains(e.target)) setOpen(false); });
  });
})();
