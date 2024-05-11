import React from 'react';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

const FeatureItem: React.FC<Feature> = ({ title, description, icon }) => (
  <div className="feature-item">
    <div className="icon-container">
      <img src={icon} alt="Feature Icon" className="icon" />
    </div>
    <div className="content">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
    <style jsx>{`
      .feature-item {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
      }
      .icon-container {
        width: 50px;
        height: 50px;
        border-radius: 8px;
        overflow: hidden;
        margin-right: 1rem;
      }
      .icon {
        width: 100%;
        height: auto;
      }
      .content {
        flex: 1;
           margin-right: 1rem;
      }
      h3 {
        margin: 0;
      }

      @media only screen and (max-width: 600px) {
        .feature-item {
          flex-direction: column;
          align-items: flex-start;
        }
        .icon-container {
          margin-right: 0;
          margin-bottom: 1rem; 
        }
      }
    `}</style>
  </div>
);

export default FeatureItem;
