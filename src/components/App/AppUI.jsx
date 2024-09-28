import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '../../hooks/useNavigation'; // Importa AppRoutes y el hook de navegación

function AppUI() {
    return (
        <div>
            <AppRoutes /> {/* Renderiza las rutas aquí */}
        </div>
    );
}

// Envolver AppUI dentro de BrowserRouter
function Main() {
    return (
        <BrowserRouter>
            <AppUI />
        </BrowserRouter>
    );
}

export { Main as AppUI };
