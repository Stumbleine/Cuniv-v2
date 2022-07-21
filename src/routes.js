import { useRoutes, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import CreateOfferPage from './pages/CreateOfferPage';
import CreateSupplierCompanyPage from './pages/CreateSupplierCompanyPage';
import CreateUserpage from './pages/admin/CreateUserpage';
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
import RedeemPage from './pages/RedeemPage';
import CompanieProfile from './pages/CompanieProfile';
import LandingPage from './pages/public/LandingPage';
import CreateRolepage from './pages/admin/CreateRolepage';
import RubrosPage from './pages/RubrosPage';
export default function Router() {
	const isAuth = useSelector(state => state.login.isAuth);
	const rule = useSelector(state => state.user.rule);
	// useEffect(() => {
	// 	console.log('isAuth=>', isAuth);
	// }, [isAuth]);
	function rbac() {
		console.log('rbac', isAuth, rule);

		if (isAuth === false) {
			return <Navigate to="/index" replace />;
		} else if (isAuth === true && rule === 'ADM') {
			return <Navigate to="/admin/home" replace />;
		} else if (isAuth === true && rule === 'PRV') {
			return <Navigate to="/provider/home" replace />;
		} else if (isAuth === true && rule === 'CJR') {
			return <Navigate to="/cashier/redeem" replace />;
		}
	}
	function rbacLogin() {
		// console.log('rbac', rule);
		if (isAuth === true && rule === 'ADM') {
			return <Navigate to="/admin/home" replace />;
		} else if (isAuth === true && rule === 'PRV') {
			return <Navigate to="/provider/home" replace />;
		} else if (isAuth === true && rule === 'CJR') {
			return <Navigate to="/cashier/redeem" replace />;
		}
		return null;
	}
	const aunthenticated = rol => {
		// console.log(isAuth, rol, rule);
		if (isAuth === true && rule === rol) return true;
	};
	return useRoutes([
		{
			path: '/',
			element: <AuthLayout />,
			children: [
				{
					path: '/',
					element: rbac(),
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
			element: aunthenticated('ADM') ? (
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
					path: 'supplierCompanies/:idEmpresa',
					element: <CompanieProfile />,
				},
				{
					path: 'createSupplierCompanie',
					element: <CreateSupplierCompanyPage />,
				},
				{
					path: 'rubros',
					element: <RubrosPage />,
				},
				{
					path: 'users',
					element: <UsersPage />,
				},
				{ path: 'createUser', element: <CreateUserpage /> },
				{ path: 'createRole', element: <CreateRolepage /> },

				{ path: 'statics', element: <StaticsPage /> },
			],
		},
		{
			path: 'provider',
			element: aunthenticated('PRV') ? (
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
				{ path: 'profileCompanie', element: <CompanieProfile /> },
				{ path: 'registerCompanie', element: <CreateSupplierCompanyPage /> },
				{ path: 'statics', element: <StaticsPage /> },
			],
		},
		{
			path: 'cashier',
			element: aunthenticated('CJR') ? (
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
