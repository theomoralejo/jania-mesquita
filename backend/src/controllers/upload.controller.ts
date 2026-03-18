import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { AuthRequest } from '../middleware/auth';

const UPLOADS_DIR = path.join(process.cwd(), 'uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { category } = req.body || {};
    const folder = category || 'general';
    const destPath = path.join(UPLOADS_DIR, folder);
    
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath, { recursive: true });
    }
    
    cb(null, destPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext)
      .replace(/\s+/g, '-')
      .toLowerCase();
    
    cb(null, `${name}-${Date.now().toString().slice(-6)}${ext}`);
  }
});

export const upload = multer({
  storage,
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

    const { category } = req.body || {};
    const folder = category || 'general';
    const fileUrl = `/uploads/${folder}/${req.file.filename}`;

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

    const { category } = req.body || {};
    const folder = category || 'general';

    const uploadedFiles = files.map((file) => ({
      url: `/uploads/${folder}/${file.filename}`,
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

// List uploaded images
export const listImages = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const results: { url: string; filename: string; folder: string; mtime: number }[] = [];

    // 1. Scan frontend static assets (site images and videos)
    const frontendDistImgDir = path.join(process.cwd(), '..', 'frontend', 'dist', 'assets', 'img');
    const frontendPublicImgDir = path.join(process.cwd(), '..', 'frontend', 'public', 'assets', 'img');

    const frontendImgDir = fs.existsSync(frontendDistImgDir) ? frontendDistImgDir : frontendPublicImgDir;

    if (fs.existsSync(frontendImgDir)) {
      const files = fs.readdirSync(frontendImgDir)
        .filter(f => !f.startsWith('.') && !f.startsWith('._') && /\.(jpg|jpeg|png|webp|gif|svg|mp4|webm|mov|avi|mkv)$/i.test(f));
      for (const file of files) {
        const stats = fs.statSync(path.join(frontendImgDir, file));
        results.push({
          url: `/assets/img/${file}`,
          filename: file,
          folder: 'site-assets',
          mtime: stats.mtimeMs,
        });
      }
    }

    // 2. Scan local backend uploads
    if (fs.existsSync(UPLOADS_DIR)) {
      const folders = fs.readdirSync(UPLOADS_DIR).filter(f => fs.statSync(path.join(UPLOADS_DIR, f)).isDirectory());
      
      const directFiles = fs.readdirSync(UPLOADS_DIR).filter(f => fs.statSync(path.join(UPLOADS_DIR, f)).isFile() && !f.startsWith('.') && !f.startsWith('._'));
      for (const file of directFiles) {
        if (/\.(jpg|jpeg|png|webp|gif|svg|mp4|webm|mov|avi|mkv)$/i.test(file)) {
          const stats = fs.statSync(path.join(UPLOADS_DIR, file));
          results.push({
             url: `/uploads/${file}`,
             filename: file,
             folder: 'uploads',
             mtime: stats.mtimeMs,
          });
        }
      }

      for (const folder of folders) {
        const folderPath = path.join(UPLOADS_DIR, folder);
        const files = fs.readdirSync(folderPath).filter(f => !f.startsWith('.') && !f.startsWith('._') && /\.(jpg|jpeg|png|webp|gif|svg|mp4|webm|mov|avi|mkv)$/i.test(f));
        
        for (const file of files) {
          const stats = fs.statSync(path.join(folderPath, file));
          results.push({
            url: `/uploads/${folder}/${file}`,
            filename: file,
            folder: folder,
            mtime: stats.mtimeMs,
          });
        }
      }
    }

    // Sort descending by modified time
    results.sort((a, b) => b.mtime - a.mtime);

    // Remove mtime before sending response to keep API compatible
    const finalizedResults = results.map(({ mtime, ...rest }) => rest);

    res.json(finalizedResults);
  } catch (error) {
    console.error('Erro ao listar imagens:', error);
    res.status(500).json({ error: 'Erro ao listar imagens' });
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

    let isCloudinary = filepath.includes('cloudinary.com');

    if (isCloudinary) {
      console.log('Ignorando tentativa de deletar imagem antiga do Cloudinary');
    } else {
      const cleanPath = filepath.replace(/^\/uploads\//, '');
      const fullPath = path.join(UPLOADS_DIR, cleanPath);
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    }

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
