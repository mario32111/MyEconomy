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
import ForgotPassword from '../components/ContraOlvidada/ContraOlvidada';
import ResetPassword from '../components/NewPassword/NewPassword';
import HomePage from '../components/HomePage/HomePage';
import SettingsSection from '../components/Settings/Settings';
import ShoppingSimulator from '../components/ShoppingSimulator/ShoppingSimulator';
import SupportSection from '../components/SupportSection/SupportSection';
import InventoryApp from '../components/Inventario/InventoryApp';
import InterestRateComparison from '../components/ComparacionTazas/Comparacion';
import BudgetPlanner from '../components/Presupuesto/BudgetPlanner';
import IndexLoader from '../components/LandingBootstrap/IndexLoader';

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
        { path: '/prueba', element: <IndexLoader /> },
        { path: '/presupuesto', element: <BudgetPlanner /> },
        { path: '/comparacion-tasas', element: <InterestRateComparison /> },
        { path: '/inventario', element: <InventoryApp /> },
        { path: '/soporte', element: <SupportSection /> },
        { path: '/simulador-compras', element: <ShoppingSimulator /> },
        { path: '/ajustes', element: <SettingsSection /> },
        { path: '/Home', element: <HomePage /> },
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
        { path: '/no-password', element: <ForgotPassword /> },
        { path: '/new-password', element: <ResetPassword /> },

    ]);
};
