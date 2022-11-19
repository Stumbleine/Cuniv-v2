import {
	Facebook,
	Instagram,
	LinkedIn,
	Telegram,
	Twitter,
	YouTube,
} from '@mui/icons-material';
import { Container, IconButton, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';
/**
 * Footer que muestra los datos de la Universidad, anlcado siempre a la parte inferior
 * @component Footer
 * @exports Footer
 */
export default function Footer() {
	return (
		<Box
			component="footer"
			sx={{
				background: '#0a1928',
				position: 'absolute',
				bottom: 0,
				width: '100%',
				py: 0.5,
				// display: 'flex',
				// justifyContent: 'center',
			}}>
			<Container
				maxWidth="xl"
				sx={{
					alignItems: 'center',
					display: 'flex',
					flexDirection: { xs: 'column-reverse', md: 'row' },
				}}>
				<Stack direction="row" spacing={1} sx={{ flexGrow: 1, alignItems: 'center' }}>
					<Box component="img" src="/imgs/umss.png" sx={{ height: 30 }} />
					<Typography
						variant="body2"
						component="span"
						display="inline-flex"
						sx={{ color: grey[200] }}>
						DERECHOS RESERVADOS &copy; 2022 ·
						<Typography
							variant="body2"
							component={'a'}
							href="https://www.umss.edu.bo/"
							target="blank"
							sx={{
								textDecorationLine: 'underline',
								fontWeight: 'bold',
								ml: 0.5,
								color: grey[200],
							}}>
							UNIVERSIDAD MAYOR DE SAN SIMÓN
						</Typography>
					</Typography>
				</Stack>
				<Stack direction="row" alignItems="center">
					<Typography color={grey[200]} fontWeight="bold" sx={{ mr: 1 }}>
						Visitanos en nuestras RRSS
					</Typography>
					<IconButton
						onClick={() => window.open('https://www.facebook.com/UmssBolOficial/')}>
						<Facebook
							sx={{
								color: grey[200],
							}}
						/>
					</IconButton>
					<IconButton onClick={() => window.open('https://twitter.com/UmssBolOficial')}>
						<Twitter
							sx={{
								color: grey[200],
							}}
						/>
					</IconButton>
					<IconButton
						onClick={() =>
							window.open('https://www.instagram.com/umssboloficial/', 'blank')
						}>
						<Instagram
							sx={{
								color: grey[200],
							}}
						/>
					</IconButton>

					<IconButton
						onClick={() =>
							window.open('https://www.linkedin.com/school/umssboloficial/mycompany/')
						}>
						<LinkedIn
							sx={{
								color: grey[200],
							}}
						/>
					</IconButton>
					<IconButton
						onClick={() =>
							window.open('https://www.youtube.com/c/UniversidadMayordeSanSimonOficial')
						}>
						<YouTube
							sx={{
								color: grey[200],
							}}
						/>
					</IconButton>
					<IconButton onClick={() => window.open('https://t.me/UmssBolOficial')}>
						<Telegram
							sx={{
								color: grey[200],
							}}
						/>
					</IconButton>
				</Stack>
			</Container>
		</Box>
	);
}
