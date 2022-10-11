// ----------------------------------------------------------------------

export default function Input(theme) {
	return {
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					'& .MuiOutlinedInput-notchedOutline': {
						borderColor: theme.palette.grey[500_32],
					},
					'&.Mui-disabled': {
						'& .MuiOutlinedInput-notchedOutline': {
							borderColor: theme.palette.action.disabledBackground,
						},
					},
					// color: theme.palette.text.secondary,
					borderRadius: 12,
				},
			},
		},
	};
}
