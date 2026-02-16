import { Router } from 'express';
import {
  adminGetGaleriaFotos,
  adminGetGaleriaFoto,
  adminCreateGaleriaFoto,
  adminUpdateGaleriaFoto,
  adminDeleteGaleriaFoto,
} from '../controllers/galeria.controller';
import { authenticate } from '../middleware/auth';

export const adminGaleriaRouter = Router();

adminGaleriaRouter.get('/fotos', authenticate, adminGetGaleriaFotos);
adminGaleriaRouter.get('/fotos/:id', authenticate, adminGetGaleriaFoto);
adminGaleriaRouter.post('/fotos', authenticate, adminCreateGaleriaFoto);
adminGaleriaRouter.put('/fotos/:id', authenticate, adminUpdateGaleriaFoto);
adminGaleriaRouter.delete('/fotos/:id', authenticate, adminDeleteGaleriaFoto);

export default adminGaleriaRouter;
