// src/components/ArticleCard.tsx
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
  const [errorMessage, setErrorMessage] = useState('');
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
    if (!isAuthenticated) {
      setErrorMessage('Sorry, but you must be signed in to be able to rate the articles.');
      return;
    }

    if (API_URL) {
      try {
        const response = await axios.post(
          `${API_URL}/api/articles/rate`,
          { articleUrl: article.url, rating },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        const { thumbs_up, thumbs_down } = response.data;
        setThumbsUp(thumbs_up);
        setThumbsDown(thumbs_down);
        setUserRating(rating);
        setErrorMessage(''); // Clear any previous error message
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
          <span 
            className={`emoji ${userRating === true ? 'active' : ''}`} 
            onClick={() => handleRating(true)}
          >👍 {thumbsUp}</span>
          <span 
            className={`emoji ${userRating === false ? 'active' : ''}`} 
            onClick={() => handleRating(false)}
          >👎 {thumbsDown}</span>
        </div>
        {errorMessage && <div className="alert alert-warning mt-2">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default ArticleCard;
