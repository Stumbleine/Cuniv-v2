import {
	Box,
	Checkbox,
	FormControlLabel,
	InputLabel,
	Stack,
	Typography,
} from '@mui/material';
import React, { useEffect } from 'react';

export default function CheckFrequency({ handleFrequency }) {
	const frequencies = [
		{ id: 1, time: 'unlimited', label: 'ilimitado' },
		{ id: 2, time: 'one', label: 'una vez' },
		{ id: 3, time: 'without', label: 'sin canje' },
	];
	// const [isChecked, setIsChecked] = React.useState(frequencies.slice().fill(false));
	const [isChecked, setIsChecked] = React.useState([true, false]);

	const toggleCheckboxValue = (index, e) => {
		console.log(isChecked);
		setIsChecked(isChecked.map((v, i) => (i === index ? !v : false)));
	};

	return (
		<Box sx={{ width: '100%' }}>
			<Typography sx={{ fontWeight: 'bold' }}>Frecuencia de canje</Typography>
			<InputLabel sx={{ mb: 1 }}>
				Seleccione cuantas veces un universitario puede canjear la oferta.
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
