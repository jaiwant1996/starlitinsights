/* ============================================================================
   STARLIT INSIGHTS — SHARED BIRTH PROFILE
   ----------------------------------------------------------------------------
   One birth profile, remembered on the visitor's own device and reused by every
   tool on the site: the sidereal calculator on the home page, the 3D birth sky,
   and the night-sky locator.

   Must load BEFORE any page script that reads it, and AFTER consent.js:
       <script src="consent.js"></script>
       <script src="profile.js"></script>
   Neither may be deferred — the inline page scripts run during parsing and
   need window.siProfile to already exist.

   Nothing is written unless optional storage was accepted on the consent
   notice. Nothing ever leaves the device.

   API
     siProfile.get()            -> {d,mo,y,h,mi,lat,lon,tz,place} or null
     siProfile.set(partial)     -> merges and saves, returns the merged profile
     siProfile.clear()          -> forgets everything
     siProfile.has()            -> true if a usable date exists
     siProfile.label()          -> "24 Jul 1996 · 10:15 · Kanpur"
     siProfile.onChange(fn)     -> called after any set/clear
   ========================================================================== */
(function () {
  "use strict";

  var KEY = "si_birth";
  var MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var subs = [];

  function allowed() {
    return !!(window.siConsent && window.siConsent.allowOptional && window.siConsent.allowOptional());
  }
  function raw() {
    if (!allowed()) return null;
    try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) { return null; }
  }
  function save(v) {
    if (!allowed()) return;
    try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {}
  }
  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  var API = {
    get: function () {
      var v = raw();
      if (!v || typeof v !== 'object') return null;
      return v;
    },
    has: function () {
      var v = API.get();
      return !!(v && v.y && v.mo && v.d);
    },
    set: function (partial) {
      var cur = API.get() || {};
      for (var k in partial) {
        if (partial[k] !== undefined && partial[k] !== null && partial[k] !== '') cur[k] = partial[k];
      }
      cur.saved = new Date().toISOString();
      save(cur);
      for (var i = 0; i < subs.length; i++) { try { subs[i](cur); } catch (e) {} }
      return cur;
    },
    clear: function () {
      try { localStorage.removeItem(KEY); } catch (e) {}
      for (var i = 0; i < subs.length; i++) { try { subs[i](null); } catch (e) {} }
    },
    label: function () {
      var v = API.get();
      if (!v || !v.y) return '';
      var s = v.d + ' ' + MON[v.mo - 1] + ' ' + v.y;
      if (v.h !== undefined && v.h !== null && v.h !== '') s += ' · ' + pad(+v.h) + ':' + pad(+(v.mi || 0));
      if (v.place) s += ' · ' + v.place;
      return s;
    },
    onChange: function (fn) { if (typeof fn === 'function') subs.push(fn); }
  };

  window.siProfile = API;

  /* --------------------------------------------------------------------
     A small bar the pages can drop in to show what is remembered.
     mount(el, onUse) renders into el and wires the two buttons.
     -------------------------------------------------------------------- */
  var BARCSS = [
    '.sipbar{display:none;align-items:center;gap:10px;flex-wrap:wrap;',
      'padding:9px 12px;border-radius:10px;border:1px solid rgba(95,227,216,.3);',
      'background:rgba(95,227,216,.07);margin-bottom:14px}',
    '.sipbar.on{display:flex}',
    '.sipbar>span{font-family:"JetBrains Mono",ui-monospace,monospace;font-size:8.5px;',
      'letter-spacing:.16em;text-transform:uppercase;color:#5fe3d8}',
    '.sipbar>b{font-family:"Space Grotesk",system-ui,sans-serif;font-weight:500;font-size:.82rem;',
      'color:#eef2fa;flex:1;min-width:0}',
    '.sipbar button{padding:5px 11px;border-radius:100px;cursor:pointer;background:none;',
      'border:1px solid rgba(255,255,255,.2);color:#6f7c96;',
      'font-family:"JetBrains Mono",ui-monospace,monospace;font-size:8.5px;letter-spacing:.13em;',
      'text-transform:uppercase;transition:.25s}',
    '.sipbar button:hover{color:#ff9db2;border-color:#ff9db2}',
    '.sipbar button.use:hover{color:#f2c879;border-color:#f2c879}'
  ].join('');
  var styled = false;

  API.mount = function (el, onUse) {
    if (!el) return function () {};
    if (!styled) {
      var st = document.createElement('style');
      st.textContent = BARCSS;
      (document.head || document.documentElement).appendChild(st);
      styled = true;
    }
    el.className = 'sipbar';
    function render() {
      if (!API.has()) { el.classList.remove('on'); el.innerHTML = ''; return; }
      el.innerHTML = '<span>Saved on this device</span><b>' + API.label() + '</b>' +
        (onUse ? '<button type="button" class="use" data-a="use">Use</button>' : '') +
        '<button type="button" data-a="forget">Forget</button>';
      el.classList.add('on');
    }
    el.addEventListener('click', function (e) {
      var b = e.target.closest('[data-a]');
      if (!b) return;
      if (b.dataset.a === 'forget') { API.clear(); render(); }
      else if (onUse) { onUse(API.get()); }
    });
    API.onChange(render);
    render();
    return render;
  };
})();
