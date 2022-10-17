import { ExpandMore } from '@mui/icons-material';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Avatar,
	Card,
	Divider,
	Stack,
	Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import moment from 'moment';
import React from 'react';
import StatusLabel from '../StatusLabel';
/**
 * Tarjeta de reclamo que muestra informacion del reclamo, con la foto del estudiante, info de oferta y empresa a la que pertenecese
 *
 * @component Complaint
 * @property {Object} complaint datos del reclamo que incluyen datos de ka enoresa, estudiante y oferta
 * @exports Complaint
 */
export default function Complaint({ complaint }) {
	const [expanded, setExpanded] = React.useState(false);
	/**
	 *  Cambia el estado expanded, que se usa para abrir o cerrar el acordion que muestra informacion de la emrpresa y oferta
	 * @function handleEditBranch
	 */
	const handleChange = () => {
		setExpanded(!expanded);
	};
	return (
		<Card sx={{ p: 2 }}>
			<Stack spacing={1} sx={{ mb: 1 }}>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						mb: 1,
					}}>
					<Box display="flex" sx={{ alignItems: 'center' }}>
						<Avatar src={complaint?.student?.picture} />
						<Box sx={{ ml: 2 }}>
							<Typography sx={{ fontWeight: 'bold' }}>
								{complaint?.student.names}
							</Typography>
							<Typography color="textSecondary" variant="body2">
								{moment(complaint?.date).format('LL')}
							</Typography>
						</Box>
					</Box>
					<Box sx={{ p: 1, px: 2, background: grey[200], borderRadius: 10 }}>
						<Typography variant="body2" sx={{ fontWeight: 'bold' }}>
							{complaint?.type}
						</Typography>
					</Box>
				</Box>
				<Typography color="textSecondary">{complaint?.description}</Typography>
			</Stack>

			<Accordion
				sx={{ py: 0 }}
				disableGutters
				elevation={0}
				expanded={expanded}
				onChange={handleChange}>
				<AccordionSummary
					sx={{ color: 'textSecondary', p: 0 }}
					expandIcon={<ExpandMore color="textSecondary" />}>
					<Typography color="textSecondary">Mas detalles</Typography>
				</AccordionSummary>
				<AccordionDetails sx={{ p: 0 }}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'start',
							justifyContent: 'space-around',
						}}>
						<Stack
							sx={{ width: '49%', p: 1, px: 2, background: grey[200], borderRadius: 2 }}>
							<Typography variant="body2" color="textSecondary">
								Oferta:{' '}
							</Typography>
							<Divider />
							<Typography sx={{ fontWeight: 'bold', mt: 1 }}>
								{complaint?.offer}{' '}
							</Typography>
							<Typography color="textSecondary" sx={{ mb: 0.5 }}>
								Descuento: {complaint?.offer_discount}
							</Typography>
							<StatusLabel status={complaint?.offer_status} />
						</Stack>
						<Stack
							direction="column"
							sx={{
								width: '49%',
								p: 1,
								px: 2,
								background: grey[200],
								borderRadius: 2,
							}}>
							<Typography variant="body2" color="textSecondary">
								Empresa:{' '}
							</Typography>
							<Divider />
							<Typography sx={{ fontWeight: 'bold', mt: 1 }}>
								{complaint?.companie}{' '}
							</Typography>
							<Typography color="textSecondary">{complaint?.companie_phone}</Typography>
							<Typography color="textSecondary" noWrap>
								{complaint?.companie_email}
							</Typography>
						</Stack>
					</Box>
				</AccordionDetails>
			</Accordion>
		</Card>
	);
}
