// ===== ADD JS-LOADED CLASS =====
document.documentElement.classList.add('js-loaded');

// ===== LUCIDE ICONS =====
if (typeof lucide !== 'undefined') lucide.createIcons();

// ===== MOBILE MENU =====
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

function openMobileMenu() {
    mobileMenuToggle.classList.add('active');
    mobileNav.classList.add('active');
    mobileMenuOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileMenuToggle.classList.remove('active');
    mobileNav.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        if (mobileNav.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
}

if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
}

// Close mobile menu on link click
document.querySelectorAll('.mobile-nav-menu a, .mobile-nav-cta').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Close mobile menu on resize to desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 968 && mobileNav && mobileNav.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Register GSAP plugins first
gsap.registerPlugin(ScrollTrigger);

// ===== LENIS SMOOTH SCROLL =====
let lenis;
if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
    });

    // Integrate Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
}

// ===== SCROLL PROGRESS BAR =====
gsap.to('#scrollProgress', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3
    }
});

// ===== HEADER SCROLL EFFECT =====
ScrollTrigger.create({
    start: 'top -100',
    onUpdate: (self) => {
        if (self.direction === 1) {
            document.getElementById('header').classList.add('scrolled');
        } else if (window.scrollY < 100) {
            document.getElementById('header').classList.remove('scrolled');
        }
    }
});

// ===== ANIMATED GRADIENT ORBS =====
gsap.to('.orb-1', {
    x: 100,
    y: 50,
    duration: 20,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
});

gsap.to('.orb-2', {
    x: -80,
    y: -60,
    duration: 25,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
});

gsap.to('.orb-3', {
    x: 60,
    y: -40,
    duration: 18,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
});

// ===== HERO ANIMATIONS =====
const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' }});

heroTl
    .to('.hero-badge', { opacity: 1, y: 0, duration: 0.8, delay: 0.3 })
    .to('.hero h1', { opacity: 1, y: 0, duration: 1 }, '-=0.5')
    .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
    .to('.hero-cta-group', { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
    .to('.hero-stats', { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
    .to('.hero-card', { opacity: 1, x: 0, rotateY: 0, duration: 1.2 }, '-=1')
    .to('.floating-badge-1', { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.5')
    .to('.floating-badge-2', { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.3');

// Hero card 3D tilt effect
const heroCard = document.getElementById('heroCard');
if (heroCard) {
    heroCard.addEventListener('mousemove', (e) => {
        const rect = heroCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        gsap.to(heroCard, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.5,
            ease: 'power2.out'
        });
    });

    heroCard.addEventListener('mouseleave', () => {
        gsap.to(heroCard, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
}

// Floating badges animation
gsap.to('#floatingBadge1', {
    y: -15,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
});

gsap.to('#floatingBadge2', {
    y: 15,
    duration: 2.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
    delay: 0.5
});

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
    const target = parseInt(counter.dataset.target);
    if (target === 0) {
        counter.textContent = '0';
        return;
    }

    gsap.to(counter, {
        textContent: target,
        duration: 2,
        ease: 'power2.out',
        snap: { textContent: 1 },
        scrollTrigger: {
            trigger: counter,
            start: 'top 80%'
        }
    });
});

// ===== REVEAL ANIMATIONS =====
// Standard reveal (fade up)
gsap.utils.toArray('.reveal').forEach(elem => {
    gsap.fromTo(elem,
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: elem,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        }
    );
});

// Reveal from left
gsap.utils.toArray('.reveal-left').forEach(elem => {
    gsap.fromTo(elem,
        { opacity: 0, x: -80 },
        {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: elem,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        }
    );
});

// Reveal from right
gsap.utils.toArray('.reveal-right').forEach(elem => {
    gsap.fromTo(elem,
        { opacity: 0, x: 80 },
        {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: elem,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        }
    );
});

// Reveal with scale
gsap.utils.toArray('.reveal-scale').forEach(elem => {
    gsap.fromTo(elem,
        { opacity: 0, scale: 0.9 },
        {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: elem,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        }
    );
});

// ===== STAGGERED CARD ANIMATIONS =====
gsap.utils.toArray('.problem-grid, .features-grid').forEach(grid => {
    const cards = grid.querySelectorAll('.problem-card, .feature-card');
    gsap.fromTo(cards,
        { opacity: 0, y: 60 },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: grid,
                start: 'top 80%'
            }
        }
    );
});

// ===== SHOWCASE SCROLL ANIMATIONS =====
gsap.utils.toArray('.showcase-grid').forEach(grid => {
    const number = grid.querySelector('.showcase-number');
    const title = grid.querySelector('.showcase-title');
    const text = grid.querySelector('.showcase-text');
    const features = grid.querySelectorAll('.showcase-feature');

    // Parallax effect on numbers
    if (number) {
        gsap.fromTo(number,
            { y: 60, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: grid,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );

        // Subtle parallax on scroll
        gsap.to(number, {
            y: -30,
            ease: 'none',
            scrollTrigger: {
                trigger: grid,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });
    }

    // Title animation with stagger
    if (title) {
        gsap.fromTo(title,
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                delay: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: grid,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    }

    // Text animation
    if (text) {
        gsap.fromTo(text,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                delay: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: grid,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    }

    // Staggered features animation
    if (features.length > 0) {
        gsap.fromTo(features,
            { y: 20, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                delay: 0.3,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: grid,
                    start: 'top 75%',
                    toggleActions: 'play none none none'
                }
            }
        );
    }

});

// ===== FAQ ANIMATIONS =====
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        const wasActive = item.classList.contains('active');

        // Close all items
        document.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('active');
        });

        // Open clicked if it wasn't active
        if (!wasActive) {
            item.classList.add('active');
        }
    });
});

// ===== MAGNETIC BUTTON EFFECT =====
document.querySelectorAll('.btn-gradient, .btn-gradient-outline, .btn-primary, .pricing-cta.primary').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
            x: x * 0.15,
            y: y * 0.15,
            duration: 0.4,
            ease: 'power2.out'
        });
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
        });
    });
});

// ===== FORM SUBMISSION =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        console.log('Form submitted:', data);

        // Animate button
        const btn = this.querySelector('.form-submit');
        gsap.to(btn, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1
        });

        // Show modal
        setTimeout(() => {
            document.getElementById('successModal').classList.add('show');
            this.reset();
        }, 200);
    });
}

// Close modal function (global scope)
window.closeModal = function() {
    document.getElementById('successModal').classList.remove('show');
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: { y: target, offsetY: 80 },
                ease: 'power3.inOut'
            });
        }
    });
});

// Load GSAP ScrollTo plugin
const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollToPlugin.min.js';
document.head.appendChild(script);

// ===== ATROPOS 3D HOVER EFFEKTE =====
window.addEventListener('load', function() {
    // Initialisiere alle Atropos-Elemente
    if (typeof Atropos !== 'undefined') {
        document.querySelectorAll('.showcase-atropos').forEach(el => {
            Atropos({
                el: el,
                activeOffset: 40,
                shadowScale: 1.05,
                rotateXMax: 15,
                rotateYMax: 15,
                shadow: true,
                shadowOffset: 50,
                highlight: true
            });
        });
    }
});
