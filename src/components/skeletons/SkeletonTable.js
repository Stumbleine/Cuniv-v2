import { Skeleton, TableBody, TableCell, TableRow } from '@mui/material';
import React from 'react';

function SkeletonTable(props) {
	const { head } = props;
	return (
		<>
			{[1, 2, 3, 4, 5].map((r, index) => (
				<TableRow key={index}>
					{head.map(e => (
						<TableCell key={e.id}>
							<Skeleton animation="wave" variant="text" />
						</TableCell>
					))}
				</TableRow>
			))}
		</>
	);
}

export default SkeletonTable;
