/* Перший екран, 3-етапний плавний скролл та 4 відгуки з м'якими переходами NextWeb Hotels. */

window.initHeroAnimation = function() {
  const intro = document.querySelector(".intro");
  // if (!intro) return;

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
    const grid = testimonialsSection.querySelector(".tp-asymmetric-grid") || testimonialsSection;
    const headerGroup = testimonialsSection.querySelector(".nw-section4-header-group");
    const centerCard = testimonialsSection.querySelector(".nw-parallax-center");
    const rightPoster = testimonialsSection.querySelector(".nw-parallax-right");
    const leftCard = testimonialsSection.querySelector(".nw-parallax-left");

        const sec = document.querySelector('.testimonials-partners') || grid;

    const sec = document.querySelector('.testimonials-partners');
  if (sec) {
    const grid = sec.querySelector('.tp-asymmetric-grid') || sec;

    const centerCard = grid.querySelector('.nw-parallax-center');
    const rightPoster = grid.querySelector('.nw-parallax-right');
    const leftCard = grid.querySelector('.nw-parallax-left');

    if (centerCard) {
      gsap.fromTo(centerCard,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sec,
            start: "top 95%",
            end: "top 75%",
            scrub: true,
            invalidateOnRefresh: true,
          }
        }
      );
    }

    if (rightPoster) {
      gsap.fromTo(rightPoster,
        { y: 200, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sec,
            start: "top 75%",
            end: "top 55%",
            scrub: true,
            invalidateOnRefresh: true,
          }
        }
      );
    }

    if (leftCard) {
      gsap.fromTo(leftCard,
        { y: 280, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sec,
            start: "top 55%",
            end: "top 35%",
            scrub: true,
            invalidateOnRefresh: true,
          }
        }
      );
    }

    ScrollTrigger.refresh();
    }
  });
}



window.initHeroAnimation = function() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const testimonialsSection = document.querySelector(".testimonials-partners");
  if (testimonialsSection) {
    const grid = testimonialsSection.querySelector(".tp-asymmetric-grid") || testimonialsSection;
    const headerGroup = testimonialsSection.querySelector(".nw-section4-header-group");
    const centerCard = testimonialsSection.querySelector(".nw-parallax-center");
    const rightPoster = testimonialsSection.querySelector(".nw-parallax-right");
    const leftCard = testimonialsSection.querySelector(".nw-parallax-left");

    // 1. ЗАГОЛОВОК СЕКЦІЇ — Всплывает первым (95% -> 75%)
    if (headerGroup) {
      gsap.fromTo(headerGroup,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: testimonialsSection,
            start: "top 95%",
            end: "top 75%",
            scrub: true,
            invalidateOnRefresh: true,
          }
        }
      );
    }

    // 2. ЦЕНТРАЛЬНА КАРТКА REVIEW (90% -> 60%)
    if (centerCard) {
      gsap.fromTo(centerCard,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: grid,
            start: "top 90%",
            end: "top 60%",
            scrub: true,
            invalidateOnRefresh: true,
          }
        }
      );
    }

    // 3. ПРАВА КАРТКА (ФОТО) — М'яко підтягується при продовженні скроллу (70% -> 30%)
    if (rightPoster) {
      gsap.fromTo(rightPoster,
        { y: 240, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: grid,
            start: "top 70%",
            end: "top 30%",
            scrub: true,
            invalidateOnRefresh: true,
          }
        }
      );
    }

    // 4. ЛІВА КАРТКА (БІЛА) — Підтягується слідом за правою у 3-тю чергу (50% -> 10%)
    if (leftCard) {
      gsap.fromTo(leftCard,
        { y: 360, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: grid,
            start: "top 50%",
            end: "top 10%",
            scrub: true,
            invalidateOnRefresh: true,
          }
        }
      );
    }

    ScrollTrigger.refresh();
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', window.initHeroAnimation);
} else {
  window.initHeroAnimation();
}
window.addEventListener('load', () => {
  window.initHeroAnimation();
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.refresh();
  }
});
