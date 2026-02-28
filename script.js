// script.js - WebX Agency Interactive Features

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initCustomCursor();
    initNavbar();
    initThemeSwitcher();
    initTypewriter();
    initParticles();
    initTiltEffects();
    initCounters();
    initProjectsSlider();
    initReviewsSlider();
    initScrollAnimations();
    initPageTransitions();
    initRippleButtons();
    
    console.log('WebX Agency loaded successfully! 🚀');
});

// ===== CUSTOM CURSOR =====
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (!cursor || !follower) return;
    
    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    const updateCursor = () => {
        // Smooth movement for cursor follower
        posX += (mouseX - posX) * 0.1;
        posY += (mouseY - posY) * 0.1;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        
        follower.style.left = posX + 'px';
        follower.style.top = posY + 'px';
        
        requestAnimationFrame(updateCursor);
    };
    
    updateCursor();
    
    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .card, .service-item, .project-card');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            follower.style.transform = 'scale(0.8)';
            follower.style.width = '60px';
            follower.style.height = '60px';
            follower.style.backgroundColor = 'rgba(0, 217, 255, 0.1)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            follower.style.transform = 'scale(1)';
            follower.style.width = '40px';
            follower.style.height = '40px';
            follower.style.backgroundColor = 'transparent';
        });
    });
}

// ===== NAVBAR SCROLL EFFECT =====
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!navbar) return;
    
    // Sticky navbar on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Active nav link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}` || 
                (current === '' && link.getAttribute('href') === 'index.html')) {
                link.classList.add('active');
            }
        });
    });
}

// ===== THEME SWITCHER =====
function initThemeSwitcher() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle?.querySelector('i');
    
    if (!themeToggle || !themeIcon) return;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add transition class for smooth theme change
        document.documentElement.classList.add('theme-transition');
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        updateThemeIcon(newTheme);
        
        // Remove transition class after animation
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transition');
        }, 300);
    });
    
    function updateThemeIcon(theme) {
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
}

// ===== TYPEWRITER EFFECT =====
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;
    
    const texts = [
        "That Make Noise",
        "That Convert",
        "That Shine",
        "That Engage",
        "That Stand Out"
    ];
    
    let speed = 100;
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            speed = 50;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            speed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isEnd = true;
            speed = 1500; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            speed = 500; // Pause before typing next
        }
        
        setTimeout(type, speed);
    }
    
    // Start typewriter after a delay
    setTimeout(type, 1000);
}

// ===== PARTICLES BACKGROUND =====
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#00d9ff"
                },
                shape: {
                    type: "circle"
                },
                opacity: {
                    value: 0.5,
                    random: true
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#00d9ff",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "repulse"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    }
                }
            },
            retina_detect: true
        });
    }
}

// ===== TILT ANIMATIONS =====
function initTiltEffects() {
    if (typeof VanillaTilt !== 'undefined') {
        const tiltElements = document.querySelectorAll('[data-tilt]');
        
        tiltElements.forEach(element => {
            VanillaTilt.init(element, {
                max: 15,
                speed: 400,
                glare: true,
                "max-glare": 0.2,
                scale: 1.05
            });
        });
    }
}

// ===== ANIMATED COUNTERS =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (!counters.length) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// ===== PROJECTS SLIDER =====
function initProjectsSlider() {
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!sliderTrack || !slides.length) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    function updateSlider() {
        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }
    
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Auto-slide every 5 seconds
    setInterval(nextSlide, 5000);
}

