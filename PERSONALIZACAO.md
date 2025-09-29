# 🎨 Guia de Personalização - AutoVitrine

Este guia mostra como personalizar o catálogo AutoVitrine para sua empresa de estética automotiva.

## 📋 Índice
1. [Informações Básicas](#informações-básicas)
2. [Cores e Visual](#cores-e-visual)
3. [Serviços](#serviços)
4. [Preços](#preços)
5. [Contato](#contato)
6. [Imagens](#imagens)
7. [Funcionalidades](#funcionalidades)

## 📝 Informações Básicas

### Editar `config.js` - Seção Company
```javascript
company: {
    name: "Sua Empresa",                    // Nome da sua empresa
    phone: "5511999999999",                 // Seu WhatsApp (com código do país)
    email: "contato@suaempresa.com.br",     // Seu email
    address: "Seu endereço completo",        // Endereço da empresa
    hours: {
        weekdays: "8h às 18h",             // Horário de funcionamento
        saturday: "8h às 16h",
        sunday: "Fechado"
    }
}
```

### Atualizar no HTML
- Substitua todas as ocorrências de "AutoVitrine" pelo nome da sua empresa
- Atualize o número do WhatsApp em todos os botões
- Modifique o endereço na seção de contato

## 🎨 Cores e Visual

### Alterar Cores no CSS (`style.css`)
```css
:root {
    --primary-color: #ff6b35;    /* Cor principal (laranja) */
    --secondary-color: #1a1a1a;   /* Cor secundária (preto) */
    --accent-color: #00d4ff;      /* Cor de destaque (azul) */
    --success-color: #28a745;      /* Verde para sucesso */
    --warning-color: #ffc107;      /* Amarelo para avisos */
}
```

### Sugestões de Paletas
- **Azul Profissional**: `#2563eb`, `#1e40af`, `#3b82f6`
- **Verde Moderno**: `#059669`, `#047857`, `#10b981`
- **Roxo Elegante**: `#7c3aed`, `#6d28d9`, `#8b5cf6`
- **Vermelho Energético**: `#dc2626`, `#b91c1c`, `#ef4444`

## 🛠️ Serviços

### Adicionar Novo Serviço
1. **No `config.js`**:
```javascript
services: {
    seuServico: {
        name: "Nome do Serviço",
        price: 250,
        category: "protecao", // ou "estetica", "personalizacao"
        features: [
            "Característica 1",
            "Característica 2",
            "Característica 3"
        ],
        rating: 4.8,
        popular: false // true se for popular
    }
}
```

2. **No HTML** - Adicionar card na seção serviços:
```html
<div class="service-card" data-category="protecao">
    <div class="service-image">
        <img src="assets/images/sua-imagem.jpg" alt="Seu Serviço">
        <div class="service-overlay">
            <i class="fas fa-icone"></i>
        </div>
    </div>
    <div class="service-content">
        <div class="service-header">
            <h3>Nome do Serviço</h3>
            <div class="service-rating">
                <i class="fas fa-star"></i>
                <span>4.8</span>
            </div>
        </div>
        <p>Descrição do serviço</p>
        <ul class="service-features">
            <li><i class="fas fa-check"></i> Característica 1</li>
            <li><i class="fas fa-check"></i> Característica 2</li>
        </ul>
        <div class="service-price">
            <span class="price-from">A partir de</span>
            <span class="price-value">R$ 250</span>
        </div>
        <button class="btn btn-whatsapp" onclick="openWhatsApp('Nome do Serviço')">
            <i class="fab fa-whatsapp"></i>
            Solicitar Orçamento
        </button>
    </div>
</div>
```

## 💰 Preços

### Configurar Preços por Tipo de Veículo
```javascript
vehicleTypes: {
    hatch: { multiplier: 1.0 },    // Preço base
    sedan: { multiplier: 1.2 },   // 20% mais caro
    suv: { multiplier: 1.5 },     // 50% mais caro
    pickup: { multiplier: 1.8 }    // 80% mais caro
}
```

### Configurar Descontos
```javascript
discounts: {
    single: 0.10,    // 10% para 1 serviço
    double: 0.20,    // 20% para 2 serviços
    triple: 0.30     // 30% para 3+ serviços
}
```

## 📞 Contato

### WhatsApp
1. **Número**: Atualize em `config.js` e em todos os botões do HTML
2. **Mensagens**: Personalize as mensagens padrão nos botões
3. **Formato**: Use o formato internacional (ex: 5511999999999)

### Redes Sociais
```html
<div class="social-links">
    <a href="https://wa.me/5511999999999" target="_blank">
        <i class="fab fa-whatsapp"></i>
    </a>
    <a href="https://instagram.com/suaempresa" target="_blank">
        <i class="fab fa-instagram"></i>
    </a>
    <a href="https://facebook.com/suaempresa" target="_blank">
        <i class="fab fa-facebook"></i>
    </a>
</div>
```

## 🖼️ Imagens

### Preparar Imagens
- **Formato**: JPG ou PNG
- **Tamanho**: Mínimo 800x600px
- **Qualidade**: Otimizada para web (máximo 500KB)
- **Pasta**: `assets/images/`

### Imagens Necessárias
1. **Logo da empresa** (quadrada, 512x512px)
2. **Imagem hero** (1920x1080px para desktop)
3. **Imagens dos serviços** (800x600px cada)
4. **Fotos antes/depois** (800x600px cada)
5. **Fotos de avaliações** (400x400px cada)

### Otimização
```html
<!-- Use lazy loading para melhor performance -->
<img src="assets/images/imagem.jpg" alt="Descrição" loading="lazy">
```

## ⚙️ Funcionalidades

### Ativar/Desativar Recursos
```javascript
// No config.js
notifications: {
    enabled: true,  // false para desativar notificações
},
loyalty: {
    enabled: true,  // false para desativar programa de fidelidade
}
```

### Personalizar Programa de Fidelidade
```javascript
loyalty: {
    pointsPerService: 10,           // Pontos por serviço
    freeServiceThreshold: 50,       // Pontos para serviço grátis
    premiumDiscount: 0.10,          // Desconto premium
    benefits: [
        "Seu benefício 1",
        "Seu benefício 2",
        "Seu benefício 3"
    ]
}
```

## 📱 PWA (App Nativo)

### Configurar Instalação
```javascript
pwa: {
    name: "Sua Empresa - Estética Automotiva",
    shortName: "Sua Empresa",
    description: "Catálogo de serviços de estética automotiva",
    themeColor: "#ff6b35",      // Sua cor principal
    backgroundColor: "#ffffff"
}
```

### Ícones do App
- Substitua as imagens em `manifest.json`
- Tamanhos necessários: 192x192px e 512x512px
- Formato: PNG com fundo transparente

## 📊 Analytics

### Google Analytics
```javascript
analytics: {
    googleAnalytics: "G-XXXXXXXXXX", // Seu ID do GA4
}
```

### Facebook Pixel
```javascript
analytics: {
    facebookPixel: "123456789012345", // Seu Pixel ID
}
```

## 🚀 Deploy

### Hospedagem Gratuita
1. **Netlify**: Arraste a pasta do projeto
2. **Vercel**: Conecte com GitHub
3. **GitHub Pages**: Ative nas configurações do repositório

### Domínio Personalizado
1. Compre um domínio
2. Configure DNS para apontar para sua hospedagem
3. Ative HTTPS (obrigatório para PWA)

## ✅ Checklist de Personalização

- [ ] Nome da empresa atualizado
- [ ] Número do WhatsApp correto
- [ ] Endereço atualizado
- [ ] Horário de funcionamento
- [ ] Cores personalizadas
- [ ] Serviços da empresa
- [ ] Preços atualizados
- [ ] Imagens da empresa
- [ ] Redes sociais
- [ ] Domínio personalizado
- [ ] HTTPS ativado
- [ ] Teste em dispositivos móveis

## 🆘 Suporte

Para dúvidas sobre personalização:
- WhatsApp: (11) 99999-9999
- Email: suporte@autovitrine.com.br

---

**💡 Dica**: Teste sempre em dispositivos móveis após fazer alterações!
