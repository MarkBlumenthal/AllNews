// src/components/VideoBackground.tsx
import React from 'react';
import './VideoBackground.css';

const VideoBackground: React.FC = () => {
  return (
    <div className="video-container fade-in">
      <video autoPlay loop muted className="video-background">
        <source src="/istockphoto-1370739605-640_adpp_is.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoBackground;

