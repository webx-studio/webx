// animations.js - About Page Animations Module

class AboutAnimations {
    constructor() {
        this.initializeAnimations();
    }

    initializeAnimations() {
        this.initPageLoader();
        this.initHeroAnimations();
        this.initScrollAnimations();
        this.initTeamCards();
        this.initTimeline();
        this.initTechGrid();
        this.initHoverEffects();
    }

    // ===== PAGE LOADER =====
    initPageLoader() {
        const pageLoader = document.querySelector('.page-loader');
        
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
        // Letter-by-letter reveal for hero title
        const letters = document.querySelectorAll('.about-hero-title .letter');
        
        if (letters.length > 0) {
            letters.forEach((letter, index) => {
                // Set initial state
                letter.style.opacity = '0';
                letter.style.transform = 'translateY(30px)';
                
                // Animate with delay
                setTimeout(() => {
                    letter.style.transition = 'opacity 0.9s cubic-bezier(0.2, 0.9, 0.3, 1), transform 0.9s cubic-bezier(0.2, 0.9, 0.3, 1)';
                    letter.style.opacity = '1';
                    letter.style.transform = 'translateY(0)';
                }, 100 + (index * 35)); // 0.9s duration, 0.035s stagger
            });
        }
        
        // Founder message animation
        const founderMessage = document.querySelector('.founder-message');
        if (founderMessage) {
            setTimeout(() => {
                founderMessage.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                founderMessage.style.opacity = '1';
                founderMessage.style.transform = 'translateY(0)';
            }, 1000);
        }
        
        // Background grid pulse
        const gridLines = document.querySelectorAll('.grid-line');
        gridLines.forEach((line, index) => {
            line.style.animation = `grid-pulse 4s infinite alternate ${index * 0.5}s`;
        });
    }

    // ===== SCROLL ANIMATIONS =====
    initScrollAnimations() {
        // Timeline stroke animation
        this.animateTimelineStroke();
        
        // Intersection Observer for scroll reveals
        this.initIntersectionObserver();
    }

    // ===== TEAM CARDS =====
    initTeamCards() {
        const teamCards = document.querySelectorAll('.team-card');
        
        teamCards.forEach(card => {
            // Add hover effect listeners
            card.addEventListener('mouseenter', () => {
                this.handleTeamCardHover(card, true);
            });
            
            card.addEventListener('mouseleave', () => {
                this.handleTeamCardHover(card, false);
            });
            
            // Keyboard navigation
            card.addEventListener('focus', () => {
                this.handleTeamCardHover(card, true);
            });
            
            card.addEventListener('blur', () => {
                this.handleTeamCardHover(card, false);
            });
            
            // Click effect
            card.addEventListener('click', (e) => {
                if (e.target.tagName !== 'A') {
                    this.handleTeamCardClick(card);
                }
            });
        });
    }

    handleTeamCardHover(card, isHovering) {
        const photo = card.querySelector('.member-photo');
        const glow = card.querySelector('.photo-glow');
        
        if (isHovering) {
            // Apply hover transformations
            card.style.transform = 'translateY(-6px)';
            card.style.borderColor = 'var(--accent-primary)';
            card.style.boxShadow = '0 0 15px var(--accent-primary)';
            
            if (photo) {
                photo.style.transform = 'scale(1.06) rotate(2deg)';
                photo.style.boxShadow = '0 0 25px var(--accent-primary)';
            }
            
            if (glow) {
                glow.style.opacity = '0.3';
            }
        } else {
            // Reset transformations
            card.style.transform = '';
            card.style.borderColor = '';
            card.style.boxShadow = '';
            
            if (photo) {
                photo.style.transform = '';
                photo.style.boxShadow = '';
            }
            
            if (glow) {
                glow.style.opacity = '0';
            }
        }
    }