// ===== REVIEWS SLIDER =====
function initReviewsSlider() {
    const reviews = document.querySelectorAll('.review-card');
    const dots = document.querySelectorAll('.dot');
    
    if (!reviews.length || !dots.length) return;
    
    let currentReview = 0;
    
    function showReview(index) {
        // Hide all reviews
        reviews.forEach(review => review.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show selected review
        reviews[index].classList.add('active');
        dots[index].classList.add('active');
        currentReview = index;
    }
    
    // Add click events to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showReview(index);
        });
    });
    
    // Auto-rotate reviews every 4 seconds
    setInterval(() => {
        currentReview = (currentReview + 1) % reviews.length;
        showReview(currentReview);
    }, 4000);
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.card, .service-item, .section-header, .tech-logo');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// ===== PAGE TRANSITIONS =====
function initPageTransitions() {
    // Add transition class to all links
    const links = document.querySelectorAll('a:not([href^="#"]):not([href^="javascript"]):not([target="_blank"])');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only apply transition for internal links
            if (href && href !== '#' && !href.startsWith('javascript') && !href.startsWith('mailto') && !href.startsWith('tel')) {
                e.preventDefault();
                
                // Add fade-out effect
                document.body.classList.add('page-transition-out');
                
                // Navigate after transition
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
}

// ===== RIPPLE BUTTON EFFECT =====
function initRippleButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-view');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('div');
            ripple.classList.add('btn-ripple');
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ===== FORM VALIDATION (for contact page) =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;
        
        // Reset errors
        document.querySelectorAll('.error').forEach(el => el.remove());
        
        // Validate name
        if (!name) {
            showError('name', 'Please enter your name');
            isValid = false;
        }
        
        // Validate email
        if (!email) {
            showError('email', 'Please enter your email');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', 'Please enter a valid email');
            isValid = false;
        }
        
        // Validate message
        if (!message) {
            showError('message', 'Please enter your message');
            isValid = false;
        }
        
        if (isValid) {
            // Show success message
            const submitBtn = contactForm.querySelector('.btn-primary');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // In a real app, you would use EmailJS or fetch API here
                alert('Thank you for your message! We\'ll get back to you soon.');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        }
    });
    
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const error = document.createElement('div');
        error.className = 'error';
        error.textContent = message;
        error.style.color = '#ff4757';
        error.style.fontSize = '0.9rem';
        error.style.marginTop = '5px';
        
        field.parentNode.appendChild(error);
        field.style.borderColor = '#ff4757';
        
        // Remove error on input
        field.addEventListener('input', function() {
            error.remove();
            this.style.borderColor = '';
        }, { once: true });
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}

// ===== LAZY LOADING IMAGES =====
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Call additional initializations
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initLazyLoading();
});

// ===== TRUSTED BY CAROUSEL =====
function initTrustedCarousel() {
    const brandsTrack = document.querySelector('.brands-track');
    const brandLogos = document.querySelectorAll('.brand-logo');
    
    if (!brandsTrack || !brandLogos.length) return;
    
    // Pause/play on hover
    brandsTrack.addEventListener('mouseenter', () => {
        brandsTrack.style.animationPlayState = 'paused';
    });
    
    brandsTrack.addEventListener('mouseleave', () => {
        brandsTrack.style.animationPlayState = 'running';
    });
    
    // Enhanced hover effects
    brandLogos.forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            const brand = this.getAttribute('data-brand');
            const icon = this.querySelector('.brand-icon i');
            const glow = this.querySelector('.brand-glow');
            
            // Create pulse effect
            this.style.transform = 'translateY(-10px) scale(1.05)';
            
            // Enhance glow
            if (glow) {
                glow.style.opacity = '0.3';
                glow.style.filter = 'blur(25px)';
            }
            
            // Add subtle bounce to icon
            if (icon) {
                icon.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                icon.style.transform = 'scale(1.3) rotate(5deg)';
            }
        });
        
        logo.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.brand-icon i');
            const glow = this.querySelector('.brand-glow');
            
            // Reset transformations
            this.style.transform = '';
            
            // Reset glow
            if (glow) {
                glow.style.opacity = '0';
                glow.style.filter = 'blur(20px)';
            }
            
            // Reset icon
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
        
        // Click effect
        logo.addEventListener('click', function() {
            const brandName = this.querySelector('.brand-name').textContent;
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.width = '100%';
            ripple.style.height = '100%';
            ripple.style.background = 'radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)';
            ripple.style.borderRadius = 'var(--border-radius)';
            ripple.style.opacity = '0';
            ripple.style.animation = 'ripple-pulse 0.6s ease-out';
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            console.log(`Clicked on ${brandName} logo`);
        });
    });
    
    // Add CSS for ripple pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-pulse {
            0% {
                opacity: 0.5;
                transform: scale(0.8);
            }
            100% {
                opacity: 0;
                transform: scale(1.5);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Infinite loop optimization
    function optimizeCarousel() {
        const trackWidth = brandsTrack.scrollWidth / 2; // Half because we have duplicate items
        
        // Reset animation when it reaches halfway (seamless loop)
        brandsTrack.addEventListener('animationiteration', () => {
            // Smooth transition - no visual jump
            brandsTrack.style.transition = 'none';
            brandsTrack.style.transform = 'translateX(0)';
            
            // Force reflow
            void brandsTrack.offsetWidth;
            
            // Restart animation
            brandsTrack.style.transition = '';
        });
    }
    
    optimizeCarousel();
    
    // Mobile touch support
    let isDragging = false;
    let startX;
    let scrollLeft;
    
    brandsTrack.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - brandsTrack.offsetLeft;
        scrollLeft = brandsTrack.scrollLeft;
        brandsTrack.style.animationPlayState = 'paused';
    });
    
    brandsTrack.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.touches[0].pageX - brandsTrack.offsetLeft;
        const walk = (x - startX) * 2;
        brandsTrack.style.transform = `translateX(${walk}px)`;
    });
    
    brandsTrack.addEventListener('touchend', () => {
        isDragging = false;
        // Return to animation after delay
        setTimeout(() => {
            brandsTrack.style.animationPlayState = 'running';
            brandsTrack.style.transform = '';
        }, 1000);
    });
}

