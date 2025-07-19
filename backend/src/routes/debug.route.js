import express from 'express';
import multer from 'multer';
import {
  analyzeBug,
  getDebugHistory,
} from '../controllers/debug.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();
const upload = multer();

router.post(
  '/analyze',
  protectRoute,
  upload.fields([
    { name: 'log', maxCount: 1 },
    { name: 'screenshot', maxCount: 1 },
  ]),
  analyzeBug
);

router.get('/history', protectRoute, getDebugHistory);

export default router;
