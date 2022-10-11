import { Container } from '@mui/material';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';

import ShowRoles from '../components/ShowRoles';
import Steps from '../components/Steps';
import WarningVerified from '../components/WarningVerified';

function HomePage() {
	const { user } = useSelector(state => state.user);

	return (
		<Container maxWidth="xl">
			<ShowRoles />
			{user?.companieVerified === false && (
				<WarningVerified>¡Su empresa a un no fue verificado!</WarningVerified>
			)}

			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
				}}>
				<Steps />
			</Box>
		</Container>
	);
}

export default HomePage;
