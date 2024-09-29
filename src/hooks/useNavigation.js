// useNavigation.js
import { useNavigate, useRoutes } from 'react-router-dom';
import Loggin from '../components/Loggin/Loggin';
import SignUp from '../components/SignUp/SignUp';
import Home from '../components/Landing/Landing';
import GraficaGastos from '../components/Monitoreo/GraficaGastos/GraficaGastos';

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
        { path: '/prueba', element: <GraficaGastos /> },
        { path: '/loggin', element: <Loggin /> },
        { path: '/sign-up', element: <SignUp /> },
        { path: '/', element: <Home /> },
    ]);
};
