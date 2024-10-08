import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { AppRoutes } from '../../hooks/useNavigation'; // Importa AppRoutes y el hook de navegación
import NavBarPrincipal from '../NavBarPrincipal/NavBarPrincipal'; // Importa NavBarPrincipal

function AppUI() {
    const location = useLocation(); // Obtiene la ubicación actual

    // Condiciona el renderizado basado en la ruta
    return (
        <>
            {location.pathname === '/' || location.pathname === '/loggin' || location.pathname === '/sign-up' ? (
                <AppRoutes /> // Si la ruta es '/', '/loggin' o '/sign-up', renderiza solo las rutas
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
