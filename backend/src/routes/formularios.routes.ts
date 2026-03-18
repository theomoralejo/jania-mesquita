import { Router } from 'express';
import {
  submitContato,
  submitDiagnostico,
  submitMentoria,
  submitConsultoria,
  submitPalestras,
  submitNewsletter,
  submitAvaliacao,
  adminGetContatos,
  adminGetContatoById,
  adminMarkContatoRead,
  adminDeleteContato,
  adminGetDiagnosticos,
  adminMarkDiagnosticoRead,
  adminGetMentorias,
  adminMarkMentoriaRead,
  adminGetConsultorias,
  adminMarkConsultoriaRead,
  adminGetPalestras,
  adminMarkPalestraRead,
  adminGetNewsletters,
  adminMarkNewsletterRead,
  adminGetAvaliacoes,
  adminMarkAvaliacaoRead,
} from '../controllers/formularios.controller';
import { authenticate } from '../middleware/auth';
import prisma from '../config/database';

const router = Router();

// Rotas públicas (submissions)
router.post('/contato', submitContato);
router.post('/diagnostico', submitDiagnostico);
router.post('/mentoria', submitMentoria);
router.post('/consultoria', submitConsultoria);
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
adminFormulariosRouter.put('/diagnostico/:id', authenticate, adminMarkDiagnosticoRead);
adminFormulariosRouter.patch('/diagnostico/:id', authenticate, adminMarkDiagnosticoRead);
adminFormulariosRouter.put('/diagnostico/:id/read', authenticate, adminMarkDiagnosticoRead);
adminFormulariosRouter.patch('/diagnostico/:id/read', authenticate, adminMarkDiagnosticoRead);

// Mentoria
adminFormulariosRouter.get('/mentoria', authenticate, adminGetMentorias);
adminFormulariosRouter.get('/mentoria/:id', authenticate, async (req: any, res: any) => {
  try {
    const item = await prisma.formularioMentoria.findUnique({ where: { id: String(req.params.id) } });
    if (!item) { res.status(404).json({ error: 'Não encontrado' }); return; }
    res.json(item);
  } catch { res.status(500).json({ error: 'Erro ao buscar' }); }
});
adminFormulariosRouter.put('/mentoria/:id', authenticate, adminMarkMentoriaRead);
adminFormulariosRouter.patch('/mentoria/:id', authenticate, adminMarkMentoriaRead);
adminFormulariosRouter.put('/mentoria/:id/read', authenticate, adminMarkMentoriaRead);
adminFormulariosRouter.patch('/mentoria/:id/read', authenticate, adminMarkMentoriaRead);

// Consultoria
adminFormulariosRouter.get('/consultoria', authenticate, adminGetConsultorias);
adminFormulariosRouter.get('/consultoria/:id', authenticate, async (req: any, res: any) => {
  try {
    const item = await prisma.formularioConsultoria.findUnique({ where: { id: String(req.params.id) } });
    if (!item) { res.status(404).json({ error: 'Não encontrado' }); return; }
    res.json(item);
  } catch { res.status(500).json({ error: 'Erro ao buscar' }); }
});
adminFormulariosRouter.put('/consultoria/:id', authenticate, adminMarkConsultoriaRead);
adminFormulariosRouter.patch('/consultoria/:id', authenticate, adminMarkConsultoriaRead);
adminFormulariosRouter.put('/consultoria/:id/read', authenticate, adminMarkConsultoriaRead);
adminFormulariosRouter.patch('/consultoria/:id/read', authenticate, adminMarkConsultoriaRead);

// Palestras
adminFormulariosRouter.get('/palestras', authenticate, adminGetPalestras);
adminFormulariosRouter.get('/palestras/:id', authenticate, async (req: any, res: any) => {
  try {
    const item = await prisma.formularioPalestras.findUnique({ where: { id: String(req.params.id) } });
    if (!item) { res.status(404).json({ error: 'Não encontrado' }); return; }
    res.json(item);
  } catch { res.status(500).json({ error: 'Erro ao buscar' }); }
});
adminFormulariosRouter.put('/palestras/:id', authenticate, adminMarkPalestraRead);
adminFormulariosRouter.patch('/palestras/:id', authenticate, adminMarkPalestraRead);
adminFormulariosRouter.put('/palestras/:id/read', authenticate, adminMarkPalestraRead);
adminFormulariosRouter.patch('/palestras/:id/read', authenticate, adminMarkPalestraRead);

// Newsletter
adminFormulariosRouter.get('/newsletter', authenticate, adminGetNewsletters);
adminFormulariosRouter.put('/newsletter/:id', authenticate, adminMarkNewsletterRead);
adminFormulariosRouter.patch('/newsletter/:id', authenticate, adminMarkNewsletterRead);
adminFormulariosRouter.put('/newsletter/:id/read', authenticate, adminMarkNewsletterRead);
adminFormulariosRouter.patch('/newsletter/:id/read', authenticate, adminMarkNewsletterRead);

// Avaliação
adminFormulariosRouter.get('/avaliacao', authenticate, adminGetAvaliacoes);
adminFormulariosRouter.get('/avaliacao/:id', authenticate, async (req: any, res: any) => {
  try {
    const item = await prisma.formularioAvaliacao.findUnique({ where: { id: String(req.params.id) } });
    if (!item) { res.status(404).json({ error: 'Não encontrado' }); return; }
    res.json(item);
  } catch { res.status(500).json({ error: 'Erro ao buscar' }); }
});
adminFormulariosRouter.put('/avaliacao/:id', authenticate, adminMarkAvaliacaoRead);
adminFormulariosRouter.patch('/avaliacao/:id', authenticate, adminMarkAvaliacaoRead);
adminFormulariosRouter.put('/avaliacao/:id/read', authenticate, adminMarkAvaliacaoRead);
adminFormulariosRouter.patch('/avaliacao/:id/read', authenticate, adminMarkAvaliacaoRead);
