// services-animations.js - Services Page Animations

class ServicesAnimations {
    constructor() {
        this.initializeAnimations();
    }

    initializeAnimations() {
        this.initPageLoader();
        this.initHeroAnimations();
        this.initServiceCards();
        this.initProcessSteps();
        this.initPricingCards();
        this.initFAQ();
        this.initScrollAnimations();
        this.initHoverEffects();
        this.initCounters();
    }

    // ===== PAGE LOADER =====
    initPageLoader() {
        const pageLoader = document.querySelector('.page-loader');
        
        if (!pageLoader) return;
        
        // Simulate loading
        setTimeout(() => {
            pageLoader.classList.add('loaded');
            
            // Remove from DOM after animation
            setTimeout(() => {
                pageLoader.style.display = 'none';
            }, 600);
        }, 1500);
    }

    // ===== HERO ANIMATIONS =====
    initHeroAnimations() {
        // Animate floating shapes
        const shapes = document.querySelectorAll('.floating-shape');
        shapes.forEach((shape, index) => {
            shape.style.animation = `float-shape 15s infinite linear ${index * 3}s`;
        });
        
        // Animate binary code
        const binaryLines = document.querySelectorAll('.binary-line');
        binaryLines.forEach((line, index) => {
            // Generate random binary string
            let binary = '';
            for (let i = 0; i < 50; i++) {
                binary += Math.random() > 0.5 ? '1' : '0';
                if ((i + 1) % 8 === 0) binary += ' ';
            }
            line.textContent = binary;
            
            // Set animation
            line.style.animation = `binary-scroll 20s linear infinite ${index * 5}s`;
        });
        
        // Preview card interactions
        this.initPreviewCards();
    }

