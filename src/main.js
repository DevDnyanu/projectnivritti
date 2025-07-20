// Mobile menu toggle
function toggleMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-menu');
        const hamburger = document.querySelector('.hamburger');
        
        mobileMenu.classList.toggle('opacity-0');
        mobileMenu.classList.toggle('invisible');
        mobileMenu.classList.toggle('-translate-y-full');
        mobileMenu.classList.toggle('translate-y-0');
        
        hamburger.classList.toggle('hamburger-active');
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', toggleMobileMenu);
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            const hamburger = document.querySelector('.hamburger');
            const mobileMenu = document.querySelector('.mobile-menu');
            hamburger.classList.remove('hamburger-active');
            mobileMenu.classList.remove('mobile-menu-open');
        }
    });
});

// Image toggle functionality
function toggleImages() {
    const images = document.querySelectorAll('.toggleable-img');
    images.forEach(img => {
        img.classList.toggle('img-hidden');
    });
    
    const toggleBtn = document.querySelector('.img-toggle-btn');
    toggleBtn.innerHTML = document.querySelectorAll('.toggleable-img.img-hidden').length > 0 
        ? '<i class="fas fa-eye"></i>' 
        : '<i class="fas fa-eye-slash"></i>';
}

// Initialize page with all event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Counter animation
    const counters = document.querySelectorAll('[data-count]');
    const section = document.querySelector('.relative.py-20.bg-black');

    function animateCounters() {
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-count'));
            const isDecimal = counter.getAttribute('data-count').includes('.');
            const duration = isDecimal ? 1000 : 500;
            const start = 0;
            const startTime = performance.now();
            
            function updateCounter(currentTime) {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const value = isDecimal 
                    ? (start + (target - start) * progress).toFixed(2)
                    : Math.floor(start + (target - start) * progress);
                
                counter.textContent = isDecimal ? parseFloat(value).toFixed(2) : value;
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                }
            }
            
            requestAnimationFrame(updateCounter);
        });
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    if (section) {
        observer.observe(section);
    }
    
    // Add any other initialization code here
});