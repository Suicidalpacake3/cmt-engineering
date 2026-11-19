/* ==========================================================================
   CMT Engineering: office switcher with themed map
   Renders into any element with [data-offices]. Needs Leaflet + site.js.
   ========================================================================== */
(function () {
  'use strict';
  const host = document.querySelector('[data-offices]');
  if (!host || !window.CMT) return;
  const C = window.CMT, icon = C.icon, O = C.offices;
  const fmt = (v, pos, neg) => Math.abs(v).toFixed(4) + '° ' + (v < 0 ? neg : pos);

  host.innerHTML = `
    <div class="office-panel">
      <div class="office-tabs" role="tablist" aria-label="Choose an office">
        ${O.map((o, i) => `<button class="office-tab" role="tab" id="tab-${o.id}" aria-controls="office-detail" aria-selected="${i === 0}" data-i="${i}"><small>${o.label}</small><b>${o.city}</b></button>`).join('')}
      </div>
      <div class="office-body" id="office-detail" role="tabpanel" aria-live="polite"><div class="ob-swap"></div></div>
    </div>
    <div class="map-wrap">
      <div id="officeMap" aria-label="Map showing the CMT Engineering offices in Pretoria and Maun"></div>
      <div class="map-tint" aria-hidden="true"></div>
      <button class="map-reset" type="button">${icon('reset')} Show both offices</button>
      <div class="map-legend"></div>
    </div>`;

  const swap = host.querySelector('.ob-swap');
  const tabs = Array.from(host.querySelectorAll('.office-tab'));
  const detail = (o) => `
    <h3>${o.label === 'Botswana' ? 'Botswana Office' : o.label}</h3>
    <span class="ob-country">${o.lines[1].toUpperCase()}</span>
    <dl class="ob-rows">
      <div class="ob-row"><dt>Address</dt><dd>${o.lines.join('<br>')}</dd></div>
      <div class="ob-row"><dt>Call us</dt><dd><a href="${C.phoneHref}">${C.phone}</a> <small>(${C.phoneWho})</small></dd></div>
      <div class="ob-row"><dt>Email us</dt><dd><a href="mailto:${C.email}">${C.email}</a></dd></div>
      <div class="ob-row"><dt>Hours</dt><dd>${C.hours}</dd></div>
    </dl>
    <div class="ob-actions">
      <a class="btn btn-light btn-sm" href="${C.dir(o)}" target="_blank" rel="noopener">${icon('nav')} Directions</a>
      <a class="btn btn-outline light btn-sm" href="${C.whatsapp}" target="_blank" rel="noopener">${icon('whatsapp')} WhatsApp</a>
    </div>
    <div class="ob-coords">${fmt(o.lat, 'N', 'S')} &nbsp; ${fmt(o.lng, 'E', 'W')}</div>`;

  // Distance between the two offices (haversine)
  const km = (() => {
    const R = 6371, r = Math.PI / 180, a = O[0], b = O[1];
    const dLat = (b.lat - a.lat) * r, dLng = (b.lng - a.lng) * r;
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLng / 2) ** 2;
    return Math.round((2 * R * Math.asin(Math.sqrt(h))) / 10) * 10;
  })();
  host.querySelector('.map-legend').innerHTML = `<b>Two offices, one team</b><br>Pretoria to Maun <span class="mono">approx. ${km} km</span>`;

  let map = null, markers = [], cur = -1;
  const select = (i, fly = true) => {
    if (i === cur) { if (map && fly) map.flyTo([O[i].lat, O[i].lng], 13, { duration: 2.2, easeLinearity: 0.2 }); return; }
    cur = i;
    tabs.forEach((t, n) => { t.setAttribute('aria-selected', n === i); t.tabIndex = n === i ? 0 : -1; });
    swap.classList.add('out');
    setTimeout(() => { swap.innerHTML = detail(O[i]); swap.classList.remove('out'); }, 220);
    markers.forEach((m, n) => { const el = m.getElement(); if (el) el.classList.toggle('is-active', n === i); m.setZIndexOffset(n === i ? 1000 : 0); });
    if (map && fly) map.flyTo([O[i].lat, O[i].lng], 13, { duration: 2.2, easeLinearity: 0.2 });
    if (fly && history.replaceState && document.body.dataset.page === 'contact') history.replaceState(null, '', '#' + O[i].id);
  };

  tabs.forEach((t, n) => {
    t.addEventListener('click', () => select(n));
    t.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); const k = (n + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length; tabs[k].focus(); select(k); }
    });
  });

  const both = () => map && map.flyToBounds(L.latLngBounds(O.map((o) => [o.lat, o.lng])), { padding: [70, 70], duration: 1.8 });
  host.querySelector('.map-reset').addEventListener('click', both);

  try {
    if (!window.L) throw new Error('no leaflet');
    map = L.map('officeMap', { scrollWheelZoom: false, zoomControl: true, attributionControl: true, worldCopyJump: false });
    const esri = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/';
    L.tileLayer(esri + 'World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', { attribution: 'Tiles &copy; Esri, HERE, Garmin, &copy; OpenStreetMap contributors', maxZoom: 16 }).addTo(map);
    L.tileLayer(esri + 'World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}', { maxZoom: 16 }).addTo(map);
    map.attributionControl.setPrefix('<a href="https://leafletjs.com" target="_blank" rel="noopener">Leaflet</a>');
    map.fitBounds(L.latLngBounds(O.map((o) => [o.lat, o.lng])), { padding: [70, 70] });

    // Curved link between the offices
    const a = O[0], b = O[1], mid = [(a.lat + b.lat) / 2, (a.lng + b.lng) / 2];
    const ctrl = [mid[0] + (b.lng - a.lng) * 0.22, mid[1] - (b.lat - a.lat) * 0.22];
    const pts = [];
    for (let t = 0; t <= 1.0001; t += 0.025) {
      const u = 1 - t;
      pts.push([u * u * a.lat + 2 * u * t * ctrl[0] + t * t * b.lat, u * u * a.lng + 2 * u * t * ctrl[1] + t * t * b.lng]);
    }
    L.polyline(pts, { color: '#5fcff2', weight: 1.6, opacity: 0.75, dashArray: '2 7', lineCap: 'round', interactive: false }).addTo(map);

    markers = O.map((o, i) => L.marker([o.lat, o.lng], {
      icon: L.divIcon({ className: '', html: '<div class="cmt-pin"><span class="ring"></span><span class="core"></span><span class="lbl">' + o.label + ', ' + o.city + '</span></div>', iconSize: [22, 22], iconAnchor: [11, 11] }),
      keyboard: true, title: o.label + ', ' + o.city
    }).addTo(map).on('click', () => select(i)));
  } catch (e) {
    host.querySelector('#officeMap').innerHTML = '<div class="map-fallback">The map could not load. Use the Directions button for each office.</div>';
    host.querySelector('.map-reset').hidden = true;
    map = null;
  }

  const fromHash = O.findIndex((o) => '#' + o.id === location.hash);
  const start = fromHash > -1 ? fromHash : 0;
  select(start, false);
  if (map) {
    if ('IntersectionObserver' in window) {
      const mo = new IntersectionObserver((en) => { if (en[0].isIntersecting) { setTimeout(() => select(cur, true), 600); mo.disconnect(); } }, { threshold: 0.45 });
      mo.observe(host.querySelector('.map-wrap'));
    } else select(start);
  }
  addEventListener('hashchange', () => { const k = O.findIndex((o) => '#' + o.id === location.hash); if (k > -1) select(k); });
})();
