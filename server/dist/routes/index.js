import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';
import { authenticateToken } from '../middleware/auth.js';
const router = Router();
// Public routes (no authentication needed)
router.use('/auth', authRoutes);
// Protected API routes (authentication required)
router.use('/api', authenticateToken, apiRoutes);
export default router;
