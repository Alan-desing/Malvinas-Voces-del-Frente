/* ==========================================================================
   MALVINAS: VOCES DEL FRENTE - JavaScript Interactivo Robust (Vanilla Fallback)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

  // Helper para abrir cualquier modal de forma segura (con o sin Bootstrap JS)
  function showModal(modalId) {
    const modalEl = document.getElementById(modalId);
    if (!modalEl) return;

    if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
      const instance = bootstrap.Modal.getOrCreateInstance(modalEl);
      instance.show();
    } else {
      // Fallback puro en CSS/Vanilla JS
      modalEl.classList.add('show');
      modalEl.style.display = 'block';
      modalEl.removeAttribute('aria-hidden');
      modalEl.setAttribute('aria-modal', 'true');

      // Crear backdrop si no existe
      let backdrop = document.querySelector('.modal-backdrop');
      if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop fade show';
        document.body.appendChild(backdrop);
      }
      document.body.classList.add('modal-open');
    }
  }

  // Helper para cerrar modal
  function hideModal(modalEl) {
    if (!modalEl) return;

    if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
      const instance = bootstrap.Modal.getInstance(modalEl);
      if (instance) instance.hide();
    }
    
    // Fallback siempre activo para asegurar cierre
    modalEl.classList.remove('show');
    modalEl.style.display = 'none';
    modalEl.setAttribute('aria-hidden', 'true');
    modalEl.removeAttribute('aria-modal');

    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) backdrop.remove();
    document.body.classList.remove('modal-open');
  }

  // Delegar eventos de cierre en botones close
  document.querySelectorAll('[data-bs-dismiss="modal"]').forEach(btn => {
    btn.addEventListener('click', function () {
      const modalEl = this.closest('.modal');
      hideModal(modalEl);
      const demoIframe = document.getElementById('demoIframe');
      if (demoIframe && modalEl && modalEl.id === 'videoModal') {
        demoIframe.setAttribute('src', '');
      }
    });
  });

  // 1. Scroll Effect en Navbar
  const navbar = document.querySelector('.navbar-custom');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.classList.add('shadow-lg');
        navbar.style.background = 'rgba(7, 9, 14, 0.98)';
      } else {
        navbar.classList.remove('shadow-lg');
        navbar.style.background = 'rgba(11, 13, 20, 0.9)';
      }
    });
  }

  // 2. Control del Tráiler de Vídeo
  const videoPoster = document.getElementById('videoPoster');
  const demoIframe = document.getElementById('demoIframe');

  if (videoPoster) {
    videoPoster.addEventListener('click', function () {
      const defaultVideoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";
      const videoSrc = videoPoster.getAttribute('data-video-src') || defaultVideoUrl;
      if (demoIframe) demoIframe.setAttribute('src', videoSrc);
      showModal('videoModal');
    });
  }

  // 3. Botón de Descarga
  const downloadBtn = document.getElementById('downloadDemoBtn');
  const downloadCountSpan = document.getElementById('downloadCount');
  let count = 342;

  if (downloadBtn) {
    downloadBtn.addEventListener('click', function (e) {
      count++;
      if (downloadCountSpan) {
        downloadCountSpan.innerText = count.toLocaleString();
      }

      const hasRealExe = downloadBtn.getAttribute('href') !== '#' && downloadBtn.getAttribute('href') !== '';
      if (!hasRealExe) {
        e.preventDefault();
        showModal('downloadInstructionsModal');
      }
    });
  }

  // 4. Copiar Enlace
  const copyLinkBtn = document.getElementById('copyLinkBtn');
  if (copyLinkBtn) {
    copyLinkBtn.addEventListener('click', function () {
      const urlToCopy = window.location.href;
      navigator.clipboard.writeText(urlToCopy).then(() => {
        const originalText = copyLinkBtn.innerHTML;
        copyLinkBtn.innerHTML = '<i class="fas fa-check me-1"></i> ¡Enlace Copiado!';
        copyLinkBtn.classList.replace('btn-tactical-outline', 'btn-success');
        
        setTimeout(() => {
          copyLinkBtn.innerHTML = originalText;
          copyLinkBtn.classList.replace('btn-success', 'btn-tactical-outline');
        }, 2500);
      });
    });
  }

  // 5. Lightbox Capturas
  const screenshotCards = document.querySelectorAll('.screenshot-card');
  const lightboxImg = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');

  screenshotCards.forEach(card => {
    card.addEventListener('click', function () {
      const img = card.querySelector('img');
      const title = card.getAttribute('data-title') || 'Captura de Desarrollo';
      const desc = card.getAttribute('data-desc') || 'Malvinas: Voces del Frente';
      
      if (img && lightboxImg) {
        lightboxImg.src = img.src;
        if (lightboxCaption) {
          lightboxCaption.innerHTML = `<strong>${title}</strong><br><small class="text-muted">${desc}</small>`;
        }
        showModal('lightboxModal');
      }
    });
  });

  // 6. Formulario Feedback
  const feedbackForm = document.getElementById('feedbackForm');
  const feedbackAlert = document.getElementById('feedbackAlert');

  if (feedbackForm) {
    feedbackForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (feedbackAlert) feedbackAlert.classList.remove('d-none');
      feedbackForm.reset();

      setTimeout(() => {
        if (feedbackAlert) feedbackAlert.classList.add('d-none');
      }, 5000);
    });
  }

});
