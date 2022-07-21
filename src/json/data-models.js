// get userInfo o userData with accessToken: informacion de usuario
const userInfo = {
	nombres: 'Cristhian',
	apellidos: 'Mercado Cespedes',
	email: 'wcosmoswaves@gmail.com',
	picture: 'imageb64',
	accessToken: 'hash accessToken',
	roles: [
		{ rol: 'ADM', label: 'Administrador', isAdmin: true },
		{ rol: 'PRV', label: 'Proveedor', isAdmin: false },
	],
	permisos: [
		'gestionar productos',
		'gestionar ofertas',
		'gestionar usuarios',
		'gestionar rubros',
	],
  empresa: 4,
          
};

// get: listar-ofertas
