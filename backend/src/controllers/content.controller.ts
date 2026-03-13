import { Request, Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';

// ===========================
// PALESTRAS
// ===========================

export const getPalestrasVertentes = async (req: Request, res: Response): Promise<void> => {
  try {
    const vertentes = await prisma.palestraVertente.findMany({
      orderBy: { order: 'asc' },
    });
    res.json(vertentes);
  } catch (error) {
    console.error('Erro ao buscar vertentes:', error);
    res.status(500).json({ error: 'Erro ao buscar vertentes' });
  }
};

export const getPalestrasFormatos = async (req: Request, res: Response): Promise<void> => {
  try {
    const formatos = await prisma.palestraFormato.findMany({
      orderBy: { order: 'asc' },
    });
    res.json(formatos);
  } catch (error) {
    console.error('Erro ao buscar formatos:', error);
    res.status(500).json({ error: 'Erro ao buscar formatos' });
  }
};

export const getPalestrasEstatisticas = async (req: Request, res: Response): Promise<void> => {
  try {
    const estatisticas = await prisma.palestraEstatistica.findMany({
      orderBy: { order: 'asc' },
    });
    res.json(estatisticas);
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({ error: 'Erro ao buscar estatísticas' });
  }
};

// ===========================
// DEPOIMENTOS
// ===========================

export const getDepoimentos = async (req: Request, res: Response): Promise<void> => {
  try {
    const depoimentos = await prisma.depoimento.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
    });
    res.json(depoimentos);
  } catch (error) {
    console.error('Erro ao buscar depoimentos:', error);
    res.status(500).json({ error: 'Erro ao buscar depoimentos' });
  }
};

export const adminGetAllDepoimentos = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const depoimentos = await prisma.depoimento.findMany({
      orderBy: { order: 'asc' },
    });
    res.json(depoimentos);
  } catch (error) {
    console.error('Erro ao buscar depoimentos:', error);
    res.status(500).json({ error: 'Erro ao buscar depoimentos' });
  }
};

export const adminGetDepoimentoById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const depoimento = await prisma.depoimento.findUnique({ where: { id } });
    if (!depoimento) {
      res.status(404).json({ error: 'Depoimento não encontrado' });
      return;
    }
    res.json(depoimento);
  } catch (error) {
    console.error('Erro ao buscar depoimento:', error);
    res.status(500).json({ error: 'Erro ao buscar depoimento' });
  }
};

export const createDepoimento = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, role, event, quote, image, published, order } = req.body;

    if (!name || !role || !quote) {
      res.status(400).json({ error: 'Campos obrigatórios faltando' });
      return;
    }

    const depoimento = await prisma.depoimento.create({
      data: { name, role, event, quote, image, published, order: order || 0 },
    });

    res.status(201).json(depoimento);
  } catch (error) {
    console.error('Erro ao criar depoimento:', error);
    res.status(500).json({ error: 'Erro ao criar depoimento' });
  }
};

export const updateDepoimento = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { name, role, event, quote, image, published, order } = req.body;

    const depoimento = await prisma.depoimento.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(role && { role }),
        ...(event !== undefined && { event }),
        ...(quote && { quote }),
        ...(image !== undefined && { image }),
        ...(published !== undefined && { published }),
        ...(order !== undefined && { order }),
      },
    });

    res.json(depoimento);
  } catch (error) {
    console.error('Erro ao atualizar depoimento:', error);
    res.status(500).json({ error: 'Erro ao atualizar depoimento' });
  }
};

export const deleteDepoimento = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    await prisma.depoimento.delete({ where: { id } });
    res.json({ message: 'Depoimento deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar depoimento:', error);
    res.status(500).json({ error: 'Erro ao deletar depoimento' });
  }
};

// ===========================
// MÍDIA
// ===========================

export const getMediaFeatured = async (req: Request, res: Response): Promise<void> => {
  try {
    const featured = await prisma.mediaFeatured.findMany();
    res.json(featured);
  } catch (error) {
    console.error('Erro ao buscar mídia featured:', error);
    res.status(500).json({ error: 'Erro ao buscar mídia' });
  }
};

export const getMediaItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const items = await prisma.mediaItem.findMany({
      orderBy: { order: 'asc' },
    });
    res.json(items);
  } catch (error) {
    console.error('Erro ao buscar items de mídia:', error);
    res.status(500).json({ error: 'Erro ao buscar items' });
  }
};

export const getMediaBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const books = await prisma.mediaBook.findMany({
      orderBy: { order: 'asc' },
    });
    res.json(books);
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    res.status(500).json({ error: 'Erro ao buscar livros' });
  }
};

export const getMediaPress = async (req: Request, res: Response): Promise<void> => {
  try {
    const press = await prisma.mediaPress.findMany({
      orderBy: { order: 'asc' },
    });
    res.json(press);
  } catch (error) {
    console.error('Erro ao buscar press mentions:', error);
    res.status(500).json({ error: 'Erro ao buscar press' });
  }
};

// ===========================
// GALERIA
// ===========================

export const getGaleriaFotos = async (req: Request, res: Response): Promise<void> => {
  try {
    const fotos = await prisma.galeriaFoto.findMany({
      orderBy: { order: 'asc' },
    });
    res.json(fotos);
  } catch (error) {
    console.error('Erro ao buscar fotos:', error);
    res.status(500).json({ error: 'Erro ao buscar fotos' });
  }
};

