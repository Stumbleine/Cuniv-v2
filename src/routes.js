import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useRoutes } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import AccountProfile from './pages/AccountProfile';
import ComplaintPage from './pages/admin/ComplaintPage';
import CreateRolepage from './pages/admin/CreateRolepage';
import CreateUserpage from './pages/admin/CreateUserpage';
import LocationsPage from './pages/admin/LocationsPage';
import WebLinksPage from './pages/admin/WebLinksPage';
import CompanieProfile from './pages/CompanieProfile';
import CreateOfferPage from './pages/CreateOfferPage';
import CreateSupplierCompanyPage from './pages/CreateSupplierCompanyPage';
import EditCompaniePage from './pages/EditCompaniePage';
import HomePage from './pages/HomePage';
import OffersPage from './pages/OffersPage';
import ProductsPage from './pages/ProductsPage';
import ForgotPassword from './pages/public/ForgotPassword';
import LandingPage from './pages/public/LandingPage';
import LoginPage from './pages/public/LoginPage';
import NotFoundPage from './pages/public/NotFoundPage';
import RegisterPage from './pages/public/RegisterPage';
import RedeemPage from './pages/RedeemPage';
import RubrosPage from './pages/RubrosPage';
import Security from './pages/Security';
import StaticsPage from './pages/StaticsPage';
import SupplierCompaniesPage from './pages/SupplierCompaniesPage';
import UsersPage from './pages/UsersPage';
import { construct, hasPrivilege } from './Utils/RBAC';

export default function Router() {
	const isAuth = useSelector(state => state.login.isAuth);
	const { user } = useSelector(state => state.user);

	const permissions = user?.permisos || [];
	return useRoutes([
		{
			path: '/',
			element: <AuthLayout />,
			children: [
				{
					path: '/',
					element: isAuth ? (
						<Navigate to="/main/home" replace />
					) : (
						<Navigate to="/index" replace />
					),
				},
				{
					path: 'index',
					element:
						isAuth === false ? <LandingPage /> : <Navigate to="/main/home" replace />,
				},

				{
					path: 'login',
					element:
						isAuth === false ? <LoginPage /> : <Navigate to="/main/home" replace />,
				},
				{
					path: 'register',
					elhement:
						isAuth === false ? <RegisterPage /> : <Navigate to="/main/home" replace />,
				},
				{
					path: 'forgot-password',
					element:
						isAuth === false ? <ForgotPassword /> : <Navigate to="/main/home" replace />,
				},
			],
		},
		// private routes
		{
			path: 'main',
			element: isAuth ? <DashboardLayout /> : <Navigate to="/" replace />,
			children: [
				{
					path: 'home',
					element: isAuth ? <HomePage /> : <Navigate to="/" replace />,
				},
				{
					path: 'offers',
					element: construct(
						['listar ofertas', 'gestionar ofertas'],
						<OffersPage />,
						permissions
					),
				},
				{
					path: 'createOffer',
					element: construct(
						['crear oferta', 'gestionar ofertas'],
						<CreateOfferPage />,
						permissions
					),
				},
				{
					path: 'products',
					element: construct(
						['gestionar productos', 'listar productos', 'crear producto'],
						<ProductsPage />,
						permissions
					),
				},
				{
					path: 'supplierCompanies',
					element: construct(
						['gestionar empresas', 'listar empresas'],
						<SupplierCompaniesPage />,
						permissions
					),
				},
				{
					path: 'supplierCompanies/:idCompanie',
					element: construct(
						['gestionar empresas', 'perfil de empresa'],
						<CompanieProfile />,
						permissions
					),
				},
				{
					path: 'profileCompanie',
					element: !hasPrivilege(['gestionar empresas'], permissions) ? (
						construct(['perfil de empresa'], <CompanieProfile />, permissions)
					) : (
						<Navigate to="/error/404" replace />
					),
				},
				{
					path: 'registerCompanie',
					element: construct(
						['gestionar empresas', 'crear empresa'],
						<CreateSupplierCompanyPage />,
						permissions
					),
				},
				{
					path: 'updateCompanie',
					element: <EditCompaniePage />,
				},
				{
					path: 'rubros',
					element: construct(
						['gestionar rubros', 'listar rubros'],
						<RubrosPage />,
						permissions
					),
				},
				{
					path: 'users',
					element: construct(
						['gestionar usuarios', 'listar usuarios'],
						<UsersPage />,
						permissions
					),
				},
				{
					path: 'createUser',
					element: construct(
						['crear usuario', 'gestionar usuarios'],
						<CreateUserpage />,
						permissions
					),
				},
				{
					path: 'createRole',
					element: construct(['gestionar roles'], <CreateRolepage />, permissions),
				},
				{
					path: 'statics',
					element: construct(['estadisticas'], <StaticsPage />, permissions),
				},
				{
					path: 'redeem',
					element: construct(['cajero'], <RedeemPage />, permissions),
				},
				{
					path: 'locations',
					element: construct(['gestionar locaciones'], <LocationsPage />, permissions),
				},
				{
					path: 'links',
					element: construct(['gestionar links'], <WebLinksPage />, permissions),
				},
				{
					path: 'complaints',
					element: construct(['gestionar reclamos'], <ComplaintPage />, permissions),
				},
				{
					path: 'security',
					element: construct(['cuenta'], <Security />, permissions),
				},
				{
					path: 'profile',
					element: construct(['cuenta'], <AccountProfile />, permissions),
				},
			],
		},
		// not found
		{
			path: '/error',
			element: <LogoOnlyLayout />,
			children: [
				{ path: '404', element: <NotFoundPage /> },
				{ path: 'unauthorized', element: <NotFoundPage /> },
				{ path: '*', element: <Navigate to="/error/404" replace /> },
			],
		},
		{ path: '*', element: <Navigate to="/error/404" replace /> },
	]);
}
