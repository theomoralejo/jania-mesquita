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

export default {
  getPalestrasVertentes,
  getPalestrasFormatos,
  getPalestrasEstatisticas,
  getDepoimentos,
  adminGetAllDepoimentos,
  createDepoimento,
  updateDepoimento,
  deleteDepoimento,
  getMediaFeatured,
  getMediaItems,
  getMediaBooks,
  getMediaPress,
  getGaleriaFotos,
  createGaleriaFoto,
  deleteGaleriaFoto,
  getSocialProofStats,
};
