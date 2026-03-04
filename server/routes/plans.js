import { Router } from 'express';
import * as ctrl from '../controllers/plansController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/', ctrl.getAll);
router.put('/:id', authMiddleware, ctrl.update);

export default router;
