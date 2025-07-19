import express from 'express';
import {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth,
  googleAuth,
  googleCallback,
  githubAuth,
  githubCallback,
} from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Local authentication routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

// OAuth routes
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);
router.get('/github', githubAuth);
router.get('/github/callback', githubCallback);

// Protected routes
router.put('/update-profile', protectRoute, updateProfile);
router.get('/check', protectRoute, checkAuth);

export default router;
