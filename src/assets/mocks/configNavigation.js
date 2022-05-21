import { ReactComponent as Home } from '../icons/nav/Home.svg';
import { ReactComponent as Empresas } from '../icons/nav/Empresas.svg';
import { ReactComponent as Productos } from '../icons/nav/Inventario.svg';
import { ReactComponent as Logout } from '../icons/nav/Logout.svg';
import { ReactComponent as Ofertas } from '../icons/nav/Descuentos.svg';
import { Analytics, Group } from '@mui/icons-material';
export const adminNavigation = [
	{
		text: 'Inicio',
		path: 'home',
		icon: (
			<Home
				style={{
					marginRight: '20px',
					width: 24,
					height: 24,
					color: 'text.primary',
				}}
			/>
		),
	},
	{
		text: 'Ofertas',
		path: 'offers',
		icon: (
			<Ofertas
				style={{
					marginRight: '20px',
					width: 24,
					height: 24,
					color: 'text.primary',
				}}
			/>
		),
	},
	{
		text: 'Productos',
		path: 'products',
		icon: (
			<Productos
				style={{
					marginRight: '20px',
					width: 24,
					height: 24,
					color: 'text.primary',
				}}
			/>
		),
	},
	{
		text: 'Empresas',
		path: 'supplierCompanies',
		icon: (
			<Empresas
				style={{
					marginRight: '20px',
					width: 24,
					height: 24,
					color: 'text.primary',
				}}
			/>
		),
	},
	{
		text: 'Rubros',
		path: 'rubros',
		icon: (
			<Empresas
				style={{
					marginRight: '20px',
					width: 24,
					height: 24,
					color: 'text.primary',
				}}
			/>
		),
	},
	{
		text: 'Estadisticas',
		path: 'statics',
		icon: (
			<Analytics
				sx={{
					mr: '20px',
					width: 24,
					height: 24,
					color: 'text.primary',
				}}
			/>
		),
	},
	{
		text: 'Usuarios',
		path: 'users',
		icon: (
			<Group
				sx={{
					mr: '20px',
					width: 24,
					height: 24,
					color: 'text.primary',
				}}
			/>
		),
	},
];
export const providerNavigation = [
	{
		text: 'Inicio',
		path: 'home',
		icon: (
			<Home
				sx={{
					mr: '20px',
					width: 24,
					height: 24,
					color: 'text.primary',
				}}
			/>
		),
	},
	{
		text: 'Ofertas',
		path: 'offers',
		icon: (
			<Ofertas
				sx={{
					mr: 2,
					width: 24,
					height: 24,
					color: 'text.primary',
				}}
			/>
		),
	},
	{
		text: 'Productos',
		path: 'products',
		icon: (
			<Productos
				sx={{
					mr: 2,
					width: 24,
					height: 24,
					color: 'text.primary',
				}}
			/>
		),
	},
	{
		text: 'MiEmpresa',
		path: 'profileCompanie',
		icon: (
			<Empresas
				sx={{
					mr: 2,
					width: 24,
					height: 24,
					color: 'text.primary',
				}}
			/>
		),
	},
	{
		text: 'Estadisticas',
		path: 'statics',
		icon: (
			<Analytics
				sx={{
					mr: '20px',
					width: 24,
					height: 24,
					color: 'text.primary',
				}}
			/>
		),
	},
];
