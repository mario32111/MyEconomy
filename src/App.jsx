import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './shared/routes/AppRoutes';
import './index.css';

import { AuthProvider } from './shared/contexts/AuthContext';
function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
