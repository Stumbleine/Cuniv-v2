import { BrowserRouter, Outlet } from 'react-router-dom';
import Router from './routes';

import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { darkTheme, lightTheme } from './theme';
import { useSelector } from 'react-redux';
function App() {
	const mode = useSelector((state) => state.setting.theme.mode);
	return (
		<BrowserRouter>
			<ThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>
				<CssBaseline></CssBaseline>

				<Router />
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
