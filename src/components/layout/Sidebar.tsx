import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Sidebar.scss';

interface Step {
  id: string;
  label: string;
  path: string;
  completed: boolean;
}

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const steps: Step[] = [
    { id: 'location', label: 'Location', path: '/location', completed: true },
    { id: 'about', label: 'About', path: '/about', completed: true },
    { id: 'features', label: 'Features', path: '/features', completed: true },
    { id: 'rules', label: 'Rules', path: '/rules', completed: true },
    { id: 'pricing', label: 'Pricing', path: '/pricing', completed: true },
    { id: 'promotion', label: 'Promotion', path: '/promotion', completed: true },
    { id: 'pictures', label: 'Pictures', path: '/pictures', completed: true },
    { id: 'insurance', label: 'Insurance', path: '/insurance', completed: true },
    { id: 'subscription', label: 'Subscription', path: '/subscription', completed: false },
    { id: 'device', label: 'Device', path: '/device', completed: false },
    { id: 'easy-access', label: 'Easy Access', path: '/easy-access', completed: false },
  ];

  const currentStep = steps.find(step => step.path === location.pathname);

  return (
    <aside className="sidebar">
      {/* Mobile Dropdown */}
      <div className="sidebar__mobile-dropdown">
        <button 
          className="sidebar__dropdown-trigger"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span>{currentStep?.label || 'Select Step'}</span>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {isDropdownOpen && (
          <div className="sidebar__dropdown-menu">
            {steps.map((step) => {
              const isActive = location.pathname === step.path;
              return (
                <a
                  key={step.id}
                  href={step.path}
                  className={`sidebar__dropdown-item ${isActive ? 'sidebar__dropdown-item--active' : ''}`}
                  onClick={() => setIsDropdownOpen(false)}
                >
                  {step.label}
                </a>
              );
            })}
          </div>
        )}
      </div>

      {/* Desktop Navigation */}
      <nav className="sidebar__nav">
        {steps.map((step) => {
          const isActive = location.pathname === step.path;
          
          return (
            <a
              key={step.id}
              href={step.path}
              className={`sidebar__item ${isActive ? 'sidebar__item--active' : ''} ${
                step.completed ? 'sidebar__item--completed' : ''
              }`}
            >
              <span className="sidebar__label">{step.label}</span>
              {step.completed && (
                <span className="sidebar__check">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="#026786" />
                    <path
                      d="M5 8l2 2 4-4"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
            </a>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
