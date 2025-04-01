import express from 'express';
import userRoutes from './api/userRoutes.js';
import thoughtRoutes from './api/thoughtRoutes.js';

const router = express.Router();

router.use('/api/users', userRoutes);
router.use('/api/thoughts', thoughtRoutes);

export default router;
