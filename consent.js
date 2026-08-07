/* ============================================================================
   STARLIT INSIGHTS — STORAGE & COOKIE CONSENT NOTICE
   ----------------------------------------------------------------------------
   Self-contained. Add one line to any page:
       <script src="consent.js" defer></script>

   Design notes (these matter legally, not just visually):
     • Accept and Reject are the same size, same prominence, one click each.
       Consent that is easier to give than to refuse is not freely given.
     • Nothing optional is written before a choice is made.
     • Every storage item is itemised: name, purpose, type, who sets it, how
       long it lasts.
     • Refusing costs the visitor no functionality, and the notice says so.
     • The choice itself is recorded, with a timestamp, and can be changed at
       any time via window.siConsent.reopen().

   Exposes:
       window.siConsent.granted        true if optional storage was accepted
       window.siConsent.answered       true once a choice exists
       window.siConsent.reopen()       show the notice again
       window.siConsent.allowOptional  call before writing optional storage

   NOT legal advice. Have this reviewed before relying on it.
   ========================================================================== */
(function () {
  "use strict";

  var KEY = "si_consent_v1";
  var UPDATED = "5 August 2026";

  function read() {
    try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) { return null; }
  }
  function write(v) {
    try {
      localStorage.setItem(KEY, JSON.stringify({
        choice: v, at: new Date().toISOString(), version: 1
      }));
    } catch (e) {}
  }
  function clearOptional() {
    try { localStorage.removeItem("si_birth"); localStorage.removeItem("si_place"); } catch (e) {}
  }

  var saved = read();

  function publish(choice) {
    window.siConsent = {
      granted: choice === "accept",
      answered: !!choice,
      choice: choice || null,
      allowOptional: function () { return choice === "accept"; },
      reopen: function () { show(true); }
    };
  }
  publish(saved && saved.choice);

  /* ---------------------------------------------------------------- styles */
  var CSS = [
    '.sic{position:fixed;left:14px;right:14px;bottom:14px;z-index:400;max-width:620px;',
      'margin-inline:auto;border-radius:18px;border:1px solid rgba(255,255,255,.17);',
      'background:rgba(8,13,24,.96);backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px);',
      'box-shadow:0 28px 70px -28px rgba(0,0,0,.95);color:#eef2fa;',
      'font-family:Inter,system-ui,-apple-system,sans-serif;',
      'transform:translateY(150%);transition:transform .55s cubic-bezier(.22,1,.36,1)}',
    '.sic.on{transform:none}',
    '.sic-in{padding:20px 22px 18px;max-height:82vh;overflow-y:auto}',
    '.sic h2{font-family:"Space Grotesk",system-ui,sans-serif;font-weight:500;font-size:1.02rem;',
      'letter-spacing:-.02em;margin:0 0 9px;color:#eef2fa}',
    '.sic p{font-size:.83rem;line-height:1.65;color:#aeb8cc;margin:0 0 11px}',
    '.sic p.sic-fine{font-size:.76rem;color:#6f7c96;margin-bottom:0}',
    '.sic a{color:#5fe3d8;text-decoration:none;border-bottom:1px solid rgba(95,227,216,.4)}',
    '.sic a:hover{color:#8ff0e8}',
    '.sic b{color:#eef2fa;font-weight:600}',
    '.sic-btns{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:16px 0 12px}',
    '.sic-btns button{padding:12px 14px;border-radius:100px;cursor:pointer;font-size:.85rem;',
      'font-family:"Space Grotesk",system-ui,sans-serif;font-weight:500;line-height:1.2;',
      'border:1px solid rgba(255,255,255,.22);background:rgba(255,255,255,.06);color:#eef2fa;',
      'transition:background .25s,border-color .25s,transform .2s;-webkit-tap-highlight-color:transparent}',
    '.sic-btns button:hover{background:rgba(255,255,255,.13);border-color:rgba(242,200,121,.6);',
      'transform:translateY(-1px)}',
    '.sic-more{background:none;border:none;color:#6f7c96;font-size:.76rem;cursor:pointer;padding:0;',
      'font-family:"JetBrains Mono",ui-monospace,monospace;letter-spacing:.1em;text-transform:uppercase;',
      'text-decoration:underline;text-underline-offset:3px}',
    '.sic-more:hover{color:#f2c879}',
    '.sic-tbl{display:none;margin:14px 0 4px;border:1px solid rgba(255,255,255,.1);border-radius:12px;',
      'overflow:hidden}',
    '.sic-tbl.on{display:block}',
    '.sic-row{padding:12px 14px;border-bottom:1px solid rgba(255,255,255,.07);',
      'background:rgba(255,255,255,.025)}',
    '.sic-row:last-child{border-bottom:none}',
    '.sic-row .k{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:5px}',
    '.sic-row code{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:.72rem;color:#eef2fa;',
      'background:rgba(255,255,255,.07);padding:2px 7px;border-radius:5px}',
    '.sic-tag{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:8px;letter-spacing:.14em;',
      'text-transform:uppercase;padding:3px 8px;border-radius:100px}',
    '.sic-tag.need{background:rgba(95,227,216,.13);color:#5fe3d8;border:1px solid rgba(95,227,216,.3)}',
    '.sic-tag.opt{background:rgba(242,200,121,.13);color:#f2c879;border:1px solid rgba(242,200,121,.3)}',
    '.sic-tag.third{background:rgba(155,140,255,.13);color:#b0a4ff;border:1px solid rgba(155,140,255,.3)}',
    '.sic-row p{font-size:.76rem;line-height:1.55;margin:0;color:#aeb8cc}',
    '.sic-row .meta{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:.66rem;color:#6f7c96;',
      'margin-top:5px;display:block}',
    '@media(max-width:520px){.sic-in{padding:17px 16px 15px}.sic-btns{grid-template-columns:1fr}}',
    '@media(prefers-reduced-motion:reduce){.sic{transition:none}}'
  ].join('');

  var ITEMS = [
    { name: 'si_consent_v1', tag: 'need', label: 'Strictly necessary',
      desc: 'Records the choice you make on this notice, and when you made it, so you are not asked again on every page.',
      meta: 'Set by Starlit Insights · Browser local storage · Kept until you clear it or change your choice' },
    { name: 'si_birth', tag: 'opt', label: 'Optional',
      desc: 'Remembers the birth date, time and place you type into the birth-sky tool, so you do not have to enter them again. Written only if you accept.',
      meta: 'Set by Starlit Insights · Browser local storage · Kept until you press Forget or clear site data' },
    { name: 'si_place', tag: 'opt', label: 'Optional',
      desc: 'Remembers the city you chose for the night-sky tool. Written only if you accept.',
      meta: 'Set by Starlit Insights · Browser local storage · Kept until you clear site data' },
    { name: 'Booking calendar', tag: 'third', label: 'Third party',
      desc: 'Our scheduling provider sets its own cookies when you interact with the booking calendar. These are necessary for it to show availability and take a booking. We do not control them.',
      meta: 'Set by the scheduling provider · Cookies · Durations per that provider&rsquo;s own policy' },
    { name: 'Fonts and libraries', tag: 'third', label: 'Third party',
      desc: 'Typefaces and one 3D library are loaded from external content networks. They set no cookies, but the request necessarily reveals your IP address to those networks.',
      meta: 'Google Fonts, cdnjs · No cookies · Request logs held by those providers' },
    { name: 'Server logs', tag: 'need', label: 'Strictly necessary',
      desc: 'Our host records standard access logs, which include IP addresses, for security and reliability. This is inherent to serving a website.',
      meta: 'Set by our hosting provider · Server-side · Per host retention policy' }
  ];

  var box = null, styled = false;

  function show(force) {
    if (box) { box.classList.add('on'); return; }
    if (!force && saved && saved.choice) return;

    if (!styled) {
      var st = document.createElement('style');
      st.textContent = CSS;
      document.head.appendChild(st);
      styled = true;
    }

    box = document.createElement('div');
    box.className = 'sic';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'false');
    box.setAttribute('aria-label', 'Storage and cookie choices');

    var rows = ITEMS.map(function (i) {
      return '<div class="sic-row"><div class="k"><code>' + i.name + '</code>' +
        '<span class="sic-tag ' + i.tag + '">' + i.label + '</span></div>' +
        '<p>' + i.desc + '</p><span class="meta">' + i.meta + '</span></div>';
    }).join('');

    box.innerHTML =
      '<div class="sic-in">' +
        '<h2>Storage on your device</h2>' +
        '<p>This website uses <b>no advertising, analytics, profiling or tracking</b> of any kind, and ' +
        'does not share your information with anyone for those purposes.</p>' +
        '<p>Some browser storage is <b>strictly necessary</b> for the site to function and is used ' +
        'regardless of your choice. Separately, we would like to store <b>optional</b> items that ' +
        'remember birth details you type into the interactive tools, so you do not have to enter them ' +
        'again. Those are written <b>only if you accept</b>, stay on this device, and are never ' +
        'transmitted to us or to anyone else.</p>' +
        '<div class="sic-btns">' +
          '<button type="button" data-c="accept">Accept optional storage</button>' +
          '<button type="button" data-c="reject">Reject optional storage</button>' +
        '</div>' +
        '<p class="sic-fine">Refusing costs you nothing — every feature keeps working, you will simply ' +
        'be asked for your details each visit. You can change your mind at any time from the ' +
        '<a href="privacy.html">Privacy Policy</a>. Notice version 1, ' + UPDATED + '. ' +
        '<button class="sic-more" type="button" id="sicMore">See exactly what is stored</button></p>' +
        '<div class="sic-tbl" id="sicTbl">' + rows + '</div>' +
      '</div>';

    document.body.appendChild(box);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { box.classList.add('on'); });
    });

    box.querySelector('#sicMore').addEventListener('click', function () {
      var t = box.querySelector('#sicTbl');
      var open = t.classList.toggle('on');
      this.textContent = open ? 'Hide the detail' : 'See exactly what is stored';
    });

    box.addEventListener('click', function (e) {
      var b = e.target.closest('[data-c]');
      if (!b) return;
      var v = b.dataset.c;
      write(v);
      if (v === 'reject') clearOptional();
      saved = read();
      publish(v);
      box.classList.remove('on');
      setTimeout(function () {
        if (box && box.parentNode) box.parentNode.removeChild(box);
        box = null;
      }, 600);
    });
  }

  function boot() { show(false); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
