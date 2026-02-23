import { Router } from 'express';
import {
  getPosts,
  getPostBySlug,
  getCategories,
  getCategoryById,
  adminGetAllPosts,
  adminGetPostById,
  createPost,
  updatePost,
  deletePost,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/blog.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// Rotas públicas (para o frontend)
router.get('/posts', getPosts);
router.get('/posts/:slug', getPostBySlug);
router.get('/categories', getCategories);

export default router;

// Router separado para rotas admin
export const adminBlogRouter = Router();

// Rotas admin (protegidas) - montadas em /api/admin/blog
adminBlogRouter.get('/posts', authenticate, adminGetAllPosts);
adminBlogRouter.get('/posts/:id', authenticate, adminGetPostById);
adminBlogRouter.post('/posts', authenticate, createPost);
adminBlogRouter.put('/posts/:id', authenticate, updatePost);
adminBlogRouter.delete('/posts/:id', authenticate, deletePost);

adminBlogRouter.get('/categories', authenticate, getCategories);
adminBlogRouter.get('/categories/:id', authenticate, getCategoryById);
adminBlogRouter.post('/categories', authenticate, createCategory);
adminBlogRouter.put('/categories/:id', authenticate, updateCategory);
adminBlogRouter.delete('/categories/:id', authenticate, deleteCategory);
