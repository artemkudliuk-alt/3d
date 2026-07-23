/* Перший екран та паралакс-ефекти секцій NextWeb Hotels. */

const initHeroAnimation = () => {
  const intro = document.querySelector(".intro");
  if (!intro) return;

  const video = document.getElementById("hero-video");
  const titleWrap = intro.querySelector(".hero-title-wrap");
  const title = intro.querySelector(".hero-title");
  const subtitle = intro.querySelector(".hero-sub");
  const cta = intro.querySelector(".hero-cta");
  const header = document.querySelector(".header");

  const play = () => video?.play?.().catch(() => {});
  play();
  document.addEventListener("pointerdown", play, { once: true });

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  // Поява заголовка при завантаженні
  if (titleWrap) {
    gsap.fromTo(titleWrap, 
      { opacity: 0, y: 30 }, 
      { opacity: 1, y: 0, duration: 1.4, ease: "power3.out", delay: 0.1 }
    );
  }

  gsap.set(subtitle, { opacity: 0, y: 50 });
  gsap.set(cta, { opacity: 0, y: 40 });

  // Pinned timeline на 1-му екрані
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: intro,
      start: "top top",
      end: "+=350%",
      pin: true,
      pinSpacing: true,
      scrub: 1.5,
      anticipatePin: 1,
      refreshPriority: 10,
    }
  });

  tl.to(title, { y: -160, opacity: 0, duration: 2.0, ease: "power1.inOut" }, 0)
    .to(header, { autoAlpha: 0, y: -24, duration: 1.5, ease: "power1.inOut" }, 0)
    .to(subtitle, { opacity: 1, y: 0, pointerEvents: "auto", duration: 1.8, ease: "power1.out" }, 1.5)
    .to(cta, { opacity: 1, y: 0, pointerEvents: "auto", duration: 1.8, ease: "power1.out" }, 2.5)
    .to({}, { duration: 1.5 });

  if (video) {
    let idle;
    ScrollTrigger.create({
      trigger: intro,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => {
        const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 1500, 1.0);
        gsap.to(video, { playbackRate: boost, duration: 0.25, overwrite: true });
        clearTimeout(idle);
        idle = setTimeout(
          () => gsap.to(video, { playbackRate: 1, duration: 0.8, ease: "power2.out" }),
          120,
        );
      },
    });
  }

  // ============================================================
  // ПАРАЛАКС МІКРО-РУХИ ДЛЯ СЕКЦІЇ 2 (Наші проєкти) ТА СЕКЦІЇ 3
  // ============================================================
  
  // Section 2: Projects Header Parallax
  const projectsSection = document.querySelector(".projects");
  if (projectsSection) {
    const indexEl = projectsSection.querySelector(".container-index");
    const titleEl = projectsSection.querySelector("h2");
    const btnEl = projectsSection.querySelector("#open-catalog-btn");

    if (indexEl) {
      gsap.fromTo(indexEl,
        { y: 60, opacity: 0.3 },
        {
          y: -40,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: projectsSection,
            start: "top 90%",
            end: "top 20%",
            scrub: 1.2,
          }
        }
      );
    }

    if (titleEl) {
      gsap.fromTo(titleEl,
        { y: 50, opacity: 0.4 },
        {
          y: -25,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: projectsSection,
            start: "top 85%",
            end: "top 25%",
            scrub: 1.0,
          }
        }
      );
    }

    if (btnEl) {
      gsap.fromTo(btnEl,
        { y: 45, opacity: 0.4 },
        {
          y: -20,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: projectsSection,
            start: "top 85%",
            end: "top 25%",
            scrub: 1.4,
          }
        }
      );
    }
  }

  // Section 4: Testimonials Multi-Speed Parallax
  const testimonialsSection = document.querySelector(".testimonials-partners");
  if (testimonialsSection) {
    const leftCard = testimonialsSection.querySelector(".tp-card-left");
    const centerCard = testimonialsSection.querySelector(".tp-card-center-main");
    const rightPoster = testimonialsSection.querySelector(".tp-card-right");
    const headerBlock = testimonialsSection.querySelector(".tp-header-block");

    if (headerBlock) {
      gsap.fromTo(headerBlock,
        { y: 40, opacity: 0.4 },
        {
          y: -20,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: testimonialsSection,
            start: "top 85%",
            end: "top 25%",
            scrub: 1.0,
          }
        }
      );
    }

    if (leftCard) {
      gsap.fromTo(leftCard,
        { y: 50, opacity: 0.5 },
        {
          y: -30,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: testimonialsSection,
            start: "top 85%",
            end: "top 15%",
            scrub: 1.3,
          }
        }
      );
    }

    if (centerCard) {
      gsap.fromTo(centerCard,
        { y: 30, opacity: 0.6 },
        {
          y: -15,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: testimonialsSection,
            start: "top 85%",
            end: "top 15%",
            scrub: 1.0,
          }
        }
      );
    }

    if (rightPoster) {
      gsap.fromTo(rightPoster,
        { y: 70, opacity: 0.5 },
        {
          y: -50,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: testimonialsSection,
            start: "top 85%",
            end: "top 10%",
            scrub: 1.6,
          }
        }
      );
    }
  }

  // Section 3: Benefits Header Parallax
  const benefitsSection = document.querySelector(".benefits");
  if (benefitsSection) {
    const indexEl = benefitsSection.querySelector(".container-index");
    const titleEl = benefitsSection.querySelector("h2");

    if (indexEl) {
      gsap.fromTo(indexEl,
        { y: 60, opacity: 0.3 },
        {
          y: -35,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: benefitsSection,
            start: "top 90%",
            end: "top 20%",
            scrub: 1.2,
          }
        }
      );
    }

    if (titleEl) {
      gsap.fromTo(titleEl,
        { y: 50, opacity: 0.4 },
        {
          y: -20,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: benefitsSection,
            start: "top 85%",
            end: "top 25%",
            scrub: 1.0,
          }
        }
      );
    }
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initHeroAnimation);
} else {
  initHeroAnimation();
}