    handleTeamCardClick(card) {
        // Create ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.width = '100%';
        ripple.style.height = '100%';
        ripple.style.top = '0';
        ripple.style.left = '0';
        ripple.style.background = 'radial-gradient(circle, transparent 30%, rgba(0, 217, 255, 0.1) 70%, transparent 100%)';
        ripple.style.borderRadius = 'var(--border-radius)';
        ripple.style.opacity = '0';
        ripple.style.animation = 'team-card-click 0.6s ease-out';
        ripple.style.zIndex = '1';
        
        card.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Add CSS for animation if not exists
        if (!document.querySelector('#team-card-animation')) {
            const style = document.createElement('style');
            style.id = 'team-card-animation';
            style.textContent = `
                @keyframes team-card-click {
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

    // ===== TIMELINE =====
    initTimeline() {
        // Animate timeline stroke on scroll
        this.animateTimelineStroke();
        
        // Add scroll listener for timeline items
        this.animateTimelineItems();
    }

    animateTimelineStroke() {
        const timelineStroke = document.querySelector('.timeline-stroke');
        if (!timelineStroke) return;
        
        // Set initial state
        timelineStroke.style.strokeDashoffset = '1200';
        
        // Animate stroke on load
        setTimeout(() => {
            timelineStroke.style.transition = 'stroke-dashoffset 2s cubic-bezier(0.2, 0.9, 0.3, 1)';
            timelineStroke.style.strokeDashoffset = '0';
        }, 500);
    }

    animateTimelineItems() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const item = entry.target;
                    item.classList.add('visible');
                    
                    // Add animation delay for stagger effect
                    const index = Array.from(timelineItems).indexOf(item);
                    item.style.transition = `opacity 0.8s cubic-bezier(0.2, 0.9, 0.3, 1) ${index * 0.15}s, transform 0.8s cubic-bezier(0.2, 0.9, 0.3, 1) ${index * 0.15}s`;
                    
                    observer.unobserve(item);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });
        
        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }

    // ===== TECH GRID =====
    initTechGrid() {
        const techItems = document.querySelectorAll('.tech-item');
        
        // Intersection Observer for staggered entry
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const item = entry.target;
                    item.classList.add('visible');
                    
                    // Staggered animation
                    const delay = index * 0.06;
                    item.style.transition = `opacity 0.5s cubic-bezier(0.2, 0.9, 0.3, 1) ${delay}s, transform 0.5s cubic-bezier(0.2, 0.9, 0.3, 1) ${delay}s`;
                    
                    observer.unobserve(item);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        techItems.forEach(item => {
            observer.observe(item);
        });
        
        // Hover effects
        techItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.handleTechItemHover(item, true);
            });
            
            item.addEventListener('mouseleave', () => {
                this.handleTechItemHover(item, false);
            });
        });
    }

    handleTechItemHover(item, isHovering) {
        const icon = item.querySelector('.tech-icon');
        const glow = item.querySelector('.tech-glow');
        const tooltip = item.querySelector('.tech-tooltip');
        
        if (isHovering) {
            item.style.transform = 'translateY(-10px) scale(1.12)';
            item.style.borderColor = 'var(--accent-primary)';
            item.style.boxShadow = '0 0 15px var(--accent-primary)';
            
            if (icon) {
                icon.style.color = 'var(--accent-primary)';
                icon.style.transform = 'rotate(10deg)';
            }
            
            if (glow) {
                glow.style.opacity = '0.3';
            }
            
            if (tooltip) {
                tooltip.style.opacity = '1';
                tooltip.style.visibility = 'visible';
                tooltip.style.bottom = '-35px';
            }
        } else {
            // Reset to floating animation
            item.style.transform = 'translateY(0) scale(1)';
            item.style.borderColor = '';
            item.style.boxShadow = '';
            
            if (icon) {
                icon.style.color = '';
                icon.style.transform = '';
            }
            
            if (glow) {
                glow.style.opacity = '0';
            }
            
            if (tooltip) {
                tooltip.style.opacity = '0';
                tooltip.style.visibility = 'hidden';
                tooltip.style.bottom = '-40px';
            }
        }
    }

    // ===== INTERSECTION OBSERVER =====
    initIntersectionObserver() {
        const teamCards = document.querySelectorAll('.team-card:not(.visible)');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    card.classList.add('visible');
                    
                    // Add slight delay for staggered effect
                    const index = Array.from(teamCards).indexOf(card);
                    const delay = index * 0.1;
                    
                    card.style.transition = `opacity 0.5s cubic-bezier(0.2, 0.9, 0.3, 1) ${delay}s, transform 0.5s cubic-bezier(0.2, 0.9, 0.3, 1) ${delay}s`;
                    
                    observer.unobserve(card);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        teamCards.forEach(card => {
            observer.observe(card);
        });
    }

    // ===== HOVER EFFECTS =====
    initHoverEffects() {
        // Add floating animation to tech items
        const techItems = document.querySelectorAll('.tech-item');
        techItems.forEach((item, index) => {
            const delay = index * 0.5;
            item.style.animationDelay = `${delay}s`;
        });
        
        // Add pulse animation to timeline dots
        const timelineDots = document.querySelectorAll('.timeline-dot');
        timelineDots.forEach((dot, index) => {
            dot.style.animationDelay = `${index * 0.4}s`;
        });
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the about page
    if (document.querySelector('.about-page')) {
        window.aboutAnimations = new AboutAnimations();
        
        // Add to global WebX namespace
        if (typeof window.WebX === 'undefined') {
            window.WebX = {};
        }
        window.WebX.AboutAnimations = AboutAnimations;
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AboutAnimations };
}