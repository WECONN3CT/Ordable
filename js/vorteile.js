document.addEventListener('DOMContentLoaded', function() {
// ===== ADD JS-LOADED CLASS =====
document.documentElement.classList.add('js-loaded');

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
        { opacity: 0, x: -40 },
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
        { opacity: 0, x: 40 },
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

// Counter animation
gsap.utils.toArray('.stat-value').forEach(counter => {
    const target = parseInt(counter.dataset.target);
    const prefix = counter.dataset.prefix || '';
    const suffix = counter.dataset.suffix || '';

    gsap.to(counter, {
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: counter,
            start: 'top 80%'
        },
        onUpdate: function() {
            const progress = this.progress();
            const currentValue = Math.round(target * progress);
            counter.textContent = prefix + currentValue.toLocaleString('de-DE') + suffix;
        },
        onComplete: function() {
            counter.textContent = prefix + target.toLocaleString('de-DE') + suffix;
        }
    });
});

// Mega Savings Calculator
const revenueSlider = document.getElementById('revenueSlider');
const commissionSlider = document.getElementById('commissionSlider');

// Cost constants
const ORDABLE_MONTHLY = 199;
const ORDABLE_SETUP = 499;

function formatNumber(num) {
    return num.toLocaleString('de-DE');
}

function calculateAll() {
    const revenue = parseFloat(revenueSlider.value) || 0;
    const commissionRate = parseFloat(commissionSlider.value) / 100 || 0.30;

    // Platform costs (Lieferando & Co.)
    const monthlyCommission = revenue * commissionRate;
    const yearlyPlatformCost = monthlyCommission * 12;

    // ORDABLE costs
    const yearlyOrdableCost = ORDABLE_SETUP + (ORDABLE_MONTHLY * 12);

    // Savings
    const yearlySavings = yearlyPlatformCost - yearlyOrdableCost;

    // Update revenue slider background
    const revenuePercent = ((revenue - 5000) / (1000000 - 5000)) * 100;
    revenueSlider.style.background = `linear-gradient(to right, #FDB913 0%, #FDB913 ${revenuePercent}%, #e0e0e0 ${revenuePercent}%, #e0e0e0 100%)`;

    // Update commission slider background
    const commissionPercent = ((commissionSlider.value - 13) / (30 - 13)) * 100;
    commissionSlider.style.background = `linear-gradient(to right, #dc2626 0%, #dc2626 ${commissionPercent}%, #e0e0e0 ${commissionPercent}%, #e0e0e0 100%)`;

    // Update DOM
    document.getElementById('revenueDisplay').textContent = formatNumber(revenue);
    document.getElementById('commissionDisplay').textContent = commissionSlider.value;
    document.getElementById('commissionMonthly').textContent = formatNumber(Math.round(monthlyCommission)) + '€';
    document.getElementById('platformCostYear').textContent = formatNumber(Math.round(yearlyPlatformCost)) + '€';
    document.getElementById('ordableCostYear').textContent = formatNumber(yearlyOrdableCost) + '€';
    document.getElementById('totalMoneySaved').textContent = formatNumber(Math.round(yearlySavings)) + '€';

    // Update platform card subtitle
    document.querySelector('.comparison-card.platform .comparison-subtitle').textContent =
        commissionSlider.value + '% Provision auf jeden Umsatz';
}

revenueSlider.addEventListener('input', calculateAll);
commissionSlider.addEventListener('input', calculateAll);

// Initial calculation
calculateAll();

// Orb animations
gsap.to('.orb-1', {
    x: 50,
    y: 30,
    duration: 20,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
});

gsap.to('.orb-2', {
    x: -30,
    y: -20,
    duration: 15,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
});

// Comparison table row animation
gsap.utils.toArray('.comparison-row').forEach((row, i) => {
    gsap.fromTo(row,
        { opacity: 0, x: -30 },
        {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.comparison-table',
                start: 'top 80%'
            }
        }
    );
});

// Initialize Lucide Icons
if (typeof lucide !== 'undefined') lucide.createIcons();

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
