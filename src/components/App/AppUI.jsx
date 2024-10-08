import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { AppRoutes } from '../../hooks/useNavigation'; // Importa AppRoutes y el hook de navegación
import NavBarPrincipal from '../NavBarPrincipal/NavBarPrincipal'; // Importa NavBarPrincipal

function AppUI() {
    const location = useLocation(); // Obtiene la ubicación actual

    // Condiciona el renderizado basado en la ruta
    return (
        <>
            {location.pathname === '/' ? (
                <AppRoutes /> // Si la ruta es '/', renderiza solo las rutas
            ) : (
                <NavBarPrincipal>
                    <AppRoutes /> {/* Renderiza las rutas dentro de NavBarPrincipal */}
                </NavBarPrincipal>
            )}
        </>
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
