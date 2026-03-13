import { Request, Response } from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import path from 'path';
import fs from 'fs';
import { AuthRequest } from '../middleware/auth';

// Configuração do Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configuração do Storage do Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const { category } = req?.body || {};
    const folderName = `jania-mesquita/${category || 'general'}`;

    // Configura formato e nome
    return {
      folder: folderName,
      allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'webp'],
      public_id: path.parse(file.originalname).name.replace(/\s+/g, '-').toLowerCase() + '-' + Date.now().toString().slice(-6),
    };
  },
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

    // O path da URL gerada pelo cloudinary
    res.json({
      success: true,
      url: req.file.path,
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

    const uploadedFiles = files.map((file) => ({
      url: file.path,
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
    const results: { url: string; filename: string; folder: string }[] = [];

    // 1. Scan Cloudinary API for the jania-mesquita folder
    if (process.env.CLOUDINARY_API_KEY) {
      try {
        // Obter submolders / general e buscar asssets
        const cloudinaryResponse = await cloudinary.search
          .expression('folder:jania-mesquita/*')
          .sort_by('created_at', 'desc')
          .max_results(500)
          .execute();

        for (const asset of cloudinaryResponse.resources) {
          results.push({
            url: asset.secure_url,
            filename: asset.public_id.split('/').pop() || asset.public_id,
            folder: asset.folder.replace('jania-mesquita/', ''),
          });
        }
      } catch (cloudErr) {
        console.error('Erro ao buscar CLOUDINARY:', cloudErr);
      }
    }

    // 2. Scan frontend static assets (site images)
    const frontendImgDir = path.join(process.cwd(), '..', 'frontend', 'assets', 'img');
    if (fs.existsSync(frontendImgDir)) {
      const files = fs.readdirSync(frontendImgDir)
        .filter(f => /\.(jpg|jpeg|png|webp|gif)$/i.test(f));
      for (const file of files) {
        results.push({
          url: `/assets/img/${file}`,
          filename: file,
          folder: 'site-assets',
        });
      }
    }

    res.json(results);
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
    let publicId = '';

    if (isCloudinary) {
      // Extrai o public ID da URL do Cloudinary:
      // Ex: https://res.cloudinary.com/cloud_name/image/upload/v12345/jania-mesquita/general/nome-imagem.jpg
      const urlParts = filepath.split('/');
      const versionIndex = urlParts.findIndex(p => p.startsWith('v') && !isNaN(p.substring(1)));
      if (versionIndex > -1) {
        const pathAfterVersion = urlParts.slice(versionIndex + 1).join('/');
        // remove extension
        publicId = pathAfterVersion.substring(0, pathAfterVersion.lastIndexOf('.'));
      }
    }

    if (publicId && process.env.CLOUDINARY_API_KEY) {
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (cloudErr) {
        console.error('Erro destruindo no cloudinary:', cloudErr);
      }
    } else {
      // Tenta apagar localmente caso seja fallback/legado
      const cleanPath = filepath.replace(/^\/uploads\//, '');
      const fullPath = path.join(process.cwd(), 'uploads', cleanPath);
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
