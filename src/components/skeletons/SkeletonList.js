import { List, ListItem, ListItemIcon, ListItemText, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';

export default function SkeletonList(props) {
	const [cant, setCant] = useState([]);

	useEffect(() => {
		const a = [];
		for (let i = 0; i < props.iteration; i++) {
			a[i] = i;
		}
		setCant(a);
	}, []);

	return (
		<List>
			{cant?.map(index => (
				<ListItem key={index}>
					<ListItemIcon>
						<Skeleton animation="wave" variacnt="circular" width={30} height={50} />
					</ListItemIcon>
					<ListItemText
						primary={<Skeleton animation="wave" variant="text" />}
						secondary={<Skeleton animation="wave" variant="text" />}
					/>
				</ListItem>
			))}
		</List>
	);
}
