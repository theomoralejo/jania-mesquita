import { Request, Response } from 'express';
import prisma from '../config/database';
import { AuthRequest } from '../middleware/auth';

// Buscar configuração pública (frontend) ou pelo admin
export const getConfigByKey = async (req: Request, res: Response): Promise<void> => {
    try {
        const key = String(req.params.key);
        const config = await prisma.siteConfig.findUnique({ where: { key } });

        if (!config) {
            res.json({ key, value: null });
            return;
        }

        try {
            const parsedValue = JSON.parse(config.value);
            res.json({ key, value: parsedValue });
        } catch {
            res.json({ key, value: config.value });
        }
    } catch (error) {
        console.error('Erro ao buscar configuração:', error);
        res.status(500).json({ error: 'Erro ao buscar configuração' });
    }
};

// Admin list config
export const adminGetConfigs = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const configs = await prisma.siteConfig.findMany();
        // Parse values se possível
        const formatted = configs.map(c => {
            try {
                return { ...c, value: JSON.parse(c.value) };
            } catch {
                return c;
            }
        });
        res.json(formatted);
    } catch (error) {
        console.error('Erro ao buscar configurações:', error);
        res.status(500).json({ error: 'Erro ao buscar configurações' });
    }
}

// Admin save config
export const saveConfig = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const key = String(req.params.key);
        const { value } = req.body;

        const stringifiedValue = typeof value === 'string' ? value : JSON.stringify(value);

        // Upsert the config
        const config = await prisma.siteConfig.upsert({
            where: { key },
            update: { value: stringifiedValue },
            create: { key, value: stringifiedValue },
        });

        try {
            res.json({ ...config, value: JSON.parse(config.value) });
        } catch {
            res.json(config);
        }
    } catch (error) {
        console.error('Erro ao salvar configuração:', error);
        res.status(500).json({ error: 'Erro ao salvar configuração' });
    }
};
