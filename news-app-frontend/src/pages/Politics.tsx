// src/pages/Politics.tsx
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState, AppDispatch } from '../app/store';
// import { fetchPoliticsArticles } from '../features/articles/articlesSlice';
// import ArticleCard from '../components/ArticleCard';
// import PieChart from '../components/PieChart';
// import Footer from '../components/Footer';

// const Politics: React.FC = () => {
//   const dispatch: AppDispatch = useDispatch();
//   const politicsArticles = useSelector((state: RootState) => state.articles.politicsArticles);

//   useEffect(() => {
//     dispatch(fetchPoliticsArticles());
//   }, [dispatch]);

//   const cnnArticles = politicsArticles.filter(article => article.source === 'cnn').slice(0, 15);
//   const foxArticles = politicsArticles.filter(article => article.source === 'fox-news').slice(0, 15);

//   const pairedArticles = [];
//   for (let i = 0; i < Math.max(cnnArticles.length, foxArticles.length); i++) {
//     pairedArticles.push([cnnArticles[i], foxArticles[i]]);
//   }

//   return (
//     <div className="container fade-in">
//       <h1 className="my-4">Political News from both sides</h1>
//       <h3 className="my-4">Here you can see all News articles from CNN and FOX side by side </h3>
//       <div className="row">
//         {pairedArticles.map((pair, index) => (
//           <div className="row mb-4" key={index}>
//             <div className="col-md-6 col-sm-12 mb-4">
//               {pair[0] && <ArticleCard article={pair[0]} />}
//             </div>
//             <div className="col-md-6 col-sm-12 mb-4">
//               {pair[1] && <ArticleCard article={pair[1]} />}
//             </div>
//           </div>
//         ))}
//       </div>
//       <PieChart />
//       <Footer />
//     </div>
//   );
// };

// export default Politics;




// src/pages/Politics.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../app/store';
import { fetchPoliticsArticles } from '../features/articles/articlesSlice';
import ArticleCard from '../components/ArticleCard';
import PieChart from '../components/PieChart';
import Footer from '../components/Footer';


const Politics: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const politicsArticles = useSelector((state: RootState) => state.articles.politicsArticles);

  useEffect(() => {
    dispatch(fetchPoliticsArticles());
  }, [dispatch]);

  const cnnArticles = politicsArticles.filter(article => article.source === 'cnn').slice(0, 15);
  const foxArticles = politicsArticles.filter(article => article.source === 'fox-news').slice(0, 15);

  const pairedArticles = [];
  for (let i = 0; i < Math.max(cnnArticles.length, foxArticles.length); i++) {
    pairedArticles.push([cnnArticles[i], foxArticles[i]]);
  }

  return (
    <div className="politics-page">
      <div className="container fade-in">
        <h1 className="my-4">Political News from both sides</h1>
        <h3 className="my-4">Here you can see all News articles from CNN and FOX side by side </h3>
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
      <Footer />
    </div>
  );
};

export default Politics;


