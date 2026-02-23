import { Router } from 'express';
import {
  getPalestrasVertentes,
  getPalestrasFormatos,
  getPalestrasEstatisticas,
  getDepoimentos,
  adminGetAllDepoimentos,
  createDepoimento,
  updateDepoimento,
  deleteDepoimento,
  getMediaFeatured,
  getMediaItems,
  getMediaBooks,
  getMediaPress,
  getGaleriaFotos,
  createGaleriaFoto,
  deleteGaleriaFoto,
  getSocialProofStats,
  adminGetSummary,
} from '../controllers/content.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// Rotas públicas (frontend)

// Palestras
router.get('/palestras/vertentes', getPalestrasVertentes);
router.get('/palestras/formatos', getPalestrasFormatos);
router.get('/palestras/estatisticas', getPalestrasEstatisticas);

// Depoimentos
router.get('/depoimentos', getDepoimentos);

// Mídia
router.get('/media/featured', getMediaFeatured);
router.get('/media/items', getMediaItems);
router.get('/media/books', getMediaBooks);
router.get('/media/press', getMediaPress);

// Galeria
router.get('/galeria/fotos', getGaleriaFotos);

// Social Proof
router.get('/social-proof/stats', getSocialProofStats);

export default router;

// Router separado para rotas admin
export const adminContentRouter = Router();

// Depoimentos admin - montadas em /api/admin/depoimentos
adminContentRouter.get('/depoimentos', authenticate, adminGetAllDepoimentos);
adminContentRouter.post('/depoimentos', authenticate, createDepoimento);
adminContentRouter.put('/depoimentos/:id', authenticate, updateDepoimento);
adminContentRouter.delete('/depoimentos/:id', authenticate, deleteDepoimento);

// Galeria admin - montadas em /api/admin/galeria
adminContentRouter.get('/galeria/fotos', authenticate, getGaleriaFotos);
adminContentRouter.post('/galeria/fotos', authenticate, createGaleriaFoto);
adminContentRouter.delete('/galeria/fotos/:id', authenticate, deleteGaleriaFoto);

// Dashboard summary (admin)
adminContentRouter.get('/summary', authenticate, adminGetSummary);
