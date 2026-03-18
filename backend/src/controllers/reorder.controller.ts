import { Request, Response } from 'express';
import prisma from '../config/database';

// Generic reorder endpoint
// Accepts: { items: [{ id: string, order: number }] }
// Works for any Prisma model that has an 'order' field
export const reorderItems = (modelName: string) => {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      const { items } = req.body;
      
      if (!items || !Array.isArray(items)) {
        res.status(400).json({ error: 'items array is required' });
        return;
      }

      // Update each item's order in a transaction
      await prisma.$transaction(
        items.map((item: { id: string; order: number }) =>
          (prisma as any)[modelName].update({
            where: { id: item.id },
            data: { order: item.order },
          })
        )
      );

      res.json({ success: true });
    } catch (error) {
      console.error(`Erro ao reordenar ${modelName}:`, error);
      res.status(500).json({ error: `Erro ao reordenar ${modelName}` });
    }
  };
};

// Generic inline update endpoint
// Accepts: { field: string, value: any }
// Updates a single field of a record
export const inlineUpdate = (modelName: string, allowedFields: string[]) => {
  return async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updates = req.body;

      // Filter to only allowed fields
      const data: any = {};
      for (const key of Object.keys(updates)) {
        if (allowedFields.includes(key)) {
          data[key] = updates[key];
        }
      }

      if (Object.keys(data).length === 0) {
        res.status(400).json({ error: 'No valid fields to update' });
        return;
      }

      const updated = await (prisma as any)[modelName].update({
        where: { id },
        data,
      });

      res.json(updated);
    } catch (error) {
      console.error(`Erro ao atualizar ${modelName}:`, error);
      res.status(500).json({ error: `Erro ao atualizar ${modelName}` });
    }
  };
};
