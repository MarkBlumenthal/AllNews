// src/pages/About.tsx
import React from 'react';
import PieChart from '../components/PieChart';
import Footer from '../components/Footer';
import './About.css'; // Import the CSS file

const About: React.FC = () => {
  return (
    <div className="container fade-in">
      <h1 className="my-4 text-center">About Us</h1>
      <p>This is a news application that displays political news from various sources.</p>
      <div className="about-content">
        <h2 className="my-3 text-center">Our Mission</h2>
        <p>
          Our mission is to provide a balanced view of the political news landscape by aggregating
          news articles from both liberal and conservative media outlets. We believe that access
          to diverse perspectives is crucial for a well-informed public.
        </p>

        <h2 className="my-3 text-center">News Sources</h2>
        <p>
          We source our articles from two of the most influential media outlets in the United States:
          Fox News and CNN. Our platform allows users to view articles side-by-side, providing a
          clear comparison between the two perspectives.
        </p>
        {/* Space for logos and links */}
        <div className="logos" style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0' }}>
          <div>
            <a href="https://www.foxnews.com" target="_blank" rel="noopener noreferrer">
              {/* Placeholder for Fox News logo */}
              <img src="Fox_News_Channel_logo.svg.png" alt="Fox News" style={{ width: '100px' }} />
            </a>
          </div>
          <div>
            <a href="https://www.cnn.com" target="_blank" rel="noopener noreferrer">
              {/* Placeholder for CNN logo */}
              <img src="CNN.svg.png" alt="CNN" style={{ width: '100px' }} />
            </a>
          </div>
        </div>

        <h2 className="my-3 text-center">User Engagement</h2>
        <p>
          We encourage our users to engage with the content by providing ratings and comments on the
          articles. Your feedback helps us understand what content is most valuable to you and
          fosters a community of informed readers.
        </p>
      </div>
      <PieChart />
      <Footer />
    </div>
  );
};

export default About;

