import React from 'react';
import './PlaceholderPage.scss';

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, description }) => {
  return (
    <div className="placeholder-page">
      <div className="placeholder-page__container">
        <h1 className="placeholder-page__title">{title}</h1>
        {description && <p className="placeholder-page__description">{description}</p>}
        <p className="placeholder-page__note">This page is under construction.</p>
      </div>
    </div>
  );
};

export default PlaceholderPage;
