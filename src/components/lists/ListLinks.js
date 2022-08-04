import { Edit, Language } from '@mui/icons-material';
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
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSiteAsync, getSitesAsync } from '../../store/umssSlice';
import DeleteDialog from '../dialogs/DeleteDialog';
import EditLink from '../dialogs/EditLink';
import SkeletonList from '../skeletons/SkeletonList';

export default function ListLinks() {
	const { accessToken } = useSelector(state => state.login);
	const { webSites, isLoading } = useSelector(state => state.umss);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getSitesAsync(accessToken));
	}, []);

	const deleteAsync = async id => {
		return await dispatch(deleteSiteAsync(accessToken, id));
	};
	return (
		<List>
			{webSites ? (
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
								<EditLink link={ws} />
								<DeleteDialog deleteAsync={deleteAsync} id={ws.id} itemName="Link" />
							</ListItemIcon>
						</ListItem>
						{index !== webSites.length - 1 && (
							<Divider variant="inset" sx={{ mr: 2 }} component="li" />
						)}
					</React.Fragment>
				))
			) : isLoading ? (
				<SkeletonList iteration={6} />
			) : (
				<Typography align="center">No existen links registrados</Typography>
			)}
		</List>
	);
}
