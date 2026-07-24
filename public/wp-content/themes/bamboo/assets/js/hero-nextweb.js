/* Перший екран, 3-етапний плавний скролл та 4 відгуки з м'якими переходами NextWeb Hotels. */

var _heroAnimInitDone = false;
window.initHeroAnimation = function() {
  if (_heroAnimInitDone) return;
  _heroAnimInitDone = true;

  var gsap = window.gsap;
  var ScrollTrigger = window.ScrollTrigger;
  if (!gsap || !ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  // ============================================================
  // SECTION 1: HERO — PINNED PARALLAX SCROLL
  // ============================================================
  var intro = document.querySelector('.intro');

  if (intro) {
    var video = document.getElementById('hero-video');
    var titleWrap = intro.querySelector('.hero-title-wrap');
    var title = intro.querySelector('.hero-title');
    var subtitle = intro.querySelector('.hero-sub');
    var cta = intro.querySelector('.hero-cta');
    var header = document.querySelector('.header');

    var play = function() { if (video && video.play) video.play().catch(function(){}); };
    play();
    document.addEventListener('pointerdown', play, { once: true });

    // Appearance of title on load
    if (titleWrap) {
      gsap.fromTo(titleWrap,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.4, ease: 'power3.out', delay: 0.1 }
      );
    }

    if (subtitle) gsap.set(subtitle, { opacity: 0, y: 50 });
    if (cta) gsap.set(cta, { opacity: 0, y: 40 });

    // Pinned scroll timeline
        // Pinned scroll timeline (200vh total scroll distance)
        // Pinned scroll timeline (220vh total scroll distance)
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: intro,
        start: 'top top',
        end: '+=220%',
        pin: true,
        pinSpacing: true,
        scrub: 1.2,
        anticipatePin: 1,
        refreshPriority: 10,
      }
    });

    var badge = intro.querySelector('.hero-contact-badge');

    // Stage 1 (0 -> 1.8): Title, badge, AND Header start TOGETHER at 0 and fade out 3x slower
    if (title)    tl.to(title,    { y: -100, opacity: 0, duration: 1.8, ease: 'power1.out' }, 0);
    if (badge)    tl.to(badge,    { y: -100, opacity: 0, duration: 1.8, ease: 'power1.out' }, 0);
    if (header)   tl.to(header,   { y: -100, opacity: 0, pointerEvents: 'none', duration: 1.8, ease: 'power1.out' }, 0);

    if (subtitle) tl.to(subtitle, { opacity: 1, y: 0, pointerEvents: 'auto', duration: 1.5, ease: 'power1.out' }, 0.6);
    if (cta)      tl.to(cta,      { opacity: 1, y: 0, pointerEvents: 'auto', duration: 1.5, ease: 'power1.out' }, 0.9);

    // Presentation Hold stage (1.8 -> 2.4): Pure clean video presentation view
    tl.to({}, { duration: 0.6 });

    // Stage 2 (2.4 -> 3.9): Subtitle & CTA fade up; Header returns 3x slower for Section 2
    if (subtitle) tl.to(subtitle, { y: -60, opacity: 0, duration: 1.2, ease: 'power1.in' }, 2.4);
    if (cta)      tl.to(cta,      { y: -60, opacity: 0, duration: 1.2, ease: 'power1.in' }, 2.4);
    if (header)   tl.to(header,   { y: 0, opacity: 1, pointerEvents: 'auto', duration: 1.5, ease: 'power1.out' }, 2.2);

    // Video speed boost on scroll
    if (video) {
      var idle;
      ScrollTrigger.create({
        trigger: intro,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: function(self) {
          var boost = 1 + Math.min(Math.abs(self.getVelocity()) / 1500, 1.0);
          gsap.to(video, { playbackRate: boost, duration: 0.25, overwrite: true });
          clearTimeout(idle);
          idle = setTimeout(function() {
            gsap.to(video, { playbackRate: 1, duration: 0.8, ease: 'power2.out' });
          }, 120);
        },
      });
    }
  }

  // ============================================================
  // SECTION 2: PROJECTS PARALLAX
  // ============================================================
  var projectsSection = document.querySelector('.projects');
  if (projectsSection) {
    var indexEl = projectsSection.querySelector('.container-index');
    var titleEl = projectsSection.querySelector('h2');
    var btnEl = projectsSection.querySelector('#open-catalog-btn');

    if (indexEl) {
      gsap.fromTo(indexEl, { y: 60, opacity: 0.3 }, {
        y: -40, opacity: 1, ease: 'none',
        scrollTrigger: { trigger: projectsSection, start: 'top 90%', end: 'top 20%', scrub: 0.8 }
      });
    }
    if (titleEl) {
      gsap.fromTo(titleEl, { y: 50, opacity: 0.4 }, {
        y: -25, opacity: 1, ease: 'none',
        scrollTrigger: { trigger: projectsSection, start: 'top 85%', end: 'top 25%', scrub: 0.6 }
      });
    }
    if (btnEl) {
      gsap.fromTo(btnEl, { y: 45, opacity: 0.4 }, {
        y: -20, opacity: 1, ease: 'none',
        scrollTrigger: { trigger: projectsSection, start: 'top 80%', end: 'top 30%', scrub: 0.5 }
      });
    }
  }

  // ============================================================
  // SECTION 4: TESTIMONIALS CARDS PARALLAX
  // ============================================================
  var testimonialsSection = document.querySelector('.testimonials-partners');
  if (testimonialsSection) {
    var grid = testimonialsSection.querySelector('.tp-asymmetric-grid') || testimonialsSection;
    var headerGroup = testimonialsSection.querySelector('.nw-section4-header-group');
    var centerCard = testimonialsSection.querySelector('.nw-parallax-center');
    var rightPoster = testimonialsSection.querySelector('.nw-parallax-right');
    var leftCard = testimonialsSection.querySelector('.nw-parallax-left');

    if (headerGroup) {
      gsap.fromTo(headerGroup, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, ease: 'none',
        scrollTrigger: {
          trigger: testimonialsSection, start: 'top 95%', end: 'top 75%',
          scrub: true, invalidateOnRefresh: true,
        }
      });
    }
    if (centerCard) {
      gsap.fromTo(centerCard, { y: 100, opacity: 0 }, {
        y: 0, opacity: 1, ease: 'none',
        scrollTrigger: {
          trigger: grid, start: 'top 90%', end: 'top 65%',
          scrub: true, invalidateOnRefresh: true,
        }
      });
    }
    if (rightPoster) {
      gsap.fromTo(rightPoster, { y: 240, opacity: 0 }, {
        y: 0, opacity: 1, ease: 'none',
        scrollTrigger: {
          trigger: grid, start: 'top 80%', end: 'top 50%',
          scrub: true, invalidateOnRefresh: true,
        }
      });
    }
    if (leftCard) {
      gsap.fromTo(leftCard, { y: 360, opacity: 0 }, {
        y: 0, opacity: 1, ease: 'none',
        scrollTrigger: {
          trigger: grid, start: 'top 65%', end: 'top 35%',
          scrub: true, invalidateOnRefresh: true,
        }
      });
    }

    ScrollTrigger.refresh();
  }

  // ============================================================
  // SECTION 5: CTA FORM — SLIDE-OVER + SEQUENTIAL PARALLAX
  // ============================================================
  var ctaSection = document.querySelector('.nw-cta-section');
  if (ctaSection) {
    var ctaLeft  = ctaSection.querySelector('.nw-cta-left');
    var ctaRight = ctaSection.querySelector('.nw-cta-right');
    var ctaLabel = ctaSection.querySelector('div[style*="letter-spacing:0.18em"]');

    // Section 5 (z-index:15) naturally slides over section 4 (z-index:10) via scroll.
    // No transforms on section 4 — those caused a black gap below it.


    // --- LAYER 2: Left column (heading + copy) reveals first ---
    if (ctaLeft) {
      gsap.fromTo(ctaLeft,
        { y: 70, opacity: 0 },
        {
          y: 0, opacity: 1, ease: 'none',
          scrollTrigger: {
            trigger: ctaSection,
            start: 'top 90%',
            end: 'top 55%',
            scrub: true,
            invalidateOnRefresh: true,
          }
        }
      );
    }

    // --- LAYER 3: Right column (form) reveals second, after left ---
    if (ctaRight) {
      gsap.fromTo(ctaRight,
        { y: 110, opacity: 0 },
        {
          y: 0, opacity: 1, ease: 'none',
          scrollTrigger: {
            trigger: ctaSection,
            start: 'top 75%',
            end: 'top 40%',
            scrub: true,
            invalidateOnRefresh: true,
          }
        }
      );
    }

    // --- LAYER 4: Section index label reveals first of all ---
    if (ctaLabel) {
      gsap.fromTo(ctaLabel,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, ease: 'none',
          scrollTrigger: {
            trigger: ctaSection,
            start: 'top 95%',
            end: 'top 70%',
            scrub: true,
            invalidateOnRefresh: true,
          }
        }
      );
    }
  }
};

// Called EXACTLY ONCE after window.load + 80ms buffer so layout heights,
// GSAP, ScrollTrigger, and pinSpacing are all fully settled.
window.addEventListener('load', function() {
  setTimeout(function() {
    window.initHeroAnimation();
  }, 80);
});
