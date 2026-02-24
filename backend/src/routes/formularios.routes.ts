import { Router } from 'express';
import {
  submitContato,
  submitDiagnostico,
  submitMentoria,
  submitPalestras,
  submitNewsletter,
  submitAvaliacao,
  adminGetContatos,
  adminGetContatoById,
  adminMarkContatoRead,
  adminDeleteContato,
  adminGetDiagnosticos,
  adminGetMentorias,
  adminGetPalestras,
  adminGetNewsletters,
  adminGetAvaliacoes,
} from '../controllers/formularios.controller';
import { authenticate } from '../middleware/auth';
import prisma from '../config/database';

const router = Router();

// Rotas públicas (submissions)
router.post('/contato', submitContato);
router.post('/diagnostico', submitDiagnostico);
router.post('/mentoria', submitMentoria);
router.post('/palestras', submitPalestras);
router.post('/newsletter', submitNewsletter);
router.post('/avaliacao', submitAvaliacao);

export default router;

// Router admin - montado em /api/admin/formularios
export const adminFormulariosRouter = Router();

// Contato
adminFormulariosRouter.get('/contato', authenticate, adminGetContatos);
adminFormulariosRouter.get('/contato/:id', authenticate, adminGetContatoById);
adminFormulariosRouter.put('/contato/:id/read', authenticate, adminMarkContatoRead);
adminFormulariosRouter.patch('/contato/:id/read', authenticate, adminMarkContatoRead);
adminFormulariosRouter.delete('/contato/:id', authenticate, adminDeleteContato);

// Diagnóstico
adminFormulariosRouter.get('/diagnostico', authenticate, adminGetDiagnosticos);
adminFormulariosRouter.get('/diagnostico/:id', authenticate, async (req: any, res: any) => {
  try {
    const item = await prisma.formularioDiagnostico.findUnique({ where: { id: String(req.params.id) } });
    if (!item) { res.status(404).json({ error: 'Não encontrado' }); return; }
    res.json(item);
  } catch { res.status(500).json({ error: 'Erro ao buscar' }); }
});

// Mentoria
adminFormulariosRouter.get('/mentoria', authenticate, adminGetMentorias);
adminFormulariosRouter.get('/mentoria/:id', authenticate, async (req: any, res: any) => {
  try {
    const item = await prisma.formularioMentoria.findUnique({ where: { id: String(req.params.id) } });
    if (!item) { res.status(404).json({ error: 'Não encontrado' }); return; }
    res.json(item);
  } catch { res.status(500).json({ error: 'Erro ao buscar' }); }
});

// Palestras
adminFormulariosRouter.get('/palestras', authenticate, adminGetPalestras);
adminFormulariosRouter.get('/palestras/:id', authenticate, async (req: any, res: any) => {
  try {
    const item = await prisma.formularioPalestras.findUnique({ where: { id: String(req.params.id) } });
    if (!item) { res.status(404).json({ error: 'Não encontrado' }); return; }
    res.json(item);
  } catch { res.status(500).json({ error: 'Erro ao buscar' }); }
});

// Newsletter
adminFormulariosRouter.get('/newsletter', authenticate, adminGetNewsletters);

// Avaliação
adminFormulariosRouter.get('/avaliacao', authenticate, adminGetAvaliacoes);
adminFormulariosRouter.get('/avaliacao/:id', authenticate, async (req: any, res: any) => {
  try {
    const item = await prisma.formularioAvaliacao.findUnique({ where: { id: String(req.params.id) } });
    if (!item) { res.status(404).json({ error: 'Não encontrado' }); return; }
    res.json(item);
  } catch { res.status(500).json({ error: 'Erro ao buscar' }); }
});
