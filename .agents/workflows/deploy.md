---
description: how to deploy frontend, backend, and admin to production
---

// turbo-all

## URLs de Referência

| Serviço | URL / Info |
|---------|------------|
| Site | `janiamesquita.com.br` (páginas em `/#/rota`) |
| Admin | `admin.janiamesquita.com.br` |
| Backend porta | `3020` (porta 3000 é do Easypanel, NUNCA usar 3000) |
| Servidor | `root@65.109.172.180` (senha: `d4rHKRdw9NgU`) |
| Arquivos | `/var/www/jania-mesquita/{frontend,backend,admin}` |
| Banco de dados | SQLite em `/var/www/jania-mesquita/backend/prisma/dev.db` |
| Admin login | `admin@janiamesquita.com.br` / `Jania2025!` |

---

## ⚠️ REGRA #1: SEMPRE FAZER BACKUP DO BANCO ANTES DE QUALQUER DEPLOY

```
ssh root@65.109.172.180 "cp /var/www/jania-mesquita/backend/prisma/dev.db /var/www/jania-mesquita/backend/prisma/dev.db.bak-$(date +%Y%m%d-%H%M%S)"
```

Para restaurar um backup:
```
ssh root@65.109.172.180 "cp /var/www/jania-mesquita/backend/prisma/dev.db.bak-XXXXXX /var/www/jania-mesquita/backend/prisma/dev.db && pm2 restart jania-backend"
```

---

## Deploy Frontend

Sempre que mudar arquivos em `frontend/`:

1. Build
```
cd frontend && npm run build
```

2. Empacotar e enviar
```
cd frontend
rm -f frontend_dist.tar.gz
tar -czf frontend_dist.tar.gz -C dist .
scp frontend_dist.tar.gz root@65.109.172.180:/var/www/jania-mesquita/
```

3. Extrair no servidor
```
ssh root@65.109.172.180 "cd /var/www/jania-mesquita && rm -rf frontend/dist && mkdir -p frontend/dist && tar -xzf frontend_dist.tar.gz -C frontend/dist && rm frontend_dist.tar.gz && chown -R www-data:www-data frontend && systemctl reload nginx"
```

---

## Deploy Backend

Sempre que mudar arquivos em `backend/src/` ou `backend/prisma/schema.prisma`:

> ⚠️ NUNCA usar `rm -rf backend/prisma` — isso apaga o banco de dados!

1. **BACKUP do banco** (OBRIGATÓRIO)
```
ssh root@65.109.172.180 "cp /var/www/jania-mesquita/backend/prisma/dev.db /var/www/jania-mesquita/backend/prisma/dev.db.bak-$(date +%Y%m%d-%H%M%S)"
```

2. Empacotar source (sem node_modules, sem dist, sem banco)
```
rm -f backend_deploy.tar.gz
tar -czf backend_deploy.tar.gz --exclude='node_modules' --exclude='.DS_Store' --exclude='dist' --exclude='*.db' --exclude='*.db-journal' backend/
```

3. Enviar para o servidor
```
scp backend_deploy.tar.gz root@65.109.172.180:/var/www/jania-mesquita/
```

4. Extrair SEM apagar prisma/dev.db, compilar e reiniciar
```
ssh root@65.109.172.180 "cd /var/www/jania-mesquita && tar -xzf backend_deploy.tar.gz && rm backend_deploy.tar.gz && cd backend && npm install && npx prisma generate && npx prisma db push && npm run build && pm2 restart jania-backend"
```

> **`tar -xzf`** sem `rm -rf` antes = substitui arquivos sem apagar o banco.
> **`npx prisma db push`** sincroniza novos campos do schema sem apagar dados.
> **`npm run build`** compila TypeScript → `dist/`. O pm2 roda `dist/server.js`.

---

## Deploy Admin

Sempre que mudar arquivos em `admin/src/`:

> Admin usa `VITE_API_URL` de `.env.production` (baked no build). Deve ser `https://admin.janiamesquita.com.br/api`.

1. Build
```
cd admin && npm run build
```

2. Empacotar e enviar
```
cd admin
rm -f admin_dist.tar.gz
tar -czf admin_dist.tar.gz -C dist .
scp admin_dist.tar.gz root@65.109.172.180:/var/www/jania-mesquita/admin/
```

3. Extrair no servidor
```
ssh root@65.109.172.180 "cd /var/www/jania-mesquita/admin && rm -rf dist && mkdir dist && tar -xzf admin_dist.tar.gz -C dist && rm admin_dist.tar.gz && chown -R www-data:www-data dist"
```

---

## Armadilhas conhecidas

| Problema | Causa | Solução |
|----------|-------|---------|
| 502 Bad Gateway | Backend em porta errada | Verificar `.env` PORT=3020, Nginx proxy_pass localhost:3020 |
| CORS bloqueado | Admin API URL cross-origin | `.env.production` deve ser `https://admin.janiamesquita.com.br/api` |
| Banco vazio | `rm -rf backend/prisma` durante deploy | NUNCA deletar prisma dir, SEMPRE fazer backup antes |
| Backend crash loop | PORT=3000 conflita com Easypanel | Usar PORT=3020 |
| Rotas API 404 | `npm run build` não foi executado | Backend precisa de `tsc` (npm run build) após deploy |
| Login inválido | Bcrypt hash corrompido por shell `$` | Usar Prisma Client para criar users, nunca sqlite3 CLI |
