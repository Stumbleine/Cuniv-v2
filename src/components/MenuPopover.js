import PropTypes from 'prop-types';
// material
import { Popover } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const ArrowStyle = styled('span')(({ theme }) => ({
	[theme.breakpoints.up('sm')]: {
		top: -7,
		zIndex: 1,
		width: 12,
		right: 20,
		height: 12,
		content: "''",

		position: 'absolute',
		borderRadius: '0 0 4px 0',
		transform: 'rotate(-135deg)',
		background: 'black',
		borderRight: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
		borderBottom: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
	},
}));

// ----------------------------------------------------------------------

MenuPopover.propTypes = {
	children: PropTypes.node.isRequired,
	sx: PropTypes.object,
};

export default function MenuPopover({ children, sx, ...other }) {
	return (
		<Popover
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			transformOrigin={{ vertical: 'top', horizontal: 'center' }}
			PaperProps={{
				sx: {
					mt: 6,
					mr: 1,
					overflow: 'inherit',
					background: 'white',
					// boxShadow: (theme) => theme.customShadows.z20,
					// border: (theme) => `solid 1px ${theme.palette.grey[500_8]}`,
					width: 200,
					...sx,
				},
			}}
			{...other}>
			<ArrowStyle className="arrow" />

			{children}
		</Popover>
	);
}
