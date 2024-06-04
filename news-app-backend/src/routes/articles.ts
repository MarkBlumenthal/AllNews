// src/routes/articles.ts
import { Router } from 'express';
import { getArticles, fetchAndStoreArticles, getLatestArticles, getPoliticsArticles, addRating, getRatings } from '../controllers/articlesController';
import authMiddleware from '../middleware/auth'; // Ensure this middleware sets req.user

const router = Router();

router.get('/', getArticles);
router.post('/fetch', fetchAndStoreArticles);
router.get('/latest', getLatestArticles);
router.get('/politics', getPoliticsArticles);
router.post('/rate', authMiddleware, addRating); // Add auth middleware here
router.get('/ratings', getRatings); // Ensure this endpoint matches your frontend call

export default router;




