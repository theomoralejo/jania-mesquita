import { Router } from 'express';
import { upload, uploadImage, uploadImages, deleteImage, listImages } from '../controllers/upload.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// Upload single image
router.post('/image', authenticate, upload.single('image'), uploadImage);

// Upload multiple images
router.post('/images', authenticate, upload.array('images', 10), uploadImages);

// Delete image
router.delete('/image', authenticate, deleteImage);

// List all uploaded images
router.get('/list', authenticate, listImages);

export default router;
