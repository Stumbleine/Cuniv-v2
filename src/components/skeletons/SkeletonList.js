import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Skeleton,
	Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function SkeletonList(props) {
	const [cant, setCant] = useState([]);

	// const { iteration } = props;
	// const
	// const i = new Array(10).fill('sad');
	useEffect(() => {
		const a = [];
		// console.log(a, i);
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
