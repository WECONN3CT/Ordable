// Warte bis alle defer-Scripts geladen sind
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

// Initialize Lenis Smooth Scroll
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

// Reveal animations with smoother easing
gsap.utils.toArray('.reveal').forEach(elem => {
    gsap.fromTo(elem,
        { opacity: 0, y: 60 },
        {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: elem,
                start: 'top 88%',
                end: 'top 20%',
                toggleActions: 'play none none reverse'
            }
        }
    );
});

gsap.utils.toArray('.reveal-left').forEach(elem => {
    gsap.fromTo(elem,
        { opacity: 0, x: -60 },
        {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: elem,
                start: 'top 88%',
                end: 'top 20%',
                toggleActions: 'play none none reverse'
            }
        }
    );
});

gsap.utils.toArray('.reveal-right').forEach(elem => {
    gsap.fromTo(elem,
        { opacity: 0, x: 60 },
        {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: elem,
                start: 'top 88%',
                end: 'top 20%',
                toggleActions: 'play none none reverse'
            }
        }
    );
});

// Feature cards stagger with improved animation
gsap.utils.toArray('.features-grid').forEach(grid => {
    const cards = grid.querySelectorAll('.feature-card');
    gsap.fromTo(cards,
        { opacity: 0, y: 80, scale: 0.95 },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.12,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: grid,
                start: 'top 85%',
                end: 'top 20%',
                toggleActions: 'play none none reverse'
            }
        }
    );
});

// Feature Map Interactivity
const featurePoints = document.querySelectorAll('.feature-point');
const featureCards = document.querySelectorAll('.feature-detail-card');
const timelineProgress = document.querySelector('.timeline-line-progress');
const totalPoints = featurePoints.length;

// Function to animate line to a specific point
function animateLineToPoint(index) {
    // Calculate percentage based on point positions
    // First point: 10%, middle points evenly distributed, last point: 100%
    let percentage;
    if (index === totalPoints - 1) {
        percentage = 100; // Last point goes to end
    } else {
        percentage = ((index + 0.5) / totalPoints) * 100;
    }

    // Calculate duration based on distance for consistent speed
    const currentWidth = parseFloat(timelineProgress.style.width) || 0;
    const distance = Math.abs(percentage - currentWidth);
    const duration = Math.max(0.3, distance / 100 * 0.6);

    gsap.to(timelineProgress, {
        width: percentage + '%',
        duration: duration,
        ease: 'power1.inOut'
    });
}

// Initialize - line starts at first point (0%)
animateLineToPoint(0);

// Function to switch to a specific point (without line animation)
function switchToPoint(index) {
    // Remove active from all
    featurePoints.forEach(p => p.classList.remove('active'));
    featureCards.forEach(c => c.classList.remove('active'));

    // Add active to selected
    featurePoints[index].classList.add('active');
    featureCards[index].classList.add('active');
}

// Auto-play variables
let currentPointIndex = 0;
let lineAnimation = null;
const AUTO_PLAY_DURATION = 8; // 8 seconds

// Calculate line percentage for a point
function getLinePercentage(index) {
    if (index === totalPoints - 1) {
        return 100;
    } else {
        return ((index + 0.5) / totalPoints) * 100;
    }
}

// Animate line to next point over duration, then switch content
function animateToNextPoint() {
    const nextIndex = (currentPointIndex + 1) % totalPoints;
    const startPercentage = getLinePercentage(currentPointIndex);
    let endPercentage = getLinePercentage(nextIndex);

    // If looping back to start, go to 100% first, then reset
    if (nextIndex === 0) {
        // First complete the line to 100%
        lineAnimation = gsap.to(timelineProgress, {
            width: '100%',
            duration: AUTO_PLAY_DURATION / 2,
            ease: 'none',
            onComplete: () => {
                // Switch to last point briefly
                currentPointIndex = totalPoints - 1;
                switchToPoint(currentPointIndex);

                // Then reset to start
                setTimeout(() => {
                    gsap.set(timelineProgress, { width: getLinePercentage(0) + '%' });
                    currentPointIndex = 0;
                    switchToPoint(0);
                    animateToNextPoint();
                }, 500);
            }
        });
    } else {
        // Normal flow to next point
        lineAnimation = gsap.to(timelineProgress, {
            width: endPercentage + '%',
            duration: AUTO_PLAY_DURATION,
            ease: 'none',
            onComplete: () => {
                currentPointIndex = nextIndex;
                switchToPoint(nextIndex);
                animateToNextPoint();
            }
        });
    }
}

// Start auto-play
function startAutoPlay() {
    animateToNextPoint();
}

// Stop current animation
function stopAutoPlay() {
    if (lineAnimation) {
        lineAnimation.kill();
    }
}

// Reset auto-play (called when user clicks manually)
function resetAutoPlay(index) {
    stopAutoPlay();
    currentPointIndex = index;
    animateLineToPoint(index);

    // Start flowing to next point after a short delay
    setTimeout(() => {
        animateToNextPoint();
    }, 500);
}

// Click handlers
featurePoints.forEach((point, index) => {
    point.addEventListener('click', () => {
        switchToPoint(index);
        resetAutoPlay(index);
    });
});

// Start auto-play on page load
startAutoPlay();

// Feature Map scroll animations
gsap.fromTo('.feature-point',
    { opacity: 0, y: 30 },
    {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.feature-timeline',
            start: 'top 80%'
        }
    }
);

// Animate timeline line on scroll
gsap.fromTo('.timeline-line-bg',
    { scaleX: 0 },
    {
        scaleX: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.feature-timeline',
            start: 'top 80%'
        }
    }
);

