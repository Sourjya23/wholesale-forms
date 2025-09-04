import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WholesaleRegistrationFormCSS from './components/WholesaleRegistrationFormCSS';
import DistributorRegistrationForm from './components/DistributorRegistrationForm';
import TermsAndConditions from './components/TermsAndConditions';
import Preloader from './components/Preloader';
import './App.css';

function App() {
  const [currentForm, setCurrentForm] = useState('wholesale');
  const [isLoading, setIsLoading] = useState(true);

  const switchForm = (formType) => {
    setCurrentForm(formType);
  };

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  // Show preloader for a minimum time to ensure smooth experience
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Minimum 2 seconds to show preloader

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/" element={
            <>
              {/* Form Navigation */}
              <div style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 1000,
                display: 'flex',
                gap: '10px',
                background: 'rgba(255, 255, 255, 0.95)',
                padding: '10px',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}>
                <button
                  onClick={() => switchForm('wholesale')}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: currentForm === 'wholesale' ? '#10b981' : '#e5e7eb',
                    color: currentForm === 'wholesale' ? 'white' : 'black',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  Wholesale Form
                </button>
                <button
                  onClick={() => switchForm('distributor')}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: currentForm === 'distributor' ? '#10b981' : '#e5e7eb',
                    color: currentForm === 'distributor' ? 'white' : 'black',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  Distributor Form
                </button>
              </div>

              {/* Render Current Form */}
              {currentForm === 'wholesale' ? (
                <WholesaleRegistrationFormCSS />
              ) : (
                <DistributorRegistrationForm />
              )}
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
