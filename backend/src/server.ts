import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    process.env.ADMIN_URL || 'http://localhost:3002',
    'http://localhost:3004',
    'http://localhost:3001', // Porta alternativa do frontend
    'http://localhost:3003', // Admin dashboard alternativo
  ],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir uploads estaticamente
app.use('/uploads', express.static('uploads'));

// Rotas da API
app.use('/api', routes);

// Rota de health check
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// Rota raiz
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'API Jania Mesquita - Backend',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api',
      auth: '/api/auth/login',
    },
  });
});

// Error handling
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error('Erro não tratado:', err);
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════╗
║  🚀 Servidor Backend - Jania Mesquita         ║
╠═══════════════════════════════════════════════╣
║  ✅ Servidor rodando na porta ${PORT}            ║
║  🌐 Ambiente: ${process.env.NODE_ENV}                  ║
║  📡 API: http://localhost:${PORT}/api          ║
║  💚 Health: http://localhost:${PORT}/health    ║
╚═══════════════════════════════════════════════╝
  `);
});

export default app;