export const createGaleriaFoto = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { src, alt, title, order } = req.body;

    if (!src || !alt || !title) {
      res.status(400).json({ error: 'Campos obrigatórios faltando' });
      return;
    }

    const foto = await prisma.galeriaFoto.create({
      data: { src, alt, title, order: order || 0 },
    });

    res.status(201).json(foto);
  } catch (error) {
    console.error('Erro ao criar foto:', error);
    res.status(500).json({ error: 'Erro ao criar foto' });
  }
};

export const deleteGaleriaFoto = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    await prisma.galeriaFoto.delete({ where: { id } });
    res.json({ message: 'Foto deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar foto:', error);
    res.status(500).json({ error: 'Erro ao deletar foto' });
  }
};

// ===========================
// SOCIAL PROOF
// ===========================

export const getSocialProofStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const stats = await prisma.socialProofStat.findMany({
      orderBy: { order: 'asc' },
    });
    res.json(stats);
  } catch (error) {
    console.error('Erro ao buscar stats:', error);
    res.status(500).json({ error: 'Erro ao buscar stats' });
  }
};

// ===========================
// ADMIN SUMMARY
// ===========================
export const adminGetSummary = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const [
      totalPosts,
      publishedPosts,
      totalProducts,
      totalGaleriaFotos,
      unreadContatos,
      newsletterCount,
      diagnosticoCount,
      mentoriaCount,
      palestrasCount,
      avaliacoesCount,
    ] = await Promise.all([
      prisma.blogPost.count(),
      prisma.blogPost.count({ where: { published: true } }),
      prisma.acervoProduct.count(),
      prisma.galeriaFoto.count(),
      prisma.formularioContato.count({ where: { read: false } }),
      prisma.formularioNewsletter.count(),
      prisma.formularioDiagnostico.count({ where: { read: false } }),
      prisma.formularioMentoria.count({ where: { read: false } }),
      prisma.formularioPalestras.count({ where: { read: false } }),
      prisma.formularioAvaliacao.count({ where: { read: false } }),
    ]);

    res.json({
      totalPosts,
      publishedPosts,
      totalProducts,
      totalGaleriaFotos,
      unreadContatos,
      newsletterCount,
      diagnosticoCount,
      mentoriaCount,
      palestrasCount,
      avaliacoesCount,
    });
  } catch (error) {
    console.error('Erro ao buscar resumo do admin:', error);
    res.status(500).json({ error: 'Erro ao buscar resumo' });
  }
};

// ===========================
// MÍDIA ADMIN CRUD
// ===========================

export const adminGetAllMediaItems = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const items = await prisma.mediaItem.findMany({ orderBy: { order: 'asc' } });
    res.json(items);
  } catch (error) {
    console.error('Erro ao buscar media items:', error);
    res.status(500).json({ error: 'Erro ao buscar media items' });
  }
};

export const adminGetMediaItemById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const item = await prisma.mediaItem.findUnique({ where: { id } });
    if (!item) { res.status(404).json({ error: 'Item não encontrado' }); return; }
    res.json(item);
  } catch (error) {
    console.error('Erro ao buscar media item:', error);
    res.status(500).json({ error: 'Erro ao buscar media item' });
  }
};

export const createMediaItem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { type, icon, outlet, title, date, link, order } = req.body;
    if (!title || !link) { res.status(400).json({ error: 'Título e link são obrigatórios' }); return; }
    const item = await prisma.mediaItem.create({
      data: { type: type || 'Artigo', icon: icon || 'FileText', outlet: outlet || '', title, date: date || '', link, order: order || 0 },
    });
    res.status(201).json(item);
  } catch (error) {
    console.error('Erro ao criar media item:', error);
    res.status(500).json({ error: 'Erro ao criar media item' });
  }
};

export const updateMediaItem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { type, icon, outlet, title, date, link, order } = req.body;
    const item = await prisma.mediaItem.update({
      where: { id },
      data: {
        ...(type !== undefined && { type }),
        ...(icon !== undefined && { icon }),
        ...(outlet !== undefined && { outlet }),
        ...(title !== undefined && { title }),
        ...(date !== undefined && { date }),
        ...(link !== undefined && { link }),
        ...(order !== undefined && { order }),
      },
    });
    res.json(item);
  } catch (error) {
    console.error('Erro ao atualizar media item:', error);
    res.status(500).json({ error: 'Erro ao atualizar media item' });
  }
};

export const deleteMediaItem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    await prisma.mediaItem.delete({ where: { id } });
    res.json({ message: 'Item deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar media item:', error);
    res.status(500).json({ error: 'Erro ao deletar media item' });
  }
};

export default {
  getPalestrasVertentes,
  getPalestrasFormatos,
  getPalestrasEstatisticas,
  getDepoimentos,
  adminGetAllDepoimentos,
  adminGetDepoimentoById,
  createDepoimento,
  updateDepoimento,
  deleteDepoimento,
  getMediaFeatured,
  getMediaItems,
  getMediaBooks,
  getMediaPress,
  getGaleriaFotos,
  getSocialProofStats,
  adminGetAllMediaItems,
  adminGetMediaItemById,
  createMediaItem,
  updateMediaItem,
  deleteMediaItem,
};
