import { useNavigate, useRoutes } from 'react-router-dom';
import Loggin from '../components/Loggin/Loggin';
import SignUp from '../components/SignUp/SignUp';
import Home from '../components/Landing/Landing';
import Monitoreo from '../components/Monitoreo/Monitoreo';
import ChatAI from '../components/ChaiAI/ChatAI';
import MetasFinancieras from '../components/MetasFinancieras/MetasFinancieras';
import Control from '../components/Control/Control';
import Cursos from '../components/Cursos/Cursos';
import PricingCards from '../components/CrearPlan/CrearPlan';
import NavBarPrincipal from '../components/NavBarPrincipal/NavBarPrincipal';
import CrearPlan from '../components/CrearPlan/CrearPlan';

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
        { path: '/chatai', element: <ChatAI /> },
        { path: '/monitoreo', element: <Monitoreo /> },
        { path: '/loggin', element: <Loggin /> },
        { path: '/sign-up', element: <SignUp /> },
        { path: '/', element: <Home /> },
        { path: '/metas-financieras', element: <MetasFinancieras /> },
        { path: '/control', element: <Control /> },
        { path: '/cursos', element: <Cursos /> },
        { path: '/crear-plan', element: <CrearPlan /> },
        { path: '/pricing-cards', element: <PricingCards /> },
        { path: '/navbar-principal', element: <NavBarPrincipal /> },
    ]);
};
