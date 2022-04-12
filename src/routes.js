import { useRoutes, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import CreateOfferPage from './pages/CreateOfferPage';
import CreateSupplierCompanyPage from './pages/CreateSupplierCompanyPage';
import CreateUserpage from './pages/CreateUserpage';
import HomePage from './pages/HomePage';
import OffersPage from './pages/OffersPage';
import ProductsPage from './pages/ProductsPage';
import SupplierCompaniesPage from './pages/SupplierCompaniesPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import StaticsPage from './pages/StaticsPage';
import UsersPage from './pages/UsersPage';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import NotFoundPage from './pages/public/NotFoundPage';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import RedeemPage from './pages/RedeemPage';
import CompanieProfile from './pages/CompanieProfile';
import LandingPage from './pages/public/LandingPage';
export default function Router() {
	const isAuth = useSelector((state) => state.login.isAuth);
	const user = useSelector((state) => state.user.user);
	// useEffect(() => {
	// 	console.log('isAuth=>', isAuth);
	// }, [isAuth]);
	function rbac() {
		// console.log('rbac', user.role);

		if (isAuth === false) {
			return <Navigate to="/index" replace />;
		} else if (isAuth === true && user.role === 'Administrador') {
			return <Navigate to="/admin/home" replace />;
		} else if (isAuth === true && user.role === 'Provider') {
			return <Navigate to="/provider/home" replace />;
		} else if (isAuth === true && user.role === 'Cajero') {
			return <Navigate to="/cashier/redeem" replace />;
		}
	}
	function rbacLogin() {
		// console.log('rbac', user.role);
		if (isAuth === true && user.role === 'Administrador') {
			return <Navigate to="/admin/home" replace />;
		} else if (isAuth === true && user.role === 'Proveedor') {
			return <Navigate to="/provider/home" replace />;
		} else if (isAuth === true && user.role === 'Cajero') {
			return <Navigate to="/cashier/redeem" replace />;
		}
		return null;
	}
	const aunthenticated = (rol) => {
		// console.log(isAuth, rol, user.role);
		if (isAuth === true && user.role === rol) return true;
	};
	return useRoutes([
		{
			path: '/',
			element: <AuthLayout />,
			children: [
				{
					path: '/',
					element: rbac(),
					// isAuth === true && user.role === 'Administrador' ? (
					// 	<Navigate to="/admin/home" replace />
					// ) : (
					// 	<Navigate to="/login" replace />
					// ),
				},
				{
					path: 'index',
					element: isAuth === false ? <LandingPage /> : rbacLogin(),
				},
				{
					path: 'login',
					element: isAuth === false ? <LoginPage /> : rbacLogin(),
				},
				{
					path: 'register',
					element: isAuth === false ? <RegisterPage /> : rbacLogin(),
				},
			],
		},
		{
			path: 'admin',
			element: aunthenticated('Administrador') ? (
				<DashboardLayout />
			) : isAuth ? (
				<Navigate to="/error/404" replace />
			) : (
				<Navigate to="/" replace />
			),
			children: [
				{ path: 'home', element: <HomePage /> },
				{
					path: 'offers',
					element: <OffersPage />,
				},
				{ path: 'createOffer', element: <CreateOfferPage /> },
				{ path: 'products', element: <ProductsPage /> },
				{
					path: 'supplierCompanies',
					element: <SupplierCompaniesPage />,
				},
				{
					path: 'supplierCompanies/:id',
					element: <CompanieProfile />,
				},
				{
					path: 'createSupplierCompanie',
					element: <CreateSupplierCompanyPage />,
				},
				{
					path: 'users',
					element: <UsersPage />,
				},
				{ path: 'createUser', element: <CreateUserpage /> },
				{ path: 'statics', element: <StaticsPage /> },
			],
		},
		{
			path: 'provider',
			element: aunthenticated('Proveedor') ? (
				<DashboardLayout />
			) : isAuth ? (
				<Navigate to="/error/404" replace />
			) : (
				<Navigate to="/" replace />
			),
			children: [
				{ path: 'home', element: <HomePage /> },
				{
					path: 'offers',
					element: <OffersPage />,
				},
				{ path: 'createOffer', element: <CreateOfferPage /> },
				{ path: 'products', element: <ProductsPage /> },

				{ path: 'statics', element: <StaticsPage /> },
			],
		},
		{
			path: 'cashier',
			element: aunthenticated('Cajero') ? (
				<DashboardLayout />
			) : isAuth ? (
				<Navigate to="/error/404" replace />
			) : (
				<Navigate to="/" replace />
			),
			children: [{ path: 'redeem', element: <RedeemPage /> }],
		},
		{
			path: '/error',
			element: <LogoOnlyLayout />,
			children: [
				{ path: '404', element: <NotFoundPage /> },
				{ path: '*', element: <Navigate to="/error/404" replace /> },
			],
		},
		{ path: '*', element: <Navigate to="/error/404" replace /> },
	]);
}
