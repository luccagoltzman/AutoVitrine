// Pimentinha Detail - JavaScript Interativo
class AutoVitrineApp {
    constructor() {
        this.selectedServices = new Set();
        this.selectedVehicleType = null;
        this.currentPackageTotal = 0;
        this.whatsappNumber = (window.AutoVitrineConfig && window.AutoVitrineConfig.company && window.AutoVitrineConfig.company.phone) ? String(window.AutoVitrineConfig.company.phone).replace(/\D/g, '') : '559881730009';
        
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
        this.initReviewsRotation();
        this.initSmoothScrolling();
        this.initWhatsAppTracking();
        this.initLazyLoading();
        this.initPWA();
        this.initHeroVideo();
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
        const totalSpan = document.getElementById('total');
        const bookPackageBtn = document.getElementById('book-package');

        serviceOptions.forEach(option => {
            option.addEventListener('change', () => {
                const serviceId = option.getAttribute('data-service');
                if (option.checked) {
                    this.selectedServices.add(serviceId);
                } else {
                    this.selectedServices.delete(serviceId);
                }
                this.updatePackageSummary();
            });
        });

        // Book package button
        bookPackageBtn.addEventListener('click', () => {
            if (this.selectedServices.size > 0) {
                const services = Array.from(this.selectedServices).map(id => this.getServiceDisplayName(id)).join(', ');
                const message = `Gostaria de agendar o pacote com os seguintes serviços: ${services}. Total: ${this.formatPrice(this.currentPackageTotal)}`;
                this.openWhatsApp(message);
            }
        });
    }

    getPriceForVehicle(checkbox, size) {
        if (!checkbox) return 0;
        const s = (size || 'P').toUpperCase();
        const price = checkbox.getAttribute('data-price-' + s);
        return price ? parseFloat(price) : parseFloat(checkbox.getAttribute('data-price-p')) || 0;
    }

    updatePackageSummary() {
        const selectedServicesDiv = document.getElementById('selected-services');
        const totalSpan = document.getElementById('total');
        const bookPackageBtn = document.getElementById('book-package');

        if (this.selectedServices.size === 0) {
            selectedServicesDiv.innerHTML = '<p class="no-services">Nenhum serviço selecionado</p>';
            totalSpan.textContent = 'R$ 0';
            bookPackageBtn.disabled = true;
            return;
        }

        const vehicleSize = this.selectedVehicleType ? this.selectedVehicleType.getAttribute('value') : 'P';
        let total = 0;
        const serviceEntries = [];

        this.selectedServices.forEach(serviceId => {
            const checkbox = document.querySelector(`.service-option input[data-service="${serviceId}"]`);
            const price = this.getPriceForVehicle(checkbox, vehicleSize);
            total += price;
            serviceEntries.push({ id: serviceId, name: this.getServiceDisplayName(serviceId), price: price });
        });

        this.currentPackageTotal = total;

        selectedServicesDiv.innerHTML = '';
        serviceEntries.forEach(entry => {
            const serviceDiv = document.createElement('div');
            serviceDiv.className = 'selected-service';
            serviceDiv.innerHTML = `
                <span>${entry.name}</span>
                <span>${this.formatPrice(entry.price)}</span>
            `;
            selectedServicesDiv.appendChild(serviceDiv);
        });

        totalSpan.textContent = this.formatPrice(total);
        bookPackageBtn.disabled = false;
    }

    getServiceDisplayName(serviceId) {
        const names = {
            'lavagem-tecnica': 'Lavagem Técnica',
            'lavagem-detalhada': 'Lavagem Detalhada Premium',
            'lavagem-descontaminacao': 'Lavagem com Descontaminação de Pintura',
            'lavagem-rodas': 'Lavagem Detalhada com Retirada de Rodas',
            'chuva-acida-selante': 'Chuva Ácida + Selante 12 Meses',
            'chuva-acida-cristalizacao': 'Chuva Ácida Vidros + Cristalização 12 Meses',
            'higienizacao-interna': 'Higienização Completa (Retirada de Bancos)',
            'polimento-comercial': 'Polimento Comercial',
            'polimento-tecnico': 'Polimento Técnico',
            'polimento-premium': 'Polimento Premium'
        };
        return names[serviceId] || serviceId;
    }

