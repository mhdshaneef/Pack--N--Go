document.addEventListener('DOMContentLoaded', () => {
  const newsletterModal = document.getElementById('newsletterModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const newsletterForm = document.getElementById('newsletterForm');
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileCloseDrawer = document.getElementById('mobileCloseDrawer');
  let hasModalTriggered = false;

  function openModal() {
    if (newsletterModal) {
      newsletterModal.classList.add('active');
      hasModalTriggered = true;
    }
  }

  function closeModal() {
    if (newsletterModal) {
      newsletterModal.classList.remove('active');
    }
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  if (newsletterModal) {
    newsletterModal.addEventListener('click', (e) => {
      if (e.target === newsletterModal) {
        closeModal();
      }
    });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert("Subscribed to Pack 'N Go!");
      closeModal();
    });
  }

  // Mobile Drawer Toggle
  if (mobileMenuToggle && mobileDrawer) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('active');
    });
  }

  if (mobileCloseDrawer && mobileDrawer) {
    mobileCloseDrawer.addEventListener('click', () => {
      mobileDrawer.classList.remove('active');
    });
  }

  // Close drawer on link click
  if (mobileDrawer) {
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
      });
    });
  }

  window.addEventListener('scroll', () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const bottomThreshold = document.documentElement.scrollHeight - 260;

    if (!hasModalTriggered && scrollPosition >= bottomThreshold) {
      openModal();
    }
  });

  // Property gallery (8 slides support)
  const gallery = document.getElementById('propertyGallery');
  if (gallery) {
    const slides = [...gallery.querySelectorAll('.property-gallery-slide')];
    const dots = [...gallery.querySelectorAll('[data-property-slide]')];
    const prev = gallery.querySelector('.property-gallery-prev');
    const next = gallery.querySelector('.property-gallery-next');
    let current = 0;
    let timer;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    function show(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle('is-active', i === current));
      dots.forEach((dot, i) => dot.classList.toggle('is-active', i === current));
    }
    
    function restart() {
      clearInterval(timer);
      if (!reducedMotion) {
        timer = setInterval(() => show(current + 1), 6500);
      }
    }
    
    if (prev) {
      prev.addEventListener('click', () => { show(current - 1); restart(); });
    }
    if (next) {
      next.addEventListener('click', () => { show(current + 1); restart(); });
    }
    
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const slideIndex = Number(dot.dataset.propertySlide);
        show(slideIndex);
        restart();
      });
    });
    
    gallery.addEventListener('mouseenter', () => clearInterval(timer));
    gallery.addEventListener('mouseleave', restart);
    
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') { show(current - 1); restart(); }
      if (e.key === 'ArrowRight') { show(current + 1); restart(); }
    });
    
    restart();
  }
});
window.addEventListener('load', () => {
  const preloader = document.getElementById('pagePreloader');
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => preloader.remove(), 500);
  }
});




