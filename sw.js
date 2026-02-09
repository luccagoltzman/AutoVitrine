// Service Worker para Pimentinha Detail PWA

// Bump VERSION a cada deploy para invalidar caches antigos
const VERSION = '2.0.1';
const CACHE_NAME = 'pimentinha-static-' + VERSION;
const DYNAMIC_CACHE_NAME = 'pimentinha-dynamic-' + VERSION;

// Apenas recursos que raramente mudam (imagens, fontes externas)
const STATIC_FILES = [
    '/assets/images/logo-pimentinha.jpeg',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Sempre buscar da rede primeiro (nunca cachear resposta antiga)
const NETWORK_FIRST_PATTERNS = [
    '/index.html',
    '/',
    'style.css',
    'script.js',
    'config.js',
    'manifest.json'
];

const NETWORK_FIRST_EXTERNAL = [
    'https://wa.me/',
    'https://api.whatsapp.com/'
];

function shouldNetworkFirst(url) {
    const path = url.pathname || url.href;
    if (NETWORK_FIRST_EXTERNAL.some(p => url.href.includes(p))) return true;
    return NETWORK_FIRST_PATTERNS.some(p => path === p || path.endsWith(p) || (path === '/' && p === '/'));
}

// Instalação
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing v' + VERSION);
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(STATIC_FILES))
            .then(() => self.skipWaiting())
            .catch((err) => console.error('SW install error', err))
    );
});

// Ativação: apagar caches de versões antigas
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating v' + VERSION);
    event.waitUntil(
        caches.keys().then((names) => {
            return Promise.all(
                names
                    .filter((name) => name.startsWith('pimentinha-') && name !== CACHE_NAME && name !== DYNAMIC_CACHE_NAME)
                    .concat(names.filter((name) => name.startsWith('autovitrine-')))
                    .map((name) => {
                        console.log('SW: Deleting old cache', name);
                        return caches.delete(name);
                    })
            );
        }).then(() => self.clients.claim())
    );
});

// Uma única estratégia de fetch
self.addEventListener('fetch', (event) => {
    if (!event.request.url.startsWith('http')) return;

    const url = new URL(event.request.url);
    const isSameOrigin = url.origin === self.location.origin;

    // Navegação e recursos críticos: sempre rede primeiro (atualizações imediatas)
    if (event.request.mode === 'navigate' || shouldNetworkFirst(url)) {
        event.respondWith(networkFirst(event.request));
        return;
    }

    // Imagens: cache primeiro (performance), depois rede
    if (event.request.destination === 'image') {
        event.respondWith(cacheFirst(event.request));
        return;
    }

    // Resto: stale-while-revalidate
    event.respondWith(staleWhileRevalidate(event.request));
});

async function networkFirst(request) {
    try {
        const res = await fetch(request);
        if (res && res.status === 200) {
            const cache = await caches.open(DYNAMIC_CACHE_NAME);
            cache.put(request, res.clone());
        }
        return res;
    } catch (e) {
        const cached = await caches.match(request);
        if (cached) return cached;
        if (request.mode === 'navigate') return caches.match('/index.html') || caches.match('/');
        throw e;
    }
}

async function cacheFirst(request) {
    const cached = await caches.match(request);
    if (cached) return cached;
    try {
        const res = await fetch(request);
        if (res && res.status === 200) {
            const cache = await caches.open(DYNAMIC_CACHE_NAME);
            cache.put(request, res.clone());
        }
        return res;
    } catch (e) {
        if (request.mode === 'navigate') return caches.match('/index.html') || caches.match('/');
        throw e;
    }
}

async function staleWhileRevalidate(request) {
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const cached = await cache.match(request);
    const fetchPromise = fetch(request).then((res) => {
        if (res && res.status === 200) cache.put(request, res.clone());
        return res;
    }).catch(() => cached);
    return cached || fetchPromise;
}

// Mensagens: forçar atualização
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
    if (event.data && event.data.type === 'CLEAN_CACHE') {
        caches.keys().then((names) => Promise.all(names.map((n) => caches.delete(n))));
    }
});

// Push / Notifications (mantido)
self.addEventListener('push', (event) => {
    if (!event.data) return;
    try {
        const data = event.data.json();
        event.waitUntil(
            self.registration.showNotification(data.title || 'Pimentinha Detail', {
                body: data.body,
                icon: '/assets/images/logo-pimentinha.jpeg',
                badge: '/assets/images/logo-pimentinha.jpeg',
                data: { url: data.url || '/', dateOfArrival: Date.now() }
            })
        );
    } catch (e) {
        console.error('Push parse error', e);
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const url = event.notification.data && event.notification.data.url;
    if (url) event.waitUntil(clients.openWindow(url));
});

console.log('Service Worker v' + VERSION + ' loaded');