    formatPrice(price) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price);
    }

    initVehicleSelector() {
        const vehicleOptions = document.querySelectorAll('input[name="vehicle-type"]');
        const checked = document.querySelector('input[name="vehicle-type"]:checked');
        if (checked) this.selectedVehicleType = checked;
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

    initReviewsRotation() {
        const config = window.AutoVitrineConfig;
        if (!config || !config.reviews || !config.reviews.list || config.reviews.list.length < 3) return;
        const list = config.reviews.list;
        const wrapper = document.getElementById('reviews-rotating-wrapper');
        const grid = document.getElementById('reviews-grid');
        if (!wrapper || !grid) return;

        const DURATION_MS = 400;
        const INTERVAL_MS = 6000;

        const shuffle = (arr) => {
            const a = [...arr];
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        };

        const getRandomReviews = (count = 3) => shuffle(list).slice(0, Math.min(count, list.length));

        const starsHTML = (rating) => {
            const n = Math.min(5, Math.max(0, rating || 5));
            return Array(n).fill('<i class="fas fa-star"></i>').join('');
        };

        const buildReviewCardHTML = (review) => {
            const img = 'assets/images/logo-pimentinha.jpeg';
            const imagesBlock = review.hasImages
                ? `<div class="review-images"><img src="${img}" alt="Trabalho realizado"><img src="${img}" alt="Trabalho realizado"></div>`
                : '';
            return `
                <div class="review-card">
                    <div class="review-header">
                        <div class="reviewer-info">
                            <img src="${img}" alt="${this.escapeHtml(review.name)}">
                            <div class="reviewer-details">
                                <h4>${this.escapeHtml(review.name)}</h4>
                                <p>${this.escapeHtml(review.vehicle)}</p>
                            </div>
                        </div>
                        <div class="review-rating">${starsHTML(review.rating)}</div>
                    </div>
                    <div class="review-content"><p>"${this.escapeHtml(review.text)}"</p></div>
                    ${imagesBlock}
                    <div class="review-footer">
                        <span class="review-date">${this.escapeHtml(review.date)}</span>
                        <span class="review-service">${this.escapeHtml(review.service)}</span>
                    </div>
                </div>`;
        };

        const renderReviews = (reviews) => {
            grid.innerHTML = reviews.map(r => buildReviewCardHTML(r)).join('');
        };

        const cycleReviews = () => {
            wrapper.classList.add('reviews-fade-out');
            setTimeout(() => {
                renderReviews(getRandomReviews(3));
                wrapper.classList.remove('reviews-fade-out');
            }, DURATION_MS);
        };

        renderReviews(getRandomReviews(3));
        this._reviewsIntervalId = setInterval(cycleReviews, INTERVAL_MS);
    }

    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
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

    initHeroVideo() {
        const heroVideo = document.querySelector('.hero-bg video');
        
        if (heroVideo) {
            // Otimizações para mobile
            if (this.isMobile()) {
                heroVideo.setAttribute('playsinline', '');
                heroVideo.setAttribute('webkit-playsinline', '');
            }
            
            // Carregar vídeo quando necessário
            heroVideo.addEventListener('loadstart', () => {
                console.log('Vídeo do hero iniciando carregamento');
            });
            
            heroVideo.addEventListener('canplay', () => {
                console.log('Vídeo do hero pronto para reproduzir');
            });
            
            // Pausar vídeo quando não visível (economia de bateria)
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        heroVideo.play().catch(e => console.log('Erro ao reproduzir vídeo:', e));
                    } else {
                        heroVideo.pause();
                    }
                });
            });
            
            observer.observe(heroVideo);
            
            // Fallback para navegadores que não suportam autoplay
            heroVideo.addEventListener('error', () => {
                console.log('Erro no vídeo, usando imagem de fallback');
                const fallbackImg = heroVideo.querySelector('img');
                if (fallbackImg) {
                    heroVideo.style.display = 'none';
                    fallbackImg.style.display = 'block';
                }
            });
        }
    }

    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    initPWA() {
        const SW_VERSION = (window.AutoVitrineConfig && window.AutoVitrineConfig.appVersion) || '2.0.0';
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js?v=' + SW_VERSION)
                    .then((registration) => {
                        registration.addEventListener('updatefound', () => {
                            const newWorker = registration.installing;
                            newWorker.addEventListener('statechange', () => {
                                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                    newWorker.postMessage({ type: 'SKIP_WAITING' });
                                }
                            });
                        });
                        navigator.serviceWorker.addEventListener('controllerchange', () => window.location.reload());
                    })
                    .catch((err) => console.warn('SW registration failed:', err));
            });
        }

        // Add to home screen prompt
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.showInstallPrompt();
        });

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
            if (this.deferredPrompt) {
                this.deferredPrompt.prompt();
                this.deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the install prompt');
                    }
                    this.deferredPrompt = null;
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
    const phone = (window.AutoVitrineConfig && window.AutoVitrineConfig.company && window.AutoVitrineConfig.company.phone) ? String(window.AutoVitrineConfig.company.phone).replace(/\D/g, '') : '559881730009';
    const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
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
    .image-container {
        transition: clip-path 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .comparison-container.active .before-after {
        position: relative;
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .comparison-container.active .before-after::after {
        content: '';
        position: absolute;
        top: 0;
        left: 50%;
        width: 3px;
        height: 100%;
        background: linear-gradient(to bottom, #E31B23, #9B101E);
        z-index: 10;
        border-radius: 2px;
        box-shadow: 0 0 10px rgba(255, 107, 53, 0.5);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        transform: translateX(-50%);
        opacity: 0;
        animation: fadeInLine 0.6s ease-out 0.3s forwards;
    }
    
    .comparison-container.active .image-container:first-child {
        clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
    }
    
    .comparison-container.active .image-container:last-child {
        clip-path: polygon(50% 0, 100% 0, 100% 100%, 50% 100%);
    }
    
    .comparison-container.active .image-container img {
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .comparison-container.active .image-label {
        transition: all 0.4s ease;
        font-weight: 600;
    }
    
    .comparison-container.active .comparison-details {
        transition: all 0.4s ease;
    }
    
    @keyframes fadeInLine {
        from { 
            opacity: 0;
            transform: translateX(-50%) scaleY(0);
        }
        to { 
            opacity: 1;
            transform: translateX(-50%) scaleY(1);
        }
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