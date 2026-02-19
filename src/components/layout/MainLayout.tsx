import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import './MainLayout.scss';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="main-layout">
      <Header />
      <div className="main-layout__body">
        <Sidebar />
        <main className="main-layout__content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
