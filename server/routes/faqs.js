import { Router } from 'express';
import * as ctrl from '../controllers/faqsController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/', ctrl.getAll);
router.post('/', authMiddleware, ctrl.create);
router.put('/:id', authMiddleware, ctrl.update);
router.delete('/:id', authMiddleware, ctrl.remove);

export default router;
