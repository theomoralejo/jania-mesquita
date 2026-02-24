import { Router } from 'express';
import {
  getAcervoCategories,
  getAcervoFormats,
  getAcervoProducts,
  getAcervoProductBySlug,
  adminGetAcervoCategories,
  adminGetAcervoFormats,
  adminGetAcervoProducts,
  adminGetAcervoProduct,
  adminCreateAcervoProduct,
  adminUpdateAcervoProduct,
  adminDeleteAcervoProduct,
} from '../controllers/acervo.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// Rotas públicas (frontend)
router.get('/categories', getAcervoCategories);
router.get('/formats', getAcervoFormats);
router.get('/products', getAcervoProducts);
router.get('/products/:slug', getAcervoProductBySlug);

export default router;

// Router separado para rotas admin
export const adminAcervoRouter = Router();

adminAcervoRouter.get('/categories', authenticate, adminGetAcervoCategories);
adminAcervoRouter.get('/formats', authenticate, adminGetAcervoFormats);
adminAcervoRouter.get('/', authenticate, adminGetAcervoProducts);
adminAcervoRouter.get('/:id', authenticate, adminGetAcervoProduct);
adminAcervoRouter.post('/', authenticate, adminCreateAcervoProduct);
adminAcervoRouter.put('/:id', authenticate, adminUpdateAcervoProduct);
adminAcervoRouter.patch('/:id', authenticate, adminUpdateAcervoProduct);
adminAcervoRouter.delete('/:id', authenticate, adminDeleteAcervoProduct);
