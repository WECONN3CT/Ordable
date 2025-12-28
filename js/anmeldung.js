// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
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
