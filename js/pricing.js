document.addEventListener('DOMContentLoaded', function() {
// ===== ADD JS-LOADED CLASS =====
document.documentElement.classList.add('js-loaded');

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
    mobileMenuToggle.addEventListener('click', () => {
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

// Register GSAP plugins first
gsap.registerPlugin(ScrollTrigger);

// ===== LENIS SMOOTH SCROLL =====
if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
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

// Reveal animations
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
                start: 'top 85%'
            }
        }
    );
});

gsap.utils.toArray('.reveal-left').forEach(elem => {
    gsap.fromTo(elem,
        { opacity: 0, x: -50 },
        {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: elem,
                start: 'top 85%'
            }
        }
    );
});

gsap.utils.toArray('.reveal-right').forEach(elem => {
    gsap.fromTo(elem,
        { opacity: 0, x: 50 },
        {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: elem,
                start: 'top 85%'
            }
        }
    );
});

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        const wasActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!wasActive) item.classList.add('active');
    });
});

// Orb animations
gsap.to('.orb-1', {
    x: 80,
    y: 40,
    duration: 25,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
});

gsap.to('.orb-2', {
    x: -40,
    y: -30,
    duration: 20,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
});

// Pricing cards entrance - smooth animation
const pricingCards = gsap.utils.toArray('.pricing-card');

pricingCards.forEach((card, index) => {
    gsap.fromTo(card,
        {
            opacity: 0,
            y: 80,
            scale: 0.95
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            delay: index * 0.15,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: '.pricing-grid',
                start: 'top 85%'
            }
        }
    );
});

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

});
