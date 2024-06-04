import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './PieChart.css';

const PieChart: React.FC = () => {
  const [ratings, setRatings] = useState({ cnn: { thumbs_up: 0, thumbs_down: 0 }, 'fox-news': { thumbs_up: 0, thumbs_down: 0 } });

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/articles/total-ratings`);
        setRatings(response.data);
      } catch (error) {
        console.error('Error fetching total ratings:', error);
      }
    };

    fetchRatings();
  }, []);

  const data = {
    labels: ['CNN', 'Fox News'],
    datasets: [
      {
        data: [
          ratings.cnn.thumbs_up - ratings.cnn.thumbs_down,
          ratings['fox-news'].thumbs_up - ratings['fox-news'].thumbs_down,
        ],
        backgroundColor: ['blue', 'red'],
        hoverBackgroundColor: ['#0000FF', '#FF0000']
      }
    ]
  };

  return (
    <div className="pie-chart">
      <h2>Article Ratings</h2>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
