// // src/pages/Politics.tsx
import React, { useEffect } from 'react';
import ArticleCard from '../components/ArticleCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchPoliticsArticles } from '../features/articles/articlesSlice';

const Politics: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const politicsArticles = useSelector((state: RootState) => state.articles.politicsArticles);

  useEffect(() => {
    dispatch(fetchPoliticsArticles());
  }, [dispatch]);

  const cnnArticles = politicsArticles
    .filter(article => article.source === 'cnn')
    .slice(0, 15); // Limit to 15 articles

  const foxArticles = politicsArticles
    .filter(article => article.source === 'fox-news')
    .slice(0, 15); // Limit to 15 articles

  const pairedArticles = [];
  for (let i = 0; i < Math.max(cnnArticles.length, foxArticles.length); i++) {
    pairedArticles.push([cnnArticles[i], foxArticles[i]]);
  }

  return (
    <div className="container">
      <h1 className="my-4">Political News</h1>
      <div className="row">
        {pairedArticles.map((pair, index) => (
          <div className="row mb-4" key={index}>
            <div className="col-md-6 col-sm-12 mb-4">
              {pair[0] && <ArticleCard article={pair[0]} />}
            </div>
            <div className="col-md-6 col-sm-12 mb-4">
              {pair[1] && <ArticleCard article={pair[1]} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Politics;
