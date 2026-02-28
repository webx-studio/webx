// contact-animations.js - Complete Contact Page Interactive Features

class ContactAnimations {
    constructor() {
        this.map = null;
        this.mapMarkers = [];
        this.currentLocation = 'headquarters';
        this.uploadedFiles = [];
        this.scheduleData = {
            ishan: {
                name: 'Ishan Maitra',
                role: 'Project Lead',
                email: 'ishanmaitra2012@gmail.com',
                availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                timezone: 'IST'
            }
        };
        
        this.initializeAnimations();
    }

    initializeAnimations() {
        this.initPageLoader();
        this.initHeroAnimations();
        this.initContactForm();
        this.initInteractiveMap();
        this.initTeamContact();
        this.initScheduleModal();
        this.initFAQ();
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
        // Animate particles
        const particles = document.querySelectorAll('.contact-particle');
        particles.forEach((particle, index) => {
            particle.style.animation = `contact-particle-float 8s infinite linear ${index * 1}s`;
        });
        
        // Animate floating icons
        const icons = document.querySelectorAll('.floating-icon');
        icons.forEach((icon, index) => {
            icon.style.animation = `floating-icon-move 6s ease-in-out infinite ${index * 2}s`;
        });
        
        // Add hover effects to contact cards
        const contactCards = document.querySelectorAll('.contact-card');
        contactCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.handleContactCardHover(card, true);
            });
            
            card.addEventListener('mouseleave', () => {
                this.handleContactCardHover(card, false);
            });
        });
    }

    handleContactCardHover(card, isHovering) {
        const glow = card.querySelector('.icon-glow');
        
        if (isHovering) {
            card.style.transform = 'translateX(10px)';
            card.style.borderColor = 'var(--accent-primary)';
            card.style.boxShadow = 'var(--neon-glow)';
            
            if (glow) {
                glow.style.opacity = '0.3';
            }
        } else {
            card.style.transform = '';
            card.style.borderColor = '';
            card.style.boxShadow = '';
            
            if (glow) {
                glow.style.opacity = '0';
            }
        }
    }

    // ===== CONTACT FORM =====
    initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;
        
        // Initialize form elements
        this.initBudgetSlider();
        this.initFileUpload();
        this.initCharacterCounter();
        
        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(form);
        });
        
        // Real-time validation
        this.initFormValidation();
    }

    initBudgetSlider() {
        const budgetSlider = document.getElementById('budget');
        const selectedBudget = document.getElementById('selectedBudget');
        const progress = document.querySelector('.slider-progress');
        
        if (!budgetSlider || !selectedBudget || !progress) return;
        
        const budgetValues = ['$5,000', '$10,000', '$20,000', '$30,000', '$40,000', '$50,000+'];
        
        const updateBudget = () => {
            const value = parseInt(budgetSlider.value);
            selectedBudget.textContent = budgetValues[value - 1];
            progress.style.width = `${((value - 1) / 5) * 100}%`;
        };
        
        budgetSlider.addEventListener('input', updateBudget);
        updateBudget(); // Initialize
    }

    initFileUpload() {
        const fileInput = document.getElementById('fileUpload');
        const filePreview = document.getElementById('filePreview');
        
        if (!fileInput || !filePreview) return;
        
        fileInput.addEventListener('change', (e) => {
            this.handleFileUpload(e.target.files, filePreview);
        });
        
        // Drag and drop support
        const fileLabel = document.querySelector('.file-label');
        if (fileLabel) {
            fileLabel.addEventListener('dragover', (e) => {
                e.preventDefault();
                fileLabel.style.borderColor = 'var(--accent-primary)';
                fileLabel.style.background = 'rgba(0, 217, 255, 0.1)';
            });
            
            fileLabel.addEventListener('dragleave', () => {
                fileLabel.style.borderColor = '';
                fileLabel.style.background = '';
            });
            
            fileLabel.addEventListener('drop', (e) => {
                e.preventDefault();
                fileLabel.style.borderColor = '';
                fileLabel.style.background = '';
                
                if (e.dataTransfer.files.length) {
                    this.handleFileUpload(e.dataTransfer.files, filePreview);
                }
            });
        }
    }

    handleFileUpload(files, previewContainer) {
        Array.from(files).forEach(file => {
            // Check file size (max 10MB)
            if (file.size > 10 * 1024 * 1024) {
                this.showFileError('File too large. Maximum size is 10MB.');
                return;
            }
            
            // Check file type
            const allowedTypes = [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'image/jpeg',
                'image/png',
                'application/zip'
            ];
            
            if (!allowedTypes.includes(file.type)) {
                this.showFileError('File type not allowed.');
                return;
            }
            
            // Add to uploaded files
            this.uploadedFiles.push(file);
            
            // Create preview item
            const previewItem = document.createElement('div');
            previewItem.className = 'file-preview-item';
            
            const icon = this.getFileIcon(file.type);
            const fileName = file.name.length > 20 ? file.name.substring(0, 20) + '...' : file.name;
            
            previewItem.innerHTML = `
                ${icon}
                <span>${fileName}</span>
                <button class="remove-file" data-filename="${file.name}">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            previewContainer.appendChild(previewItem);
            
            // Add remove functionality
            const removeBtn = previewItem.querySelector('.remove-file');
            removeBtn.addEventListener('click', () => {
                this.removeFile(file.name, previewItem);
            });
        });
    }

    getFileIcon(fileType) {
        if (fileType.includes('pdf')) {
            return '<i class="fas fa-file-pdf"></i>';
        } else if (fileType.includes('word') || fileType.includes('document')) {
            return '<i class="fas fa-file-word"></i>';
        } else if (fileType.includes('image')) {
            return '<i class="fas fa-file-image"></i>';
        } else if (fileType.includes('zip')) {
            return '<i class="fas fa-file-archive"></i>';
        }
        return '<i class="fas fa-file"></i>';
    }

    showFileError(message) {
        const formStatus = document.querySelector('.form-status');
        const errorMessage = formStatus.querySelector('.error');
        
        if (errorMessage) {
            errorMessage.querySelector('span').textContent = message;
            formStatus.classList.add('active');
            errorMessage.style.display = 'flex';
            
            setTimeout(() => {
                formStatus.classList.remove('active');
                errorMessage.style.display = 'none';
            }, 5000);
        }
    }

    removeFile(filename, previewElement) {
        this.uploadedFiles = this.uploadedFiles.filter(file => file.name !== filename);
        previewElement.remove();
    }

    initCharacterCounter() {
        const messageTextarea = document.getElementById('message');
        const charCounter = document.getElementById('charCount');
        
        if (!messageTextarea || !charCounter) return;
        
        messageTextarea.addEventListener('input', () => {
            const length = messageTextarea.value.length;
            charCounter.textContent = length;
            
            if (length > 500) {
                charCounter.style.color = '#ff4757';
            } else if (length > 400) {
                charCounter.style.color = '#f39c12';
            } else {
                charCounter.style.color = 'var(--text-secondary)';
            }
        });
    }

    initFormValidation() {
        const form = document.getElementById('contactForm');
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Real-time validation
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            // Clear errors on focus
            input.addEventListener('focus', () => {
                this.clearFieldError(input);
            });
        });
    }

    validateField(field) {
        const errorId = `${field.id}Error`;
        const errorElement = document.getElementById(errorId);
        
        if (!errorElement) return true;
        
        let isValid = true;
        let errorMessage = '';
        
        // Required validation
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Email validation
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Phone validation
        if (field.type === 'tel' && field.value) {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            const cleaned = field.value.replace(/[^\d+]/g, '');
            if (!phoneRegex.test(cleaned)) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }
        
        // Update error display
        if (!isValid) {
            errorElement.textContent = errorMessage;
            errorElement.classList.add('show');
            field.style.borderColor = '#ff4757';
        } else {
            this.clearFieldError(field);
        }
        
        return isValid;
    }

    clearFieldError(field) {
        const errorId = `${field.id}Error`;
        const errorElement = document.getElementById(errorId);
        
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
        
        field.style.borderColor = '';
    }

    async handleFormSubmit(form) {
        // Validate all fields
        const inputs = form.querySelectorAll('input, textarea, select');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        // Validate privacy checkbox
        const privacyCheckbox = document.getElementById('privacy');
        const privacyError = document.getElementById('privacyError');
        
        if (!privacyCheckbox.checked) {
            isValid = false;
            privacyError.textContent = 'You must agree to the privacy policy';
            privacyError.classList.add('show');
        } else {
            privacyError.classList.remove('show');
        }
        
        if (!isValid) {
            this.showFormStatus('error');
            return;
        }
        
        // Show loading state
        this.showFormStatus('loading');
        
        try {
            // Create FormData object
            const formData = new FormData(form);
            
            // Add additional fields
            formData.append('budget', document.getElementById('selectedBudget').textContent);
            formData.append('files_uploaded', this.uploadedFiles.length);
            
            if (this.uploadedFiles.length > 0) {
                const fileNames = this.uploadedFiles.map(f => f.name).join(', ');
                formData.append('file_names', fileNames);
            }
            
            // Send to Formspree - REPLACE WITH YOUR ACTUAL FORMSPREE ENDPOINT
            const response = await fetch('https://formspree.io/f/xqedjavk', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success
                this.showFormStatus('success');
                
                // Reset form
                setTimeout(() => {
                    form.reset();
                    this.uploadedFiles = [];
                    document.getElementById('filePreview').innerHTML = '';
                    document.getElementById('selectedBudget').textContent = '$20,000';
                    document.querySelector('.slider-progress').style.width = '50%';
                    this.showFormStatus('none');
                    
                    // Scroll to top of form
                    document.querySelector('.contact-form-section').scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                    
                }, 3000);
                
            } else {
                // Handle error
                const data = await response.json();
                throw new Error(data.error || 'Form submission failed');
            }
            
        } catch (error) {
            console.error('Formspree error:', error);
            
            // Show error message
            const statusMessage = document.querySelector('.status-message.error span');
            if (statusMessage) {
                statusMessage.textContent = error.message || 'Failed to send message. Please try again.';
            }
            
            this.showFormStatus('error');
        }
    }

    showFormStatus(status) {
        const formStatus = document.querySelector('.form-status');
        const statusMessages = formStatus.querySelectorAll('.status-message');
        
        // Hide all messages
        statusMessages.forEach(msg => msg.style.display = 'none');
        
        if (status === 'none') {
            formStatus.classList.remove('active');
            return;
        }
        
        // Show selected message
        const messageElement = formStatus.querySelector(`.${status}`);
        if (messageElement) {
            messageElement.style.display = 'flex';
            formStatus.classList.add('active');
        }
    }

    // ===== INTERACTIVE MAP =====
    initInteractiveMap() {
        const mapElement = document.getElementById('map');
        if (!mapElement) return;
        
        // Check if Leaflet is available
        if (typeof L === 'undefined') {
            console.error('Leaflet library not loaded');
            return;
        }
        
        // Initialize map with dark theme tiles
        this.map = L.map('map').setView([40.7128, -74.0060], 13);
        
        // Add dark theme tile layer (CartoDB Dark Matter)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19,
            minZoom: 3
        }).addTo(this.map);
        
        // Define locations with coordinates
        const locations = {
            headquarters: {
                coords: [40.7128, -74.0060],
                title: 'WebX Headquarters',
                address: 'Pujali, Budge Budge, South 24 Parganas, West Bengal, Kolkata - 700138',
                hours: 'Mon-Fri: 9AM-6PM IST<br>Sat-Sun: 10AM-4PM IST',
                phone: '+91 9674026774',
                description: 'Our main office where innovation happens'
            },
            studio: {
                coords: [40.7580, -73.9855],
                title: 'WebX Creative Studio',
                address: 'Pujali, Budge Budge, South 24 Parganas, West Bengal, Kolkata - 700138',
                hours: 'By appointment only',
                phone: '+91 9674026774',
                description: 'Design studio and client meeting space'
            },
            remote: {
                coords: [34.0522, -118.2437],
                title: 'Remote Office',
                address: 'Working worldwide - Virtual location',
                hours: '24/7 Remote Support',
                phone: '+91 9674026774',
                description: 'Our distributed team works globally'
            }
        };
        
        // Create custom icon for markers
        const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `
                <div class="marker-pulse"></div>
                <div class="marker-icon">
                    <i class="fas fa-map-marker-alt"></i>
                </div>
            `,
            iconSize: [30, 42],
            iconAnchor: [15, 42],
            popupAnchor: [0, -30]
        });
        
        // Add markers for each location
        Object.entries(locations).forEach(([key, location]) => {
            const marker = L.marker(location.coords, { icon: customIcon }).addTo(this.map);
            
            // Create popup content
            const popupContent = `
                <div class="map-popup">
                    <h3>${location.title}</h3>
                    <p class="popup-address">
                        <i class="fas fa-map-marker-alt"></i> ${location.address}
                    </p>
                    <p class="popup-hours">
                        <i class="fas fa-clock"></i> ${location.hours}
                    </p>
                    <p class="popup-phone">
                        <i class="fas fa-phone"></i> <a href="tel:${location.phone}">${location.phone}</a>
                    </p>
                    <p class="popup-desc">${location.description}</p>
                </div>
            `;
            
            marker.bindPopup(popupContent, {
                className: 'custom-popup',
                minWidth: 250,
                maxWidth: 300
            });
            
            // Store marker reference
            this.mapMarkers.push({
                id: key,
                marker: marker,
                coords: location.coords
            });
            
            // Open popup for headquarters by default
            if (key === 'headquarters') {
                marker.openPopup();
            }
        });
        
        // Add map controls
        const mapButtons = document.querySelectorAll('.map-btn');
        mapButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const location = btn.dataset.location;
                this.setMapLocation(location);
                
                // Update active button
                mapButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
        
        // Get directions button
        const directionsBtn = document.querySelector('.get-directions');
        if (directionsBtn) {
            directionsBtn.addEventListener('click', () => {
                this.getDirections();
            });
        }
        
        // Add zoom controls
        this.map.zoomControl.setPosition('bottomright');
    }

    setMapLocation(location) {
        this.currentLocation = location;
        
        const locations = {
            headquarters: [22.465985, -88.1466561],
            studio: [22.465985, -88.1466561],
            remote: [22.465985, -88.1466561]
        };
        
        if (locations[location]) {
            // Fly to location with smooth animation
            this.map.flyTo(locations[location], 15, {
                duration: 1.5,
                easeLinearity: 0.25
            });
            
            // Open popup for this location
            const marker = this.mapMarkers.find(m => m.id === location);
            if (marker) {
                setTimeout(() => {
                    marker.marker.openPopup();
                }, 1500);
            }
            
            // Update info card
            this.updateLocationInfo(location);
        }
    }

    updateLocationInfo(location) {
        const infoCard = document.querySelector('.map-info-card');
        if (!infoCard) return;
        
        const locationData = {
            headquarters: {
                title: 'WebX Headquarters',
                address: 'Pujali, Budge Budge, South 24 Parganas, West Bengal, Kolkata - 700138',
                hours: ['Mon-Fri: 9AM-6PM IST', 'Sat: 10AM-4PM IST'],
                phone: '+91 9674026774'
            },
            studio: {
                title: 'WebX Creative Studio',
                address: 'Pujali, Budge Budge, South 24 Parganas, West Bengal, Kolkata - 700138',
                hours: ['By appointment only'],
                phone: '+91 9674026774'
            },
            remote: {
                title: 'Remote Office',
                address: 'Working worldwide - Virtual location',
                hours: ['24/7 Remote Support'],
                phone: '+91 9674026774'
            }
        };
        
        const data = locationData[location];
        
        // Update info card content with animation
        infoCard.querySelector('h3').textContent = data.title;
        infoCard.querySelector('.info-item:nth-child(1) p').textContent = data.address;
        
        const hoursContainer = infoCard.querySelector('.info-item:nth-child(2) div');
        hoursContainer.innerHTML = `
            <h4>Hours</h4>
            ${data.hours.map(hour => `<p>${hour}</p>`).join('')}
        `;
        
        // Add fade animation
        infoCard.style.opacity = '0.5';
        setTimeout(() => {
            infoCard.style.opacity = '1';
        }, 100);
    }

    getDirections() {
        const locationData = {
            headquarters: 'Pujali,+Budge+Budge,+South+24+Parganas,+West+Bengal,+Kolkata+700138',
            studio: 'Pujali,+Budge+Budge,+South+24+Parganas,+West+Bengal,+Kolkata+700138',
            remote: 'Kolkata,+WB'
        };
        
        const address = locationData[this.currentLocation] || locationData.headquarters;
        const url = `https://www.google.com/maps/place/22%C2%B027'57.6%22N+88%C2%B008'57.2%22E/@22.465985,88.1466561,17z/data=!3m1!4b1!4m4!3m3!8m2!3d22.465985!4d88.149231?authuser=1&entry=ttu&g_ep=EgoyMDI2MDIyNC4wIKXMDSoASAFQAw%3D%3D`;
        
        window.open(url, '_blank');
    }

    // ===== TEAM CONTACT =====
    initTeamContact() {
        const scheduleButtons = document.querySelectorAll('.schedule-btn');
        
        scheduleButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const memberId = btn.dataset.member;
                this.openScheduleModal(memberId);
            });
        });
        
        // Add hover effects
        const teamCards = document.querySelectorAll('.team-contact-card');
        teamCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const glow = card.querySelector('.member-glow');
                if (glow) glow.style.opacity = '0.15';
            });
            
            card.addEventListener('mouseleave', () => {
                const glow = card.querySelector('.member-glow');
                if (glow) glow.style.opacity = '0';
            });
        });
    }

    // ===== SCHEDULE MODAL =====
    initScheduleModal() {
        const modal = document.getElementById('scheduleModal');
        if (!modal) return;
        
        const closeBtn = modal.querySelector('.modal-close');
        const overlay = modal.querySelector('.modal-overlay');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeScheduleModal();
            });
        }
        
        if (overlay) {
            overlay.addEventListener('click', () => {
                this.closeScheduleModal();
            });
        }
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                this.closeScheduleModal();
            }
        });
    }

    openScheduleModal(memberId) {
        const modal = document.getElementById('scheduleModal');
        const modalContent = modal.querySelector('.modal-content');
        const member = this.scheduleData[memberId];
        
        if (!member) return;
        
        modalContent.innerHTML = this.createScheduleForm(member);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        this.initScheduleForm();
    }

    createScheduleForm(member) {
        return `
            <div class="schedule-header">
                <h2>Schedule a Call with ${member.name}</h2>
                <p class="member-role">${member.role}</p>
            </div>
            
            <div class="schedule-info">
                <div class="info-item">
                    <i class="fas fa-envelope"></i>
                    <div>
                        <h4>Email</h4>
                        <p>${member.email}</p>
                    </div>
                </div>
                
                <div class="info-item">
                    <i class="fas fa-calendar-alt"></i>
                    <div>
                        <h4>Availability</h4>
                        <p>${member.availability.join(', ')}</p>
                    </div>
                </div>
                
                <div class="info-item">
                    <i class="fas fa-clock"></i>
                    <div>
                        <h4>Timezone</h4>
                        <p>${member.timezone}</p>
                    </div>
                </div>
            </div>
            
            <form class="schedule-form" id="scheduleForm" 
                  action="https://formspree.io/f/mjgezkzq" 
                  method="POST">
                
                <!-- Honeypot field for spam prevention -->
                <input type="text" name="_gotcha" style="display:none">
                
                <!-- Hidden fields for member info -->
                <input type="hidden" name="member_name" value="${member.name}">
                <input type="hidden" name="member_role" value="${member.role}">
                <input type="hidden" name="member_email" value="${member.email}">
                <input type="hidden" name="form_type" value="schedule_call">
                
                <div class="form-group">
                    <label for="scheduleName">Your Name *</label>
                    <input type="text" id="scheduleName" name="name" required placeholder="Enter your full name">
                </div>
                
                <div class="form-group">
                    <label for="scheduleEmail">Your Email *</label>
                    <input type="email" id="scheduleEmail" name="email" required placeholder="your.email@example.com">
                </div>
                
                <div class="form-group">
                    <label for="schedulePhone">Your Phone (Optional)</label>
                    <input type="tel" id="schedulePhone" name="phone" placeholder="+1 (555) 123-4567">
                </div>
                
                <div class="form-group">
                    <label for="scheduleDate">Preferred Date *</label>
                    <input type="date" id="scheduleDate" name="date" required min="${this.getTomorrowDate()}">
                </div>
                
                <div class="form-group">
                    <label for="scheduleTime">Preferred Time *</label>
                    <select id="scheduleTime" name="time" required>
                        <option value="" disabled selected>Select time</option>
                        <option value="09:00">9:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="14:00">2:00 PM</option>
                        <option value="15:00">3:00 PM</option>
                        <option value="16:00">4:00 PM</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="scheduleTopic">Meeting Topic</label>
                    <textarea id="scheduleTopic" name="topic" rows="3" placeholder="Briefly describe what you'd like to discuss"></textarea>
                </div>
                
                <div class="form-group privacy-group">
                    <div class="checkbox-wrapper">
                        <input type="checkbox" id="schedulePrivacy" name="privacy" class="form-checkbox" required>
                        <label for="schedulePrivacy" class="checkbox-label">
                            <span class="checkbox-custom">
                                <i class="fas fa-check"></i>
                            </span>
                            <span class="checkbox-text">
                                I agree to the <a href="#" class="privacy-link">Privacy Policy</a>
                            </span>
                        </label>
                    </div>
                </div>
                
                <button type="submit" class="btn btn-primary submit-schedule">
                    <span>Schedule Call</span>
                    <i class="fas fa-calendar-check"></i>
                </button>
            </form>
        `;
    }

    getTomorrowDate() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    }

    initScheduleForm() {
        const form = document.getElementById('scheduleForm');
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleScheduleSubmit(form);
        });
    }

    async handleScheduleSubmit(form) {
        // Validate privacy checkbox
        const privacyCheckbox = document.getElementById('schedulePrivacy');
        if (!privacyCheckbox || !privacyCheckbox.checked) {
            alert('Please agree to the privacy policy');
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Scheduling...';
        submitBtn.disabled = true;
        
        try {
            // Create FormData object
            const formData = new FormData(form);
            
            // Add timestamp
            formData.append('submission_time', new Date().toLocaleString());
            
            // Send to Formspree - REPLACE WITH YOUR SCHEDULE FORM ID
            const response = await fetch('https://formspree.io/f/mjgezkzq', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success - show confirmation
                const formData = {
                    name: document.getElementById('scheduleName').value,
                    email: document.getElementById('scheduleEmail').value,
                    date: document.getElementById('scheduleDate').value,
                    time: document.getElementById('scheduleTime').value,
                    member: document.querySelector('input[name="member_name"]')?.value || 'Team Member'
                };
                
                const modalContent = document.querySelector('.modal-content');
                modalContent.innerHTML = `
                    <div class="schedule-success">
                        <div class="success-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <h2>Call Request Sent! ✅</h2>
                        <p>We've received your request to schedule a call with <strong>${formData.member}</strong>.</p>
                        <p>A confirmation has been sent to <strong>${formData.email}</strong>.</p>
                        <p>Our team will confirm the exact time and send calendar invites shortly.</p>
                        <div class="schedule-details">
                            <p><i class="fas fa-calendar"></i> Requested Date: ${formData.date}</p>
                            <p><i class="fas fa-clock"></i> Requested Time: ${formData.time}</p>
                        </div>
                        <button class="btn btn-primary close-schedule">
                            <span>Close</span>
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `;
            } else {
                // Error
                const data = await response.json();
                throw new Error(data.error || 'Failed to schedule call');
            }
            
        } catch (error) {
            console.error('Schedule error:', error);
            
            // Show error message
            const modalContent = document.querySelector('.modal-content');
            modalContent.innerHTML = `
                <div class="schedule-error">
                    <div class="error-icon">
                        <i class="fas fa-exclamation-circle"></i>
                    </div>
                    <h2>Something Went Wrong</h2>
                    <p>We couldn't schedule your call. Please try again or contact us directly.</p>
                    <p><strong>Error:</strong> ${error.message}</p>
                    <button class="btn btn-primary try-again">
                        <span>Try Again</span>
                        <i class="fas fa-redo"></i>
                    </button>
                    <button class="btn btn-outline close-schedule">
                        <span>Close</span>
                    </button>
                </div>
            `;
            
            // Add event listener to try again button
            document.querySelector('.try-again')?.addEventListener('click', () => {
                const memberId = document.querySelector('input[name="member_name"]')?.value;
                this.openScheduleModal(memberId ? memberId.toLowerCase() : 'alex');
            });
        }
        
        // Add close button event listener
        document.querySelector('.close-schedule')?.addEventListener('click', () => {
            this.closeScheduleModal();
        });
    }

    closeScheduleModal() {
        const modal = document.getElementById('scheduleModal');
        if (!modal) return;
        
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
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
            
            // Smooth scroll to item
            item.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
        const animatedElements = document.querySelectorAll('.team-contact-card, .faq-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered animation
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }
}

// Initialize contact animations
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.contact-page')) {
        window.contactAnimations = new ContactAnimations();
        
        // Add to global WebX namespace
        if (typeof window.WebX === 'undefined') {
            window.WebX = {};
        }
        window.WebX.ContactAnimations = ContactAnimations;
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ContactAnimations };
}
