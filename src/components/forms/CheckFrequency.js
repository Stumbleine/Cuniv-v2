import {
	Box,
	Checkbox,
	FormControlLabel,
	InputLabel,
	Stack,
	Typography,
} from '@mui/material';
import React from 'react';
/**
 * Formulario Checkbox para elegir la frecuencia de canje de una oferta, tiene 3 opciones
 * ilimitado, una vez, sin canje
 * @component CheckFrequency
 * @property {Function} handleFrequency asigna la opcion escogida a un estado en el componente padre.
 * @property {String} [fr] atributo escogido inicialmente, el form se mostrara con esta opcion escogida.
 * @exports CheckFrequency
 */
export default function CheckFrequency({ handleFrequency, fr }) {
	let frDefault = [true, false, false];
	if (fr !== null) {
		if (fr === 'no-redeem') {
			frDefault = [false, false, true];
		}
		if (fr === 'one') {
			frDefault = [false, true, false];
		}
	}
	const frequencies = [
		{ id: 1, time: 'unlimited', label: 'Ilimitado' },
		{ id: 2, time: 'one', label: 'Una vez' },
		{ id: 3, time: 'no-redeem', label: 'Sin canje' },
	];

	const [isChecked, setIsChecked] = React.useState(frDefault);
	/**
	 * Actualiza el arreglo de checks con la opcion escogida visualmente.
	 * @function toggleCheckboxValue
	 */
	const toggleCheckboxValue = (index, e) => {
		setIsChecked(isChecked.map((v, i) => (i === index ? !v : false)));
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Typography sx={{ fontWeight: 'bold' }}>Frecuencia de canje</Typography>
			<InputLabel sx={{ mb: 1 }}>
				Seleccione la cantidad de veces que puede ser canjeado la oferta.
			</InputLabel>
			<Stack direction="row">
				{frequencies.map((item, index) => (
					<FormControlLabel
						control={<Checkbox />}
						key={index}
						value={item.time}
						checked={isChecked[index]}
						onChange={handleFrequency}
						onClick={() => {
							toggleCheckboxValue(index);
						}}
						label={item.label}
					/>
				))}
			</Stack>
		</Box>
	);
}
