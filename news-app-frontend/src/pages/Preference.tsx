// src/pages/Preference.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchArticles } from '../features/articles/articlesSlice';
import ArticleCard from '../components/ArticleCard';
import PieChart from '../components/PieChart';
import { selectAllArticles } from '../features/articles/articlesSelectors';
import Footer from '../components/Footer';

const Preference: React.FC = () => {
  const [preference, setPreference] = useState<'liberal' | 'conservative'>('liberal');
  const dispatch: AppDispatch = useDispatch();
  const articles = useSelector(selectAllArticles);
  const articleStatus = useSelector((state: RootState) => state.articles.status);

  useEffect(() => {
    if (articleStatus === 'idle') {
      dispatch(fetchArticles());
    }
  }, [articleStatus, dispatch]);

  const filteredArticles = articles.filter(article =>
    preference === 'liberal' ? article.source === 'cnn' : article.source === 'fox-news'
  ).slice(0, 12);

  return (
    <div className="container fade-in">
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
      <Footer />
    </div>
  );
};

export default Preference;
