import { Language, Warning } from '@mui/icons-material';
import {
	Avatar,
	Divider,
	List,
	ListItem,
	ListItemAvatar,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSiteAsync } from '../../store/umssSlice';
import DeleteItem from '../dialogs/DeleteItem';
import EditLink from '../dialogs/EditLink';
import SkeletonList from '../skeletons/SkeletonList';
/**
 * Componente lista para mostrar los links agregados
 * @component ListLinks
 * @property {Function} handleSnack llama al componente snackbar (alerta)
 * @exports ListLinks
 */
export default function ListLinks({ handleSnack }) {
	const { accessToken } = useSelector(state => state.login);
	const { webSites, isLoadingL, filterLoadingL, fetchFailedL } = useSelector(
		state => state.umss
	);
	const dispatch = useDispatch();
	/**
	 * Realiza dispatch hacia la peticion deleteSiteAsync para eliminar un link
	 * @function deleteAsync
	 * @param {Number} id identificador del link
	 */
	const deleteAsync = id => {
		/**
		 * @function {async} delet
		 */
		const delet = async () => {
			await dispatch(deleteSiteAsync(accessToken, id));
		};
		delet()
			.then(r => {
				handleSnack('Link eliminado exitosamente', 'success');
			})
			.catch(e => {
				handleSnack('Algo salio, vuelva a intentarlo', 'error');
			});
	};
	return (
		<List>
			{filterLoadingL ? (
				<SkeletonList iteration={6} />
			) : webSites ? (
				webSites.map((ws, index) => (
					<React.Fragment key={index}>
						<ListItem>
							<ListItemAvatar>
								<Avatar src={ws.image}>
									<Language />
								</Avatar>
							</ListItemAvatar>
							<ListItemText
								sx={{
									overflowX: 'hidden',
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',
								}}
								primary={ws.title}
								secondary={
									<React.Fragment>
										<Typography
											display={'block'}
											color="textSecondary"
											component="a"
											href={ws.url}>
											{ws.url}
										</Typography>
										<Typography
											component="span"
											sx={{ fontStyle: 'italic', color: 'text.title' }}>
											prioridad: {ws.priority}
										</Typography>
									</React.Fragment>
								}
							/>
							<ListItemIcon>
								<EditLink link={ws} handleSnack={handleSnack} />
								<DeleteItem deleteAsync={deleteAsync} id={ws.id} itemName="Link" />
							</ListItemIcon>
						</ListItem>
						{index !== webSites.length - 1 && (
							<Divider variant="inset" sx={{ mr: 2 }} component="li" />
						)}
					</React.Fragment>
				))
			) : (
				isLoadingL && <SkeletonList iteration={6} />
			)}
			{!webSites && !isLoadingL && !fetchFailedL && (
				<Typography align="center">No se econtraron links</Typography>
			)}
			{fetchFailedL && (
				<Box
					width={1}
					sx={{ py: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<Warning color="error" sx={{ mr: 2 }} />

					<Typography textAlign="center" color="error">
						Error del servidor
					</Typography>
				</Box>
			)}
		</List>
	);
}
