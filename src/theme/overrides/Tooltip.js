/**
 * Personalizacion del componente Tooltip de MUI.
 * @function Tooltip
 * @exports Tooltip
 */
export default function Tooltip(theme) {
	return {
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					backgroundColor: theme.palette.grey[800],
				},
				arrow: {
					color: theme.palette.grey[800],
				},
			},
		},
	};
}
