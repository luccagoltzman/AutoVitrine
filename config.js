// Configurações do Pimentinha Detail
// Bump appVersion a cada deploy para invalidar cache em produção (e use o mesmo valor nos ?v= do index.html)
const AutoVitrineConfig = {
    appVersion: "2.0.0",

    // true = mostra apenas tela "Em Breve"; false = site liberado
    comingSoon: false,

    // Informações da empresa
    company: {
        name: "Pimentinha Detail",
        phone: "559881730009",
        email: "contato@autovitrine.com.br",
        address: "Serviço a domicílio — taxa de deslocamento a combinar",
        hours: {
            weekdays: "8h às 18h",
            saturday: "8h às 16h",
            sunday: "Fechado"
        }
    },

    // Configurações de cores e tema (paleta Pimentinha)
    theme: {
        primaryColor: "#E31B23",
        primaryDark: "#9B101E",
        secondaryColor: "#0A0E14",
        accentColor: "#1E6B34",
        cream: "#F7EAC1",
        successColor: "#1E6B34",
        warningColor: "#ffc107"
    },

    // Configurações de serviços (preços P = Pequeno, M = Médio, G = Grande)
    services: {
        "lavagem-tecnica": {
            name: "Lavagem Técnica",
            priceP: 90,
            priceM: 120,
            priceG: 150,
            category: "lavagem",
            rating: 4.9,
            popular: true
        },
        "lavagem-detalhada": {
            name: "Lavagem Detalhada Premium",
            priceP: 250,
            priceM: 350,
            priceG: 400,
            category: "lavagem",
            rating: 4.9
        },
        "lavagem-descontaminacao": {
            name: "Lavagem com Descontaminação de Pintura",
            priceP: 150,
            priceM: 250,
            priceG: 300,
            category: "lavagem",
            rating: 4.8
        },
        "lavagem-rodas": {
            name: "Lavagem Detalhada com Retirada de Rodas",
            priceP: 350,
            priceM: 400,
            priceG: 500,
            category: "lavagem",
            rating: 4.9
        },
        "chuva-acida-selante": {
            name: "Chuva Ácida + Selante 12 Meses",
            priceP: 130,
            priceM: 200,
            priceG: 300,
            category: "protecao",
            rating: 4.8
        },
        "chuva-acida-cristalizacao": {
            name: "Chuva Ácida Vidros + Cristalização 12 Meses",
            priceP: 250,
            priceM: 300,
            priceG: 350,
            category: "protecao",
            rating: 4.8
        },
        "higienizacao-interna": {
            name: "Higienização Completa (Retirada de Bancos)",
            priceP: 400,
            priceM: 450,
            priceG: 550,
            category: "interna",
            rating: 4.9
        },
        "polimento-comercial": {
            name: "Polimento Comercial",
            priceP: 500,
            priceM: 650,
            priceG: 700,
            category: "polimento",
            rating: 4.9
        },
        "polimento-tecnico": {
            name: "Polimento Técnico",
            priceP: 750,
            priceM: 850,
            priceG: 1000,
            category: "polimento",
            rating: 4.9
        },
        "polimento-premium": {
            name: "Polimento Premium",
            priceP: 1000,
            priceM: 1200,
            priceG: 1500,
            category: "polimento",
            rating: 4.9
        }
    },

    // Porte do veículo: P = Pequeno, M = Médio, G = Grande
    vehicleTypes: {
        P: {
            name: "Carro Pequeno",
            examples: "Gol, Onix, HB20, Uno",
            icon: "fas fa-car"
        },
        M: {
            name: "Carro Médio",
            examples: "Corolla, Civic, Cruze, Jetta",
            icon: "fas fa-car-side"
        },
        G: {
            name: "Carro Grande",
            examples: "SUV, SW4, Hilux, Silverado",
            icon: "fas fa-truck"
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
        },
        // Lista de avaliações para rotação aleatória (3 exibidas por vez)
        list: [
            { name: "João Silva", vehicle: "Honda Civic 2020", text: "Serviço excepcional! Meu carro ficou como novo. A equipe é muito profissional e o resultado superou minhas expectativas. Recomendo!", date: "Há 2 dias", service: "Lavagem Técnica", rating: 5, hasImages: true },
            { name: "Maria Santos", vehicle: "Ford Focus 2019", text: "Lavagem detalhada impecável. O carro chegou sujo e saiu brilhando. Atendimento a domicílio muito prático!", date: "Há 1 semana", service: "Lavagem Detalhada Premium", rating: 5, hasImages: true },
            { name: "Carlos Oliveira", vehicle: "Toyota Corolla 2021", text: "Fizeram a retirada de chuva ácida e aplicaram o selante. Pintura como nova. Super recomendo!", date: "Há 2 semanas", service: "Chuva Ácida + Selante", rating: 5, hasImages: false },
            { name: "Ana Paula", vehicle: "VW Gol 2018", text: "Preço justo e trabalho caprichado. Lavagem técnica com cera Blend deixou o carro lindo. Voltarei com certeza.", date: "Há 3 dias", service: "Lavagem Técnica", rating: 5, hasImages: true },
            { name: "Roberto Mendes", vehicle: "Chevrolet Onix 2022", text: "Higienização interna com retirada de bancos — ficou zero. Sem cheiro, tudo limpo. Profissionais demais.", date: "Há 5 dias", service: "Higienização Completa", rating: 5, hasImages: false },
            { name: "Fernanda Lima", vehicle: "Hyundai HB20 2020", text: "Cristalização dos vidros feita em casa. Vidros repelem água e a visibilidade melhorou muito. Adorei!", date: "Há 1 semana", service: "Chuva Ácida Vidros + Cristalização", rating: 5, hasImages: true },
            { name: "Pedro Costa", vehicle: "Fiat Uno 2017", text: "Polimento comercial deixou o carro com cara de novo. Brilho incrível e atendimento excelente.", date: "Há 10 dias", service: "Polimento Comercial", rating: 5, hasImages: true },
            { name: "Juliana Alves", vehicle: "Jeep Compass 2023", text: "Lavagem com descontaminação e Clay Bar. O carro nunca esteve tão liso e brilhante. Nota 10!", date: "Há 4 dias", service: "Lavagem com Descontaminação", rating: 5, hasImages: false },
            { name: "Ricardo Souza", vehicle: "Toyota Hilux 2022", text: "Serviço a domicílio no horário combinado. Lavagem detalhada com retirada de rodas — trabalho de outro nível.", date: "Há 1 semana", service: "Lavagem Detalhada c/ Rodas", rating: 5, hasImages: true }
        ]
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
        name: "Pimentinha Detail - Estética Automotiva Premium",
        shortName: "Pimentinha Detail",
        description: "Catálogo premium de serviços de estética automotiva",
        themeColor: "#0A0E14",
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
