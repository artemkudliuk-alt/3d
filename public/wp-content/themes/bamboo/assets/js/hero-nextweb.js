/* Перший екран, 3-етапний плавний скролл та 4 відгуки з м'якими переходами NextWeb Hotels. */

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
  // СЕКЦІЯ 4: ГЛУБОКИЙ ПООЧЕРЕДНЫЙ ЗАЕЗД (1 -> 2 -> 3)
  // КАРТОЧКА 2 ТА 3 СПОЧАТКУ СХОВАНІ ГЛИБОКО ПІД ЕКРАНОМ (500px / 700px)
  // ============================================================
  const testimonialsSection = document.querySelector(".testimonials-partners");
  if (testimonialsSection) {
    const headerGroup = testimonialsSection.querySelector(".nw-section4-header-group");
    const centerCard = testimonialsSection.querySelector(".nw-parallax-center");
    const rightPoster = testimonialsSection.querySelector(".nw-parallax-right");
    const leftCard = testimonialsSection.querySelector(".nw-parallax-left");

    // Заголовок секції — Поява при наближенні
    if (headerGroup) {
      gsap.fromTo(headerGroup,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: testimonialsSection,
            start: "top 95%",
            end: "top 75%",
            scrub: 0.6,
            invalidateOnRefresh: true,
          }
        }
      );
    }

    // Явно ховаємо бічні карточки до старту їхнього тригеру
    gsap.set(centerCard, { opacity: 0, y: 140 });
    gsap.set(rightPoster, { opacity: 0, y: 380 });
    gsap.set(leftCard, { opacity: 0, y: 380 });

    // 1-Й ЕТАП: Спочатку підлітає та встає на місце центральна картка Review
    if (centerCard) {
      gsap.fromTo(centerCard,
        { y: 140, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: testimonialsSection,
            start: "top 90%",
            end: "top 65%",
            scrub: 0.8,
            invalidateOnRefresh: true,
          }
        }
      );
    }

    // 2-Й ЕТАП: БІЧНІ КАРТКИ (ЛІВА І ПРАВА) ПІДТИРАЮТЬСЯ ОДНОЧАСНО ТА СИМЕТРИЧНО!
    if (rightPoster) {
      gsap.fromTo(rightPoster,
        { y: 380, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: testimonialsSection,
            start: "top 55%",
            end: "top 25%",
            scrub: 1.0,
            invalidateOnRefresh: true,
          }
        }
      );
    }

    if (leftCard) {
      gsap.fromTo(leftCard,
        { y: 380, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: testimonialsSection,
            start: "top 55%",
            end: "top 25%",
            scrub: 1.0,
            invalidateOnRefresh: true,
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
// 4 ІНТЕРАКТИВНИХ ВІДГУКИ З М'ЯКИМ FADE-ПЕРЕКЛЮЧЕННЯМ ТА ВАЛІДНИМИ ФОТО
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
      quote: "«Наші гості відзначити, що віртуальне занурення в інтер'єри перед бронюванням зняло всі сумніви. Прямі бронювання зросли на третину за перші 2 місяці роботи 3D-двигуна!»",
      avatar: "/media/gen/testimonials/avatar2.png",
      poster: "/media/gen/case-presidential-suite.webp"
    },
    {
      name: "Марк Березовський",
      role: "Генеральний менеджер Riverside Luxury Suites",
      badge: "+80% WOW-ефект",
      quote: "«Інтерактивний 3D-контент дозволив показати ексклюзивні панорамні види з пентхаусів. Гості замовляють найдорожчі номери без вагань, оскільки візуалізація виглядає на 100% реалістично.»",
      avatar: "/media/gen/testimonials/avatar3.png",
      poster: "/media/gen/case-rooftop-bar.webp"
    },
    {
      name: "Вікторія Громова",
      role: "Бренд-директорка Premier Palace Chain",
      badge: "60 FPS потік",
      quote: "«Впровадження 3D-технології від NextWeb вивело наш веб-сайт на світовий рівень Awwwards. Це найкраща інвестиція в бренд готелю та довіру преміум-клієнтів.»",
      avatar: "/media/gen/testimonials/avatar4.png",
      poster: "/media/gen/case-lobby-lounge.webp"
    }
  ];

  const tabBtns = document.querySelectorAll(".tp-tab-btn");
  const slides = document.querySelectorAll(".tp-badge-slide");
  const cardInner = document.querySelector(".tp-card-inner");
  const rightPoster = document.querySelector(".tp-card-right");
  const activeAvatar = document.getElementById("tp-active-avatar");
  const activeName = document.getElementById("tp-active-name");
  const activeRole = document.getElementById("tp-active-role");
  const activeIndex = document.getElementById("tp-active-index");
  const activeQuote = document.getElementById("tp-active-quote");
  const activePoster = document.getElementById("tp-active-poster");

  let currentIdx = 0;
  let isTransitioning = false;

  const switchToIndex = (idx) => {
    if (isTransitioning || idx === currentIdx) return;
    isTransitioning = true;
    currentIdx = idx;
    const data = testimonialsData[idx];
    if (!data) return;

    // 1. Повне шовкове розчинення вмісту (opacity -> 0) без будь-яких бликів чи стрибків
    const targetsToFade = [cardInner, rightPoster].filter(Boolean);
    if (window.gsap && targetsToFade.length) {
      window.gsap.to(targetsToFade, {
        opacity: 0,
        duration: 0.4,
        ease: "power1.inOut",
        onComplete: () => {
          // 2. Оновлення даних відбувається коли елементи ПОВНІСТЮ невидимки (opacity: 0)
          if (activeName) activeName.textContent = data.name;
          if (activeRole) activeRole.textContent = data.role;
          if (activeQuote) activeQuote.textContent = data.quote;
          if (activeAvatar) activeAvatar.src = data.avatar;
          if (activePoster) activePoster.src = data.poster;
          if (activeIndex) activeIndex.textContent = `0${idx + 1} / VERIFIED`;

          // Оновлення табів 01-04
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

          // Оновлення лівих слайдів
          slides.forEach((slide, sIdx) => {
            if (sIdx === idx) {
              slide.style.opacity = "1";
              slide.style.pointerEvents = "auto";
            } else {
              slide.style.opacity = "0";
              slide.style.pointerEvents = "none";
            }
          });

          // 3. М'який шовковий прояв нового контенту (opacity -> 1)
          window.gsap.to(targetsToFade, {
            opacity: 1,
            duration: 0.5,
            ease: "power1.inOut",
            onComplete: () => {
              isTransitioning = false;
            }
          });
        }
      });
    } else {
      isTransitioning = false;
    }
  };

    // Ручне переключення при кліку на таби 01-04
  tabBtns.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      switchToIndex(idx);
    });
  });

  // Автоматичне м'яке переключення кожні 4 секунди
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


// 100% НАДІЙНЕ ДИНАМІЧНЕ ПОЗИЦІОНУВАННЯ ГЛОБАЛЬНОГО ПОПОВЕРА
(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const popover = document.getElementById("tp-global-brand-popover");
    const popIcon = document.getElementById("tp-global-popover-icon");
    const popTitle = document.getElementById("tp-global-popover-title");
    const popText = document.getElementById("tp-global-popover-text");
    const brandItems = document.querySelectorAll(".tp-brand-item");

    if (!popover) return;

    brandItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        const icon = item.getAttribute("data-icon") || "🏰";
        const title = item.getAttribute("data-title") || "";
        const text = item.getAttribute("data-text") || "";

        if (popIcon) popIcon.textContent = icon;
        if (popTitle) popTitle.textContent = title;
        if (popText) popText.textContent = text;

        const r = item.getBoundingClientRect();
        popover.style.left = (r.left + r.width / 2) + "px";
        popover.style.top = (r.top) + "px";
        popover.classList.add("active");
      });

      item.addEventListener("mouseleave", () => {
        popover.classList.remove("active");
      });
    });

    window.addEventListener("scroll", () => {
      popover.classList.remove("active");
    });
  });
})();
