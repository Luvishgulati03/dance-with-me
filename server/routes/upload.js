import { Router } from 'express';
import * as ctrl from '../controllers/uploadController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// File upload/delete
router.post('/', authMiddleware, ctrl.upload.single('file'), ctrl.uploadFile);
router.delete('/:filename', authMiddleware, ctrl.deleteFile);

// Media management
router.get('/media', ctrl.getAllMedia);
router.put('/media/:id', authMiddleware, ctrl.updateMedia);
router.post('/media', authMiddleware, ctrl.createMedia);
router.delete('/media/:id', authMiddleware, ctrl.deleteMedia);

export default router;
