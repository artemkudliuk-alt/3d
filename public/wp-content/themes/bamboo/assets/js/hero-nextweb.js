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
    gsap.set(intro, { position: "sticky", top: 0, zIndex: 1 });
    var video = document.getElementById('hero-video');
    var titleWrap = intro.querySelector('.hero-title-wrap');
    var title = intro.querySelector('.hero-title');
    var subtitle = intro.querySelector('.hero-sub');
    var cta = intro.querySelector('.hero-cta');
    var header = document.querySelector('.header');
    var fadeOverlay = intro.querySelector('.nw-hero__fade-overlay');
    
    var play = function() { if (video && video.play) video.play().catch(function(){}); };
    play();
    document.addEventListener('pointerdown', play, { once: true });

    // TitleWrap initial state
    if (titleWrap) gsap.set(titleWrap, { opacity: 1, y: 0 });

    if (subtitle) gsap.set(subtitle, { opacity: 0, y: 50 });
    if (cta) gsap.set(cta, { opacity: 0, y: 40 });

    // Pinned scroll timeline
        // Pinned scroll timeline (200vh total scroll distance)
        // Pinned scroll timeline (220vh total scroll distance)
        // Pinned scroll timeline (260vh total scroll distance for zero-overlap 4-stage presentation)
        // Pinned scroll timeline (260vh total scroll distance for strict zero-overlap 4-stage presentation)
        // Pinned scroll timeline (260vh total scroll distance for strict zero-overlap presentation)
        // Pinned scroll timeline (260vh total scroll distance for strict zero-overlap presentation)
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: intro,
        start: 'top top',
        end: '+=380%',
        pin: true,
        pinSpacing: false,
        scrub: 1.0,
        anticipatePin: 1,
        refreshPriority: 10,
      }
    });

    // ============================================================
    // STAGE 1 (0.0 -> 2.0): TitleWrap (Badge + Title locked together) floats HIGH UP (y: -260) and fades out 100%!
    // Header stays visible on 1st scroll, then after 2-3 scroll impulses (0.5) slowly & ultra-softly fades out!
    // ============================================================
    if (titleWrap) {
      tl.to(titleWrap, { y: -260, opacity: 0, duration: 2.0, ease: 'power2.inOut' }, 0);
    } else {
      if (title) tl.to(title, { y: -260, opacity: 0, duration: 2.0, ease: 'power2.inOut' }, 0);
      if (badge) tl.to(badge, { y: -260, opacity: 0, duration: 2.0, ease: 'power2.inOut' }, 0);
    }

    if (header) {
      tl.to(header, { y: -100, opacity: 0, pointerEvents: 'none', duration: 2.0, ease: 'power1.out' }, 0.5);
    }

    // ============================================================
    // STAGE 2 (2.4 -> 4.4): ONLY AFTER titleWrap is 100% GONE (at 2.4), Subtitle & CTA float up & fade in!
    // ============================================================
    if (subtitle) tl.fromTo(subtitle,
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, pointerEvents: 'auto', duration: 2.0, ease: 'power2.out' },
      2.4
    );

    if (cta) tl.fromTo(cta,
      { opacity: 0, y: 70 },
      { opacity: 1, y: 0, pointerEvents: 'auto', duration: 2.0, ease: 'power2.out' },
      2.7
    );

    // ============================================================
    // STAGE 3 (4.4 -> 5.4): Presentation hold
    // ============================================================
    tl.to({}, { duration: 1.0 });

    // ============================================================
    // STAGE 4 (5.4 -> 6.6): Subtitle & CTA float up & fade out (Header STAYS INVISIBLE until Section 2!)
    // ============================================================
    if (subtitle) tl.to(subtitle, { y: -80, opacity: 0, duration: 1.4, ease: 'power2.in' }, 4.4);
    if (cta)      tl.to(cta,      { y: -80, opacity: 0, duration: 1.4, ease: 'power2.in' }, 4.4);
    if (fadeOverlay) tl.to(fadeOverlay, { opacity: 1, duration: 1.8, ease: 'power1.inOut' }, 4.2);

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
    // ============================================================
    // ============================================================
  // SECTION 2: PROJECTS SLIDE-OVER PARALLAX & STAGGERED ELEMENTS
  // ============================================================
    // Ensure .projects arrives exactly when Hero presentation ends (220vh scroll offset)
  var projectsSection = document.querySelector('.projects');
  if (projectsSection) {
    projectsSection.style.marginTop = '220vh';
  }

  var projectsSection = document.querySelector('.projects');
  if (projectsSection) {
    // 1. Layering Slide-Over Parallax: Section 1 (.intro) scales down & darkens as Section 2 glides over it
    var introEl = document.querySelector('.intro');
    if (introEl) {
      gsap.to(introEl, {
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: projectsSection,
          start: 'top 100%',
          end: 'top 0%',
          scrub: true,
          invalidateOnRefresh: true,
        }
      });
    }

    // 2. Top Header softly & slowly returns ONLY when Section 2 (.projects) comes into view!
    if (header) {
      ScrollTrigger.create({
        trigger: projectsSection,
        start: 'top 85%',
        end: 'top 25%',
        scrub: 1.2,
        onUpdate: function(self) {
          gsap.to(header, {
            opacity: self.progress,
            y: (1 - self.progress) * -50,
            pointerEvents: self.progress > 0.4 ? 'auto' : 'none',
            duration: 0.2,
            overwrite: 'auto'
          });
        }
      });
    }

    // 3. Staggered 3D Depth Entrance for Section 2 Header Elements
    var indexEl = projectsSection.querySelector('.container-index');
    var titleEl = projectsSection.querySelector('h2');
    var btnEl = projectsSection.querySelector('#open-catalog-btn');

    if (indexEl) {
      gsap.fromTo(indexEl,
        { y: 110, opacity: 0 },
        {
          y: 0, opacity: 1, ease: 'power2.out',
          scrollTrigger: { trigger: projectsSection, start: 'top 92%', end: 'top 48%', scrub: 0.8, invalidateOnRefresh: true }
        }
      );
    }
    if (titleEl) {
      gsap.fromTo(titleEl,
        { y: 150, opacity: 0 },
        {
          y: 0, opacity: 1, ease: 'power2.out',
          scrollTrigger: { trigger: projectsSection, start: 'top 88%', end: 'top 42%', scrub: 1.0, invalidateOnRefresh: true }
        }
      );
    }
    if (btnEl) {
      gsap.fromTo(btnEl,
        { y: 190, opacity: 0 },
        {
          y: 0, opacity: 1, ease: 'power2.out',
          scrollTrigger: { trigger: projectsSection, start: 'top 82%', end: 'top 36%', scrub: 1.2, invalidateOnRefresh: true }
        }
      );
    }
  }

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
