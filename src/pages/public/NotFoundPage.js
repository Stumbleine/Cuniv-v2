import { ArrowBack } from '@mui/icons-material';
import { Button, Container, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
	return (
		<Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'center' }}>
			<Box>
				<Button
					sx={{ laignItems: 'start', my: 2 }}
					component={Link}
					to="/"
					startIcon={<ArrowBack></ArrowBack>}>
					Inicio
				</Button>
				<Stack spacing={3} alignItems="center" maxWidth="lg">
					<img
						src="/svgs/404.svg"
						alt="404-image"
						style={{ width: '50%', height: 'auto' }}
					/>
					<Box sx={{ textAlign: 'center', maxWidth: 450 }}>
						<Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
							Pagina no encontrada
						</Typography>
						<Typography color="textSecondary">
							Lo sentimos, no pudimos encontrar la página que está buscando.
							¿Quizás has escrito mal el URL? Asegúrese de revisar su
							ortografía.
						</Typography>
					</Box>
					<img
						src="/svgs/resource404.svg"
						alt="resource"
						style={{ width: '100%', height: 'auto' }}
					/>
				</Stack>
			</Box>
		</Container>
	);
}

export default NotFoundPage;
