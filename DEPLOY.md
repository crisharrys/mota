# 🚀 Guia de Implantação em VPS: Mota Serviços de Ar-Condicionado

Este guia detalha o passo a passo completo para colocar o site e sistema da **Mota Serviços de Ar-Condicionado (Romerio Mota)** no ar em qualquer servidor VPS (Ubuntu/Debian) com alta performance, segurança e certificado SSL grátis.

---

## 📦 Opção 1: Deploy com Docker & Docker Compose (Recomendado)

Esta é a opção mais moderna e limpa, pois isola tudo em um container de alta performance.

### 1. Conectar à sua VPS via SSH
```bash
ssh root@IP_DA_SUA_VPS
```

### 2. Instalar Docker e Docker Compose (se ainda não tiver)
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

### 3. Clonar ou Enviar os Arquivos do Projeto para a VPS
Você pode enviar via `rsync`, `scp`, Git ou FTP para a pasta `/var/www/mota-ar`:
```bash
mkdir -p /var/www/mota-ar
cd /var/www/mota-ar
```

### 4. Iniciar o Container
Dentro da pasta `/var/www/mota-ar`, execute:
```bash
docker compose up -d --build
```

O container compilará o Next.js no modo `standalone` e iniciará na porta `3000`.
Os dados de leads e configurações ficam salvos na pasta `./data`, que é persistida via volume Docker (não se perde se reiniciar o container).

---

## ⚡ Opção 2: Deploy Direto com Node.js & PM2

Se preferir rodar sem Docker:

### 1. Instalar Node.js 20+ e PM2
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs
npm install -g pm2
```

### 2. Instalar dependências e compilar
Na pasta do projeto:
```bash
npm install
npm run build
```

### 3. Iniciar com PM2
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

---

## 🌐 Configuração do Nginx (Proxy Reverso) e SSL (HTTPS)

Para apontar seu domínio (ex: `motaarcondicionado.com.br`) para o Next.js:

### 1. Instalar Nginx e Certbot
```bash
apt update
apt install -y nginx certbot python3-certbot-nginx
```

### 2. Criar o arquivo de configuração do site no Nginx
Crie `/etc/nginx/sites-available/mota-ar`:
```nginx
server {
    server_name motaarcondicionado.com.br www.motaarcondicionado.com.br;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 3. Ativar o site e testar Nginx
```bash
ln -s /etc/nginx/sites-available/mota-ar /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### 4. Gerar Certificado SSL Grátis (HTTPS)
```bash
certbot --nginx -d motaarcondicionado.com.br -d www.motaarcondicionado.com.br
```
O Certbot configurará a renovação automática e o redirecionamento automático para HTTPS.

---

## 🔐 Acesso ao Painel Administrativo

- **URL**: `https://seu-dominio.com.br/admin` (ou `http://localhost:3000/admin`)
- **Senha Inicial**: `admin123`
- **Recursos Disponíveis no Painel**:
  - Visualização de todos os contatos e pedidos de orçamento recebidos.
  - Botão de 1 clique para responder cada cliente direto no WhatsApp.
  - Exportação de lista de leads em formato `.CSV`.
  - Configuração do servidor de e-mails SMTP (Gmail, Titan, Hostinger, Zoho, etc.) com botão de teste em tempo real.
  - Alteração de telefones, e-mails de atendimento e senha de acesso.
