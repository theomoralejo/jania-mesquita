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

const router = Router();

// Rotas públicas (submissions)
router.post('/contato', submitContato);
router.post('/diagnostico', submitDiagnostico);
router.post('/mentoria', submitMentoria);
router.post('/palestras', submitPalestras);
router.post('/newsletter', submitNewsletter);
router.post('/avaliacao', submitAvaliacao);

// Rotas admin (visualização)
router.get('/admin/contato', authenticate, adminGetContatos);
router.get('/admin/contato/:id', authenticate, adminGetContatoById);
router.put('/admin/contato/:id/read', authenticate, adminMarkContatoRead);
router.delete('/admin/contato/:id', authenticate, adminDeleteContato);

router.get('/admin/diagnostico', authenticate, adminGetDiagnosticos);
router.get('/admin/mentoria', authenticate, adminGetMentorias);
router.get('/admin/palestras', authenticate, adminGetPalestras);
router.get('/admin/newsletter', authenticate, adminGetNewsletters);
router.get('/admin/avaliacao', authenticate, adminGetAvaliacoes);

export default router;
