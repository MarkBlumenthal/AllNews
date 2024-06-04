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
    console.log(`Inserting rating: userId=${userId}, articleId=${articleId}, rating=${rating}`);

    const insertResult = await pool.query(
      'INSERT INTO article_ratings (user_id, article_id, rating) VALUES ($1, $2, $3) ON CONFLICT (user_id, article_id) DO UPDATE SET rating = $3',
      [userId, articleId, rating]
    );
    console.log('Insert Result:', insertResult);
    res.status(200).json({ message: 'Rating added/updated successfully' });
  } catch (error: any) {
    console.error('Error adding/updating rating:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get Ratings
export const getRatings = async (req: Request, res: Response): Promise<void> => {
  const { articleId, articleUrl } = req.query;

  try {
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

    res.json(result.rows);
  } catch (error: any) {
    console.error('Error fetching ratings:', error);
    res.status(500).json({ error: error.message });
  }
};



