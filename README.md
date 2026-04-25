# GORÓ DA MANSÃO 🧪🦾

Este é o repositório oficial do site **Goró da Mansão**, desenvolvido para a elite da Mansão Maromba. O projeto é uma plataforma completa de e-commerce e entretenimento, focada em branding agressivo e experiência de usuário premium.

## 🚀 Como o site funciona

O ecossistema do Goró da Mansão é dividido em três pilares principais:

### 1. Frontend (Interface do Usuário)
- **Página Inicial (`index.html`)**: O portal de entrada com estética " VHS/Cyberpunk", apresentando o conceito do clube e captura de leads.
- **Catálogo de Produtos (`catalogo.html`)**: Loja dinâmica com filtros por categoria (Signature, Summer, Limited, etc.), busca em tempo real e sistema de carrinho.
- **Área VIP / Clube (`clube.html`)**: Espaço exclusivo para membros registrados, com sistema de pontos, benefícios ativos e histórico de pedidos.
- **Página de Pagamento (`pagamento.html`)**: Checkout otimizado com foco em PIX e Cartão de Crédito.
- **Página de Eventos (`eventos.html`)**: Calendário de festas e solicitações VIP.

### 2. Backend (Servidor e Lógica)
- **Servidor Node.js (`server.js`)**: Utiliza Express para gerenciar as rotas da API.
- **Banco de Dados Local**: Utiliza **SQLite** (`better-sqlite3`) para persistência de dados.
- **Endpoints de API**:
  - `/api/register`: Cadastro de novos clientes da elite.
  - `/api/subscribe`: Captura de leads para newsletter e convites VIP.
  - `/api/products`: Fornecimento dinâmico dos itens do estoque.

### 3. Funcionalidades de Destaque
- **Sincronização entre Abas**: O carrinho de compras é atualizado instantaneamente em todas as abas abertas do navegador.
- **Modo de Fallback**: O site continua funcionando (modo de teste) mesmo se o servidor backend estiver offline.
- **Design Responsivo**: Experiência mobile-first com Bottom Bar dedicada para dispositivos móveis.

---

## 🛠️ Tecnologias Utilizadas
- **HTML5 / JavaScript (Vanilla)**
- **Tailwind CSS** (via CDN com configurações customizadas)
- **Node.js / Express**
- **SQLite**
- **Material Symbols** (Google Fonts)

---

## 💻 Como Rodar Localmente

1. **Instale as dependências**:
   ```bash
   npm install
   ```

2. **Inicie o servidor**:
   ```bash
   node server.js
   ```

3. **Acesse**:
   `http://localhost:3000`

---

**DESENVOLVIDO PARA A ELITE. EM PLENO 2026.**  MARCHAAAA! 🚀🦾
