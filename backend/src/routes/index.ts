import { Router } from 'express';
import authRoutes from './auth.routes';
import blogRoutes, { adminBlogRouter } from './blog.routes';
import formulariosRoutes, { adminFormulariosRouter } from './formularios.routes';
import contentRoutes, { adminContentRouter } from './content.routes';
import acervoRoutes, { adminAcervoRouter } from './acervo.routes';
import { adminGaleriaRouter } from './galeria.routes';
import uploadRoutes from './upload.routes';

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

// Rotas Admin
router.use('/admin/blog', adminBlogRouter);
router.use('/admin/acervo', adminAcervoRouter);
router.use('/admin/galeria', adminGaleriaRouter);
router.use('/admin/formularios', adminFormulariosRouter);
router.use('/admin', adminContentRouter);
router.use('/admin/upload', uploadRoutes);

export default router;
