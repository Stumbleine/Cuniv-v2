import { Typography } from '@mui/material';
/**
 * Indica el tamaño de la pantalla en la que se encuentra el usuario, tamano de ventana del navegador.
 * @function screenSizes
 */
export const screenSizes = () => {
	return (
		<>
			<Typography sx={{ display: { xs: 'flex', sm: 'none' }, color: 'secondary.main' }}>
				xs
			</Typography>
			<Typography
				variant="6"
				sx={{
					display: { xs: 'none', sm: 'flex', md: 'none' },
					color: 'secondary.main',
				}}>
				sm
			</Typography>
			<Typography
				sx={{
					display: { xs: 'none', sm: 'none', md: 'flex', lg: 'none' },
					color: 'secondary.main',
				}}>
				md
			</Typography>
			<Typography
				sx={{
					display: {
						xs: 'none',
						sm: 'none',
						md: 'none',
						lg: 'flex',
						xl: 'none',
					},
					color: 'secondary.main',
				}}>
				lg
			</Typography>
			<Typography
				sx={{
					display: {
						xs: 'none',
						sm: 'none',
						md: 'none',
						lg: 'none',
						xl: 'flex',
					},
					color: 'secondary.main',
				}}>
				xl
			</Typography>
		</>
	);
};
