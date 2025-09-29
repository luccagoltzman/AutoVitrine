// AutoVitrine - JavaScript Interativo
class AutoVitrineApp {
    constructor() {
        this.selectedServices = new Set();
        this.selectedVehicleType = null;
        this.currentPackageTotal = 0;
        this.discountPercentage = 0;
        this.whatsappNumber = '5511999999999';
        
        this.init();
    }

    init() {
        this.hideLoadingScreen();
        this.initNavigation();
        this.initAnimations();
        this.initServiceCategories();
        this.initPackageBuilder();
        this.initVehicleSelector();
        this.initGalleryTabs();
        this.initSmoothScrolling();
        this.initWhatsAppTracking();
        this.initLazyLoading();
        this.initPWA();
    }

    hideLoadingScreen() {
        setTimeout(() => {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
            }
        }, 1500);
    }

    initNavigation() {
        const navbar = document.getElementById('navbar');
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

        // Mobile menu toggle
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Active link highlighting
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section[id]');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll(
            '.service-card, .comparison-item, .review-card, .tip-card, .action-card'
        );
        
    animatedElements.forEach(el => {
        observer.observe(el);
    });

        // Counter animation for stats
        this.animateCounters();
    }

    animateCounters() {
        // Contadores removidos do hero para simplificar
        // Esta função pode ser usada para outros contadores no site
        const counters = document.querySelectorAll('.stat-number');
        
        if (counters.length === 0) return;
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    const displayValue = Math.floor(current);
                    
                    if (counter.textContent.includes('+')) {
                        counter.textContent = displayValue + '+';
                    } else if (counter.textContent.includes('%')) {
                        counter.textContent = displayValue + '%';
                    } else if (counter.textContent.includes('★')) {
                        counter.textContent = displayValue + '★';
                    } else {
                        counter.textContent = displayValue;
                    }
                    
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = counter.textContent.replace(/\d+/, target);
                }
            };

            // Start animation when element is visible
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        counterObserver.unobserve(entry.target);
                    }
                });
            });

            counterObserver.observe(counter);
        });
    }

    initServiceCategories() {
        const categoryBtns = document.querySelectorAll('.category-btn');
        const serviceCards = document.querySelectorAll('.service-card');

        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                categoryBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const category = btn.getAttribute('data-category');

                serviceCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                        card.classList.add('fade-in');
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    initPackageBuilder() {
        const serviceOptions = document.querySelectorAll('.service-option input[type="checkbox"]');
        const selectedServicesDiv = document.getElementById('selected-services');
        const subtotalSpan = document.getElementById('subtotal');
        const discountSpan = document.getElementById('discount');
        const totalSpan = document.getElementById('total');
        const bookPackageBtn = document.getElementById('book-package');

        serviceOptions.forEach(option => {
            option.addEventListener('change', () => {
                const serviceName = option.getAttribute('data-service');
                const servicePrice = parseFloat(option.getAttribute('data-price'));

                if (option.checked) {
                    this.selectedServices.add({ name: serviceName, price: servicePrice });
                } else {
                    this.selectedServices.delete({ name: serviceName, price: servicePrice });
                }

                this.updatePackageSummary();
            });
        });

        // Book package button
        bookPackageBtn.addEventListener('click', () => {
            if (this.selectedServices.size > 0) {
                const services = Array.from(this.selectedServices).map(s => s.name).join(', ');
                const message = `Gostaria de agendar o pacote com os seguintes serviços: ${services}. Total: ${this.formatPrice(this.currentPackageTotal)}`;
                this.openWhatsApp(message);
            }
        });
    }

    updatePackageSummary() {
        const selectedServicesDiv = document.getElementById('selected-services');
        const subtotalSpan = document.getElementById('subtotal');
        const discountSpan = document.getElementById('discount');
        const totalSpan = document.getElementById('total');
        const bookPackageBtn = document.getElementById('book-package');

        if (this.selectedServices.size === 0) {
            selectedServicesDiv.innerHTML = '<p class="no-services">Nenhum serviço selecionado</p>';
            subtotalSpan.textContent = 'R$ 0';
            discountSpan.textContent = '-R$ 0';
            totalSpan.textContent = 'R$ 0';
            bookPackageBtn.disabled = true;
            return;
        }

        // Calculate subtotal
        let subtotal = 0;
        this.selectedServices.forEach(service => {
            subtotal += service.price;
        });

        // Apply vehicle multiplier
        if (this.selectedVehicleType) {
            const multiplier = parseFloat(this.selectedVehicleType.getAttribute('data-multiplier'));
            subtotal *= multiplier;
        }

        // Calculate discount (30% for 3+ services, 20% for 2 services, 10% for 1 service)
        let discountPercentage = 0;
        if (this.selectedServices.size >= 3) {
            discountPercentage = 0.30;
        } else if (this.selectedServices.size === 2) {
            discountPercentage = 0.20;
        } else if (this.selectedServices.size === 1) {
            discountPercentage = 0.10;
        }

        const discount = subtotal * discountPercentage;
        const total = subtotal - discount;

        this.currentPackageTotal = total;
        this.discountPercentage = discountPercentage;

        // Update UI
        selectedServicesDiv.innerHTML = '';
        this.selectedServices.forEach(service => {
            const serviceDiv = document.createElement('div');
            serviceDiv.className = 'selected-service';
            serviceDiv.innerHTML = `
                <span>${this.getServiceDisplayName(service.name)}</span>
                <span>${this.formatPrice(service.price)}</span>
            `;
            selectedServicesDiv.appendChild(serviceDiv);
        });

        subtotalSpan.textContent = this.formatPrice(subtotal);
        discountSpan.textContent = `-${this.formatPrice(discount)}`;
        totalSpan.textContent = this.formatPrice(total);
        bookPackageBtn.disabled = false;

        // Show discount message
        if (discountPercentage > 0) {
            const discountMessage = document.createElement('div');
            discountMessage.className = 'discount-message';
            discountMessage.innerHTML = `
                <i class="fas fa-gift"></i>
                <span>Você está economizando ${Math.round(discountPercentage * 100)}%!</span>
            `;
            selectedServicesDiv.appendChild(discountMessage);
        }
    }

    getServiceDisplayName(serviceName) {
        const names = {
            'detailing': 'Detailing Premium',
            'cristalizacao': 'Cristalização de Vidros',
            'vitrificacao': 'Vitrificação de Pintura',
            'envelopamento': 'Envelopamento Premium'
        };
        return names[serviceName] || serviceName;
    }

    formatPrice(price) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    }

    initVehicleSelector() {
        const vehicleOptions = document.querySelectorAll('input[name="vehicle-type"]');
        
        vehicleOptions.forEach(option => {
            option.addEventListener('change', () => {
                this.selectedVehicleType = option;
                this.updatePackageSummary();
            });
        });
    }

    initGalleryTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const comparisonItems = document.querySelectorAll('.comparison-item');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all tabs
                tabBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked tab
                btn.classList.add('active');

                const tab = btn.getAttribute('data-tab');

                comparisonItems.forEach(item => {
                    if (tab === 'all' || item.getAttribute('data-category') === tab) {
                        item.style.display = 'block';
                        item.classList.add('fade-in');
                    } else {
                        item.style.display = 'none';
                    }
                });
        });
    });
}

    initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

    initWhatsAppTracking() {
        const whatsappButtons = document.querySelectorAll('.btn-whatsapp, .btn-whatsapp-large, .whatsapp-float');
        
        whatsappButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Add visual feedback
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 150);

                // Track click (can be used for analytics)
                console.log('WhatsApp button clicked:', button.textContent.trim());
            });
        });
    }

    initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    initPWA() {
        // Register service worker for PWA functionality
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }

        // Add to home screen prompt
        let deferredPrompt;
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            
            // Show install button
            this.showInstallPrompt();
        });

        // Handle app installed
        window.addEventListener('appinstalled', () => {
            console.log('PWA was installed');
            this.showNotification('App instalado com sucesso!', 'success');
        });
    }

    showInstallPrompt() {
        const installBtn = document.createElement('button');
        installBtn.className = 'btn btn-primary install-btn';
        installBtn.innerHTML = '<i class="fas fa-download"></i> Instalar App';
        installBtn.style.position = 'fixed';
        installBtn.style.bottom = '80px';
        installBtn.style.right = '20px';
        installBtn.style.zIndex = '1000';
        
        installBtn.addEventListener('click', () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the install prompt');
                    }
                    deferredPrompt = null;
                });
            }
        });

        document.body.appendChild(installBtn);
    }

    openWhatsApp(message) {
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${this.whatsappNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    }

    showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
        // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
        // Hide notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
                if (document.body.contains(notification)) {
            document.body.removeChild(notification);
                }
        }, 300);
    }, 5000);
}
}

