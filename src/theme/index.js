import { createTheme } from '@mui/material/styles';
import { grey, orange, red, blue } from '@mui/material/colors';

export const lightTheme = createTheme({
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
		divider: 'rgba(30,30,30,0.30)',
	},
	typography: {
		fontFamily: "'Open Sans', sans-serif",
	},
});
