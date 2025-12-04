import express from 'express';
import authRoutes from './auth.routes.js';
import documentRoutes from './document.routes.js';
import summaryRoutes from './sumary.routes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/documents', documentRoutes);
router.use('/summaries', summaryRoutes);

export default router;
