import React from 'react';
import './Header.scss';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
              fill="white"
            />
            <circle cx="12" cy="12" r="5" fill="white" />
          </svg>
          <span className="header__brand">Drivelah</span>
        </div>
        
        <nav className="header__nav">
          <a href="#" className="header__link">Learn more</a>
          <a href="#" className="header__link">List your car</a>
          <a href="#" className="header__link">Inbox</a>
          <div className="header__profile">
            <div className="header__avatar">
              <img src="https://via.placeholder.com/32" alt="User profile" />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
