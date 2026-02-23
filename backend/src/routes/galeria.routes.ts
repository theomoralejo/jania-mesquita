import { Router } from 'express';
import {
	adminGetGaleriaFotos,
	adminGetGaleriaFoto,
	adminCreateGaleriaFoto,
	adminUpdateGaleriaFoto,
	adminDeleteGaleriaFoto,
	adminReorderGaleriaFotos,
} from '../controllers/galeria.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// Rotas públicas (frontend)
router.get('/fotos', adminGetGaleriaFotos);
router.get('/fotos/:id', adminGetGaleriaFoto);

export default router;

// Router separado para rotas admin
export const adminGaleriaRouter = Router();

adminGaleriaRouter.get('/fotos', authenticate, adminGetGaleriaFotos);
adminGaleriaRouter.get('/fotos/:id', authenticate, adminGetGaleriaFoto);
adminGaleriaRouter.post('/fotos', authenticate, adminCreateGaleriaFoto);
adminGaleriaRouter.put('/fotos/:id', authenticate, adminUpdateGaleriaFoto);
adminGaleriaRouter.delete('/fotos/:id', authenticate, adminDeleteGaleriaFoto);
adminGaleriaRouter.put('/fotos/reorder', authenticate, adminReorderGaleriaFotos);

