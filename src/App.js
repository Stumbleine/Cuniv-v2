import { BrowserRouter, Outlet } from 'react-router-dom';
import Router from './routes';

import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { lightTheme } from './theme';
function App() {
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
