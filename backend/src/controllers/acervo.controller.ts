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
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ],
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

export const adminGetAcervoCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const category = await prisma.acervoCategory.findUnique({
      where: { id: String(req.params.id) },
    });
    if (!category) {
      res.status(404).json({ error: 'Categoria não encontrada' });
      return;
    }
    res.json(category);
  } catch (error) {
    console.error('Erro ao buscar categoria:', error);
    res.status(500).json({ error: 'Erro ao buscar categoria' });
  }
};

export const adminCreateAcervoCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { label, slug } = req.body;
    if (!label || !slug) {
      res.status(400).json({ error: 'Nome e slug são obrigatórios' });
      return;
    }
    const category = await prisma.acervoCategory.create({ data: { label, slug } });
    res.status(201).json(category);
  } catch (error: any) {
    if (error.code === 'P2002') {
      res.status(400).json({ error: 'Slug já existe' });
      return;
    }
    res.status(500).json({ error: 'Erro ao criar categoria' });
  }
};

export const adminUpdateAcervoCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { label, slug } = req.body;
    const category = await prisma.acervoCategory.update({
      where: { id: String(req.params.id) },
      data: { label, slug }
    });
    res.json(category);
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Categoria não encontrada' });
      return;
    }
    if (error.code === 'P2002') {
      res.status(400).json({ error: 'Slug já existe' });
      return;
    }
    res.status(500).json({ error: 'Erro ao atualizar categoria' });
  }
};

export const adminDeleteAcervoCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    await prisma.acervoCategory.delete({ where: { id: String(req.params.id) } });
    res.json({ message: 'Categoria deletada com sucesso' });
  } catch (error: any) {
    res.status(500).json({ error: 'Erro ao deletar categoria' });
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

export const adminGetAcervoFormat = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const format = await prisma.acervoFormat.findUnique({
      where: { id: String(req.params.id) },
    });
    if (!format) {
      res.status(404).json({ error: 'Formato não encontrado' });
      return;
    }
    res.json(format);
  } catch (error) {
    console.error('Erro ao buscar formato:', error);
    res.status(500).json({ error: 'Erro ao buscar formato' });
  }
};

export const adminCreateAcervoFormat = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { label, slug, icon } = req.body;
    if (!label || !slug) {
      res.status(400).json({ error: 'Nome e slug são obrigatórios' });
      return;
    }
    const format = await prisma.acervoFormat.create({ data: { label, slug, icon: icon ? String(icon) : "BookOpen" } });
    res.status(201).json(format);
  } catch (error: any) {
    if (error.code === 'P2002') {
      res.status(400).json({ error: 'Slug já existe' });
      return;
    }
    res.status(500).json({ error: 'Erro ao criar formato' });
  }
};

export const adminUpdateAcervoFormat = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { label, slug, icon } = req.body;
    const format = await prisma.acervoFormat.update({
      where: { id: String(req.params.id) },
      data: { label, slug, icon: icon !== undefined ? String(icon) : undefined }
    });
    res.json(format);
  } catch (error: any) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Formato não encontrado' });
      return;
    }
    if (error.code === 'P2002') {
      res.status(400).json({ error: 'Slug já existe' });
      return;
    }
    res.status(500).json({ error: 'Erro ao atualizar formato' });
  }
};

export const adminDeleteAcervoFormat = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    await prisma.acervoFormat.delete({ where: { id: String(req.params.id) } });
    res.json({ message: 'Formato deletado com sucesso' });
  } catch (error: any) {
    res.status(500).json({ error: 'Erro ao deletar formato' });
  }
};


// ===========================
// PRODUTOS (ADMIN)
// ===========================