// Модальні вікна
(() => {
  const videoModal = document.getElementById("nw-video-modal");
  const modalVideo = document.getElementById("nw-modal-video");
  const modalTitle = document.getElementById("nw-video-title");
  const videoClose = document.getElementById("nw-video-close");

  const catalogModal = document.getElementById("nw-catalog-modal");
  const openCatalogBtn = document.getElementById("open-catalog-btn");
  const catalogClose = document.getElementById("nw-catalog-close");

  const openVideoModal = (src, title) => {
    if (!videoModal || !modalVideo) return;
    if (modalTitle) modalTitle.textContent = title || "3D-тур Готелем";
    modalVideo.src = src;
    modalVideo.currentTime = 0;
    videoModal.classList.add("active");
    videoModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modalVideo.play().catch(() => {});
  };

  const closeVideoModal = () => {
    if (!videoModal || !modalVideo) return;
    modalVideo.pause();
    modalVideo.src = "";
    videoModal.classList.remove("active");
    videoModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".nw-open-video-btn");
    if (btn) {
      const src = btn.getAttribute("data-video-src");
      const title = btn.getAttribute("data-title");
      openVideoModal(src, title);
    }
  });

  if (videoClose) videoClose.addEventListener("click", closeVideoModal);
  if (videoModal) {
    videoModal.addEventListener("click", (e) => {
      if (e.target.classList.contains("nw-modal__backdrop")) {
        closeVideoModal();
      }
    });
  }

  const openCatalog = () => {
    if (!catalogModal) return;
    catalogModal.classList.add("active");
    catalogModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeCatalog = () => {
    if (!catalogModal) return;
    catalogModal.classList.remove("active");
    catalogModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  if (openCatalogBtn) openCatalogBtn.addEventListener("click", openCatalog);
  if (catalogClose) catalogClose.addEventListener("click", closeCatalog);
  if (catalogModal) {
    catalogModal.addEventListener("click", (e) => {
      if (e.target.classList.contains("nw-modal__backdrop")) {
        closeCatalog();
      }
    });
  }
})();

// 4-Step Left Badge Automatic Fade Carousel (Every 3 seconds)
(() => {
  const container = document.getElementById("tp-badge-carousel");
  if (!container) return;

  const slides = container.querySelectorAll(".tp-badge-slide");
  if (!slides || slides.length === 0) return;

  let currentSlide = 0;
  setInterval(() => {
    slides[currentSlide].style.opacity = "0";
    slides[currentSlide].style.pointerEvents = "none";
    
    currentSlide = (currentSlide + 1) % slides.length;
    
    slides[currentSlide].style.opacity = "1";
    slides[currentSlide].style.pointerEvents = "auto";
  }, 3000);
})();
