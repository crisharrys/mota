# ❄️ MOTA Serviços de Ar-Condicionado (Romero Mota)

> Website institucional e comercial de alta conversão para a **Mota Serviços de Ar-Condicionado**, desenvolvido em **Next.js 14 Standalone**, **Tailwind CSS**, **Framer Motion**, física interativa de cristais de gelo via Canvas, captura de leads com suporte a SMTP e **Painel Administrativo Completo**.

---

## ✨ Recursos Principais

- **🎨 Identidade Visual Fiel ao Logotipo**: Paleta refinada com Azul Noturno (`#020914`), Azul Glacial/Ciano Neon (`#38bdf8`), Branco Gelo e Verde WhatsApp (`#25D366`).
- **❄️ Efeito Visual de Baixa Temperatura Reativo ao Scroll**:
  - *Parado*: Cristais geométricos de gelo e micro-neblina flutuam suavemente com micro-brilho.
  - *Em Movimento*: Aceleração dinâmica com efeito de rajada de vento frio e ar-condicionado.
- **📱 Landing Page Completa**:
  - Hero section com display de climatizador digital em 18°C e badges de garantia técnica.
  - Bento Grid com serviços de venda, instalação padrão de fábrica, manutenção, higienização química, contratos PMOC e infraestrutura.
  - **Calculadora Inteligente de BTUs**: Simulação de carga térmica com botão direto para orçamento no WhatsApp.
  - Catálogo de modelos e marcas atendidas (Daikin, Fujitsu, LG, Samsung, Gree, Midea, Elgin).
  - Formulário de captura de leads com feedback imediato, confetes e integração com API.
  - Botão flutuante de WhatsApp com balão de boas-vindas do Romero Mota.
- **🔐 Painel Administrativo (`/admin`)**:
  - Login seguro via cookie HTTP-only (senha inicial: `admin123`).
  - Gestão de leads com status, filtros, botão para responder no WhatsApp e exportação em `.CSV`.
  - Configuração do servidor de e-mail SMTP com botão de **"Testar Conexão SMTP"** em tempo real.
  - Edição dos dados de contato da empresa salvos no arquivo `data/settings.json`.
- **🚀 Deploy em VPS**:
  - `Dockerfile` multi-stage para Next.js Standalone.
  - `docker-compose.yml` com volume persistente para banco de dados JSON.
  - `ecosystem.config.js` para execução com PM2.
  - Guia completo em `DEPLOY.md`.

---

## 🛠️ Tecnologias Utilizadas

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **Animações**: [Framer Motion](https://www.framer.com/motion/)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **E-mails**: [Nodemailer](https://nodemailer.com/)
- **Efeitos**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Persistência**: Arquivos JSON locais estruturados (`data/settings.json` e `data/leads.json`)

---

## 💻 Como Rodar Localmente

```bash
# 1. Instalar as dependências
npm install

# 2. Iniciar o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.
Para acessar o painel administrativo: [http://localhost:3000/admin](http://localhost:3000/admin) (Senha padrão: `admin123`).

---

## 🌐 Deploy na VPS

Consulte o arquivo [`DEPLOY.md`](./DEPLOY.md) para o passo a passo com Docker ou PM2 + Nginx e SSL com Certbot.
