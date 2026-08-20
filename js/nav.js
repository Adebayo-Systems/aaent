/* =============================================
   AA ENTERTAINMENT — SHARED NAV BEHAVIOR
   Desktop dropdowns: hover on hover-capable pointers, click on touch.
   Mobile: full-screen overlay menu with expandable groups.
   ============================================= */
(function () {
  var hoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- Desktop dropdowns ---------- */
  var navItems = document.querySelectorAll('.nav-item');

  function closeAllDropdowns(except) {
    navItems.forEach(function (item) {
      if (item !== except) item.classList.remove('open');
    });
  }

  navItems.forEach(function (item) {
    var trigger = item.querySelector('.nav-trigger');
    if (!trigger) return;

    if (hoverCapable) {
      item.addEventListener('mouseenter', function () {
        closeAllDropdowns(item);
        item.classList.add('open');
      });
      item.addEventListener('mouseleave', function () {
        item.classList.remove('open');
      });
    }

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      var isOpen = item.classList.contains('open');
      closeAllDropdowns(item);
      item.classList.toggle('open', !isOpen);
    });

    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        item.classList.remove('open');
        trigger.blur();
      }
    });
  });

  document.addEventListener('click', function () {
    closeAllDropdowns(null);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAllDropdowns(null);
  });

  /* ---------- Mobile full-screen menu ---------- */
  var hamburgerBtn = document.getElementById('hamburgerBtn');
  var mobileOverlay = document.getElementById('mobileNavOverlay');
  var mobileCloseBtn = document.getElementById('mobileNavClose');

  function openMobileMenu() {
    mobileOverlay.classList.add('open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-lock-scroll');
  }

  function closeMobileMenu() {
    mobileOverlay.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-lock-scroll');
  }

  if (hamburgerBtn && mobileOverlay) {
    hamburgerBtn.addEventListener('click', function () {
      if (mobileOverlay.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', closeMobileMenu);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileOverlay && mobileOverlay.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // Close mobile menu after tapping any link inside it
  if (mobileOverlay) {
    mobileOverlay.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMobileMenu);
    });
  }

  // Accordion groups inside the mobile menu
  var mobileGroups = document.querySelectorAll('.mnav-group');
  mobileGroups.forEach(function (group) {
    var trigger = group.querySelector('.mnav-group-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', function () {
      var isOpen = group.classList.contains('open');
      mobileGroups.forEach(function (g) { g.classList.remove('open'); });
      group.classList.toggle('open', !isOpen);
    });
  });
})();
