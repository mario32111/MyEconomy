import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './shared/routes/AppRoutes';
import './index.css'; // Importar estilos globales


// Importar el contexto de autenticación
import { AuthProvider } from './shared/contexts/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
          <AppRoutes />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;