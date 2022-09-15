import { BrowserRouter, Outlet } from 'react-router-dom';
import Router from './routes';

import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { darkTheme, lightTheme } from './theme';
import { useSelector } from 'react-redux';
import 'moment/locale/es';
import moment from 'moment';
import { useEffect, useState } from 'react';
function App() {
	moment.locale('es');
	// const mode = useSelector(state => state.setting.theme.mode);
	// useEffect(() => {
	// 	socket.on("web",(data)=>{
	// 		console.log(data)
	// 	})
	// }, [])

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
