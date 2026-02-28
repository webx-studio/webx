// projects-animations.js - Projects Page Interactive Features

class ProjectsAnimations {
    constructor() {
        this.projectsData = this.getProjectsData();
        this.currentFilter = 'all';
        this.currentSort = 'newest';
        this.searchTerm = '';
        this.activeTechFilters = new Set();
        this.currentProjectIndex = 0;
        this.visibleProjects = 12;
        
        this.initializeAnimations();
    }

    getProjectsData() {
        return [
            {
                id: 'nexus',
                title: 'Nexus Financial Dashboard',
                category: 'web',
                tech: ['react', 'd3', 'node'],
                year: 2025,
                popular: true,
                description: 'A sophisticated real-time analytics platform designed for financial institutions, providing comprehensive data visualization and actionable insights.',
                features: [
                    'Real-time data visualization with D3.js',
                    'Interactive charts and graphs',
                    'Role-based access control',
                    'Mobile-responsive design',
                    'API integration with financial data sources'
                ],
                results: [
                    '300% increase in user engagement',
                    '40% reduction in data processing time',
                    '99.9% uptime since launch'
                ],
                client: 'Nexus Financial',
                role: 'Full-stack Development & UI/UX Design',
                duration: '4 months',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6ULIH9ZAfcWL1LHsqoInXV85mjDPzr74emg&s'
            },
            {
                id: 'ecoshop',
                title: 'EcoShop Sustainable Store',
                category: 'ecommerce',
                tech: ['shopify', 'three', 'ar'],
                year: 2025,
                popular: true,
                description: 'An innovative e-commerce platform promoting sustainable living with AR product visualization and carbon-neutral shipping.',
                features: [
                    'AR product try-on with Three.js',
                    'Carbon footprint calculator',
                    'Sustainable packaging options',
                    'Integration with eco-friendly suppliers',
                    'Gamified rewards for sustainable choices'
                ],
                results: [
                    '45% conversion rate increase',
                    '25% reduction in returns through AR preview',
                    '10,000+ monthly active users'
                ],
                client: 'EcoShop',
                role: 'E-commerce Development & AR Integration',
                duration: '3 months',
                image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 'zenith',
                title: 'Zenith Fitness App',
                category: 'mobile',
                tech: ['react', 'ai', 'healthkit'],
                year: 2025,
                popular: false,
                description: 'AI-powered personal training application that creates customized workout plans based on user goals and progress.',
                features: [
                    'AI-generated workout plans',
                    'Integration with HealthKit and Google Fit',
                    'Real-time form correction',
                    'Progress tracking and analytics',
                    'Social features and challenges'
                ],
                results: [
                    '500,000+ downloads',
                    '4.9-star rating on app stores',
                    '400% increase in user retention'
                ],
                client: 'Zenith Fitness',
                role: 'Mobile App Development & AI Integration',
                duration: '5 months',
                image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 'aura',
                title: 'Aura Brand Identity',
                category: 'branding',
                tech: ['vue', 'branding', 'gsap'],
                year: 2025,
                popular: false,
                description: 'Complete visual identity system for a luxury skincare brand, including logo, packaging, and digital presence.',
                features: [
                    'Complete brand guidelines',
                    'Animated website with GSAP',
                    'Product packaging design',
                    'Social media templates',
                    'Marketing collateral'
                ],
                results: [
                    '200% increase in brand recall',
                    'Won Design Award 2023',
                    '30% sales increase post-launch'
                ],
                client: 'Aura Skincare',
                role: 'Brand Identity & Web Development',
                duration: '2 months',
                image: 'https://images.unsplash.com/photo-1567446537710-0e9b8d4d8c4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 'flow',
                title: 'Flow SaaS Platform',
                category: 'web',
                tech: ['node', 'react', 'mongodb'],
                year: 2025,
                popular: true,
                description: 'Enterprise-grade project management SaaS with AI automation, team collaboration, and advanced analytics.',
                features: [
                    'AI-powered task automation',
                    'Real-time team collaboration',
                    'Advanced reporting and analytics',
                    'Integration with 50+ tools',
                    'Custom workflow builder'
                ],
                results: [
                    '10,000+ teams onboarded',
                    '60% productivity increase reported',
                    '$5M in annual recurring revenue'
                ],
                client: 'Flow Technologies',
                role: 'SaaS Development & AI Integration',
                duration: '6 months',
                image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 'artverse',
                title: 'ArtVerse AR Museum',
                category: 'uiux',
                tech: ['three', 'webgl', 'webxr'],
                year: 2025,
                popular: false,
                description: 'Immersive virtual museum experience allowing users to explore art exhibitions in augmented reality.',
                features: [
                    'WebXR-based AR experiences',
                    'Interactive 3D art galleries',
                    'Multi-user virtual tours',
                    'Artwork information overlay',
                    'Social sharing features'
                ],
                results: [
                    '1,000,000+ virtual visitors',
                    'Partnerships with 20+ museums',
                    'Featured in TechCrunch'
                ],
                client: 'ArtVerse Foundation',
                role: 'AR Development & 3D Design',
                duration: '4 months',
                image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 'medicare',
                title: 'MediCare Portal',
                category: 'web',
                tech: ['vue', 'python', 'postgresql'],
                year: 2025,
                popular: false,
                description: 'HIPAA-compliant healthcare management system for clinics, featuring patient records and appointment scheduling.',
                features: [
                    'HIPAA-compliant security',
                    'Electronic health records',
                    'Appointment scheduling',
                    'Telemedicine integration',
                    'Billing and insurance processing'
                ],
                results: [
                    '50+ clinics using platform',
                    '99.99% uptime',
                    'Reduced admin work by 70%'
                ],
                client: 'MediCare Solutions',
                role: 'Healthcare Platform Development',
                duration: '8 months',
                image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            },
            {
                id: 'freshly',
                title: 'Freshly Food Delivery',
                category: 'mobile',
                tech: ['react', 'firebase', 'maps'],
                year: 2025,
                popular: false,
                description: 'Hyperlocal food delivery platform with real-time tracking, restaurant partnerships, and instant delivery.',
                features: [
                    'Real-time order tracking',
                    'Restaurant management dashboard',
                    'Rider allocation algorithm',
                    'In-app payments',
                    'Ratings and reviews'
                ],
                results: [
                    '15-minute average delivery time',
                    '200+ restaurant partners',
                    '4.8-star app rating'
                ],
                client: 'Freshly Delivery',
                role: 'Mobile App & Backend Development',
                duration: '3 months',
                image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
            }
        ];
    }

