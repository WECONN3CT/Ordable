document.addEventListener('DOMContentLoaded', function() {
// ===== ADD JS-LOADED CLASS =====
document.documentElement.classList.add('js-loaded');

// ===== LUCIDE ICONS =====
if (typeof lucide !== 'undefined') lucide.createIcons();

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

// ===== CREATE FLOATING PARTICLES =====
function createParticles() {
    const container = document.getElementById('storyParticles');
    if (!container) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        container.appendChild(particle);

        gsap.to(particle, {
            y: -200 + Math.random() * 400,
            x: -100 + Math.random() * 200,
            opacity: Math.random() * 0.5,
            duration: 10 + Math.random() * 20,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: Math.random() * 5
        });
    }
}
createParticles();

// ===== STORY INTRO ANIMATIONS =====
const storyIntroTl = gsap.timeline({ defaults: { ease: 'power3.out' }});

storyIntroTl
    .from('.story-year', {
        opacity: 0,
        scale: 0.5,
        duration: 1.5,
        delay: 0.3
    })
    .from('.story-headline', {
        opacity: 0,
        y: 50,
        duration: 1
    }, '-=0.8')
    .from('.story-subheadline', {
        opacity: 0,
        y: 30,
        duration: 0.8
    }, '-=0.5')
    .from('.scroll-indicator', {
        opacity: 0,
        y: 20,
        duration: 0.6
    }, '-=0.3');

// Parallax effect on story year
gsap.to('.story-year', {
    yPercent: 50,
    ease: 'none',
    scrollTrigger: {
        trigger: '.story-intro',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
    }
});

// ===== TIMELINE LINE ANIMATION =====
gsap.from('.timeline-line', {
    scaleY: 0,
    transformOrigin: 'top center',
    ease: 'none',
    scrollTrigger: {
        trigger: '.story-timeline',
        start: 'top 80%',
        end: 'bottom 80%',
        scrub: 1
    }
});

// ===== CHAPTER ANIMATIONS =====
gsap.utils.toArray('.story-chapter').forEach((chapter, i) => {
    const content = chapter.querySelector('.chapter-content');
    const visual = chapter.querySelector('.chapter-visual');
    const isEven = i % 2 === 1;

    gsap.from(content, {
        opacity: 0,
        x: isEven ? 80 : -80,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: chapter,
            start: 'top 75%',
            toggleActions: 'play none none none'
        }
    });

    gsap.from(visual, {
        opacity: 0,
        x: isEven ? -80 : 80,
        scale: 0.9,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: chapter,
            start: 'top 75%',
            toggleActions: 'play none none none'
        }
    });
});

// ===== STAT COUNTER ANIMATIONS =====
gsap.utils.toArray('.visual-stat-value').forEach(stat => {
    const text = stat.textContent;
    const match = text.match(/(-?\d+)/);
    if (match) {
        const target = parseInt(match[1]);
        const prefix = text.substring(0, text.indexOf(match[0]));
        const suffix = text.substring(text.indexOf(match[0]) + match[0].length);

        stat.textContent = prefix + '0' + suffix;

        gsap.to(stat, {
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: stat,
                start: 'top 80%'
            },
            onUpdate: function() {
                const progress = this.progress();
                const current = Math.round(target * progress);
                stat.textContent = prefix + current + suffix;
            }
        });
    }
});

// ===== MISSION SECTION ANIMATIONS =====
const missionTl = gsap.timeline({
    scrollTrigger: {
        trigger: '.story-mission',
        start: 'top 70%',
        toggleActions: 'play none none none'
    }
});

missionTl
    .from('.mission-label', { opacity: 0, y: 30, duration: 0.6 })
    .from('.mission-title', { opacity: 0, y: 50, duration: 0.8 }, '-=0.3')
    .from('.mission-text', { opacity: 0, y: 30, duration: 0.6 }, '-=0.4');

// ===== PROMISE CARDS STAGGER =====
gsap.from('.promise-card', {
    opacity: 0,
    y: 60,
    scale: 0.9,
    stagger: 0.2,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '.promise-grid',
        start: 'top 80%'
    }
});

// ===== STORY CTA ANIMATION =====
gsap.from('.story-cta', {
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: {
        trigger: '.story-cta',
        start: 'top 85%'
    }
});

// ===== HOVER EFFECTS =====
document.querySelectorAll('.visual-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            scale: 1.02,
            y: -5,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

document.querySelectorAll('.promise-card').forEach(card => {
    const icon = card.querySelector('.promise-icon');

    card.addEventListener('mouseenter', () => {
        gsap.to(icon, {
            scale: 1.2,
            rotate: 10,
            duration: 0.3,
            ease: 'back.out(1.7)'
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(icon, {
            scale: 1,
            rotate: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
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
