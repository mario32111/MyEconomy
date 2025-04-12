import{useNavigate, useRoutes}from'react-router-dom';
import{lazy,Suspense }from'react';

const Loggin=lazy(()=>import('../components/Loggin/Loggin'));
const SignUp=lazy(()=>import('../components/SignUp/SignUp'));
const Home=lazy(()=>import('../components/Landing/Landing'));
const Monitoreo=lazy(()=>import('../components/Monitoreo/Monitoreo'));
const ChatAI=lazy(()=>import('../components/ChaiAI/ChatAI'));
const MetasFinancieras=lazy(()=>import('../components/MetasFinancieras/MetasFinancieras'));
const Control=lazy(()=>import('../components/Control/Control'));
const Cursos=lazy(()=>import('../components/Cursos/Cursos'));
const PricingCards=lazy(()=>import('../components/CrearPlan/CrearPlan'));
const NavBarPrincipal=lazy(()=>import('../components/NavBarPrincipal/NavBarPrincipal'));
const CrearPlan=lazy(()=>import('../components/CrearPlan/CrearPlan'));
const ForgotPassword=lazy(()=>import('../components/ContraOlvidada/ContraOlvidada'));
const ResetPassword=lazy(()=>import('../components/NewPassword/NewPassword'));
const HomePage=lazy(()=>import('../components/HomePage/HomePage'));
const SettingsSection=lazy(()=>import('../components/Settings/Settings'));
const ShoppingSimulator=lazy(()=>import('../components/ShoppingSimulator/ShoppingSimulator'));
const SupportSection=lazy(()=>import('../components/SupportSection/SupportSection'));
const InventoryApp=lazy(()=>import('../components/Inventario/InventoryApp'));
const InterestRateComparison=lazy(()=>import('../components/ComparacionTazas/Comparacion'));
const BudgetPlanner=lazy(()=>import('../components/Presupuesto/BudgetPlanner'));
const IndexLoader=lazy(()=>import('../components/LandingBootstrap/IndexLoader'));
const MicModalWindow=lazy(()=>import('../components/HomePage/MicModal'));

export const useNavigation = () => {
  const navigate = useNavigate();
  return { changePath: navigate };
};

const LoadingSpinner = () => (
    <div>Cargando...</div>
);

export const AppRoutes = () => {
    return useRoutes([
        {path:'/prueba',element:<Suspense fallback={<LoadingSpinner />}><IndexLoader /></Suspense>},
        {path:'/presupuesto',element:<Suspense fallback={<LoadingSpinner />}><BudgetPlanner /></Suspense>},
        {path:'/comparacion-tasas',element:<Suspense fallback={<LoadingSpinner />}><InterestRateComparison /></Suspense>},
        {path:'/inventario',element:<Suspense fallback={<LoadingSpinner />}><InventoryApp /></Suspense>},
        {path:'/soporte',element:<Suspense fallback={<LoadingSpinner />}><SupportSection /></Suspense>},
        {path:'/simulador-compras',element:<Suspense fallback={<LoadingSpinner />}><ShoppingSimulator /></Suspense>},
        {path:'/ajustes',element:<Suspense fallback={<LoadingSpinner />}><SettingsSection /></Suspense>},
        {path:'/Home',element:<Suspense fallback={<LoadingSpinner />}><HomePage MicModalWindow={MicModalWindow}/></Suspense>},
        {path:'/chatai',element:<Suspense fallback={<LoadingSpinner />}><ChatAI /></Suspense>},
        {path:'/monitoreo',element:<Suspense fallback={<LoadingSpinner />}><Monitoreo /></Suspense>},
        {path:'/loggin',element:<Suspense fallback={<LoadingSpinner />}><Loggin /></Suspense>},
        {path:'/sign-up',element:<Suspense fallback={<LoadingSpinner />}><SignUp /></Suspense>},
        {path:'/',element:<Suspense fallback={<LoadingSpinner />}><Home /></Suspense>},
        {path:'/metas-financieras',element:<Suspense fallback={<LoadingSpinner />}><MetasFinancieras /></Suspense>},
        {path:'/control',element:<Suspense fallback={<LoadingSpinner />}><Control /></Suspense>},
        {path:'/cursos',element:<Suspense fallback={<LoadingSpinner />}><Cursos /></Suspense>},
        {path:'/crear-plan',element:<Suspense fallback={<LoadingSpinner />}><CrearPlan /></Suspense>},
        {path:'/pricing-cards',element:<Suspense fallback={<LoadingSpinner />}><PricingCards /></Suspense>},
        {path:'/navbar-principal',element:<Suspense fallback={<LoadingSpinner />}><NavBarPrincipal /></Suspense>},
        {path:'/no-password',element:<Suspense fallback={<LoadingSpinner />}><ForgotPassword /></Suspense>},
        {path:'/new-password',element:<Suspense fallback={<LoadingSpinner />}><ResetPassword /></Suspense>},
    ]);
};