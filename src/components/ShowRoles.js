import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function ShowRoles() {
	const {
		user: { roles },
	} = useSelector(state => state.user);
	const [show, setShow] = useState([]);
	useEffect(() => {
		const showRoles = () => {
			const res = [];
			roles.forEach(element => {
				res.push(element.label);
			});
			let s = res[0];
			if (res.length > 1) {
				for (let i = 1; i < res.length; i++) {
					s = s + '/' + res[i];
				}
			}
			return s;
		};
		setShow(showRoles());
	}, [roles]);

	return (
		<Box>
			<Typography color="textSecondary" sx={{ textAlign: 'end', fontStyle: 'italic' }}>
				{roles.length > 1 ? 'Roles: ' : 'Rol: '}
				{show}
			</Typography>
		</Box>
	);
}

export default ShowRoles;
