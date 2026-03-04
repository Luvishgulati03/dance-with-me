import { Router } from 'express';
import { getAll, getByPage, upsert, bulkUpdate } from '../controllers/contentController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/', getAll);
router.get('/:page', getByPage);
router.put('/', authMiddleware, upsert);
router.put('/bulk', authMiddleware, bulkUpdate);

export default router;
