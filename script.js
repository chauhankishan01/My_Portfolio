// Theme Toggle Logic
const themeBtn = document.getElementById('theme-btn');
const body = document.body;
const themeIcon = themeBtn.querySelector('i');

themeBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    if (body.classList.contains('light-mode')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
});

// Dynamic Typing Effect
const dynamicText = document.getElementById('dynamic-text');
const phrases = ["Gamer on YouTube", "Creative Designer", "Tech Enthusiast"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        dynamicText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        dynamicText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// Form Validation
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const msg = document.getElementById('message').value;

    if (name && email && phone && msg) {
        alert(`Thanks ${name}! Your message has been sent successfully.`);
        contactForm.reset();
    } else {
        alert("Please fill in all fields correctly.");
    }
});

// Initialize Typing Effect
document.addEventListener('DOMContentLoaded', () => {
    type();
});