// Initialize in DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // Add to existing initialization
    initTrustedCarousel();
});

// Add this to your existing initialization function in script.js
document.addEventListener('DOMContentLoaded', function() {
    // ... existing initialization code ...
    
    // Initialize about page animations if on about page
    if (document.querySelector('.about-page')) {
        // Page-specific initializations
        initAboutPage();
    }
});

// About Page Specific Initialization
function initAboutPage() {
    // Initialize particles for about page
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 60 },
                color: { value: "#00d9ff" },
                shape: { type: "circle" },
                opacity: { value: 0.3, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#00d9ff",
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.5,
                    direction: "none",
                    random: true,
                    straight: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }
    
    // Add tilt effect to team cards
    if (typeof VanillaTilt !== 'undefined') {
        const teamCards = document.querySelectorAll('.team-card');
        teamCards.forEach(card => {
            VanillaTilt.init(card, {
                max: 5,
                speed: 400,
                glare: true,
                "max-glare": 0.2
            });
        });
    }
    
    console.log('WebX About Page initialized successfully! 🚀');
}

// Add services page initialization
document.addEventListener('DOMContentLoaded', function() {
    // ... existing initialization code ...
    
    // Initialize services page if on services page
    if (document.querySelector('.services-page')) {
        initServicesPage();
    }
});

// Services Page Specific Initialization
function initServicesPage() {
    // Initialize particles for services page
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 70 },
                color: { value: "#00d9ff" },
                shape: { type: "circle" },
                opacity: { value: 0.2, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 120,
                    color: "#00d9ff",
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }
    
    console.log('WebX Services Page initialized successfully! 🚀');
}

// Add projects page initialization
document.addEventListener('DOMContentLoaded', function() {
    // ... existing initialization code ...
    
    // Initialize projects page if on projects page
    if (document.querySelector('.projects-page')) {
        initProjectsPage();
    }
});

// Projects Page Specific Initialization
function initProjectsPage() {
    // Initialize particles for projects page
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80 },
                color: { value: "#00d9ff" },
                shape: { type: "circle" },
                opacity: { value: 0.2, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#00d9ff",
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.5,
                    direction: "none",
                    random: true,
                    straight: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }
    
    console.log('WebX Projects Page initialized successfully! 🚀');
}

// Add contact page initialization
document.addEventListener('DOMContentLoaded', function() {
    // ... existing initialization code ...
    
    // Initialize contact page if on contact page
    if (document.querySelector('.contact-page')) {
        initContactPage();
    }
});

// Contact Page Specific Initialization
function initContactPage() {
    // Initialize particles for contact page
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 60 },
                color: { value: "#00d9ff" },
                shape: { type: "circle" },
                opacity: { value: 0.2, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 120,
                    color: "#00d9ff",
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }
    
    // Initialize EmailJS if available
    if (typeof emailjs !== 'undefined') {
        // You would initialize EmailJS with your user ID here
        // emailjs.init("YOUR_USER_ID");
        console.log('EmailJS available for form submissions');
    }
    
    console.log('WebX Contact Page initialized successfully! 🚀');
}