// Feature Map Glow animations
gsap.to('.feature-map-glow-1', {
    x: 50,
    y: 30,
    duration: 20,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
});

gsap.to('.feature-map-glow-2', {
    x: -40,
    y: -20,
    duration: 15,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
});

// Floating elements animation
gsap.to('.floating-element-1', {
    y: -15,
    duration: 2.5,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
});

gsap.to('.floating-element-2', {
    y: 15,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
});

// Orb animations - smoother and slower
gsap.to('.orb-1', {
    x: 60,
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

// Hero parallax effect
gsap.to('.hero-content', {
    y: 100,
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
    }
});

// Showcase card parallax
gsap.to('.showcase-card', {
    y: -30,
    ease: 'none',
    scrollTrigger: {
        trigger: '.feature-showcase',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
    }
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

// Initialize Lucide Icons
lucide.createIcons();

// Initialize ApexCharts for Feature Cards
const chartConfigs = {
    'chart-revenue': {
        type: 'multiline',
        data: [
            { name: 'Umsatz', data: [1850, 2100, 1920, 2450, 2280, 2650, 2890, 2540, 3100, 2950, 3250, 3480] },
            { name: 'Kosten', data: [820, 950, 780, 1100, 980, 1150, 1280, 1050, 1320, 1180, 1350, 1420] },
            { name: 'Bestellungen', data: [42, 58, 51, 73, 65, 82, 95, 78, 105, 92, 118, 125] },
            { name: 'Kunden', data: [28, 35, 31, 48, 42, 55, 62, 51, 72, 64, 78, 85] }
        ],
        colors: ['#FDB913', '#ef4444', '#059669', '#3b82f6']
    }
};

const chartInstances = {};

function createChart(containerId) {
    const container = document.getElementById(containerId);
    if (!container || chartInstances[containerId]) return;

    const config = chartConfigs[containerId];
    if (!config) return;

    let options;

    if (config.type === 'radialBar') {
        options = {
            series: config.data,
            chart: {
                type: 'radialBar',
                height: 80,
                sparkline: { enabled: true },
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 1500
                }
            },
            plotOptions: {
                radialBar: {
                    hollow: { size: '50%' },
                    track: { background: '#e5e5e5' },
                    dataLabels: {
                        name: { show: false },
                        value: {
                            fontSize: '14px',
                            fontWeight: 700,
                            color: '#1a1a1a',
                            offsetY: 5
                        }
                    }
                }
            },
            colors: [config.color]
        };
    } else if (config.type === 'multiline') {
        options = {
            series: config.data,
            chart: {
                type: 'line',
                height: 120,
                sparkline: { enabled: true },
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 2000,
                    animateGradually: {
                        enabled: true,
                        delay: 200
                    },
                    dynamicAnimation: {
                        enabled: true,
                        speed: 600
                    }
                }
            },
            stroke: {
                curve: 'smooth',
                width: [3, 2, 2, 2]
            },
            colors: config.colors,
            tooltip: { enabled: false },
            legend: { show: false }
        };
    } else if (config.type === 'bar') {
        options = {
            series: [{ data: config.data }],
            chart: {
                type: 'bar',
                height: 80,
                sparkline: { enabled: true },
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 1200
                }
            },
            plotOptions: {
                bar: {
                    borderRadius: 3,
                    columnWidth: '60%'
                }
            },
            colors: [config.color],
            tooltip: { enabled: false }
        };
    } else {
        options = {
            series: [{ data: config.data }],
            chart: {
                type: 'area',
                height: 80,
                sparkline: { enabled: true },
                animations: {
                    enabled: true,
                    easing: 'easeinout',
                    speed: 1500
                }
            },
            stroke: { curve: 'smooth', width: 2 },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.4,
                    opacityTo: 0.1,
                    stops: [0, 100]
                }
            },
            colors: [config.color],
            tooltip: { enabled: false }
        };
    }

    const chart = new ApexCharts(container, options);
    chart.render();
    chartInstances[containerId] = chart;
}

// Create chart when Statistiken (index 2) is clicked
featurePoints.forEach((point, index) => {
    point.addEventListener('click', () => {
        if (index === 2) {
            setTimeout(() => {
                createChart('chart-revenue');
            }, 300);
        }
        // Re-init Lucide icons for new elements
        setTimeout(() => {
            lucide.createIcons();
        }, 100);
    });
});

// Initialize Swiper Carousel
const featureSwiper = new Swiper('#featureCarousel', {
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 30,
    loop: false,
    speed: 800,
    effect: 'slide',
    allowTouchMove: true,
    pagination: {
        el: '.carousel-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '#carouselNext',
        prevEl: '#carouselPrev',
    },
    breakpoints: {
        768: {
            slidesPerView: 1.2,
            spaceBetween: 40,
        },
        1024: {
            slidesPerView: 1.4,
            spaceBetween: 50,
        },
    },
    on: {
        slideChange: function() {
            // Update thumbnail active state
            const thumbs = document.querySelectorAll('.carousel-thumb');
            thumbs.forEach((thumb, index) => {
                thumb.classList.toggle('active', index === this.activeIndex);
            });
        }
    }
});

// Thumbnail click handlers
const thumbs = document.querySelectorAll('.carousel-thumb');
thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
        const slideIndex = parseInt(thumb.dataset.slide);
        featureSwiper.slideTo(slideIndex);
    });
});

// Scroll-triggered slide change entfernt - verursachte Sprung zum letzten Slide
// Navigation erfolgt jetzt nur über Thumbnails, Pfeile und Touch/Swipe
}); // Ende DOMContentLoaded
