// useNavigation.js
import { useNavigate, useRoutes } from 'react-router-dom';
import Loggin from '../components/Loggin/Loggin';
import SignUp from '../components/SignUp/SignUp';
import Home from '../components/Landing/Landing';
import Monitoreo from '../components/Monitoreo/Monitoreo';
import ChatAI from '../components/ChaiAI/ChatAI';
import MetasFinancieras from '../components/MetasFinancieras/MetasFinancieras';
import ControlDeSuscripciones from '../components/ControlDeSuscripciones/ControlDeSuscripciones'
import Cursos from '../components/Cursos/Cursos';
import PricingCards from '../components/CrearPlan/CrearPlan'
import NavBarPrincipal from '../components/NavBarPrincipal/NavBarPrincipal'

export const useNavigation = () => {
    const navigate = useNavigate();

    // Función para cambiar el path
    const changePath = (path) => {
        navigate(path);
    };

    return { changePath };
};

// Componente para las rutas de la aplicación
export const AppRoutes = () => {
    return useRoutes([
        { path: '/prueba', element: <MetasFinancieras /> },
        { path: '/loggin', element: <Loggin /> },
        { path: '/sign-up', element: <SignUp /> },
        { path: '/', element: <Home /> },
    ]);
};
