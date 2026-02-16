import { Request, Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';

// ===========================
// ENDPOINTS PÚBLICOS
// ===========================

// Listar todos os posts (com filtros)
export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, search, featured } = req.query;

    const where: any = { published: true };

    if (category) {
      where.category = { slug: category as string };
    }

    if (featured === 'true') {
      where.featured = true;
    }

    if (search) {
      where.OR = [
        { title: { contains: search as string } },
        { excerpt: { contains: search as string } },
      ];
    }

    const posts = await prisma.blogPost.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: {
        publishedAt: 'desc',
      },
    });

    res.json(posts);
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    res.status(500).json({ error: 'Erro ao buscar posts' });
  }
};

// Buscar post por slug
export const getPostBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;

    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: {
        category: true,
      },
    });

    if (!post) {
      res.status(404).json({ error: 'Post não encontrado' });
      return;
    }

    if (!post.published) {
      res.status(404).json({ error: 'Post não publicado' });
      return;
    }

    res.json(post);
  } catch (error) {
    console.error('Erro ao buscar post:', error);
    res.status(500).json({ error: 'Erro ao buscar post' });
  }
};

// Listar categorias
export const getCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await prisma.blogCategory.findMany({
      include: {
        _count: {
          select: { posts: true },
        },
      },
    });

    res.json(categories);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    res.status(500).json({ error: 'Erro ao buscar categorias' });
  }
};

// ===========================
// ENDPOINTS ADMIN (PROTEGIDOS)
// ===========================

// Listar todos os posts (admin - inclui não publicados)
export const adminGetAllPosts = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const posts = await prisma.blogPost.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(posts);
  } catch (error) {
    console.error('Erro ao buscar posts (admin):', error);
    res.status(500).json({ error: 'Erro ao buscar posts' });
  }
};

// Buscar post por ID (admin)
export const adminGetPostById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const post = await prisma.blogPost.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });

    if (!post) {
      res.status(404).json({ error: 'Post não encontrado' });
      return;
    }

    res.json(post);
  } catch (error) {
    console.error('Erro ao buscar post:', error);
    res.status(500).json({ error: 'Erro ao buscar post' });
  }
};

// Criar novo post
export const createPost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      slug,
      title,
      excerpt,
      content,
      image,
      readTime,
      featured,
      published,
      publishedAt,
      categoryId,
    } = req.body;

    // Validação básica
    if (!slug || !title || !excerpt || !content || !categoryId) {
      res.status(400).json({ error: 'Campos obrigatórios faltando' });
      return;
    }

    // Verificar se slug já existe
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (existingPost) {
      res.status(400).json({ error: 'Slug já existe' });
      return;
    }

    const post = await prisma.blogPost.create({
      data: {
        slug,
        title,
        excerpt,
        content,
        image: image || '/assets/img/default-blog.jpg',
        readTime: readTime || '5 min',
        featured: featured || false,
        published: published !== undefined ? published : true,
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
        categoryId,
      },
      include: {
        category: true,
      },
    });

    res.status(201).json(post);
  } catch (error) {
    console.error('Erro ao criar post:', error);
    res.status(500).json({ error: 'Erro ao criar post' });
  }
};

// Atualizar post
export const updatePost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      slug,
      title,
      excerpt,
      content,
      image,
      readTime,
      featured,
      published,
      publishedAt,
      categoryId,
    } = req.body;

    // Verificar se post existe
    const existingPost = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!existingPost) {
      res.status(404).json({ error: 'Post não encontrado' });
      return;
    }

    // Se está mudando o slug, verificar se o novo slug já existe
    if (slug && slug !== existingPost.slug) {
      const slugExists = await prisma.blogPost.findUnique({
        where: { slug },
      });

      if (slugExists) {
        res.status(400).json({ error: 'Slug já existe' });
        return;
      }
    }

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        ...(slug && { slug }),
        ...(title && { title }),
        ...(excerpt && { excerpt }),
        ...(content && { content }),
        ...(image && { image }),
        ...(readTime && { readTime }),
        ...(featured !== undefined && { featured }),
        ...(published !== undefined && { published }),
        ...(publishedAt && { publishedAt: new Date(publishedAt) }),
        ...(categoryId && { categoryId }),
      },
      include: {
        category: true,
      },
    });

    res.json(post);
  } catch (error) {
    console.error('Erro ao atualizar post:', error);
    res.status(500).json({ error: 'Erro ao atualizar post' });
  }
};

// Deletar post
export const deletePost = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const post = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!post) {
      res.status(404).json({ error: 'Post não encontrado' });
      return;
    }

    await prisma.blogPost.delete({
      where: { id },
    });

    res.json({ message: 'Post deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar post:', error);
    res.status(500).json({ error: 'Erro ao deletar post' });
  }
};

// ===========================
// CATEGORIAS (ADMIN)
// ===========================

// Criar categoria
export const createCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { slug, label } = req.body;

    if (!slug || !label) {
      res.status(400).json({ error: 'Slug e label são obrigatórios' });
      return;
    }

    const existingCategory = await prisma.blogCategory.findUnique({
      where: { slug },
    });

    if (existingCategory) {
      res.status(400).json({ error: 'Slug já existe' });
      return;
    }

    const category = await prisma.blogCategory.create({
      data: { slug, label },
    });

    res.status(201).json(category);
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    res.status(500).json({ error: 'Erro ao criar categoria' });
  }
};

// Atualizar categoria
export const updateCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { slug, label } = req.body;

    const category = await prisma.blogCategory.update({
      where: { id },
      data: {
        ...(slug && { slug }),
        ...(label && { label }),
      },
    });

    res.json(category);
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    res.status(500).json({ error: 'Erro ao atualizar categoria' });
  }
};

// Deletar categoria
export const deleteCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Verificar se há posts usando esta categoria
    const postsCount = await prisma.blogPost.count({
      where: { categoryId: id },
    });

    if (postsCount > 0) {
      res.status(400).json({ error: 'Não é possível deletar categoria com posts associados' });
      return;
    }

    await prisma.blogCategory.delete({
      where: { id },
    });

    res.json({ message: 'Categoria deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar categoria:', error);
    res.status(500).json({ error: 'Erro ao deletar categoria' });
  }
};

export default {
  getPosts,
  getPostBySlug,
  getCategories,
  adminGetAllPosts,
  adminGetPostById,
  createPost,
  updatePost,
  deletePost,
  createCategory,
  updateCategory,
  deleteCategory,
};
