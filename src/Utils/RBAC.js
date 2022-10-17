import { Navigate } from 'react-router-dom';
/**
 * Verifica si el permiso(s) existe en los permisos del usuario
 * @function hasPrivilege
 * @param {Array} pArray permisos a verificar
 * @param {Array} userPermissions permisos del usuario
 */
export const hasPrivilege = (pArray, userPermissions) => {
	let res = false;
	for (let i = 0; i < pArray.length; i++) {
		if (userPermissions.includes(pArray[i])) {
			res = true;
		}
	}
	return res;
};
/**
 * Construye los links del sistema autorizados para el usuario, se basa en los permisos que el usuario cuenta.
 * @function getNavlinks
 * @param {Array} userPermissions permisos del usuario
 * @export getNavlinks
 */
export const getNavlinks = userPermissions => {
	const navlinks = [{ name: 'Inicio', path: 'home', icon: 'home' }];
	hasPrivilege(['listar ofertas', 'gestionar ofertas'], userPermissions) &&
		navlinks.push(getLink('Ofertas'));
	hasPrivilege(['listar productos', 'gestionar productos'], userPermissions) &&
		navlinks.push(getLink('Productos'));
	hasPrivilege(['listar empresas', 'gestionar empresas'], userPermissions)
		? navlinks.push(getLink('Empresas'))
		: hasPrivilege(['perfil de empresa'], userPermissions) &&
		  navlinks.push(getLink('Mi Empresa'));

	hasPrivilege(['estadisticas'], userPermissions) &&
		navlinks.push(getLink('Estadisticas'));
	hasPrivilege(['listar usuarios', 'gestionar usuarios'], userPermissions) &&
		navlinks.push(getLink('Usuarios'));
	hasPrivilege(['listar rubros', 'gestionar rubros'], userPermissions) &&
		navlinks.push(getLink('Rubros'));
	// hasPrivilege(['gestionar roles'], userPermissions) && navlinks.push(getLink('Roles'));
	hasPrivilege(['cajero'], userPermissions) && navlinks.push(getLink('Cajero'));
	hasPrivilege(['gestionar reclamos'], userPermissions) &&
		navlinks.push(getLink('Reclamos'));
	hasPrivilege(['gestionar locaciones'], userPermissions) &&
		navlinks.push(getLink('Locaciones'));
	hasPrivilege(['gestionar links'], userPermissions) && navlinks.push(getLink('Links'));

	return navlinks;
};
/**
 * Busca en la lista de links y devuelve un link
 * @function getLink
 * @param {Object} link link, ruta que incluye: name, path y nombre del icono
 */
export const getLink = link => {
	return links.find(l => l.name === link);
};
export const links = [
	{ name: 'Inicio', path: 'home', icon: 'home' }, // all
	{ name: 'Ofertas', path: 'offers', icon: 'offers' }, // listar ofertas
	{ name: 'Productos', path: 'products', icon: 'products' }, // listar productos
	{ name: 'Empresas', path: 'supplierCompanies', icon: 'companies' }, // listar empresas
	{ name: 'Rubros', path: 'rubros', icon: 'rubros' }, // listar rubros o gestionar rubros
	{ name: 'Estadisticas', path: 'statics', icon: 'analytics' }, // estadisticas??
	// only admins
	{ name: 'Locaciones', path: 'locations', icon: 'home' },
	{ name: 'Links', path: 'links', icon: 'home' },
	{ name: 'Reclamos', path: 'complaints', icon: 'home' },
	{ name: 'Usuarios', path: 'users', icon: 'users' }, // listar usuarios
	// only proveedor
	{ name: 'Mi Empresa', path: 'profileCompanie', icon: 'mycompanie' }, // perfil de empresa
	// only Cajero
	{ name: 'Cajero', path: 'cashier', icon: 'redeem' }, // canjear codigo
];
/**
 * Verifica si el usuario tiene los permisos necesarios en su lista de permisos,
 * de ser correcto se devuelve el componente (principalmente pagina) a renderizar en la ruta,
 * caso contrario redirige hacia 404 indicado que no esta autorizado
 * @function construct
 * @param {Array} pArray permisos a verificar
 * @param {Component} component link, ruta que incluye: name, path y nombre del icono
 * @param {Array} userPermissions permisos del usuario
 */
export const construct = (pArray, component, userPermissions) => {
	for (let i = 0; i < pArray.length; i++) {
		if (userPermissions.includes(pArray[i])) {
			return component;
		}
	}
	return <Navigate to="/error/unauthorized" replace />;
};
