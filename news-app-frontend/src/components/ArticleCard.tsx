// // src/components/ArticleCard.tsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { RootState } from '../app/store';
import { Article } from '../features/articles/articlesSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ArticleCard.css';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const [thumbsUp, setThumbsUp] = useState(0);
  const [thumbsDown, setThumbsDown] = useState(0);
  const [userRating, setUserRating] = useState<null | boolean>(null);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const token = useSelector((state: RootState) => state.auth.token);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (API_URL) {
      axios.get(`${API_URL}/api/articles/ratings?articleUrl=${encodeURIComponent(article.url)}`)
        .then(response => {
          if (response.data.length > 0) {
            const articleRating = response.data[0];
            setThumbsUp(articleRating.thumbs_up);
            setThumbsDown(articleRating.thumbs_down);
          }
        })
        .catch(error => console.error('Error fetching ratings:', error));
    } else {
      console.error('API_URL is not defined');
    }
  }, [article.url, API_URL]);

  const handleRating = async (rating: boolean) => {
    if (!isAuthenticated) return;

    if (API_URL) {
      try {
        await axios.post(
          `${API_URL}/api/articles/rate`,
          { articleUrl: article.url, rating },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setUserRating(rating);
        if (rating) {
          setThumbsUp(thumbsUp + 1);
          if (userRating === false) setThumbsDown(thumbsDown - 1);
        } else {
          setThumbsDown(thumbsDown + 1);
          if (userRating === true) setThumbsUp(thumbsUp - 1);
        }
      } catch (error) {
        console.error('Error adding/updating rating:', error);
      }
    } else {
      console.error('API_URL is not defined');
    }
  };

  return (
    <div className="card mb-4">
      <img src={article.urltoimage} className="card-img-top" alt={article.title} />
      <div className="card-body">
        <h5 className="card-title">{article.title}</h5>
        <p className="card-text">{article.description}</p>
        <a href={article.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
          Read more
        </a>
        <div className="card-footer text-muted">
          Source: {article.source.toUpperCase()}
        </div>
        <div className="rating">
          <button className="btn btn-success" onClick={() => handleRating(true)}>👍 {thumbsUp}</button>
          <button className="btn btn-danger" onClick={() => handleRating(false)}>👎 {thumbsDown}</button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;




