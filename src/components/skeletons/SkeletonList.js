import { List, ListItem, ListItemIcon, ListItemText, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
/**
 * Esqueleto para componentes lista con animacion de olas, sirve para indicar que los datos se estan cargando
 * @component SkeletonList
 * @property {Number} [iteration] indica la cantidad de esqueletos que se mostraran.
 * @exports SkeletonList
 */

export default function SkeletonList({ iteration }) {
	const [cant, setCant] = useState([1]);

	useEffect(() => {
		const a = [];
		for (let i = 0; i < iteration; i++) {
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
