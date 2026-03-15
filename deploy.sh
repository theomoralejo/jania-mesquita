#!/bin/bash

echo "Iniciando deploy do Frontend..."
cd frontend
npm install
VITE_API_URL=https://janiamesquita.com.br/api npm run build

echo "Compactando arquivos..."
tar -czf deploy_frontend.tar.gz -C dist .

echo "Enviando para o servidor..."
scp deploy_frontend.tar.gz root@65.109.172.180:/var/www/jania-mesquita/

echo "Extraindo no servidor..."
ssh root@65.109.172.180 'cd /var/www/jania-mesquita && rm -rf frontend/dist && mkdir -p frontend/dist && tar -xzf deploy_frontend.tar.gz -C frontend/dist && rm deploy_frontend.tar.gz'

echo "Limpando arquivos locais..."
rm deploy_frontend.tar.gz

echo "Deploy do frontend concluído com sucesso!"
