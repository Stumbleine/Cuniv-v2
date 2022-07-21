import {
	Box,
	Checkbox,
	FormControlLabel,
	InputLabel,
	Stack,
	Typography,
} from '@mui/material';
import React from 'react';

export default function CheckFrequency({ handleF }) {
	const frequencies = [
		{ id: 2, time: 'unlimited', label: 'ilimitado' },
		{ id: 1, time: 'one', label: 'una vez' },
		{ id: 3, time: 'every_day', label: 'una vez por dia' },
	];
	const [isChecked, setIsChecked] = React.useState(frequencies.slice().fill(false));
	const toggleCheckboxValue = (index, e) => {
		setIsChecked(isChecked.map((v, i) => (i === index ? !v : false)));
	};
	const [frequency, setFrequency] = React.useState({});
	const handleFrequency = event => {
		setFrequency(event.target.value);
		console.log(event.target.value);
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
