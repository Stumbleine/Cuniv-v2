import React, { useEffect } from 'react';

function StaticsPage() {
	useEffect(() => {
		document.title = 'cuniv | estadisticas';
	}, []);
	return <div>StaticsPage</div>;
}

export default StaticsPage;
