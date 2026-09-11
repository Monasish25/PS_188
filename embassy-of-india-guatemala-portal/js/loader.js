/**
 * MHA SIH 2.0 - Multi-stage Loading & Skeleton Transition Controller
 * Implements Step 1 (Initial Loader) -> Step 2 (Skeleton Screen) -> Step 3 (Real Homepage Reveal)
 */

document.addEventListener('DOMContentLoaded', () => {
  const initialLoader = document.getElementById('initial-loader');
  const skeletonScreen = document.getElementById('skeleton-screen');
  const mainContent = document.getElementById('main-content');
  const particleContainer = document.querySelector('.loader-particles');

  // 1. Generate ambient floating glass particles
  if (particleContainer) {
    for (let i = 0; i < 16; i++) {
      const particle = document.createElement('div');
      particle.className = 'loader-particle';
      const size = Math.random() * 5 + 3;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.opacity = (Math.random() * 0.4 + 0.2).toString();
      particle.style.animationDuration = `${Math.random() * 3 + 3}s`;
      particle.style.animationDelay = `${Math.random() * 2}s`;
      particleContainer.appendChild(particle);
    }
  }

  // 2. Stage 1 Duration: ~1.2s
  const STAGE_1_DURATION = 1200; // ms
  // 3. Stage 2 Skeleton Duration: ~750ms
  const STAGE_2_DURATION = 750; // ms

  setTimeout(() => {
    // Transition from Initial Loader to Skeleton
    if (initialLoader) {
      initialLoader.classList.add('hidden');
    }

    if (skeletonScreen) {
      skeletonScreen.classList.remove('hidden');
      skeletonScreen.style.opacity = '1';
    }

    // After Skeleton Display: Smooth blur reduction & reveal real page
    setTimeout(() => {
      if (skeletonScreen) {
        skeletonScreen.style.transition = 'opacity 0.5s ease, filter 0.5s ease';
        skeletonScreen.style.opacity = '0';
        skeletonScreen.style.filter = 'blur(6px)';
        
        setTimeout(() => {
          skeletonScreen.classList.add('hidden');
        }, 500);
      }

      if (mainContent) {
        mainContent.style.display = 'block';
        mainContent.classList.add('animate-blur-reveal');
        
        // Trigger any entrance animations on real content
        document.dispatchEvent(new CustomEvent('mha:page-ready'));
      }
    }, STAGE_2_DURATION);
  }, STAGE_1_DURATION);
});

/**
 * Utility function to replay the loader demo
 */
window.replayLoaderSequence = function() {
  const initialLoader = document.getElementById('initial-loader');
  const skeletonScreen = document.getElementById('skeleton-screen');
  const mainContent = document.getElementById('main-content');

  if (mainContent) mainContent.style.display = 'none';
  if (skeletonScreen) {
    skeletonScreen.classList.remove('hidden');
    skeletonScreen.style.opacity = '0';
    skeletonScreen.style.filter = 'none';
  }
  if (initialLoader) {
    initialLoader.classList.remove('hidden');
  }

  // Re-run
  setTimeout(() => {
    if (initialLoader) initialLoader.classList.add('hidden');
    if (skeletonScreen) {
      skeletonScreen.style.opacity = '1';
    }

    setTimeout(() => {
      if (skeletonScreen) {
        skeletonScreen.style.opacity = '0';
        skeletonScreen.style.filter = 'blur(6px)';
        setTimeout(() => skeletonScreen.classList.add('hidden'), 400);
      }
      if (mainContent) {
        mainContent.style.display = 'block';
        mainContent.classList.remove('animate-blur-reveal');
        void mainContent.offsetWidth; // trigger reflow
        mainContent.classList.add('animate-blur-reveal');
      }
    }, 750);
  }, 1200);
};
