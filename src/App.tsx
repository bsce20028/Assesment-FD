import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAppDispatch } from './store/hooks';
import { loadFromLocalStorage as loadFromLocalStorageAction } from './store/slices/listingSlice';
import { loadFromLocalStorage, saveToLocalStorage } from './utils/localStorage';
import MainLayout from './components/layout/MainLayout';
import SubscriptionPlan from './pages/SubscriptionPlan';
import PlaceholderPage from './pages/PlaceholderPage';
import './styles/globals.scss';

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = loadFromLocalStorage();
    if (savedData) {
      dispatch(loadFromLocalStorageAction(savedData));
    }
  }, [dispatch]);

  // Subscribe to store changes and save to localStorage
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      saveToLocalStorage(state.listing);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/subscription" replace />} />
          <Route
            path="/location"
            element={<PlaceholderPage title="Location" description="Add your vehicle location" />}
          />
          <Route
            path="/about"
            element={<PlaceholderPage title="About" description="Tell us about your vehicle" />}
          />
          <Route
            path="/features"
            element={<PlaceholderPage title="Features" description="Select your vehicle features" />}
          />
          <Route
            path="/rules"
            element={<PlaceholderPage title="Rules" description="Set your rental rules" />}
          />
          <Route
            path="/pricing"
            element={<PlaceholderPage title="Pricing" description="Set your pricing" />}
          />
          <Route
            path="/promotion"
            element={<PlaceholderPage title="Promotion" description="Add promotional offers" />}
          />
          <Route
            path="/pictures"
            element={<PlaceholderPage title="Pictures" description="Upload vehicle photos" />}
          />
          <Route
            path="/insurance"
            element={<PlaceholderPage title="Insurance" description="Select insurance options" />}
          />
          <Route path="/subscription" element={<SubscriptionPlan />} />
          <Route
            path="/device"
            element={<PlaceholderPage title="Device" description="Set up your device" />}
          />
          <Route
            path="/easy-access"
            element={<PlaceholderPage title="Easy Access" description="Configure easy access" />}
          />
        </Routes>
      </MainLayout>
    </Router>
  );
};

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;

