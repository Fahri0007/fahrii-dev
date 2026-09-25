// ==========================================================
//  MUHAMMAD FAHRI RANGKUTI — Portfolio JS
//  Heavy scroll animations, parallax, counters, reveals
// ==========================================================

(function () {
  'use strict';

  // ===== PRELOADER =====
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('preloader').classList.add('done');
      // Trigger hero animations after preloader
      setTimeout(initHeroAnimations, 400);
    }, 1600);
  });

  // ===== CUSTOM CURSOR (Desktop Only) =====
  if (window.innerWidth > 768) {
    const cursor = document.getElementById('cursor');
    const dot = document.getElementById('cursor-dot');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Smooth follow with lag
    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.12;
      cursorY += (mouseY - cursorY) * 0.12;
      dotX += (mouseX - dotX) * 0.25;
      dotY += (mouseY - dotY) * 0.25;

      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      dot.style.left = dotX + 'px';
      dot.style.top = dotY + 'px';

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .service-card, .project-card, .skill-icon-box, .hobby-item, .testimonial-card, .skill-tag, .social-circle');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  // ===== NAVBAR =====
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ===== HERO ANIMATIONS =====
  function initHeroAnimations() {
    // Animate hero title words
    const words = document.querySelectorAll('.hero-title .word');
    words.forEach((w, i) => {
      setTimeout(() => w.classList.add('visible'), i * 200);
    });

    // Animate hero background text with parallax
    animateHeroBgText();

    // Animate hero socials
    const socials = document.querySelectorAll('.hero-social-link');
    socials.forEach((s, i) => {
      s.style.opacity = '0';
      s.style.transform = 'translateX(-20px)';
      s.style.transition = `all 0.6s ease ${0.8 + i * 0.15}s`;
      setTimeout(() => {
        s.style.opacity = '1';
        s.style.transform = 'translateX(0)';
      }, 50);
    });

    // Animate hero quote
    const quote = document.getElementById('hero-quote');
    if (quote) {
      quote.style.opacity = '0';
      quote.style.transform = 'translateY(20px)';
      quote.style.transition = 'all 0.8s ease 1.2s';
      setTimeout(() => {
        quote.style.opacity = '1';
        quote.style.transform = 'translateY(0)';
      }, 50);
    }
  }

  // Hero BG text parallax on scroll
  function animateHeroBgText() {
    const lines = [
      document.getElementById('hero-line-1'),
      document.getElementById('hero-line-2'),
      document.getElementById('hero-line-3'),
      document.getElementById('hero-line-4'),
    ];

    const speeds = [0.3, -0.2, 0.15, -0.1];

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      lines.forEach((line, i) => {
        if (line) {
          const offset = scrollY * speeds[i];
          line.style.transform = `translateX(${offset}px)`;
        }
      });
    });
  }

  // ===== HERO IMAGE PARALLAX =====
  window.addEventListener('scroll', () => {
    const heroImg = document.getElementById('hero-img');
    if (heroImg && window.innerWidth > 768) {
      const scrolled = window.scrollY;
      const heroRect = heroImg.getBoundingClientRect();
      if (heroRect.bottom > 0) {
        heroImg.style.transform = `translateY(${scrolled * 0.08}px) scale(${1 + scrolled * 0.0002})`;
      }
    }
  });

  // ===== SCROLL-TRIGGERED ANIMATIONS (IntersectionObserver) =====
  function createScrollObserver(selector, options = {}) {
    const threshold = options.threshold || 0.15;
    const rootMargin = options.rootMargin || '0px 0px -80px 0px';

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          if (!options.repeat) {
            observer.unobserve(entry.target);
          }
        } else if (options.repeat) {
          entry.target.classList.remove('visible');
        }
      });
    }, { threshold, rootMargin });

    document.querySelectorAll(selector).forEach(el => observer.observe(el));
  }

  // All animation classes
  createScrollObserver('.anim-fade-up');
  createScrollObserver('.anim-fade-left');
  createScrollObserver('.anim-fade-right');
  createScrollObserver('.anim-scale');
  createScrollObserver('.anim-rotate');
  createScrollObserver('.stagger-children');
  createScrollObserver('.timeline-item');

