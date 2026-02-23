import { Request, Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';

// ===========================
// GALERIA (ADMIN)
// ===========================

export const adminGetGaleriaFotos = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { _start = 0, _end = 10, _sort = 'order', _order = 'ASC' } = req.query;

    const skip = parseInt(_start as string) || 0;
    const take = (parseInt(_end as string) || 10) - skip;

    const [fotos, total] = await Promise.all([
      prisma.galeriaFoto.findMany({
        skip,
        take,
        orderBy: {
          [_sort as string]: (_order as string).toLowerCase(),
        },
      }),
      prisma.galeriaFoto.count(),
    ]);

    res.header('X-Total-Count', total.toString());
    res.json(fotos);
  } catch (error) {
    console.error('Erro ao buscar fotos:', error);
    res.status(500).json({ error: 'Erro ao buscar fotos' });
  }
};

export const adminGetGaleriaFoto = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);

    const foto = await prisma.galeriaFoto.findUnique({
      where: { id },
    });

    if (!foto) {
      res.status(404).json({ error: 'Foto não encontrada' });
      return;
    }

    res.json(foto);
  } catch (error) {
    console.error('Erro ao buscar foto:', error);
    res.status(500).json({ error: 'Erro ao buscar foto' });
  }
};

export const adminCreateGaleriaFoto = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { src, alt, title, order } = req.body;

    if (!src || !alt) {
      res.status(400).json({ error: 'Src e alt são obrigatórios' });
      return;
    }

    const foto = await prisma.galeriaFoto.create({
      data: {
        src,
        alt,
        title: title || alt,
        order: order || 0,
      },
    });

    res.status(201).json(foto);
  } catch (error) {
    console.error('Erro ao criar foto:', error);
    res.status(500).json({ error: 'Erro ao criar foto' });
  }
};

export const adminUpdateGaleriaFoto = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);
    const { src, alt, title, order } = req.body;

    const foto = await prisma.galeriaFoto.update({
      where: { id },
      data: {
        src,
        alt,
        title,
        order,
      },
    });

    res.json(foto);
  } catch (error: any) {
    console.error('Erro ao atualizar foto:', error);
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Foto não encontrada' });
      return;
    }
    res.status(500).json({ error: 'Erro ao atualizar foto' });
  }
};

export const adminDeleteGaleriaFoto = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const id = String(req.params.id);

    await prisma.galeriaFoto.delete({
      where: { id },
    });

    res.json({ message: 'Foto deletada com sucesso' });
  } catch (error: any) {
    console.error('Erro ao deletar foto:', error);
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Foto não encontrada' });
      return;
    }
    res.status(500).json({ error: 'Erro ao deletar foto' });
  }
};

export default {
  adminGetGaleriaFotos,
  adminGetGaleriaFoto,
  adminCreateGaleriaFoto,
  adminUpdateGaleriaFoto,
  adminDeleteGaleriaFoto,
};

export const adminReorderGaleriaFotos = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const items = req.body?.items;

    if (!Array.isArray(items)) {
      res.status(400).json({ error: 'Payload inválido: expected { items: [{ id, order }, ...] }' });
      return;
    }

    // Update each foto order in parallel
    const updates = items.map((it: any) => {
      const id = String(it.id);
      const order = Number(it.order) || 0;
      return prisma.galeriaFoto.update({ where: { id }, data: { order } });
    });

    await Promise.all(updates);

    res.json({ message: 'Ordem atualizada' });
  } catch (error) {
    console.error('Erro ao reordenar fotos:', error);
    res.status(500).json({ error: 'Erro ao reordenar fotos' });
  }
};
