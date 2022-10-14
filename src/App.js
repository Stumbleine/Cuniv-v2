import { BrowserRouter } from 'react-router-dom';
import Router from './routes';

import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { lightTheme } from './theme';
import 'moment/locale/es';
import moment from 'moment';

/**
 * Componente principal del proyecto.
 * Aplica las rutas de la aplicacion, con los tags BrowserRouter y Router (aqui se encuentran la declaracion de rutas)
 * Provee el theme a todo el proyecto con los tags ThemeProvider y CssBaseline
 * @component
 */
function App() {
	/** configruacion de la libreria moment para el lenguaje español */
	moment.locale('es');
	return (
		<BrowserRouter>
			<ThemeProvider theme={lightTheme}>
				<CssBaseline></CssBaseline>
				<Router />
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
