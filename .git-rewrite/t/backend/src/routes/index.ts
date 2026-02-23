import { Router } from 'express';
import authRoutes from './auth.routes';
import blogRoutes, { adminBlogRouter } from './blog.routes';
import formulariosRoutes from './formularios.routes';
import contentRoutes, { adminContentRouter } from './content.routes';
import uploadRoutes from './upload.routes';

const router = Router();

// Rotas de autenticação
router.use('/auth', authRoutes);

// Rotas públicas (frontend)
router.use('/blog', blogRoutes);
router.use('/formularios', formulariosRoutes);
router.use('/', contentRoutes);

// Rotas Admin
router.use('/admin/blog', adminBlogRouter);
router.use('/admin', adminContentRouter);
router.use('/admin/upload', uploadRoutes);

export default router;