    initPreviewCards() {
        const previewCards = document.querySelectorAll('.preview-card');
        
        previewCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.handlePreviewCardHover(card, true);
            });
            
            card.addEventListener('mouseleave', () => {
                this.handlePreviewCardHover(card, false);
            });
            
            card.addEventListener('click', () => {
                this.handlePreviewCardClick(card);
            });
        });
    }

    handlePreviewCardHover(card, isHovering) {
        const glow = card.querySelector('.preview-glow');
        
        if (isHovering) {
            card.style.transform = 'translateX(10px)';
            card.style.borderColor = 'var(--accent-primary)';
            
            if (glow) {
                glow.style.opacity = '0.2';
            }
        } else {
            if (!card.classList.contains('active')) {
                card.style.transform = '';
                card.style.borderColor = '';
            }
            
            if (glow) {
                glow.style.opacity = '0';
            }
        }
    }

    handlePreviewCardClick(card) {
        const previewCards = document.querySelectorAll('.preview-card');
        previewCards.forEach(c => c.classList.remove('active'));
        
        card.classList.add('active');
        
        // Create click effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = '100%';
        ripple.style.height = '100%';
        ripple.style.top = '0';
        ripple.style.left = '0';
        ripple.style.background = 'radial-gradient(circle, transparent 30%, rgba(0, 217, 255, 0.1) 70%, transparent 100%)';
        ripple.style.borderRadius = 'var(--border-radius)';
        ripple.style.opacity = '0';
        ripple.style.animation = 'preview-card-click 0.6s ease-out';
        ripple.style.zIndex = '1';
        
        card.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Add CSS for animation if not exists
        if (!document.querySelector('#preview-card-animation')) {
            const style = document.createElement('style');
            style.id = 'preview-card-animation';
            style.textContent = `
                @keyframes preview-card-click {
                    0% {
                        opacity: 0.5;
                        transform: scale(0.8);
                    }
                    100% {
                        opacity: 0;
                        transform: scale(1.2);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ===== SERVICE CARDS =====
    initServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        // Intersection Observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    card.classList.add('visible');
                    
                    // Staggered animation
                    const delay = index * 0.1;
                    card.style.transition = `opacity 0.6s cubic-bezier(0.2, 0.9, 0.3, 1) ${delay}s, transform 0.6s cubic-bezier(0.2, 0.9, 0.3, 1) ${delay}s`;
                    
                    observer.unobserve(card);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        serviceCards.forEach(card => {
            observer.observe(card);
        });
        
        // Add tilt effect
        if (typeof VanillaTilt !== 'undefined') {
            serviceCards.forEach(card => {
                VanillaTilt.init(card, {
                    max: 5,
                    speed: 400,
                    glare: true,
                    "max-glare": 0.1
                });
            });
        }
    }

    // ===== PROCESS STEPS =====
    initProcessSteps() {
        const processSteps = document.querySelectorAll('.process-step');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const step = entry.target;
                    step.classList.add('visible');
                    
                    // Staggered animation
                    const delay = index * 0.15;
                    step.style.transition = `opacity 0.8s cubic-bezier(0.2, 0.9, 0.3, 1) ${delay}s, transform 0.8s cubic-bezier(0.2, 0.9, 0.3, 1) ${delay}s`;
                    
                    observer.unobserve(step);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        processSteps.forEach(step => {
            observer.observe(step);
        });
    }

    // ===== PRICING CARDS =====
    initPricingCards() {
        const pricingCards = document.querySelectorAll('.pricing-card');
        
        pricingCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.handlePricingCardHover(card, true);
            });
            
            card.addEventListener('mouseleave', () => {
                this.handlePricingCardHover(card, false);
            });
        });
    }

    handlePricingCardHover(card, isHovering) {
        const glow = card.querySelector('.pricing-glow');
        
        if (isHovering) {
            if (card.classList.contains('popular')) {
                card.style.transform = 'scale(1.05) translateY(-10px)';
            } else {
                card.style.transform = 'translateY(-10px)';
            }
            card.style.borderColor = 'var(--accent-primary)';
            
            if (glow) {
                glow.style.opacity = '0.1';
            }
        } else {
            if (card.classList.contains('popular')) {
                card.style.transform = 'scale(1.05)';
            } else {
                card.style.transform = '';
            }
            card.style.borderColor = '';
            
            if (glow) {
                glow.style.opacity = '0';
            }
        }
    }

    // ===== FAQ =====
    initFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                this.handleFAQClick(item);
            });
            
            // Keyboard support
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleFAQClick(item);
                }
            });
        });
    }

    handleFAQClick(item) {
        const isActive = item.classList.contains('active');
        
        // Close all items
        document.querySelectorAll('.faq-item').forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    }

    // ===== SCROLL ANIMATIONS =====
    initScrollAnimations() {
        // Add scroll-triggered animations for various elements
        this.animateOnScroll();
    }

    animateOnScroll() {
        // This would be implemented with GSAP or similar in a real project
        // For now, we'll use the IntersectionObserver pattern already implemented
    }

    // ===== HOVER EFFECTS =====
    initHoverEffects() {
        // Add specific hover effects for service cards
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const iconGlow = card.querySelector('.icon-glow');
                const serviceGlow = card.querySelector('.service-glow');
                
                if (iconGlow) iconGlow.style.opacity = '0.3';
                if (serviceGlow) serviceGlow.style.opacity = '0.15';
            });
            
            card.addEventListener('mouseleave', () => {
                const iconGlow = card.querySelector('.icon-glow');
                const serviceGlow = card.querySelector('.service-glow');
                
                if (iconGlow) iconGlow.style.opacity = '0';
                if (serviceGlow) serviceGlow.style.opacity = '0';
            });
        });
    }

    // ===== COUNTERS =====
    initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        });
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
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
    }
}

// Initialize services animations
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.services-page')) {
        window.servicesAnimations = new ServicesAnimations();
        
        // Add to global WebX namespace
        if (typeof window.WebX === 'undefined') {
            window.WebX = {};
        }
        window.WebX.ServicesAnimations = ServicesAnimations;
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ServicesAnimations };
}