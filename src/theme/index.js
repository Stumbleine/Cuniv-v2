import { createTheme, alpha } from '@mui/material/styles';
import { grey, orange, red, blue } from '@mui/material/colors';
import componentsOverride from './overrides';

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
			icon: '#003770',
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
		// grey: GREY,
		divider: 'rgba(30,30,30,0.30)',
	},
	typography: {
		fontFamily: "'Open Sans', sans-serif",
	},
	shape: {
		borderRadius: 8,
	},
});
export const darkTheme = createTheme({
	mode: 'dark',
	palette: {
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
			primary: grey[900],
			secondary: grey[800],
			disabled: grey[600],
			icon: grey[600],
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
		// grey: GREY,
		divider: 'rgba(30,30,30,0.30)',
	},
	typography: {
		fontFamily: "'Open Sans', sans-serif",
	},
	shape: {
		borderRadius: 8,
	},
});
lightTheme.components = componentsOverride(lightTheme);
darkTheme.components = componentsOverride(darkTheme);