// Global functions for HTML onclick handlers
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function openWhatsApp(service) {
    const message = `Olá! Gostaria de solicitar um orçamento para: ${service}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

function toggleComparison(button) {
    const comparisonContainer = button.closest('.comparison-item').querySelector('.comparison-container');
    const isActive = comparisonContainer.classList.contains('active');
    
    // Remove active class from all comparisons
    document.querySelectorAll('.comparison-container').forEach(container => {
        container.classList.remove('active');
    });
    
    // Toggle current comparison
    if (!isActive) {
        comparisonContainer.classList.add('active');
        button.innerHTML = '<i class="fas fa-times"></i> Fechar';
    } else {
        button.innerHTML = '<i class="fas fa-exchange-alt"></i> Comparar';
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.autoVitrineApp = new AutoVitrineApp();
});

// Add notification styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10001;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        border-left: 4px solid #28a745;
    }
    
    .notification-info {
        border-left: 4px solid #17a2b8;
    }
    
    .notification-error {
        border-left: 4px solid #dc3545;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        padding: 1rem;
        gap: 0.5rem;
    }
    
    .notification-content i {
        color: #28a745;
        font-size: 1.2rem;
    }
    
    .notification-info .notification-content i {
        color: #17a2b8;
    }
    
    .notification-error .notification-content i {
        color: #dc3545;
    }
    
    .discount-message {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        background: rgba(40, 167, 69, 0.1);
        border-radius: 8px;
        margin-top: 1rem;
        color: #28a745;
        font-weight: 600;
        font-size: 0.9rem;
    }
    
    .discount-message i {
        color: #28a745;
    }
    
    .install-btn {
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 0 rgba(255, 107, 53, 0.7);
        }
        70% {
            box-shadow: 0 0 0 10px rgba(255, 107, 53, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(255, 107, 53, 0);
        }
    }
`;

document.head.appendChild(notificationStyles);

// Add comparison styles
const comparisonStyles = document.createElement('style');
comparisonStyles.textContent = `
    .comparison-container.active .before-after {
        position: relative;
    }
    
    .comparison-container.active .before-after::after {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        width: 2px;
        height: 100%;
        background: #ff6b35;
        z-index: 10;
    }
    
    .comparison-container.active .image-container:first-child {
        clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
    }
    
    .comparison-container.active .image-container:last-child {
        clip-path: polygon(50% 0, 100% 0, 100% 100%, 50% 100%);
    }
`;

document.head.appendChild(comparisonStyles);

// Performance optimization
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Preload critical images
        const criticalImages = document.querySelectorAll('img[data-preload]');
        criticalImages.forEach(img => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = img.src;
            document.head.appendChild(link);
        });
    });
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Could send error to analytics service
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // Could send error to analytics service
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AutoVitrineApp;
}