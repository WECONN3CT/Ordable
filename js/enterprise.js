// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // ===== ADD JS-LOADED CLASS =====
    document.documentElement.classList.add('js-loaded');

    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ===== MOBILE MENU =====
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

    function openMobileMenu() {
        if (mobileMenuToggle) mobileMenuToggle.classList.add('active');
        if (mobileNav) mobileNav.classList.add('active');
        if (mobileMenuOverlay) mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
        if (mobileNav) mobileNav.classList.remove('active');
        if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (mobileNav && mobileNav.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }

    document.querySelectorAll('.mobile-nav-menu a, .mobile-nav-cta').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 968 && mobileNav && mobileNav.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Header scroll effect
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Check if GSAP is available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger);

        // Hero animations
        const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' }});
        heroTl
            .from('.hero-badge', { opacity: 0, y: 30, duration: 0.8, delay: 0.3 })
            .from('.hero-title', { opacity: 0, y: 50, duration: 1 }, '-=0.5')
            .from('.hero-subtitle', { opacity: 0, y: 30, duration: 0.8 }, '-=0.6')
            .from('.hero-cta', { opacity: 0, y: 30, duration: 0.8 }, '-=0.5')
            .from('.hero-stats', { opacity: 0, y: 30, duration: 0.8 }, '-=0.4')
            .from('.hero-mockup', { opacity: 0, x: 100, duration: 1.2 }, '-=1')
            .from('.floating-card-1', { opacity: 0, scale: 0, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.5')
            .from('.floating-card-2', { opacity: 0, scale: 0, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.3');

        // Floating cards animation
        gsap.to('.floating-card-1', {
            y: -15,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        gsap.to('.floating-card-2', {
            y: 15,
            duration: 2.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 0.5
        });

        // Reveal animations - using gsap.set to hide first, then animate
        gsap.utils.toArray('.reveal').forEach(elem => {
            gsap.fromTo(elem,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: elem,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        gsap.utils.toArray('.reveal-left').forEach(elem => {
            gsap.fromTo(elem,
                { opacity: 0, x: -40 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: elem,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        gsap.utils.toArray('.reveal-right').forEach(elem => {
            gsap.fromTo(elem,
                { opacity: 0, x: 40 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: elem,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        gsap.utils.toArray('.reveal-scale').forEach(elem => {
            gsap.fromTo(elem,
                { opacity: 0, scale: 0.95 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: elem,
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    }
                }
            );
        });

        // Magnetic button effect
        document.querySelectorAll('.btn-primary').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(btn, {
                    x: x * 0.2,
                    y: y * 0.2,
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

        // Animate gradient orbs
        gsap.to('.orb-1', {
            x: 50,
            y: -30,
            duration: 15,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        gsap.to('.orb-2', {
            x: -40,
            y: 40,
            duration: 18,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        gsap.to('.orb-3', {
            x: 30,
            y: 20,
            duration: 20,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }

    // FAQ accordion - works without GSAP
    document.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('click', () => {
            const wasActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!wasActive) {
                item.classList.add('active');
            }
        });
    });

    // Smooth scroll - works without GSAP
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
