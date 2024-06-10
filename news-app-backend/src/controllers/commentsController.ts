// src/controllers/commentsController.ts
import { Request, Response } from 'express';
import pool from '../config/db';
import { AuthRequest } from '../middleware/auth';

export const addComment = async (req: AuthRequest, res: Response): Promise<void> => {
  const { articleId, comment } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ error: 'User not authenticated' });
    return;
  }

  // we pair comments with the user id to an article with the article id
  try {
    const result = await pool.query(
      'INSERT INTO comments (user_id, article_id, comment) VALUES ($1, $2, $3) RETURNING *',
      [userId, articleId, comment]
    );
    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getComments = async (req: Request, res: Response): Promise<void> => {
  const { articleId } = req.params;

  try {
    const result = await pool.query(
      `SELECT comments.*, users.username 
       FROM comments 
       JOIN users ON comments.user_id = users.id 
       WHERE comments.article_id = $1 
       ORDER BY comments.created_at ASC`, 
      [articleId]
    );
    res.status(200).json(result.rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
