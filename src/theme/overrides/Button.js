// ----------------------------------------------------------------------

export default function Button(theme) {
	return {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
					borderRadius: 12,
				},
				sizeLarge: {
					height: 48,
				},
				// containedInherit: {
				// 	// color: theme.palette.grey[800],
				// 	borderRadius: 10,
				// },

				// outlinedInherit: {
				// 	border: `1px solid ${theme.palette.grey[500_32]}`,
				// 	'&:hover': {
				// 		backgroundColor: theme.palette.action.hover,
				// 	},
				// },
				// textInherit: {
				// 	'&:hover': {
				// 		backgroundColor: theme.palette.action.hover,
				// 	},
				// },
			},
		},
	};
}
