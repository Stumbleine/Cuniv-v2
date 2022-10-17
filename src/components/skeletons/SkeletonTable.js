import { Skeleton, TableCell, TableRow } from '@mui/material';
/**
 * Esqueleto para componentes lista con animacion de olas, sirve para indicar que los datos se estan cargando
 * @component SkeletonList
 * @property {Number} head indica la cantidad columnas a mostrar en el esqueleto
 * @exports SkeletonList
 */
export default function SkeletonTable({ head }) {
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
