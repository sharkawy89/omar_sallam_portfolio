document.addEventListener('DOMContentLoaded', () => {
    
    // --- Theme Toggle ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.remove('dark-mode', 'light-mode');
        body.classList.add(savedTheme);
        updateIcon(savedTheme);
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.replace('dark-mode', 'light-mode');
            localStorage.setItem('theme', 'light-mode');
            updateIcon('light-mode');
        } else {
            body.classList.replace('light-mode', 'dark-mode');
            localStorage.setItem('theme', 'dark-mode');
            updateIcon('dark-mode');
        }
    });

    function updateIcon(mode) {
        const icon = themeToggleBtn.querySelector('i');
        if (mode === 'light-mode') {
            icon.classList.remove('ph-sun');
            icon.classList.add('ph-moon');
        } else {
            icon.classList.remove('ph-moon');
            icon.classList.add('ph-sun');
        }
    }

    // --- Mobile Menu ---
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuBackdrop = document.querySelector('.mobile-menu-backdrop');
    const closeMenu = document.querySelector('.mobile-menu-close');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        menuBackdrop.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }
    
    if (closeMenu) {
        closeMenu.addEventListener('click', toggleMenu);
    }

    if (menuBackdrop) {
        menuBackdrop.addEventListener('click', toggleMenu);
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // --- Experience Tabs ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Show corresponding pane
            const targetId = button.getAttribute('data-target');
            document.querySelector(targetId).classList.add('active');
        });
    });

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Select elements to animate
    const hiddenElements = document.querySelectorAll('.fade-in-up, .section-title, .about-content, .project-card, .service-card, .contact-title, .contact-desc, .objective-box');
    hiddenElements.forEach(el => {
        el.classList.add('hidden');
        observer.observe(el);
    });

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

});