export const adminGetAcervoProducts = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { _start = '0', _end = '10', _sort = 'createdAt', _order = 'DESC' } = req.query;

    const skip = parseInt(_start as string) || 0;
    const take = (parseInt(_end as string) || 10) - skip;

    const sortField = Array.isArray(_sort) ? _sort[0] : _sort;
    const sortOrder = Array.isArray(_order) ? _order[0] : _order;

    const [products, total] = await Promise.all([
      prisma.acervoProduct.findMany({
        skip,
        take,
        include: {
          category: true,
          format: true,
        },
        orderBy: {
          [String(sortField)]: String(sortOrder).toLowerCase(),
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
    const { 
      title, slug, description, fullContent, image, price, originalPrice, 
      installmentsPrice, badge1Text, badge1Enabled, badge2Text, badge2Enabled,
      descriptionTitleText, descriptionTitleEnabled, bestsellerText, readersText,
      categoryId, formatId, hotmartLink, featured, order 
    } = req.body;

    if (!title || !slug) {
      res.status(400).json({ error: 'Título e slug são obrigatórios' });
      return;
    }

    const product = await prisma.acervoProduct.create({
      data: {
        title: String(title), 
        slug: String(slug), 
        description: String(description), 
        fullContent: fullContent ? String(fullContent) : null, 
        image: String(image), 
        price: String(price), 
        originalPrice: originalPrice ? String(originalPrice) : null, 
        hotmartLink: hotmartLink ? String(hotmartLink) : null, 
        categoryId: String(categoryId), 
        formatId: String(formatId),
        installmentsPrice: installmentsPrice ? String(installmentsPrice) : null,
        badge1Text: badge1Text ? String(badge1Text) : "Nova Edição 2025",
        badge1Enabled: badge1Enabled !== undefined ? Boolean(badge1Enabled) : true,
        badge2Text: badge2Text ? String(badge2Text) : "Oferta Especial",
        badge2Enabled: badge2Enabled !== undefined ? Boolean(badge2Enabled) : true,
        descriptionTitleText: descriptionTitleText ? String(descriptionTitleText) : "A Medicina Mudou. Sua Gestão Também Precisa Mudar.",
        descriptionTitleEnabled: descriptionTitleEnabled !== undefined ? Boolean(descriptionTitleEnabled) : true,
        bestsellerText: bestsellerText ? String(bestsellerText) : "Bestseller #1 em Gestão Médica",
        readersText: readersText ? String(readersText) : "Junte-se a 2.000+ médicos leitores",
        featured: featured !== undefined ? Boolean(featured) : false,
        order: order !== undefined ? Number(order) : 0,
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
    const { 
      title, slug, description, fullContent, image, price, originalPrice, installmentsPrice,
      badge1Text, badge1Enabled, badge2Text, badge2Enabled, descriptionTitleText, descriptionTitleEnabled,
      bestsellerText, readersText,
      categoryId, formatId, hotmartLink, published, featured, order 
    } = req.body;

    const product = await prisma.acervoProduct.update({
      where: { id },
      data: {
        title: title !== undefined ? String(title) : undefined, 
        slug: slug !== undefined ? String(slug) : undefined, 
        description: description !== undefined ? String(description) : undefined, 
        fullContent: fullContent !== undefined ? (fullContent ? String(fullContent) : null) : undefined, 
        image: image !== undefined ? String(image) : undefined, 
        price: price !== undefined ? String(price) : undefined, 
        originalPrice: originalPrice !== undefined ? (originalPrice ? String(originalPrice) : null) : undefined, 
        hotmartLink: hotmartLink !== undefined ? (hotmartLink ? String(hotmartLink) : null) : undefined, 
        published: published !== undefined ? Boolean(published) : undefined, 
        featured: featured !== undefined ? Boolean(featured) : undefined,
        categoryId: categoryId !== undefined ? String(categoryId) : undefined, 
        formatId: formatId !== undefined ? String(formatId) : undefined,
        installmentsPrice: installmentsPrice !== undefined ? (installmentsPrice ? String(installmentsPrice) : null) : undefined,
        badge1Text: badge1Text !== undefined ? String(badge1Text) : undefined,
        badge1Enabled: badge1Enabled !== undefined ? Boolean(badge1Enabled) : undefined,
        badge2Text: badge2Text !== undefined ? String(badge2Text) : undefined,
        badge2Enabled: badge2Enabled !== undefined ? Boolean(badge2Enabled) : undefined,
        descriptionTitleText: descriptionTitleText !== undefined ? String(descriptionTitleText) : undefined,
        descriptionTitleEnabled: descriptionTitleEnabled !== undefined ? Boolean(descriptionTitleEnabled) : undefined,
        bestsellerText: bestsellerText !== undefined ? String(bestsellerText) : undefined,
        readersText: readersText !== undefined ? String(readersText) : undefined,
        order: order !== undefined ? Number(order) : undefined,
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
  getAcervoProducts,
  getAcervoProductBySlug,
  adminGetAcervoCategories,
  adminCreateAcervoCategory,
  adminUpdateAcervoCategory,
  adminDeleteAcervoCategory,
  adminGetAcervoFormats,
  adminCreateAcervoFormat,
  adminUpdateAcervoFormat,
  adminDeleteAcervoFormat,
  adminGetAcervoProducts,
  adminGetAcervoProduct,
  adminCreateAcervoProduct,
  adminUpdateAcervoProduct,
  adminDeleteAcervoProduct,
};
