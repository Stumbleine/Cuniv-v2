export const isEstudentEmail = email => {
	const array = email.split('@');
	return array[1] === 'est.umss.edu';
};
