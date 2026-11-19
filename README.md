# 🔥 Loucura de Ofertas - Portal Web Oficial

Portal moderno, ultra-rápido e profissional de curadoria de ofertas, promoções relâmpago e cupons testados das maiores lojas do Brasil (**Amazon**, **Shopee**, **Mercado Livre** e **Magazine Luiza**).

---

## 🌟 Diferenciais e Funcionalidades

- **Aparência Séria e Confiável:** Design clean, minimalista e premium com modo claro e escuro.
- **Sincronização com o Telegram:** Conectado diretamente ao bot do canal `@loucuradeofertas`.
- **Badges de Confiança:** Selo de *"Preço Conferido"*, identificação visual das lojas parceiras e percentual de desconto real.
- **Micro-interações de Alta Conversão:** 
  - Botão **Copiar Cupom** com feedback instantâneo.
  - Botão direto **Pegar Promoção** para o link de afiliado oficial.
  - Compartilhamento inteligente em 1 clique (WhatsApp / Telegram).
- **Filtros e Busca Instantânea:** Busca em tempo real por nome, categoria ou cupom, com filtros por categoria e ordenação.
- **Transparência e Ética:** Rodapé com declaração de conformidade com programas de afiliados (Amazon Associates, Shopee e Mercado Livre).

---

## 🚀 Como Executar Localmente

### Método 1: Início Rápido (Windows)
Basta dar dois cliques no arquivo:
```text
iniciar_site.bat
```

### Método 2: Via Terminal
```bash
cd loucura-de-ofertas-web
npm run dev
```
Acesse no seu navegador: `http://localhost:3000`

---

## 🌐 Como Publicar na Web (100% Grátis)

Você pode hospedar este site com custo **R$ 0,00** para sempre em qualquer um dos seguintes provedores:

### Opção 1: Vercel (Recomendado - 2 minutos)
1. Crie uma conta gratuita em [vercel.com](https://vercel.com).
2. Suba a pasta do projeto para o seu GitHub (ou use a CLI `npx vercel`).
3. Importe o repositório na Vercel e clique em **Deploy**.
4. Seu site estará online com HTTPS gratuito e suporte a domínio próprio gratuito!

### Opção 2: Cloudflare Pages
1. Crie uma conta no Cloudflare Dashboard -> Workers & Pages.
2. Conecte o repositório GitHub ou arraste a pasta `dist` gerada por `npm run build`.

### Opção 3: Netlify
1. Acesse [netlify.com](https://netlify.com) e arraste a pasta `dist` direto na tela de deploy!

---

## 🔄 Como Funciona a Sincronização com o Bot

O arquivo `site_sync.py` dentro do seu `telegram-deals-bot/src/` foi conectado ao pipeline do bot. Sempre que o bot publica uma nova oferta no canal do Telegram, ele formata e grava a oferta no arquivo `public/deals.json` do site. Quando o site é recarregado, a nova oferta aparece instantaneamente no topo!
