// Service Worker para AutoVitrine PWA
const CACHE_NAME = 'autovitrine-v1.0.0';
const STATIC_CACHE_NAME = 'autovitrine-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'autovitrine-dynamic-v1.0.0';

// Arquivos para cache estático
const STATIC_FILES = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    '/assets/images/img_autovitrene.jpg',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// URLs que devem ser sempre buscadas da rede
const NETWORK_FIRST_URLS = [
    '/api/',
    'https://wa.me/',
    'https://api.whatsapp.com/'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Caching static files');
                return cache.addAll(STATIC_FILES);
            })
            .then(() => {
                console.log('Service Worker: Installation complete');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('Service Worker: Installation failed', error);
            })
    );
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
                            console.log('Service Worker: Deleting old cache', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker: Activation complete');
                return self.clients.claim();
            })
    );
});

// Interceptação de requisições
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Ignorar requisições não-HTTP
    if (!request.url.startsWith('http')) {
        return;
    }
    
    // Estratégia para diferentes tipos de requisições
    if (NETWORK_FIRST_URLS.some(pattern => request.url.includes(pattern))) {
        // Network First para APIs e WhatsApp
        event.respondWith(networkFirst(request));
    } else if (request.destination === 'image') {
        // Cache First para imagens
        event.respondWith(cacheFirst(request));
    } else if (request.destination === 'style' || request.destination === 'script') {
        // Stale While Revalidate para CSS e JS
        event.respondWith(staleWhileRevalidate(request));
    } else {
        // Cache First para outros recursos
        event.respondWith(cacheFirst(request));
    }
});

// Estratégia Network First
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('Network failed, trying cache:', error);
        const cachedResponse = await caches.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Retornar página offline se for uma navegação
        if (request.mode === 'navigate') {
            return caches.match('/index.html');
        }
        
        throw error;
    }
}

// Estratégia Cache First
async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.log('Cache and network failed:', error);
        
        // Retornar página offline se for uma navegação
        if (request.mode === 'navigate') {
            return caches.match('/index.html');
        }
        
        throw error;
    }
}

// Estratégia Stale While Revalidate
async function staleWhileRevalidate(request) {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    const fetchPromise = fetch(request).then((networkResponse) => {
        if (networkResponse.ok) {
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    }).catch((error) => {
        console.log('Network request failed:', error);
        return cachedResponse;
    });
    
    return cachedResponse || fetchPromise;
}

// Limpeza de cache antigo
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CLEAN_CACHE') {
        cleanOldCaches();
    }
});

async function cleanOldCaches() {
    const cacheNames = await caches.keys();
    const oldCaches = cacheNames.filter(name => 
        name !== STATIC_CACHE_NAME && 
        name !== DYNAMIC_CACHE_NAME
    );
    
    await Promise.all(
        oldCaches.map(cacheName => caches.delete(cacheName))
    );
    
    console.log('Old caches cleaned');
}

// Background Sync para funcionalidades offline
self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    try {
        // Implementar sincronização em background
        console.log('Background sync executed');
    } catch (error) {
        console.error('Background sync failed:', error);
    }
}

// Push Notifications
self.addEventListener('push', (event) => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/assets/images/img_autovitrene.jpg',
            badge: '/assets/images/img_autovitrene.jpg',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: data.primaryKey
            },
            actions: [
                {
                    action: 'explore',
                    title: 'Ver Ofertas',
                    icon: '/assets/images/img_autovitrene.jpg'
                },
                {
                    action: 'close',
                    title: 'Fechar',
                    icon: '/assets/images/img_autovitrene.jpg'
                }
            ]
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// Click em notificação
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/?action=offers')
        );
    } else if (event.action === 'close') {
        // Apenas fechar a notificação
    } else {
        // Click na notificação
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Atualização automática do cache
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'UPDATE_CACHE') {
        updateCache();
    }
});

async function updateCache() {
    try {
        const cache = await caches.open(STATIC_CACHE_NAME);
        await cache.addAll(STATIC_FILES);
        console.log('Cache updated successfully');
    } catch (error) {
        console.error('Cache update failed:', error);
    }
}

// Performance monitoring
self.addEventListener('fetch', (event) => {
    const startTime = performance.now();
    
    event.respondWith(
        (async () => {
            try {
                const response = await fetch(event.request);
                const endTime = performance.now();
                const duration = endTime - startTime;
                
                // Log performance para requisições lentas
                if (duration > 1000) {
                    console.warn(`Slow request: ${event.request.url} took ${duration}ms`);
                }
                
                return response;
            } catch (error) {
                const endTime = performance.now();
                const duration = endTime - startTime;
                console.error(`Request failed: ${event.request.url} after ${duration}ms`, error);
                throw error;
            }
        })()
    );
});

console.log('Service Worker loaded successfully');
