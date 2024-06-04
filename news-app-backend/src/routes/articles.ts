// src/routes/articles.ts
import { Router } from 'express';
import { getArticles, fetchAndStoreArticles, getLatestArticles, getPoliticsArticles, addRating, getRatings, getTotalRatings } from '../controllers/articlesController';
import authMiddleware from '../middleware/auth';

const router = Router();

router.get('/', getArticles);
router.post('/fetch', fetchAndStoreArticles);
router.get('/latest', getLatestArticles);
router.get('/politics', getPoliticsArticles);
router.post('/rate', authMiddleware, addRating);
router.get('/ratings', getRatings);
router.get('/total-ratings', getTotalRatings); 

export default router;
