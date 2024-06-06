// src/controllers/articlesController.ts
import { Request, Response } from 'express';
import pool from '../config/db';
import axios from 'axios';
import { format, subDays } from 'date-fns';
import { AuthRequest } from '../middleware/auth';

export const getArticles = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query("SELECT * FROM articles WHERE LOWER(source) IN ('cnn', 'fox-news') AND LOWER(category) = 'politics'");
    res.json(result.rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchAndStoreArticles = async (req: Request, res: Response): Promise<void> => {
  try {
    const twoWeeksAgo = format(subDays(new Date(), 14), 'yyyy-MM-dd');
    const today = format(new Date(), 'yyyy-MM-dd');

    const responseCNN = await axios.get(`https://newsapi.org/v2/everything?q=politics&sources=cnn&from=${twoWeeksAgo}&to=${today}&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`);
    const responseFOX = await axios.get(`https://newsapi.org/v2/everything?q=politics&sources=fox-news&from=${twoWeeksAgo}&to=${today}&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`);

    const articles = [...responseCNN.data.articles, ...responseFOX.data.articles];

    const insertPromises = articles.map((article: any) => {
      const { title, description, url, urlToImage, publishedAt, source } = article;
      const normalizedSource = source.name.toLowerCase().includes('cnn') ? 'cnn' : 'fox-news';
      return pool.query(
        'INSERT INTO articles (title, description, url, urlToImage, publishedAt, source, category) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (url) DO NOTHING',
        [title, description, url, urlToImage, publishedAt, normalizedSource, 'politics']
      );
    });

    await Promise.all(insertPromises);
    res.status(200).json({ message: 'Articles fetched and stored successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getLatestArticles = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query(`
      (SELECT * FROM articles WHERE LOWER(source) = 'cnn' AND LOWER(category) = 'politics' ORDER BY publishedAt DESC LIMIT 2)
      UNION ALL
      (SELECT * FROM articles WHERE LOWER(source) = 'fox-news' AND LOWER(category) = 'politics' ORDER BY publishedAt DESC LIMIT 2)
    `);
    res.json(result.rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getPoliticsArticles = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query(`
      (SELECT * FROM articles WHERE LOWER(source) = 'cnn' AND LOWER(category) = 'politics' ORDER BY publishedAt DESC LIMIT 5)
      UNION ALL
      (SELECT * FROM articles WHERE LOWER(source) = 'fox-news' AND LOWER(category) = 'politics' ORDER BY publishedAt DESC LIMIT 5)
    `);
    res.json(result.rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Add Rating
export const addRating = async (req: AuthRequest, res: Response): Promise<void> => {
  const { articleUrl, rating } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ error: 'User not authenticated' });
    return;
  }

  try {
    const articleResult = await pool.query('SELECT id FROM articles WHERE url = $1', [articleUrl]);
    if (articleResult.rows.length === 0) {
      res.status(404).json({ error: 'Article not found' });
      return;
    }
    const articleId = articleResult.rows[0].id;

    const existingRating = await pool.query('SELECT rating FROM article_ratings WHERE user_id = $1 AND article_id = $2', [userId, articleId]);

    if (existingRating.rows.length > 0) {
      const currentRating = existingRating.rows[0].rating;
      if (currentRating === rating) {
        const thumbsUpResult = await pool.query(
          'SELECT COUNT(*) as thumbs_up FROM article_ratings WHERE article_id = $1 AND rating = true',
          [articleId]
        );
        const thumbsDownResult = await pool.query(
          'SELECT COUNT(*) as thumbs_down FROM article_ratings WHERE article_id = $1 AND rating = false',
          [articleId]
        );

        const thumbsUpCount = parseInt(thumbsUpResult.rows[0].thumbs_up, 10);
        const thumbsDownCount = parseInt(thumbsDownResult.rows[0].thumbs_down, 10);

        res.status(200).json({ message: 'Rating already set', thumbs_up: thumbsUpCount, thumbs_down: thumbsDownCount });
        return;
      }

      await pool.query(
        'UPDATE article_ratings SET rating = $3 WHERE user_id = $1 AND article_id = $2',
        [userId, articleId, rating]
      );
    } else {
      await pool.query(
        'INSERT INTO article_ratings (user_id, article_id, rating) VALUES ($1, $2, $3)',
        [userId, articleId, rating]
      );
    }

    const thumbsUpResult = await pool.query(
      'SELECT COUNT(*) as thumbs_up FROM article_ratings WHERE article_id = $1 AND rating = true',
      [articleId]
    );
    const thumbsDownResult = await pool.query(
      'SELECT COUNT(*) as thumbs_down FROM article_ratings WHERE article_id = $1 AND rating = false',
      [articleId]
    );

    const thumbsUpCount = parseInt(thumbsUpResult.rows[0].thumbs_up, 10);
    const thumbsDownCount = parseInt(thumbsDownResult.rows[0].thumbs_down, 10);

    res.status(200).json({ message: 'Rating updated successfully', thumbs_up: thumbsUpCount, thumbs_down: thumbsDownCount });
  } catch (error: any) {
    console.error('Error adding/updating rating:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get Ratings
export const getRatings = async (req: Request, res: Response): Promise<void> => {
  const { articleId, articleUrl } = req.query;

  try {
    console.log(`Fetching ratings for articleUrl: ${articleUrl}, articleId: ${articleId}`);
    let result;
    if (articleUrl) {
      result = await pool.query(
        `SELECT article_id, 
                SUM(CASE WHEN rating THEN 1 ELSE 0 END) as thumbs_up, 
                SUM(CASE WHEN NOT rating THEN 1 ELSE 0 END) as thumbs_down 
         FROM article_ratings 
         WHERE article_id = (SELECT id FROM articles WHERE url = $1) 
         GROUP BY article_id`,
        [articleUrl]
      );
    } else if (articleId) {
      result = await pool.query(
        `SELECT article_id, 
                SUM(CASE WHEN rating THEN 1 ELSE 0 END) as thumbs_up, 
                SUM(CASE WHEN NOT rating THEN 1 ELSE 0 END) as thumbs_down 
         FROM article_ratings 
         WHERE article_id = $1 
         GROUP BY article_id`,
        [articleId]
      );
    } else {
      result = await pool.query(
        `SELECT article_id, 
                SUM(CASE WHEN rating THEN 1 ELSE 0 END) as thumbs_up, 
                SUM(CASE WHEN NOT rating THEN 1 ELSE 0 END) as thumbs_down 
         FROM article_ratings 
         GROUP BY article_id`
      );
    }

    console.log('Query result:', result.rows);

    res.json(result.rows);
  } catch (error: any) {
    console.error('Error fetching ratings:', error);
    res.status(500).json({ error: error.message });
  }
};

export const getTotalRatings = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Fetching total ratings...');
    const thumbsUpResult = await pool.query(
      `SELECT source, SUM(CASE WHEN rating THEN 1 ELSE 0 END) as thumbs_up,
              SUM(CASE WHEN NOT rating THEN 1 ELSE 0 END) as thumbs_down 
       FROM article_ratings 
       INNER JOIN articles ON article_ratings.article_id = articles.id 
       WHERE LOWER(source) IN ('cnn', 'fox-news') 
       GROUP BY source`
    );

    console.log('Query result:', thumbsUpResult.rows);

    const ratings = thumbsUpResult.rows.reduce((acc: any, row: any) => {
      acc[row.source] = {
        thumbs_up: parseInt(row.thumbs_up, 10),
        thumbs_down: parseInt(row.thumbs_down, 10)
      };
      return acc;
    }, { cnn: { thumbs_up: 0, thumbs_down: 0 }, 'fox-news': { thumbs_up: 0, thumbs_down: 0 } });

    res.status(200).json(ratings);
  } catch (error: any) {
    console.error('Error fetching total ratings:', error);
    res.status(500).json({ error: error.message });
  }
};
