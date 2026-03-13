import { Router } from 'express';
import {
  getPalestrasVertentes,
  getPalestrasFormatos,
  getPalestrasEstatisticas,
  getDepoimentos,
  adminGetAllDepoimentos,
  adminGetDepoimentoById,
  createDepoimento,
  updateDepoimento,
  deleteDepoimento,
  getMediaFeatured,
  getMediaItems,
  getMediaBooks,
  getMediaPress,
  getGaleriaFotos,
  getSocialProofStats,
  adminGetSummary,
  adminGetAllMediaItems,
  adminGetMediaItemById,
  createMediaItem,
  updateMediaItem,
  deleteMediaItem,
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
adminContentRouter.get('/depoimentos/:id', authenticate, adminGetDepoimentoById);
adminContentRouter.put('/depoimentos/:id', authenticate, updateDepoimento);
adminContentRouter.patch('/depoimentos/:id', authenticate, updateDepoimento);
adminContentRouter.delete('/depoimentos/:id', authenticate, deleteDepoimento);

// Mídia admin CRUD - montadas em /api/admin/midias
adminContentRouter.get('/midias', authenticate, adminGetAllMediaItems);
adminContentRouter.post('/midias', authenticate, createMediaItem);
adminContentRouter.get('/midias/:id', authenticate, adminGetMediaItemById);
adminContentRouter.put('/midias/:id', authenticate, updateMediaItem);
adminContentRouter.patch('/midias/:id', authenticate, updateMediaItem);
adminContentRouter.delete('/midias/:id', authenticate, deleteMediaItem);

// Dashboard summary (admin)
adminContentRouter.get('/summary', authenticate, adminGetSummary);
