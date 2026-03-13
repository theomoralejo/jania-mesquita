import { Router } from 'express';
import { getConfigByKey, saveConfig, adminGetConfigs } from '../controllers/config.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// Rota pública para buscar configs (ex: head/pixels)
router.get('/:key', getConfigByKey);

export default router;

// Rotas admin
export const adminConfigRouter = Router();

adminConfigRouter.get('/', authenticate, adminGetConfigs);
adminConfigRouter.put('/:key', authenticate, saveConfig);
