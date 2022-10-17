import { createTheme } from '@mui/material/styles';
import { grey, orange, red, blue } from '@mui/material/colors';
import componentsOverride from './overrides';
/**
 * Configuracion del tema de MUI, con valores personalizados
 * @constant lightTheme
 * @exports lightTheme
 */
export const lightTheme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#003770',
			light: blue[200],
		},
		secondary: {
			main: '#E30613',
		},
		background: {
			paper: '#fff',
			default: grey[100],
		},
		text: {
			title: '#E95C64',
			primary: '#003770',
			secondary: '#547290',
			terciario: '#3A3A3A',
			disabled: 'rgba(0,0,0,0.6)',
			icon: '#547290',
		},
		warning: {
			main: orange[800],
			light: orange[500],
		},
		error: {
			main: red[700],
			light: red[400],
			delete: red[200],
		},
	},
	typography: {
		fontFamily: "'Open Sans', sans-serif",
	},
	shape: {
		borderRadius: 8,
	},
});

lightTheme.components = componentsOverride(lightTheme);
