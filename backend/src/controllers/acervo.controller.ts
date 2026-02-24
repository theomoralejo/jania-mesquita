import { Request, Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';

// ===========================
// CATEGORIAS
// ===========================

export const getAcervoCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await prisma.acervoCategory.findMany({
      orderBy: { label: 'asc' },
    });
    res.json(categories);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    res.status(500).json({ error: 'Erro ao buscar categorias' });
  }
};

// ===========================
// FORMATOS
// ===========================

export const getAcervoFormats = async (req: Request, res: Response): Promise<void> => {
  try {
    const formats = await prisma.acervoFormat.findMany({
      orderBy: { label: 'asc' },
    });
    res.json(formats);
  } catch (error) {
    console.error('Erro ao buscar formatos:', error);
    res.status(500).json({ error: 'Erro ao buscar formatos' });
  }
};

// ===========================
// PRODUTOS PÚBLICOS
// ===========================

export const getAcervoProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, format } = req.query;

    const products = await prisma.acervoProduct.findMany({
      where: {
        published: true,
        ...(category ? { category: { slug: String(category) } } : {}),
        ...(format ? { format: { slug: String(format) } } : {}),
      },
      include: {
        category: true,
        format: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(products);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
};

export const getAcervoProductBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const slug = String(req.params.slug);

    const product = await prisma.acervoProduct.findFirst({
      where: { slug, published: true },
      include: {
        category: true,
        format: true,
      },
    });

    if (!product) {
      res.status(404).json({ error: 'Produto não encontrado' });
      return;
    }

    res.json(product);
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
};

// ===========================
// ADMIN - CATEGORIAS
// ===========================

export const adminGetAcervoCategories = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const categories = await prisma.acervoCategory.findMany({
      orderBy: { label: 'asc' },
    });
    res.json(categories);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    res.status(500).json({ error: 'Erro ao buscar categorias' });
  }
};

// ===========================
// ADMIN - FORMATOS
// ===========================

export const adminGetAcervoFormats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const formats = await prisma.acervoFormat.findMany({
      orderBy: { label: 'asc' },
    });
    res.json(formats);
  } catch (error) {
    console.error('Erro ao buscar formatos:', error);
    res.status(500).json({ error: 'Erro ao buscar formatos' });
  }
};

// ===========================
// PRODUTOS (ADMIN)
// ===========================

export const adminGetAcervoProducts = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { _start = 0, _end = 10, _sort = 'createdAt', _order = 'DESC' } = req.query;

    const skip = parseInt(_start as string) || 0;
    const take = (parseInt(_end as string) || 10) - skip;

    const [products, total] = await Promise.all([
      prisma.acervoProduct.findMany({
        skip,
        take,
        include: {
          category: true,
          format: true,
        },
        orderBy: {
          [_sort as string]: (_order as string).toLowerCase(),
        },
      }),
      prisma.acervoProduct.count(),
    ]);

    res.header('X-Total-Count', total.toString());
    res.json(products);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ error: 'Erro ao buscar produtos' });
  }
};

export const adminGetAcervoProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);

    const product = await prisma.acervoProduct.findUnique({
      where: { id },
      include: {
        category: true,
        format: true,
      },
    });

    if (!product) {
      res.status(404).json({ error: 'Produto não encontrado' });
      return;
    }

    res.json(product);
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    res.status(500).json({ error: 'Erro ao buscar produto' });
  }
};

export const adminCreateAcervoProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, slug, description, fullContent, image, price, originalPrice, categoryId, formatId, hotmartLink } = req.body;

    if (!title || !slug) {
      res.status(400).json({ error: 'Título e slug são obrigatórios' });
      return;
    }

    const product = await prisma.acervoProduct.create({
      data: {
        title,
        slug,
        description,
        fullContent,
        image,
        price,
        originalPrice,
        hotmartLink,
        categoryId,
        formatId,
      },
      include: {
        category: true,
        format: true,
      },
    });

    res.status(201).json(product);
  } catch (error: any) {
    console.error('Erro ao criar produto:', error);
    if (error.code === 'P2002') {
      res.status(400).json({ error: 'Slug já existe' });
      return;
    }
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
};

export const adminUpdateAcervoProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { title, slug, description, fullContent, image, price, originalPrice, categoryId, formatId, hotmartLink, published } = req.body;

    const product = await prisma.acervoProduct.update({
      where: { id },
      data: {
        title,
        slug,
        description,
        fullContent,
        image,
        price,
        originalPrice,
        hotmartLink,
        published,
        categoryId,
        formatId,
      },
      include: {
        category: true,
        format: true,
      },
    });

    res.json(product);
  } catch (error: any) {
    console.error('Erro ao atualizar produto:', error);
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Produto não encontrado' });
      return;
    }
    if (error.code === 'P2002') {
      res.status(400).json({ error: 'Slug já existe' });
      return;
    }
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
};

export const adminDeleteAcervoProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);

    await prisma.acervoProduct.delete({
      where: { id },
    });

    res.json({ message: 'Produto deletado com sucesso' });
  } catch (error: any) {
    console.error('Erro ao deletar produto:', error);
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Produto não encontrado' });
      return;
    }
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
};

export default {
  getAcervoCategories,
  getAcervoFormats,
  adminGetAcervoCategories,
  adminGetAcervoFormats,
  adminGetAcervoProducts,
  adminGetAcervoProduct,
  adminCreateAcervoProduct,
  adminUpdateAcervoProduct,
  adminDeleteAcervoProduct,
};
