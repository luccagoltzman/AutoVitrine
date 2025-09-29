// Configurações do AutoVitrine
const AutoVitrineConfig = {
    // Informações da empresa
    company: {
        name: "AutoVitrine",
        phone: "5511999999999",
        email: "contato@autovitrine.com.br",
        address: "Rua das Estéticas, 123 - Centro - São Paulo/SP",
        hours: {
            weekdays: "8h às 18h",
            saturday: "8h às 16h",
            sunday: "Fechado"
        }
    },

    // Configurações de cores e tema
    theme: {
        primaryColor: "#ff6b35",
        secondaryColor: "#1a1a1a",
        accentColor: "#00d4ff",
        successColor: "#28a745",
        warningColor: "#ffc107"
    },

    // Configurações de serviços
    services: {
        detailing: {
            name: "Detailing Premium",
            price: 180,
            category: "protecao",
            features: [
                "Lavagem técnica completa",
                "Cera de carnaúba premium",
                "Proteção UV por 6 meses",
                "Limpeza interna detalhada"
            ],
            rating: 4.9,
            popular: true
        },
        cristalizacao: {
            name: "Cristalização de Vidros",
            price: 120,
            category: "protecao",
            features: [
                "Proteção por 12 meses",
                "Repelente de água",
                "Facilita limpeza",
                "Melhora visibilidade"
            ],
            rating: 4.8,
            new: true
        },
        vitrificacao: {
            name: "Vitrificação de Pintura",
            price: 450,
            category: "protecao",
            features: [
                "Proteção por 24 meses",
                "Brilho intenso",
                "Resistência a riscos",
                "Facilita manutenção"
            ],
            rating: 4.9
        },
        envelopamento: {
            name: "Envelopamento Premium",
            price: 800,
            category: "personalizacao",
            features: [
                "Filmes 3M premium",
                "Instalação profissional",
                "Proteção da pintura",
                "Design personalizado"
            ],
            rating: 4.7
        },
        pintura: {
            name: "Pintura Esportiva",
            price: 1200,
            category: "estetica",
            features: [
                "Preparação completa",
                "Tintas automotivas premium",
                "Acabamento profissional",
                "Garantia de durabilidade"
            ],
            rating: 4.8
        },
        acessorios: {
            name: "Acessórios Premium",
            price: 200,
            category: "personalizacao",
            features: [
                "Instalação profissional",
                "Produtos de qualidade",
                "Personalização completa",
                "Consultoria especializada"
            ],
            rating: 4.6
        }
    },

    // Configurações de veículos
    vehicleTypes: {
        hatch: {
            name: "Hatch",
            multiplier: 1.0,
            icon: "fas fa-car"
        },
        sedan: {
            name: "Sedan",
            multiplier: 1.2,
            icon: "fas fa-car-side"
        },
        suv: {
            name: "SUV",
            multiplier: 1.5,
            icon: "fas fa-truck"
        },
        pickup: {
            name: "Pickup",
            multiplier: 1.8,
            icon: "fas fa-truck-pickup"
        }
    },

    // Configurações de desconto
    discounts: {
        single: 0.10,    // 10% para 1 serviço
        double: 0.20,    // 20% para 2 serviços
        triple: 0.30     // 30% para 3+ serviços
    },

    // Configurações de avaliações
    reviews: {
        overallRating: 4.9,
        totalReviews: 127,
        breakdown: {
            5: 85,
            4: 12,
            3: 2,
            2: 1,
            1: 0
        }
    },

    // Configurações de fidelidade
    loyalty: {
        pointsPerService: 10,
        freeServiceThreshold: 50, // pontos para serviço grátis
        premiumDiscount: 0.10,    // 10% desconto premium
        benefits: [
            "A cada 5 lavagens, a 6ª é grátis",
            "10% de desconto em serviços premium",
            "Prioridade no agendamento",
            "Ofertas exclusivas via WhatsApp"
        ]
    },

    // Configurações de dicas
    tips: [
        {
            title: "Proteção UV",
            description: "Evite estacionar sob o sol direto. Use capas protetoras e aplique ceras com proteção UV.",
            icon: "fas fa-sun",
            tags: ["Proteção", "Cera"]
        },
        {
            title: "Lavagem Correta",
            description: "Lave seu carro semanalmente com produtos específicos. Evite lavar sob sol forte.",
            icon: "fas fa-tint",
            tags: ["Lavagem", "Produtos"]
        },
        {
            title: "Vitrificação",
            description: "Aplique vitrificação cerâmica a cada 2 anos para máxima proteção e brilho.",
            icon: "fas fa-shield-alt",
            tags: ["Vitrificação", "Proteção"]
        },
        {
            title: "Inspeção Regular",
            description: "Verifique regularmente riscos, manchas e desgastes. Trate rapidamente para evitar danos maiores.",
            icon: "fas fa-eye",
            tags: ["Inspeção", "Manutenção"]
        }
    ],

    // Configurações de galeria
    gallery: [
        {
            title: "Detailing Premium - Honda Civic",
            category: "detailing",
            services: "Lavagem técnica, enceramento premium, cristalização de vidros",
            duration: "4 horas",
            client: "João Silva",
            rating: 5
        },
        {
            title: "Pintura Esportiva - Ford Focus",
            category: "pintura",
            services: "Preparação completa, pintura automotiva premium, vitrificação",
            duration: "3 dias",
            client: "Maria Santos",
            rating: 5
        },
        {
            title: "Envelopamento Premium - BMW X3",
            category: "envelopamento",
            services: "Envelopamento completo com filme 3M, detalhamento",
            duration: "2 dias",
            client: "Carlos Oliveira",
            rating: 5
        }
    ],

    // Configurações de PWA
    pwa: {
        name: "AutoVitrine - Estética Automotiva Premium",
        shortName: "AutoVitrine",
        description: "Catálogo premium de serviços de estética automotiva",
        themeColor: "#ff6b35",
        backgroundColor: "#ffffff"
    },

    // Configurações de analytics
    analytics: {
        googleAnalytics: "", // ID do Google Analytics
        facebookPixel: "",   // ID do Facebook Pixel
        googleTagManager: "" // ID do Google Tag Manager
    },

    // Configurações de notificações
    notifications: {
        enabled: true,
        permissionRequested: false,
        topics: ["ofertas", "agendamento", "fidelidade"]
    },

    // Configurações de cache
    cache: {
        staticFiles: [
            "/",
            "/index.html",
            "/style.css",
            "/script.js",
            "/manifest.json"
        ],
        networkFirstUrls: [
            "/api/",
            "https://wa.me/",
            "https://api.whatsapp.com/"
        ]
    }
};

// Exportar configurações
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AutoVitrineConfig;
} else {
    window.AutoVitrineConfig = AutoVitrineConfig;
}
