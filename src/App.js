import { BrowserRouter } from 'react-router-dom';
import Router from './routes';

import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { lightTheme } from './theme';
import 'moment/locale/es';
import moment from 'moment';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';
/**
 * Componente principal del proyecto.
 * Aplica las rutas de la aplicacion, con los tags BrowserRouter y Router (aqui se encuentran la declaracion de rutas)
 * Provee el theme a todo el proyecto con los tags ThemeProvider y CssBaseline
 * @component
 */
function App() {
	useEffect(() => {
		/**
		 * Configura e iniciar el API de google para usarlo en los componentes <GoogleLogin/> con los clientes id
		 * @function
		 */
		const initClient = () => {
			gapi.client.init({
				clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
				scope: '',
			});
		};
		gapi.load('client:auth2', initClient);
	});
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
