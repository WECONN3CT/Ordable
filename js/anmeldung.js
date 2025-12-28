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

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Collect form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());

        // Here you would typically send the data to your server
        console.log('Form submitted:', data);

        // Show success message
        alert('Vielen Dank für deine Anmeldung! Wir melden uns innerhalb von 24 Stunden bei dir.');

        // Reset form
        this.reset();
    });
}
