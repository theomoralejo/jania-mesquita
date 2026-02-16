import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { AuthRequest } from '../middleware/auth';

// Configuração do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { category } = req.body;
    const uploadPath = path.join(process.cwd(), 'uploads', category || 'general');

    // Criar pasta se não existir
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext)
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    cb(null, `${name}-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de arquivo não permitido. Use: JPG, PNG, WEBP ou GIF'));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// Upload single image
export const uploadImage = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'Nenhum arquivo enviado' });
      return;
    }

    const { category } = req.body;
    const fileUrl = `/uploads/${category || 'general'}/${req.file.filename}`;

    res.json({
      success: true,
      url: fileUrl,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype,
    });
  } catch (error) {
    console.error('Erro no upload:', error);
    res.status(500).json({ error: 'Erro ao fazer upload' });
  }
};

// Upload multiple images
export const uploadImages = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      res.status(400).json({ error: 'Nenhum arquivo enviado' });
      return;
    }

    const { category } = req.body;
    const uploadedFiles = files.map((file) => ({
      url: `/uploads/${category || 'general'}/${file.filename}`,
      filename: file.filename,
      originalName: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
    }));

    res.json({
      success: true,
      files: uploadedFiles,
      count: uploadedFiles.length,
    });
  } catch (error) {
    console.error('Erro no upload múltiplo:', error);
    res.status(500).json({ error: 'Erro ao fazer upload' });
  }
};

// Delete image
export const deleteImage = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { filepath } = req.body;

    if (!filepath) {
      res.status(400).json({ error: 'Filepath é obrigatório' });
      return;
    }

    // Remover /uploads/ do início se existir
    const cleanPath = filepath.replace(/^\/uploads\//, '');
    const fullPath = path.join(process.cwd(), 'uploads', cleanPath);

    // Verificar se arquivo existe
    if (!fs.existsSync(fullPath)) {
      res.status(404).json({ error: 'Arquivo não encontrado' });
      return;
    }

    // Deletar arquivo
    fs.unlinkSync(fullPath);

    res.json({
      success: true,
      message: 'Arquivo deletado com sucesso',
    });
  } catch (error) {
    console.error('Erro ao deletar arquivo:', error);
    res.status(500).json({ error: 'Erro ao deletar arquivo' });
  }
};

export default {
  upload,
  uploadImage,
  uploadImages,
  deleteImage,
};
