/* ============================================================================
   STARLIT INSIGHTS — COOKIE / STORAGE NOTICE
   ----------------------------------------------------------------------------
   Self-contained. Add one line to any page:
       <script src="consent.js" defer></script>

   Shows a dismissible notice on first visit, records the choice in
   localStorage, and exposes window.siConsent so other scripts can check it.

   Delete this file to remove the feature — nothing else depends on it.
   ========================================================================== */
(function () {
  "use strict";

  var KEY = "si_consent_v1";
  var choice = null;
  try { choice = localStorage.getItem(KEY); } catch (e) {}

  window.siConsent = {
    granted: choice === "all",
    essentialOnly: choice === "essential",
    answered: !!choice
  };

  if (choice) return;                    /* already decided — stay quiet */

  var CSS = [
    '.si-cc{position:fixed;left:14px;right:14px;bottom:14px;z-index:400;',
      'max-width:560px;margin-inline:auto;padding:18px 20px 16px;border-radius:18px;',
      'border:1px solid rgba(255,255,255,.17);background:rgba(8,13,24,.94);',
      'backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px);',
      'box-shadow:0 28px 70px -28px rgba(0,0,0,.95);',
      'font-family:Inter,system-ui,-apple-system,sans-serif;color:#eef2fa;',
      'transform:translateY(140%);transition:transform .55s cubic-bezier(.22,1,.36,1)}',
    '.si-cc.on{transform:none}',
    '.si-cc b{display:block;font-family:"Space Grotesk",system-ui,sans-serif;font-weight:500;',
      'font-size:.98rem;letter-spacing:-.02em;margin-bottom:7px}',
    '.si-cc p{font-size:.82rem;line-height:1.62;color:#aeb8cc;margin:0 0 14px}',
    '.si-cc a{color:#5fe3d8;text-decoration:none;border-bottom:1px solid rgba(95,227,216,.4)}',
    '.si-cc a:hover{color:#8ff0e8}',
    '.si-ccb{display:flex;gap:9px;flex-wrap:wrap}',
    '.si-ccb button{flex:1 1 150px;padding:11px 16px;border-radius:100px;cursor:pointer;',
      'font-family:"Space Grotesk",system-ui,sans-serif;font-weight:500;font-size:.85rem;',
      'transition:transform .25s,box-shadow .25s,background .25s;-webkit-tap-highlight-color:transparent}',
    '.si-cc-ok{border:none;color:#160f02;background:linear-gradient(105deg,#f2c879,#c9973f);',
      'box-shadow:0 8px 24px -10px rgba(242,200,121,.7)}',
    '.si-cc-ok:hover{transform:translateY(-1px)}',
    '.si-cc-no{border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.05);color:#aeb8cc}',
    '.si-cc-no:hover{color:#eef2fa;background:rgba(255,255,255,.1)}',
    '@media(max-width:520px){.si-cc{padding:16px 16px 14px}.si-cc p{font-size:.78rem}}',
    '@media(prefers-reduced-motion:reduce){.si-cc{transition:none}}'
  ].join('');

  function build() {
    var st = document.createElement('style');
    st.textContent = CSS;
    document.head.appendChild(st);

    /* the policy pages sit at the root, so a relative link works everywhere */
    var box = document.createElement('div');
    box.className = 'si-cc';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', 'Cookie and storage notice');
    box.innerHTML =
      '<b>A note about storage</b>' +
      '<p>This site sets no advertising or analytics cookies. What it does use is ' +
      '<em>local storage</em> on your own device, to remember birth details you enter so you ' +
      'do not have to type them again — that never leaves your browser. The embedded booking ' +
      'calendar sets its own cookies when you use it. See the ' +
      '<a href="privacy.html">Privacy Policy</a>.</p>' +
      '<div class="si-ccb">' +
        '<button class="si-cc-ok" type="button" data-c="all">Fine by me</button>' +
        '<button class="si-cc-no" type="button" data-c="essential">Essential only</button>' +
      '</div>';
    document.body.appendChild(box);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { box.classList.add('on'); });
    });

    box.addEventListener('click', function (e) {
      var b = e.target.closest('[data-c]');
      if (!b) return;
      var v = b.dataset.c;
      try { localStorage.setItem(KEY, v); } catch (err) {}
      window.siConsent = { granted: v === 'all', essentialOnly: v === 'essential', answered: true };
      if (v === 'essential') {
        /* drop anything we remembered for convenience */
        try {
          localStorage.removeItem('si_birth');
          localStorage.removeItem('si_place');
        } catch (err) {}
      }
      box.classList.remove('on');
      setTimeout(function () { if (box.parentNode) box.parentNode.removeChild(box); }, 600);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
