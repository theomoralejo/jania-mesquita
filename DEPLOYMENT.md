Deployment steps — Backend (Render) + Frontend (GitHub Pages)

# Visão Geral da Arquitetura
Este projeto está dividido em duas partes hospedadas em locais diferentes:
1. **Backend (Render):** Onde fica o banco de dados (PostgreSQL), o painel de Administração (`/admin`) e a API (`/api`).
2. **Frontend (GitHub Pages):** Onde fica o site principal (`janiamesquita.com.br`). Toda vez que você altera algo na pasta `frontend/`, o GitHub compila o código automaticamente (via GitHub Actions) e publica.

---

# 1. Backend (Render)

- **Hospedagem:** Render (Plano Free ou Pago). Recomendado ter um "Persistent Disk" se for usar uploads locais, ou integrar com Cloudinary/S3 (como feito para as imagens).
- **Deploy:** Automático ao dar `git push` na branch `main`. O Render lê o arquivo `render.yaml` e atualiza a API.
- **Variáveis Necessárias (Environment Variables no Render):**
  - `DATABASE_URL` (Conexão do PostgreSQL)
  - `JWT_SECRET` (Chave secreta para login do painel admin)
  - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` (Para salvar as imagens do painel)

Para rodar sementes (usuário admin) no banco de dados do Render, acesse a aba "Shell" da sua instância e rode: `npx prisma migrate deploy && npm run prisma:generate && npm run seed`

---

# 2. Frontend (GitHub Pages / Actions)

O Frontend é o site final. Ele não roda pelo Render, logo, atualizações no site não dependem do painel do Render.

- **Deploy:** É 100% automático sempre que um código novo é empurrado via Git para a pasta `frontend/`. 
- **O Processo:** O GitHub roda um "computador" virtual (Actions) lendo o arquivo `.github/workflows/deploy.yml`, executa `npm run build` e joga os arquivos gerados no ar no seu Domínio Personalizado.

**🛑 Como consertar erros no GitHub Actions (Ex: All jobs have failed)**
1. **Permissões de Leitura e Escrita:** O erro mais frequente é o permissivo. Vá até o repositório no GitHub -> `Settings` -> `Actions` -> `General`. Role até "Workflow permissions" e marque a opção **Read and write permissions**. Sem isso, o GitHub não consegue publicar as edições do site.
2. **Segredos (Secrets):** O Action usa o backend na hora de gerar a tela. Em `Settings` -> `Secrets and variables` -> `Actions`, certifique-se de ter um Secret chamado `RENDER_BACKEND_URL` apontando para o seu render, ex: `https://jania-backend.onrender.com/api`.
3. Se os dois pontos acima estiverem OK e mesmo assim o Workflow falhar, abra a aba "Actions" no menu do repositório, clique no Workflow que falhou e na opção "Deploy" veja qual foi a última linha de erro impressa na tela preta.
