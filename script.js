// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Your web app's Firebase configuration (Replace with your actual keys from Step 1)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// DOM elements for Auth UI control
const loginScreen = document.getElementById('login-screen');
const portfolioApp = document.getElementById('portfolio-app');
const loginBtn = document.getElementById('google-login-btn');
const logoutBtn = document.getElementById('logout-btn');

// 1. Monitor the Authentication State
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in -> show portfolio, hide login screen
        loginScreen.style.display = 'none';
        portfolioApp.style.display = 'block';
        console.log("Welcome back:", user.displayName);
    } else {
        // User is signed out -> show login screen, hide portfolio
        loginScreen.style.display = 'flex';
        portfolioApp.style.display = 'none';
    }
});

// 2. Trigger Google Sign-In Popup
if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // Successfully signed in
                const user = result.user;
                alert(`Logged in as ${user.displayName}`);
            })
            .catch((error) => {
                console.error("Authentication Error: ", error.message);
                alert("Login failed. Check console for details.");
            });
    });
}

// 3. Trigger Sign-Out
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        signOut(auth).then(() => {
            alert("Logged out successfully!");
        }).catch((error) => {
            console.error("Logout Error: ", error);
        });
    });
}

// --- Your original portfolio scripts go down here ---
document.addEventListener('DOMContentLoaded', () => {
    // Keep your existing Hamburger toggle, scroll listeners, form submit handlers here.
    // Note: ensure they run fine within this modern script context.
});

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    // 1. Mobile Menu Toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // 2. Close menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // 3. Form Submission Handling
    const hireForm = document.getElementById('hireForm');
    if (hireForm) {
        hireForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            
            // Show a professional success message
            alert(`Thank you, ${name}! Your request has been sent successfully. Kishan will contact you at ${email} soon.`);
            
            // Reset the form
            this.reset();
        });
    }

    // 4. Active Link highlighting on scroll
    window.addEventListener('scroll', () => {
        let current = "";
        const sections = document.querySelectorAll("section");
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute("id");
            }
        });

        links.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });
});
