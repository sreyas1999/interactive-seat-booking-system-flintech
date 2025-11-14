import React from 'react';
import '../../styles/TheatreStage.css';

interface TheatreStageProps {
  className?: string;
}

export const TheatreStage: React.FC<TheatreStageProps> = ({ className = '' }) => {
  return (
    <div className={`theatre-stage ${className}`}>
      <div className="stage-container">
        <div className="screen">
          <span className="screen-text">SCREEN</span>
        </div>
        <div className="light-projection"></div>
      </div>
    </div>
  );
};