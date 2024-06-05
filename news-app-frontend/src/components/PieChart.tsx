// src/components/PieChart.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './PieChart.css';

const PieChart: React.FC = () => {
  const [ratings, setRatings] = useState({ cnn: { thumbs_up: 0, thumbs_down: 0 }, 'fox-news': { thumbs_up: 0, thumbs_down: 0 } });
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        if (API_URL) {
          const response = await axios.get(`${API_URL}/api/articles/total-ratings`);
          setRatings(response.data);
        } else {
          console.error('API_URL is not defined');
        }
      } catch (error) {
        console.error('Error fetching total ratings:', error);
      }
    };

    fetchRatings();
  }, [API_URL]);

  const totalCnnLikes = ratings.cnn.thumbs_up;
  const totalFoxLikes = ratings['fox-news'].thumbs_up;
  const totalLikes = totalCnnLikes + totalFoxLikes;
  const cnnPercentage = totalLikes > 0 ? (totalCnnLikes / totalLikes) * 100 : 0;
  const foxPercentage = totalLikes > 0 ? (totalFoxLikes / totalLikes) * 100 : 0;

  const data = {
    labels: [`CNN ${cnnPercentage.toFixed(2)}%`, `Fox News ${foxPercentage.toFixed(2)}%`],
    datasets: [
      {
        data: [totalCnnLikes, totalFoxLikes],
        backgroundColor: ['blue', 'red'],
        hoverBackgroundColor: ['#0000FF', '#FF0000']
      }
    ]
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.chart._metasets[context.datasetIndex].total;
            const percentage = total > 0 ? ((value / total) * 100).toFixed(2) : 0;
            return `${label}: ${percentage}%`;
          }
        }
      }
    }
  };

  return (
    <div className="pie-chart-container">
      <div className="chart-text">
        <p>This chart indicates which articles from the political spectrum, CNN - Liberal and Fox-News - Conservative, are the most popular based on you, our viewers ratings. Help us by always keeping it up to date by either giving the articles a thumbs up or thumbs down.</p>
      </div>
      <div className="pie-chart">
        <h2>Article Ratings</h2>
        <Pie data={data} options={options} width={200} height={200} />
      </div>
    </div>
  );
};

export default PieChart;