// ===== COUNTER ANIMATION =====
  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 2200;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const eased = 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(target * eased);
      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll('.stat-number');
        counters.forEach((c, i) => {
          setTimeout(() => animateCounter(c), i * 200);
        });
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const statsGrid = document.getElementById('stats-grid');
  if (statsGrid) counterObserver.observe(statsGrid);

  // ===== CODING SKILL BARS =====
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.coding-fill');
        fills.forEach((fill, i) => {
          setTimeout(() => {
            fill.style.width = fill.dataset.width;
          }, i * 120);
        });
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  const codingBars = document.getElementById('coding-bars');
  if (codingBars) barObserver.observe(codingBars);

  // ===== PARALLAX SECTIONS =====
  function parallaxOnScroll() {
    const scrollY = window.scrollY;
    const winH = window.innerHeight;

    // Parallax for about photo
    const aboutPhoto = document.querySelector('.about-photo');
    if (aboutPhoto) {
      const rect = aboutPhoto.getBoundingClientRect();
      if (rect.top < winH && rect.bottom > 0) {
        const offset = (rect.top - winH / 2) * 0.05;
        aboutPhoto.style.transform = `translateY(${offset}px)`;
      }
    }

    // Parallax for sparkle decorations
    document.querySelectorAll('.sparkle').forEach((s, i) => {
      const speed = 0.02 + i * 0.01;
      s.style.transform = `translateY(${scrollY * speed}px) rotate(${scrollY * 0.1 + i * 45}deg)`;
    });
  }

  window.addEventListener('scroll', parallaxOnScroll);

  // ===== TILT EFFECT ON PROJECT CARDS =====
  if (window.innerWidth > 768) {
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -5;
        const rotateY = (x - centerX) / centerX * 5;

        card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) scale(1)';
        card.style.transition = 'transform 0.5s ease';
      });

      card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
      });
    });
  }

  // ===== MAGNETIC BUTTONS =====
  if (window.innerWidth > 768) {
    document.querySelectorAll('.btn-send, .scroll-btn, .nav-cta').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
        btn.style.transition = 'transform 0.4s ease';
      });

      btn.addEventListener('mouseenter', () => {
        btn.style.transition = 'none';
      });
    });
  }

  // ===== TEXT SCRAMBLE EFFECT =====
  class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = '!<>-_\\/[]{}—=+*^?#________';
      this.update = this.update.bind(this);
    }

    setText(newText) {
      const oldText = this.el.textContent;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise(resolve => this.resolve = resolve);
      this.queue = [];

      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from, to, start, end });
      }

      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }

    update() {
      let output = '';
      let complete = 0;

      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];

        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.chars[Math.floor(Math.random() * this.chars.length)];
            this.queue[i].char = char;
          }
          output += char;
        } else {
          output += from;
        }
      }

      this.el.textContent = output;

      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }
  }

  // Apply text scramble to section labels on scroll
  const scrambleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const scramble = new TextScramble(entry.target);
        scramble.setText(entry.target.textContent);
        scrambleObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.section-label').forEach(el => {
    scrambleObserver.observe(el);
  });

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = navbar.offsetHeight + 20;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===== CONTACT FORM (Formspree AJAX) =====
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = document.getElementById('btn-send');
      const status = document.getElementById('form-status');
      const originalHTML = btn.innerHTML;

      // Show loading state
      btn.innerHTML = '<span style="display:inline-block;animation:spin 0.8s linear infinite">⟳</span> Mengirim...';
      btn.disabled = true;
      btn.style.opacity = '0.75';

      const data = new FormData(e.target);

      try {
        const response = await fetch(e.target.action, {
          method: contactForm.method,
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          btn.innerHTML = '✓ Pesan Terkirim!';
          btn.style.background = '#2B5F4E';
          btn.style.color = '#fff';
          btn.style.opacity = '1';
          if (status) status.innerHTML = "Terima kasih! Pesan Anda telah terkirim.";
          if (status) status.style.color = "green";
          
          contactForm.reset();
        } else {
          const responseData = await response.json();
          if (Object.hasOwn(responseData, 'errors')) {
            status.innerHTML = responseData["errors"].map(error => error["message"]).join(", ");
          } else {
            status.innerHTML = "Oops! Terjadi kesalahan saat mengirim pesan.";
          }
          if (status) status.style.color = "red";
          btn.innerHTML = originalHTML;
          btn.style.opacity = '1';
          btn.disabled = false;
        }
      } catch (error) {
        if (status) {
          status.innerHTML = "Oops! Terjadi kesalahan saat mengirim pesan.";
          status.style.color = "red";
        }
        btn.innerHTML = originalHTML;
        btn.style.opacity = '1';
        btn.disabled = false;
      }

      // Reset button after 3 seconds if success
      if (btn.innerHTML === '✓ Pesan Terkirim!') {
        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.style.background = '';
          btn.style.color = '';
          btn.disabled = false;
          if (status) status.innerHTML = '';
        }, 3500);
      }
    });

    // Add spin animation for loading
    if (!document.getElementById('spin-style')) {
      const spinStyle = document.createElement('style');
      spinStyle.id = 'spin-style';
      spinStyle.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
      document.head.appendChild(spinStyle);
    }
  }


  // ===== MARQUEE SPEED ON SCROLL =====
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    let lastScrollY = 0;

    window.addEventListener('scroll', () => {
      const scrollDelta = Math.abs(window.scrollY - lastScrollY);
      const speed = Math.max(25 - scrollDelta * 0.1, 5);

      marqueeTrack.style.animationDuration = speed + 's';
      lastScrollY = window.scrollY;
    });
  }

  // ===== SCROLL PROGRESS INDICATOR =====
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #E8B931, #E87D3E);
    z-index: 99999;
    transition: width 0.1s linear;
    width: 0%;
    border-radius: 0 2px 2px 0;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
  });

  // ===== ACTIVE NAV LINK TRACKING =====
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 150;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(a => {
          a.style.color = '';
          if (a.getAttribute('href') === '#' + id) {
            a.style.color = '#E87D3E';
          }
        });
      }
    });
  });

  // ===== SERVICE CARDS: STAGGER ON SCROLL =====
  const servicesGrid = document.getElementById('services-grid');
  if (servicesGrid) {
    const serviceObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.service-card');
          cards.forEach((card, i) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(40px) rotate(-2deg)';
            card.style.transition = `all 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.12}s`;
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0) rotate(0)';
            }, 50);
          });
          serviceObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    serviceObs.observe(servicesGrid);
  }

  // ===== TYPING EFFECT IN HERO =====
  function typeEffect() {
    const subtexts = [
      'Web Developer',
      'App Developer',
      'UI/UX Designer',
      'Problem Solver',
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingEl = null;

    // Create typing element in hero
    const heroRight = document.querySelector('.hero-right');
    if (heroRight) {
      typingEl = document.createElement('div');
      typingEl.style.cssText = `
        font-family: 'JetBrains Mono', monospace;
        font-size: 1rem;
        color: rgba(255,255,255,0.6);
        margin-bottom: 20px;
        min-height: 28px;
      `;
      typingEl.innerHTML = '<span class="typing-cursor" style="border-right: 2px solid #E8B931; padding-right: 2px; animation: blink 0.7s infinite;">‎</span>';
      heroRight.insertBefore(typingEl, document.querySelector('.hero-socials'));

      // Add blink animation
      const style = document.createElement('style');
      style.textContent = '@keyframes blink { 0%, 100% { border-color: #E8B931; } 50% { border-color: transparent; } }';
      document.head.appendChild(style);
    }

    function type() {
      if (!typingEl) return;

      const currentText = subtexts[textIndex];

      if (isDeleting) {
        charIndex--;
      } else {
        charIndex++;
      }

      const display = currentText.substring(0, charIndex);
      typingEl.innerHTML = `> ${display}<span class="typing-cursor" style="border-right: 2px solid #E8B931; padding-right: 2px; animation: blink 0.7s infinite;">‎</span>`;

      let speed = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === currentText.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % subtexts.length;
        speed = 500;
      }

      setTimeout(type, speed);
    }

    setTimeout(type, 2000);
  }
  typeEffect();

  // ===== RANDOM FLOATING SPARKLES =====
  function createFloatingSparkles() {
    const container = document.createElement('div');
    container.style.cssText = 'position: fixed; inset: 0; pointer-events: none; z-index: 1; overflow: hidden;';
    document.body.appendChild(container);

    function spawnSparkle() {
      const sparkle = document.createElement('div');
      const size = Math.random() * 6 + 3;
      const x = Math.random() * window.innerWidth;
      const duration = Math.random() * 8 + 6;

      sparkle.textContent = '✦';
      sparkle.style.cssText = `
        position: absolute;
        left: ${x}px;
        bottom: -20px;
        font-size: ${size}px;
        color: #E8B931;
        opacity: ${Math.random() * 0.3 + 0.05};
        animation: floatUp ${duration}s linear forwards;
        pointer-events: none;
      `;

      container.appendChild(sparkle);

      setTimeout(() => sparkle.remove(), duration * 1000);
    }

    // Add float animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes floatUp {
        0% { transform: translateY(0) rotate(0deg); opacity: 0; }
        10% { opacity: 0.2; }
        90% { opacity: 0.15; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
      }
    `;
    document.head.appendChild(style);

    // Spawn sparkles periodically
    setInterval(spawnSparkle, 1500);
  }

  if (window.innerWidth > 480) {
    createFloatingSparkles();
  }

  // ===== SECTION REVEAL WITH CLIP-PATH =====
  function createClipReveal() {
    const greenSections = document.querySelectorAll('.services-section, .contact-section');

    const clipObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.clipPath = 'inset(0 0 0 0)';
          entry.target.style.transition = 'clip-path 1s cubic-bezier(0.22, 1, 0.36, 1)';
        }
      });
    }, { threshold: 0.05 });

    greenSections.forEach(section => {
      section.style.clipPath = 'inset(5% 0 5% 0)';
      clipObserver.observe(section);
    });
  }
  createClipReveal();

  // ===== IMAGE REVEAL ON SCROLL =====
  // Disabled clip-path image reveal to allow project cards to display naturally with stagger animations
  function createImageReveal() {
    // Disabled
  }

  // ===== HORIZONTAL SCROLL-JAck (parallax on scroll for project section) =====
  function projectParallax() {
    const grid = document.querySelector('.projects-grid');
    if (!grid || window.innerWidth < 768) return;

    window.addEventListener('scroll', () => {
      const rect = grid.getBoundingClientRect();
      const windowH = window.innerHeight;

      if (rect.top < windowH && rect.bottom > 0) {
        const progress = (windowH - rect.top) / (windowH + rect.height);
        const cards = grid.querySelectorAll('.project-card');
        cards.forEach((card, i) => {
          const offset = (progress - 0.5) * (i % 2 === 0 ? 15 : -15);
          card.style.marginTop = offset + 'px';
        });
      }
    });
  }
  projectParallax();

  // ===== SMOOTH SCROLL LINK HIGHLIGHTING =====
  // Already handled above in active nav link tracking

  // ===== CONSOLE LOG =====
console.log(
  '%c✦ Muhammad Fahri Rangkuti — Portfolio',
  'color: #E8B931; font-size: 16px; font-weight: bold; background: #1E4438; padding: 12px 24px; border-radius: 8px;'
);

})();

// Pastikan icon marquee tidak terpengaruh animasi fade/stagger dari observer JS
document.addEventListener('DOMContentLoaded', () => {
  const marqueeIcons = document.querySelectorAll('.marquee-container .skill-icon-box');
  marqueeIcons.forEach((icon) => {
    icon.style.opacity = '1';
    icon.style.transform = 'none';
    icon.style.transition = 'none';
  });
});
document.addEventListener('DOMContentLoaded', () => {
  // 1. Animasi Skill Progress Bar saat masuk viewport
  const codingBarsSection = document.getElementById('coding-bars');
  const fills = document.querySelectorAll('.coding-fill');

  if (codingBarsSection && fills.length > 0) {
    const observerOptions = {
      root: null,
      threshold: 0.2 // Animasi jalan ketika 20% elemen terlihat
    };

    const skillsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          fills.forEach(fill => {
            const targetWidth = fill.getAttribute('data-width');
            if (targetWidth) {
              fill.style.width = targetWidth;
            }
          });
          // Unobserve setelah animasi berjalan sekali
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    skillsObserver.observe(codingBarsSection);
  }

  // 2. Efek Kedip Kursor Terminal (Opsional)
  const cursor = document.querySelector('.terminal-body .cursor');
  if (cursor) {
    setInterval(() => {
      cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
    }, 500);
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const terminalForm = document.getElementById('terminal-form');
  const terminalInput = document.getElementById('terminal-input');
  const terminalLog = document.getElementById('terminal-log');
  const terminalBody = document.getElementById('terminal-body');

  if (terminalForm && terminalInput) {
    terminalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const rawInput = terminalInput.value;
      const cleanInput = rawInput.trim().toLowerCase();
      
      if (cleanInput === '') return;

      // Log input user
      const userCommandLine = document.createElement('div');
      userCommandLine.className = 'terminal-command-line';
      userCommandLine.innerHTML = `<span class="prompt">fahri@dev-env:~$</span> ${escapeHTML(rawInput)}`;
      terminalLog.appendChild(userCommandLine);

      // Respon otomatis
      let responseText = '';

      switch (cleanInput) {
        case 'hai':
        case 'halo':
        case 'hello':
        case 'hi':
          responseText = 'Halo! Selamat datang di terminal interaktif saya. Ketik <b>help</b> untuk melihat perintah lainnya.';
          break;

        case 'help':
          responseText = `
            Perintah yang tersedia:<br>
            • <b>halo / hai</b> : Menyapa terminal<br>
            • <b>whoami</b> : Tentang saya<br>
            • <b>clear</b> : Bersihkan layar terminal
          `;
          break;

        case 'whoami':
          responseText = 'Saya Fahri, Software Engineering student yang berfokus pada Web & Mobile Development.';
          break;

        case 'clear':
          terminalLog.innerHTML = '';
          terminalInput.value = '';
          return;

        default:
          responseText = `Perintah <span style="color: #ef4444;">"${escapeHTML(rawInput)}"</span> tidak ditemukan. Ketik <b>help</b>.`;
          break;
      }

      // Tampilkan respon
      const responseEl = document.createElement('div');
      responseEl.className = 'terminal-response';
      responseEl.innerHTML = responseText;
      terminalLog.appendChild(responseEl);

      // Reset input & scroll otomatis ke paling bawah
      terminalInput.value = '';
      terminalBody.scrollTop = terminalBody.scrollHeight;
    });

    function escapeHTML(str) {
      return str.replace(/[&<>'"]/g, 
        tag => ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          "'": '&#39;',
          '"': '&quot;'
        }[tag] || tag)
      );
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const projectCards = document.querySelectorAll('.project-card');

  // Buka lightbox saat kartu/foto project diklik
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const title = card.querySelector('h3');

      if (img && lightboxModal) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Project Image';
        lightboxCaption.textContent = title ? title.textContent : '';
        lightboxModal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Kunci scroll latar belakang
      }
    });
  });

  // Fungsi untuk menutup lightbox
  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('show');
      document.body.style.overflow = ''; // Kembalikan scroll
    }
  }

  // Klik tombol close
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  // Klik di luar area gambar untuk menutup
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }

  // Tekan tombol 'Escape' keyboard untuk menutup
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('show')) {
      closeLightbox();
    }
  });
});