import { Slide } from '@mui/material';
import React from 'react';

/**
 * obtiene la funcion de transicion del Slide que se usa en elementos como dialogos.
 * @constant Transition
 */
export const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});
