/* ─────────────────────────────────────────────────────────────────────────
   /producthunt — claim mechanism.

   The live page's claim button is an anchor that scrolls to a paragraph
   telling you to press the button. This replaces it with a three-state
   modal: paste, automatic checks, code issued on the spot.

   Everything here is a front-end demonstration of the flow — the code is
   generated locally so the interaction can be reviewed end to end without
   a backend. The handover note in STYLE-PRODUCTHUNT.md lists the two
   endpoints a real build needs.
   ───────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var mk = document.getElementById('mk');
  if (!mk) return;

  var lastFocus = null;
  var lane = 'ph';

  /* ── open / close ────────────────────────────────────────────────────── */
  function open(prefill) {
    lastFocus = document.activeElement;
    show(1);
    var link = document.getElementById('mkLink');
    if (prefill) link.value = prefill;
    mk.classList.add('on');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { link.focus(); }, 60);
  }

  function close() {
    mk.classList.remove('on');
    document.body.style.overflow = '';
    reset();
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function reset() {
    ['mkLinkErr', 'mkMailErr'].forEach(function (id) {
      document.getElementById(id).classList.remove('on');
    });
    document.querySelectorAll('.mk-work-row').forEach(function (r) {
      r.classList.remove('done');
      r.querySelector('.t').textContent = '—';
    });
  }

  function show(n) {
    mk.querySelectorAll('.mk-step').forEach(function (s) {
      s.classList.toggle('on', Number(s.dataset.step) === n);
    });
    mk.querySelectorAll('.mk-rail i').forEach(function (i) {
      i.classList.toggle('on', Number(i.dataset.rail) <= n);
    });
    mk.querySelector('.mk-card').scrollTop = 0;
  }

  document.querySelectorAll('[data-open-claim]').forEach(function (b) {
    b.addEventListener('click', function () { open(''); });
  });
  document.querySelectorAll('[data-close-claim]').forEach(function (b) {
    b.addEventListener('click', close);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mk.classList.contains('on')) close();
  });

  /* keep focus inside the dialog while it is open */
  mk.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var step = mk.querySelector('.mk-step.on');
    var f = Array.prototype.slice.call(
      mk.querySelectorAll('.mk-x, .mk-step.on button, .mk-step.on input')
    ).filter(function (el) { return el.offsetParent !== null; });
    if (!f.length || !step) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* ── lane picker ─────────────────────────────────────────────────────── */
  mk.querySelectorAll('.mk-lane').forEach(function (b) {
    b.addEventListener('click', function () {
      mk.querySelectorAll('.mk-lane').forEach(function (x) { x.classList.remove('sel'); });
      b.classList.add('sel');
      lane = b.dataset.lane;
      var input = document.getElementById('mkLink');
      input.placeholder = lane === 'ph'
        ? 'https://www.producthunt.com/posts/openline#comment-…'
        : 'https://x.com/you/status/…';
      input.focus();
    });
  });

  /* ── validation ──────────────────────────────────────────────────────── */
  function isLink(v) { return /^https?:\/\/[^\s.]+\.[^\s]{2,}$/i.test(v.trim()); }
  function isMail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); }

  function code() {
    var a = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789', s = '';
    for (var i = 0; i < 6; i++) s += a[Math.floor(Math.random() * a.length)];
    return 'PH-10-' + s;
  }

  /* ── submit → checks → issued ────────────────────────────────────────── */
  document.getElementById('mkSubmit').addEventListener('click', function () {
    var link = document.getElementById('mkLink');
    var mail = document.getElementById('mkMail');
    var lerr = document.getElementById('mkLinkErr');
    var merr = document.getElementById('mkMailErr');
    var ok = true;

    lerr.classList.toggle('on', !isLink(link.value));
    if (!isLink(link.value)) { ok = false; link.focus(); }
    merr.classList.toggle('on', !isMail(mail.value));
    if (!isMail(mail.value)) { ok = false; if (isLink(link.value)) mail.focus(); }
    if (!ok) return;

    show(2);
    var rows = mk.querySelectorAll('.mk-work-row');
    var labels = ['0.3s', '0.6s', '0.9s'];
    rows.forEach(function (r, i) {
      setTimeout(function () {
        r.classList.add('done');
        r.querySelector('.t').textContent = labels[i];
      }, 420 + i * 430);
    });

    setTimeout(function () {
      document.getElementById('mkCode').textContent = code();
      document.getElementById('mkMailEcho').textContent = mail.value.trim();
      show(3);
    }, 2000);
  });

  document.getElementById('mkAnother').addEventListener('click', function () {
    document.getElementById('mkLink').value = '';
    reset();
    show(1);
    document.getElementById('mkLink').focus();
  });

  /* ── copy ────────────────────────────────────────────────────────────── */
  var copyBtn = document.getElementById('mkCopy');
  copyBtn.addEventListener('click', function () {
    var v = document.getElementById('mkCode').textContent;
    var done = function () {
      var was = copyBtn.innerHTML;
      copyBtn.textContent = 'Copied';
      setTimeout(function () { copyBtn.innerHTML = was; }, 1600);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(v).then(done, done);
    } else { done(); }
  });

  /* ── the inline field hands straight to the modal ────────────────────── */
  var inline = document.getElementById('inlineLink');
  var inlineErr = document.getElementById('inlineErr');

  function handoff() {
    var v = inline.value.trim();
    if (!v) { open(''); return; }
    if (!isLink(v)) { inlineErr.classList.add('on'); inline.focus(); return; }
    inlineErr.classList.remove('on');
    open(v);
    setTimeout(function () { document.getElementById('mkMail').focus(); }, 120);
  }

  document.getElementById('inlineGo').addEventListener('click', handoff);
  inline.addEventListener('keydown', function (e) { if (e.key === 'Enter') handoff(); });
  inline.addEventListener('input', function () { inlineErr.classList.remove('on'); });
})();
