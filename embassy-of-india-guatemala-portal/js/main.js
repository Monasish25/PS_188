/**
 * MHA SIH 2.0 - Main Interactions & UI Controller
 * Vanilla JavaScript implementation for Phase 1
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initAccessibilityControls();
  initMobileDrawer();
  initSearchModal();
  initReportDownloads();
  initLearnMoreModal();
  initParallaxAndHoverEffects();
});

/**
 * Sticky Glass Header on Scroll
 */
function initStickyHeader() {
  const header = document.querySelector('.main-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/**
 * Accessibility Controls: A-, A, A+ and Contrast Toggle
 */
function initAccessibilityControls() {
  const fontButtons = document.querySelectorAll('.btn-font-scale');
  fontButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      fontButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const size = btn.getAttribute('data-size');
      if (size === 'small') {
        document.body.dataset.fontSize = 'small';
      } else if (size === 'large') {
        document.body.dataset.fontSize = 'large';
      } else {
        document.body.dataset.fontSize = 'medium';
      }
      showToast(`Font scaling set to: ${size.toUpperCase()}`);
    });
  });

  // High contrast mode toggle
  const contrastBtn = document.getElementById('btn-toggle-contrast');
  if (contrastBtn) {
    contrastBtn.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.classList.toggle('high-contrast');
      const isHigh = document.body.classList.contains('high-contrast');
      contrastBtn.textContent = isHigh ? 'Normal Contrast' : 'High Contrast';
      showToast(isHigh ? 'High Contrast Mode Activated' : 'Standard Contrast Restored');
    });
  }

  // Language switch
  const langBtn = document.getElementById('btn-toggle-lang');
  if (langBtn) {
    let currentLang = 'EN';
    langBtn.addEventListener('click', (e) => {
      e.preventDefault();
      currentLang = currentLang === 'EN' ? 'HI' : 'EN';
      langBtn.textContent = currentLang === 'EN' ? 'हिंदी' : 'English';
      showToast(currentLang === 'HI' ? 'भाषा बदली गई: हिंदी (डेमो)' : 'Language switched: English');
    });
  }
}

/**
 * Mobile Navigation Drawer
 */
function initMobileDrawer() {
  const hamburger = document.querySelector('.btn-hamburger');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('btn-close-drawer');
  const backdrop = document.getElementById('drawer-backdrop');

  if (!hamburger || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  // Close when clicking mobile nav links
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/**
 * Search Modal
 */
function initSearchModal() {
  const searchBtns = document.querySelectorAll('.btn-search, [data-action="open-search"]');
  const searchModal = document.getElementById('search-modal');
  const searchInput = document.getElementById('global-search-input');
  const searchClose = document.getElementById('btn-close-search');

  if (!searchModal) return;

  const openSearch = (e) => {
    e?.preventDefault();
    searchModal.classList.add('active');
    setTimeout(() => searchInput?.focus(), 100);
  };

  const closeSearch = () => {
    searchModal.classList.remove('active');
  };

  searchBtns.forEach(btn => btn.addEventListener('click', openSearch));
  if (searchClose) searchClose.addEventListener('click', closeSearch);

  // Close on backdrop click
  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) closeSearch();
  });

  // Handle enter key in search
  searchInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const query = searchInput.value.trim();
      if (query) {
        showToast(`Search for "${query}": 14 matching records found in MHA repository.`);
        closeSearch();
      }
    }
  });
}

/**
 * Report Downloads Demonstration
 */
function initReportDownloads() {
  document.querySelectorAll('.report-download-btn, [data-download-report]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const reportName = btn.getAttribute('data-report') || 'MHA_Official_Document.pdf';
      const size = btn.getAttribute('data-size') || '2.4 MB';
      
      showToast(`Initiating secure download: ${reportName} (${size})`);
      
      // Simulate download progress
      setTimeout(() => {
        showToast(`✓ Download completed: ${reportName}`);
      }, 1400);
    });
  });
}

/**
 * Learn More Modal for About Section
 */
function initLearnMoreModal() {
  const openBtn = document.getElementById('btn-about-more');
  const modal = document.getElementById('about-modal');
  const closeBtn = document.getElementById('btn-close-about');

  if (!modal || !openBtn) return;

  openBtn.addEventListener('click', () => {
    modal.classList.add('active');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}

/**
 * Parallax and Glass Interactive Hovers
 */
function initParallaxAndHoverEffects() {
  const heroCard = document.querySelector('.hero-glass-card');
  if (heroCard && window.innerWidth > 1024) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      heroCard.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) translateY(-4px)`;
    });
  }
}

/**
 * Global Toast Notification Generator
 */
function showToast(message) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E45D24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}
