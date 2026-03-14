# Deployment Steps — VPS (Ubuntu + Nginx + PM2)

Este documento descreve o processo atualizado de deploy para o site **Jania Mesquita**, separando admin, frontend e backend em uma VPS (Virtual Private Server).

## Pré-requisitos
- Acesso SSH à VPS (`root@65.109.172.180`).
- Node.js e NPM instalados localmente e na VPS.
- `pm2` instalado na VPS (para gerenciar o backend).
- `nginx` instalado na VPS (para servir arquivos estáticos e agir como proxy reverso).

---

## 1. Deploy do Frontend (janiamesquita.com.br)

O site principal é um projeto estático gerado por Vite e publicado via Nginx.

1. Navegue até a pasta do `frontend` localmente.
2. Construa os arquivos estáticos para produção:
   ```bash
   cd frontend
   npm install
   VITE_API_URL=https://janiamesquita.com.br/api npm run build
   ```
3. Comprima os arquivos da pasta `dist`:
   ```bash
   tar -czf deploy_frontend.tar.gz -C dist .
   ```
4. Envie o arquivo para o servidor via `scp`:
   ```bash
   scp deploy_frontend.tar.gz root@65.109.172.180:/var/www/jania-mesquita/
   ```
5. No servidor, extraia os arquivos estáticos atualizados na pasta pública correspondente, sobrescrevendo a versão anterior no lugar (`/var/www/jania-mesquita/frontend/dist`):
   ```bash
   ssh root@65.109.172.180
   cd /var/www/jania-mesquita
   rm -rf frontend/dist
   mkdir -p frontend/dist
   tar -xzf deploy_frontend.tar.gz -C frontend/dist
   ```

---

## 2. Deploy do Painel Admin (admin.janiamesquita.com.br)

O paniel admin funciona como uma subaplicação front-end, servida separadamente debaixo do subdomínio `admin`.

1. Navegue até a pasta do `admin` localmente.
2. Construa a aplicação:
   ```bash
   cd admin
   npm install
   VITE_API_URL=https://janiamesquita.com.br/api npm run build
   ```
3. Comprima os arquivos gerados:
   ```bash
   tar -czf deploy_admin.tar.gz -C dist .
   ```
4. Envie o arquivo para o servidor:
   ```bash
   scp deploy_admin.tar.gz root@65.109.172.180:/var/www/jania-mesquita/
   ```
5. Extraia no servidor sob `/var/www/jania-mesquita/admin/dist`:
   ```bash
   ssh root@65.109.172.180
   cd /var/www/jania-mesquita
   rm -rf admin/dist
   mkdir -p admin/dist
   tar -xzf deploy_admin.tar.gz -C admin/dist
   ```

---

## 3. Restarts e Deploy do Backend

O backend Node.js (/api) roda via `pm2` na porta `3020`.

Se você fez alterações no backend:
1. Puxe ou transfira os arquivos do backend para a VPS (`/var/www/jania-mesquita/backend`).
2. Acesse a pasta na VPS:
   ```bash
   ssh root@65.109.172.180 "cd /var/www/jania-mesquita/backend && npm install && npm run build"
   ```
3. Reinicie o serviço `jania-backend` no `pm2`:
   ```bash
   ssh root@65.109.172.180 "pm2 restart jania-backend"
   ```
*(Nota: O banco de dados e arquivos estáticos (uploads do backend) são mantidos, o Nginx está configurado para expor `/uploads/` como um Alias.)*

---

## 4. Notas de Arquitetura

- **NGINX:** 
  - `janiamesquita.com.br` serve os arquivos de `/var/www/jania-mesquita/frontend/dist`.
  - `admin.janiamesquita.com.br` serve os arquivos de `/var/www/jania-mesquita/admin/dist`.
  - Em ambos os casos, a rota `/api/` é direcionada para o backend via `proxy_pass http://localhost:3020/api/`.
- **Certificados SSL:** Let's Encrypt / Certbot já estão parametrizados.
- **Processo do PM2:** O nome do script pm2 é `jania-backend`.
