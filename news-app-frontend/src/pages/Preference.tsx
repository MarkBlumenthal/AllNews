// src/pages/Preference.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchArticles } from '../features/articles/articlesSlice';
import ArticleCard from '../components/ArticleCard';
import PieChart from '../components/PieChart'; 

const Preference: React.FC = () => {
  const [preference, setPreference] = useState<'liberal' | 'conservative'>('liberal');
  const dispatch: AppDispatch = useDispatch();
  const articles = useSelector((state: RootState) => state.articles.articles);
  const articleStatus = useSelector((state: RootState) => state.articles.status);

  useEffect(() => {
    if (articleStatus === 'idle') {
      dispatch(fetchArticles());
    }
  }, [articleStatus, dispatch]);

  useEffect(() => {
    console.log('Articles in Preferences:', articles);
  }, [articles]);

  const filteredArticles = articles.filter(article =>
    preference === 'liberal' ? article.source === 'cnn' : article.source === 'fox-news'
  ).slice(0, 12);

  return (
    <div className="container">
      <h1 className="my-4">Select Your News Preference</h1>
      <div className="btn-group mb-4" role="group" aria-label="News Preference">
        <button
          type="button"
          className={`btn btn-primary ${preference === 'liberal' ? 'active' : ''}`}
          onClick={() => setPreference('liberal')}
        >
          Liberal Media
        </button>
        <button
          type="button"
          className={`btn btn-primary ${preference === 'conservative' ? 'active' : ''}`}
          onClick={() => setPreference('conservative')}
        >
          Conservative Media
        </button>
      </div>
      <div className="row">
        {filteredArticles.map(article => (
          <div className="col-md-6 col-lg-4 mb-4" key={article.id}>
            <ArticleCard article={article} />
          </div>
        ))}
      </div>
      <PieChart />
    </div>
  );
};

export default Preference;

