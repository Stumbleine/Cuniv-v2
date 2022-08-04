// ----------------------------------------------------------------------

export default function Paper(theme) {
	return {
		MuiPaper: {
			defaultProps: {
				// elevation: 0,
				// padding: theme.spacing(2),
			},

			styleOverrides: {
				root: {
					backgroundImage: 'none',
					borderRadius: 2,
				},
			},
		},
	};
}