    initializeAnimations() {
        this.initPageLoader();
        this.initHeroAnimations();
        this.initFilterSystem();
        this.initProjectCards();
        this.initModalSystem();
        this.initTestimonialsSlider();
        this.initLoadMore();
        this.initCounters();
        this.initScrollAnimations();
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
        // Animate grid elements
        const gridLines = document.querySelectorAll('.grid-line');
        gridLines.forEach((line, index) => {
            line.style.animation = `grid-line-pulse 3s infinite alternate ${index * 0.5}s`;
        });
        
        const gridDots = document.querySelectorAll('.grid-dot');
        gridDots.forEach((dot, index) => {
            dot.style.animation = `grid-dot-pulse 2s infinite alternate ${index * 0.3}s`;
        });
    }

    // ===== FILTER SYSTEM =====
    initFilterSystem() {
        // Category filter buttons
        const filterBtns = document.querySelectorAll('.filter-btn, .filter-tag');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.handleFilterClick(btn);
            });
        });
        
        // Technology filters
        const techFilters = document.querySelectorAll('.tech-filter');
        techFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                this.handleTechFilterClick(filter);
            });
        });
        
        // Search input
        const searchInput = document.getElementById('projectSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearchInput(e.target.value);
            });
        }
        
        // Sort select
        const sortSelect = document.getElementById('projectSort');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.handleSortChange(e.target.value);
            });
        }
    }

    handleFilterClick(btn) {
        const filter = btn.dataset.filter;
        
        // Update active filter
        document.querySelectorAll('.filter-btn, .filter-tag').forEach(b => {
            b.classList.remove('active');
        });
        btn.classList.add('active');
        
        this.currentFilter = filter;
        this.updateProjectsDisplay();
    }

    handleTechFilterClick(filter) {
        const tech = filter.dataset.tech;
        
        filter.classList.toggle('active');
        
        if (this.activeTechFilters.has(tech)) {
            this.activeTechFilters.delete(tech);
        } else {
            this.activeTechFilters.add(tech);
        }
        
        this.updateProjectsDisplay();
    }

    handleSearchInput(searchTerm) {
        this.searchTerm = searchTerm.toLowerCase();
        this.updateProjectsDisplay();
    }

    handleSortChange(sortValue) {
        this.currentSort = sortValue;
        this.updateProjectsDisplay();
    }

    // ===== PROJECT CARDS =====
    initProjectCards() {
        this.updateProjectsDisplay();
        
        // Add hover effects to all project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.handleProjectCardHover(card, true);
            });
            
            card.addEventListener('mouseleave', () => {
                this.handleProjectCardHover(card, false);
            });
        });
        
        // Add tilt effect
        if (typeof VanillaTilt !== 'undefined') {
            projectCards.forEach(card => {
                VanillaTilt.init(card, {
                    max: 5,
                    speed: 400,
                    glare: true,
                    "max-glare": 0.1
                });
            });
        }
    }

    handleProjectCardHover(card, isHovering) {
        const glow = card.querySelector('.project-glow');
        
        if (isHovering && glow) {
            glow.style.opacity = '0.15';
        } else if (glow) {
            glow.style.opacity = '0';
        }
    }

    updateProjectsDisplay() {
        const projectItems = document.querySelectorAll('.project-item');
        const projectsContainer = document.querySelector('.projects-masonry');
        
        if (!projectItems.length || !projectsContainer) return;
        
        // Get filtered and sorted projects
        const filteredProjects = this.getFilteredProjects();
        
        // Hide all projects first
        projectItems.forEach(item => {
            item.style.display = 'none';
            item.classList.remove('visible');
        });
        
        // Show filtered projects with animation
        filteredProjects.slice(0, this.visibleProjects).forEach(projectData => {
            const projectItem = document.querySelector(`.project-item[data-category="${projectData.category}"][data-tech="${projectData.tech[0]}"][data-year="${projectData.year}"]`);
            
            if (projectItem) {
                projectItem.style.display = 'block';
                
                // Trigger animation
                setTimeout(() => {
                    projectItem.classList.add('visible');
                }, 100);
            }
        });
        
        // Update project count
        this.updateProjectCount(filteredProjects.length);
    }

    getFilteredProjects() {
        let filtered = this.projectsData.filter(project => {
            // Category filter
            if (this.currentFilter !== 'all' && project.category !== this.currentFilter) {
                return false;
            }
            
            // Tech filter
            if (this.activeTechFilters.size > 0) {
                const hasMatchingTech = project.tech.some(tech => this.activeTechFilters.has(tech));
                if (!hasMatchingTech) return false;
            }
            
            // Search filter
            if (this.searchTerm) {
                const searchableText = [
                    project.title,
                    project.category,
                    project.client,
                    project.description
                ].join(' ').toLowerCase();
                
                if (!searchableText.includes(this.searchTerm)) {
                    return false;
                }
            }
            
            return true;
        });
        
        // Sort projects
        filtered.sort((a, b) => {
            switch (this.currentSort) {
                case 'newest':
                    return b.year - a.year;
                case 'oldest':
                    return a.year - b.year;
                case 'popular':
                    return (b.popular === a.popular) ? 0 : b.popular ? -1 : 1;
                case 'name':
                    return a.title.localeCompare(b.title);
                default:
                    return 0;
            }
        });
        
        return filtered;
    }

    updateProjectCount(count) {
        const loadMoreBtn = document.getElementById('loadMoreProjects');
        const totalProjects = this.getFilteredProjects().length;
        
        if (loadMoreBtn) {
            if (this.visibleProjects >= totalProjects) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'inline-flex';
                loadMoreBtn.innerHTML = `
                    <span>Load More (${totalProjects - this.visibleProjects} remaining)</span>
                    <i class="fas fa-plus"></i>
                `;
            }
        }
    }

    // ===== MODAL SYSTEM =====
    initModalSystem() {
        // View project buttons
        const viewButtons = document.querySelectorAll('.view-project');
        viewButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = button.dataset.project;
                this.openProjectModal(projectId);
            });
        });
        
        // Modal close button
        const modalClose = document.querySelector('.modal-close');
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                this.closeProjectModal();
            });
        }
        
        // Modal overlay click to close
        const modalOverlay = document.querySelector('.modal-overlay');
        if (modalOverlay) {
            modalOverlay.addEventListener('click', () => {
                this.closeProjectModal();
            });
        }
        
        // Navigation buttons
        const prevBtn = document.querySelector('.prev-project');
        const nextBtn = document.querySelector('.next-project');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.navigateProjectModal('prev');
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.navigateProjectModal('next');
            });
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            const modal = document.querySelector('.project-modal');
            if (!modal || !modal.classList.contains('active')) return;
            
            if (e.key === 'Escape') {
                this.closeProjectModal();
            } else if (e.key === 'ArrowLeft') {
                this.navigateProjectModal('prev');
            } else if (e.key === 'ArrowRight') {
                this.navigateProjectModal('next');
            }
        });
    }

    openProjectModal(projectId) {
        const modal = document.getElementById('projectModal');
        const modalContent = modal.querySelector('.modal-content');
        
        if (!modal || !modalContent) return;
        
        // Find project data
        const project = this.projectsData.find(p => p.id === projectId);
        if (!project) return;
        
        // Update current project index
        this.currentProjectIndex = this.projectsData.findIndex(p => p.id === projectId);
        
        // Populate modal content
        modalContent.innerHTML = this.createModalContent(project);
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add animation
        this.animateModalIn();
    }

    createModalContent(project) {
        return `
            <div class="modal-project-header">
                <h2 class="modal-project-title">${project.title}</h2>
                <div class="modal-project-meta">
                    <span class="modal-project-category">${this.formatCategory(project.category)}</span>
                    <span class="modal-project-year">${project.year}</span>
                    <span class="modal-project-client">Client: ${project.client}</span>
                </div>
            </div>
            
            <div class="modal-project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            
            <div class="modal-project-content">
                <div class="modal-project-description">
                    ${project.description}
                </div>
                
                <div class="modal-project-details">
                    <div class="detail-item">
                        <h4 class="detail-title">Our Role</h4>
                        <p class="detail-content">${project.role}</p>
                    </div>
                    
                    <div class="detail-item">
                        <h4 class="detail-title">Duration</h4>
                        <p class="detail-content">${project.duration}</p>
                    </div>
                    
                    <div class="detail-item">
                        <h4 class="detail-title">Technologies</h4>
                        <div class="tech-tags">
                            ${project.tech.map(tech => `<span class="tech-tag">${this.formatTech(tech)}</span>`).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="modal-project-features">
                    <h3>Key Features</h3>
                    <ul>
                        ${project.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-project-results">
                    <h3>Results & Impact</h3>
                    <ul>
                        ${project.results.map(result => `<li><i class="fas fa-chart-line"></i> ${result}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    formatCategory(category) {
        const categories = {
            'web': 'Web Development',
            'mobile': 'Mobile App',
            'ecommerce': 'E-commerce',
            'branding': 'Brand Identity',
            'uiux': 'UI/UX Design'
        };
        return categories[category] || category;
    }

    formatTech(tech) {
        const techMap = {
            'react': 'React',
            'vue': 'Vue.js',
            'node': 'Node.js',
            'shopify': 'Shopify',
            'three': 'Three.js',
            'ai': 'AI/ML',
            'd3': 'D3.js',
            'branding': 'Brand Design',
            'gsap': 'GSAP',
            'webgl': 'WebGL',
            'webxr': 'WebXR',
            'python': 'Python',
            'postgresql': 'PostgreSQL',
            'firebase': 'Firebase',
            'maps': 'Maps API',
            'healthkit': 'HealthKit',
            'ar': 'Augmented Reality'
        };
        return techMap[tech] || tech;
    }

    animateModalIn() {
        const modalContainer = document.querySelector('.modal-container');
        if (modalContainer) {
            modalContainer.style.animation = 'modalSlideUp 0.4s cubic-bezier(0.2, 0.9, 0.3, 1)';
        }
    }

    closeProjectModal() {
        const modal = document.getElementById('projectModal');
        if (!modal) return;
        
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    navigateProjectModal(direction) {
        const totalProjects = this.projectsData.length;
        let newIndex;
        
        if (direction === 'prev') {
            newIndex = (this.currentProjectIndex - 1 + totalProjects) % totalProjects;
        } else {
            newIndex = (this.currentProjectIndex + 1) % totalProjects;
        }
        
        const nextProject = this.projectsData[newIndex];
        if (nextProject) {
            this.openProjectModal(nextProject.id);
        }
    }

    // ===== TESTIMONIALS SLIDER =====
    initTestimonialsSlider() {
        const slides = document.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.slider-dots .dot');
        const prevBtn = document.querySelector('.prev-slide');
        const nextBtn = document.querySelector('.next-slide');
        
        if (!slides.length) return;
        
        let currentSlide = 0;
        
        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            currentSlide = index;
        };
        
        // Navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                let newIndex = currentSlide - 1;
                if (newIndex < 0) newIndex = slides.length - 1;
                showSlide(newIndex);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                let newIndex = (currentSlide + 1) % slides.length;
                showSlide(newIndex);
            });
        }
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });
        
        // Auto-rotate every 5 seconds
        setInterval(() => {
            let newIndex = (currentSlide + 1) % slides.length;
            showSlide(newIndex);
        }, 5000);
    }

    // ===== LOAD MORE =====
    initLoadMore() {
        const loadMoreBtn = document.getElementById('loadMoreProjects');
        if (!loadMoreBtn) return;
        
        loadMoreBtn.addEventListener('click', () => {
            this.loadMoreProjects();
        });
    }

    loadMoreProjects() {
        this.visibleProjects += 6;
        this.updateProjectsDisplay();
        
        // Scroll to newly loaded projects
        const projectItems = document.querySelectorAll('.project-item.visible');
        if (projectItems.length > 0) {
            const lastProject = projectItems[projectItems.length - 1];
            lastProject.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
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

    // ===== SCROLL ANIMATIONS =====
    initScrollAnimations() {
        const projectItems = document.querySelectorAll('.project-item:not(.visible)');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const item = entry.target;
                    item.classList.add('visible');
                    
                    // Staggered animation
                    const delay = index * 0.1;
                    item.style.animationDelay = `${delay}s`;
                    
                    observer.unobserve(item);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        projectItems.forEach(item => {
            observer.observe(item);
        });
    }
}

// Initialize projects animations
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.projects-page')) {
        window.projectsAnimations = new ProjectsAnimations();
        
        // Add to global WebX namespace
        if (typeof window.WebX === 'undefined') {
            window.WebX = {};
        }
        window.WebX.ProjectsAnimations = ProjectsAnimations;
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ProjectsAnimations };
}