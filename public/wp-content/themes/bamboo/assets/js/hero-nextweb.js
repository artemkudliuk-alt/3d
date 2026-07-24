/* Перший екран, 1-2-3 каскадний паралакс та 4 інтерактивні відгуки NextWeb Hotels. */

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
  // ПАРАЛАКС СЕКЦІЇ 2 (Наші проєкти)
  // ============================================================
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
            scrub: 0.8,
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
            scrub: 0.6,
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
            scrub: 0.8,
          }
        }
      );
    }
  }

  // ============================================================
  // ПАРАЛАКС СЕКЦІЇ 3 (Переваги)
  // ============================================================
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
            scrub: 0.8,
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
            scrub: 0.6,
          }
        }
      );
    }
  }

  // ============================================================
  // СЕКЦІЯ 4: КАСКАДНИЙ 1-2-3 ПАРАЛАКС (REVIEW -> СПРАВА -> СЛІВА)
  // ============================================================
  const testimonialsSection = document.querySelector(".testimonials-partners");
  if (testimonialsSection) {
    const headerGroup = testimonialsSection.querySelector(".nw-section4-header-group");
    const centerCard = testimonialsSection.querySelector(".nw-parallax-center");
    const rightPoster = testimonialsSection.querySelector(".nw-parallax-right");
    const leftCard = testimonialsSection.querySelector(".nw-parallax-left");

    // 0. Заголовок (004 + Title)
    if (headerGroup) {
      gsap.fromTo(headerGroup,
        { y: -160 },
        {
          y: 120,
          ease: "none",
          scrollTrigger: {
            trigger: testimonialsSection,
            start: "top 95%",
            end: "bottom 5%",
            scrub: 1.5,
            invalidateOnRefresh: true,
            refreshPriority: -1,
          }
        }
      );
    }

    // 1-Й НА СЦЕНУ (Перша картка Review): Підтягується ПЕРШОЮ
    if (centerCard) {
      gsap.fromTo(centerCard,
        { y: 220 },
        {
          y: -40,
          ease: "power1.out",
          scrollTrigger: {
            trigger: testimonialsSection,
            start: "top 95%",
            end: "top 20%",
            scrub: 0.9,
            invalidateOnRefresh: true,
            refreshPriority: -1,
          }
        }
      );
    }

    // 2-Й НА СЦЕНУ (Друга картка Справа): Підтягується ДРУГОЮ одразу за Review
    if (rightPoster) {
      gsap.fromTo(rightPoster,
        { y: 280 },
        {
          y: -60,
          ease: "power1.out",
          scrollTrigger: {
            trigger: testimonialsSection,
            start: "top 90%",
            end: "top 15%",
            scrub: 1.2,
            invalidateOnRefresh: true,
            refreshPriority: -1,
          }
        }
      );
    }

    // 3-Й НА СЦЕНУ (Третя картка Сліва): Доганяє ТРЕТЬОЮ через декілька пікселів
    if (leftCard) {
      gsap.fromTo(leftCard,
        { y: 340 },
        {
          y: -80,
          ease: "power1.out",
          scrollTrigger: {
            trigger: testimonialsSection,
            start: "top 85%",
            end: "top 10%",
            scrub: 1.5,
            invalidateOnRefresh: true,
            refreshPriority: -1,
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

// ============================================================
// 4 ИНТЕРАКТИВНЫХ ОТЗЫВА С ПЕРЕКЛЮЧЕНИЕМ И СИНХРОНИЗАЦИЕЙ
// ============================================================
(() => {
  const testimonialsData = [
    {
      name: "Іван Демідов",
      role: "Управляючий директор Grand Plaza Hotel",
      badge: "+45% до конверсії",
      quote: "«Після інтеграції 3D-туру від NextWeb час перебування гостей на сторінках номерного фонду зріс майже вдвічі. Гості бронюють номери преміум-сегменту значно впевненіше, оскільки бачать кожен куточок та краєвид з вікна у реальному часі.»",
      avatar: "/media/gen/testimonials/avatar1.png",
      poster: "/media/gen/case-pool.webp"
    },
    {
      name: "Олена Ковальчук",
      role: "Маркетинг-директор Boutique Resort & Spa",
      badge: "+3.2x переглядів",
      quote: "«Наші гості відзначили, що віртуальне занурення в інтер'єри перед бронюванням зняло всі сумніви. Прямі бронювання зросли на третину за перші 2 місяці роботи 3D-двигуна!»",
      avatar: "/media/gen/testimonials/avatar2.png",
      poster: "/media/gen/case-ocean.webp"
    },
    {
      name: "Марк Березовський",
      role: "Генеральний менеджер Riverside Luxury Suites",
      badge: "+80% WOW-ефект",
      quote: "«Інтерактивний 3D-контент дозволив показати ексклюзивні панорамні види з пентхаусів. Гості замовляють найдорожчі номери без вагань, оскільки візуалізація виглядає на 100% реалістично.»",
      avatar: "/media/gen/testimonials/avatar3.png",
      poster: "/media/gen/case-interior.webp"
    },
    {
      name: "Вікторія Громова",
      role: "Бренд-директорка Premier Palace Chain",
      badge: "60 FPS потік",
      quote: "«Впровадження 3D-технології від NextWeb вивело наш веб-сайт на світовий рівень Awwwards. Це найкраща інвестиція в бренд готелю та довіру преміум-клієнтів.»",
      avatar: "/media/gen/testimonials/avatar4.png",
      poster: "/media/gen/case-spa.webp"
    }
  ];

  const tabBtns = document.querySelectorAll(".tp-tab-btn");
  const slides = document.querySelectorAll(".tp-badge-slide");
  const activeAvatar = document.getElementById("tp-active-avatar");
  const activeName = document.getElementById("tp-active-name");
  const activeRole = document.getElementById("tp-active-role");
  const activeBadge = document.getElementById("tp-active-badge");
  const activeQuote = document.getElementById("tp-active-quote");
  const activePoster = document.getElementById("tp-active-poster");

  let currentIdx = 0;

  const switchToIndex = (idx) => {
    currentIdx = idx;
    const data = testimonialsData[idx];
    if (!data) return;

    // 1. Оновлення кнопок табів 01-04
    tabBtns.forEach((btn, bIdx) => {
      if (bIdx === idx) {
        btn.classList.add("active");
        btn.style.background = "#0c0c10";
        btn.style.color = "#ffffff";
        btn.style.border = "1px solid #0c0c10";
      } else {
        btn.classList.remove("active");
        btn.style.background = "#ffffff";
        btn.style.color = "#666678";
        btn.style.border = "1px solid rgba(0, 0, 0, 0.14)";
      }
    });

    // 2. Оновлення лівої плашки слайдів
    slides.forEach((slide, sIdx) => {
      if (sIdx === idx) {
        slide.style.opacity = "1";
        slide.style.pointerEvents = "auto";
      } else {
        slide.style.opacity = "0";
        slide.style.pointerEvents = "none";
      }
    });

    // 3. Плавне оновлення центральної картки відгуку
    if (activeName) activeName.textContent = data.name;
    if (activeRole) activeRole.textContent = data.role;
    if (activeBadge) activeBadge.textContent = data.badge;
    if (activeQuote) activeQuote.textContent = data.quote;
    if (activeAvatar) activeAvatar.src = data.avatar;
    if (activePoster) activePoster.src = data.poster;
  };

  // Ручне переключення при кліку на таби 01, 02, 03, 04
  tabBtns.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      switchToIndex(idx);
    });
  });

  // Автоматичне переключення кожні 4 секунди
  setInterval(() => {
    const nextIdx = (currentIdx + 1) % testimonialsData.length;
    switchToIndex(nextIdx);
  }, 4000);
})();

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
