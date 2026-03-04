import { Router } from 'express';
import * as ctrl from '../controllers/eventsController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', authMiddleware, ctrl.create);
router.put('/:id', authMiddleware, ctrl.update);
router.delete('/:id', authMiddleware, ctrl.remove);

export default router;
