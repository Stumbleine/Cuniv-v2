// ----------------------------------------------------------------------

export default function Card(theme) {
	return {
		MuiCard: {
			defaultProps: {
				elevation: 10,
			},
			styleOverrides: {
				root: {
					borderRadius: Number(theme.shape.borderRadius) * 2,
					position: 'relative',
					zIndex: 0, // Fix Safari overflow: hidden with border radius
				},
			},
		},
		MuiCardHeader: {
			defaultProps: {
				titleTypographyProps: { variant: 'h6' },
				subheaderTypographyProps: { variant: 'body2' },
			},
			styleOverrides: {
				root: {
					padding: theme.spacing(3, 3, 0),
				},
			},
		},
		MuiCardContent: {
			styleOverrides: {
				root: {
					padding: theme.spacing(1),
					// paddingTop: theme.spacing(1.2),
				},
			},
		},
		MuiCardAction: {
			styleOverrides: {
				root: {
					padding: theme.spacing(0.5),
					// paddingTop: theme.spacing(1.2),
				},
			},
		},
	};
}
