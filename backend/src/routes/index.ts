import { Router } from 'express';
import authRoutes from './auth.routes';
import blogRoutes, { adminBlogRouter } from './blog.routes';
import formulariosRoutes, { adminFormulariosRouter } from './formularios.routes';
import contentRoutes, { adminContentRouter } from './content.routes';
import acervoRoutes, { adminAcervoRouter } from './acervo.routes';
import configRoutes, { adminConfigRouter } from './config.routes';
import { adminGaleriaRouter } from './galeria.routes';
import uploadRoutes from './upload.routes';
import { reorderItems, inlineUpdate } from '../controllers/reorder.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// Rotas de autenticação
router.use('/auth', authRoutes);

// Rotas públicas (frontend)
router.use('/blog', blogRoutes);
router.use('/formularios', formulariosRoutes);
router.use('/acervo', acervoRoutes);
router.use('/', contentRoutes);

// Rotas de upload (públicas)
router.use('/upload', uploadRoutes);

// Rotas de configurações (públicas)
router.use('/config', configRoutes);

// Rotas Admin
router.use('/admin/blog', adminBlogRouter);
router.use('/admin/acervo', adminAcervoRouter);
router.use('/admin/galeria', adminGaleriaRouter);
router.use('/admin/formularios', adminFormulariosRouter);
router.use('/admin/config', adminConfigRouter);
router.use('/admin', adminContentRouter);
router.use('/admin/upload', uploadRoutes);

// Reorder routes (admin)
router.post('/admin/depoimentos/reorder', authenticate, reorderItems('depoimento'));
router.post('/admin/midias/reorder', authenticate, reorderItems('mediaItem'));
router.post('/admin/galeria/fotos/reorder', authenticate, reorderItems('galeriaFoto'));
router.post('/admin/acervo/reorder', authenticate, reorderItems('acervoProduct'));

// Inline update routes (admin) - uses PATCH on existing routes, already handled by controllers

export default router;

