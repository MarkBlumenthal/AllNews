// src/App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './app/store';
import { fetchHomeArticles } from './features/articles/articlesSlice';
import ArticleCard from './components/ArticleCard';
import Navbar from './components/Navbar';
import Politics from './pages/Politics';
import About from './pages/About';
import RegisterLogin from './pages/Register';
import Preference from './pages/Preference';
import ProtectedRoute from './components/ProtectedRoute';
import PieChart from './components/PieChart'; 

const Home: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const homeArticles = useSelector((state: RootState) => state.articles.homeArticles);
  const homeStatus = useSelector((state: RootState) => state.articles.homeStatus);

  useEffect(() => {
    if (homeStatus === 'idle') {
      dispatch(fetchHomeArticles());
    }
  }, [homeStatus, dispatch]);

  useEffect(() => {
    console.log('Home Articles in Frontend:', homeArticles);
  }, [homeArticles]);

  const cnnArticles = homeArticles.filter(article => article.source === 'cnn');
  const foxArticles = homeArticles.filter(article => article.source === 'fox-news');

  const pairedArticles = [];
  for (let i = 0; i < Math.max(cnnArticles.length, foxArticles.length); i++) {
    pairedArticles.push([cnnArticles[i], foxArticles[i]]);
  }

  return (
    <div className="container">
      <h1 className="my-4">Political News from the Liberal Left & Conservative Right</h1>
      <h3 className="my-4">Letting you choose what News you want to read</h3>
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
      <PieChart /> 
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/politics" element={<Politics />} />
        <Route path="/about" element={<About />} />
        <Route path="/user/register" element={<RegisterLogin />} />
        <Route path="/preferences" element={<ProtectedRoute><Preference /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

export default App;