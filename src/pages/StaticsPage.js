import React, { useEffect } from 'react';

function StaticsPage() {
	useEffect(() => {
		document.title = 'ssansi | estadisticas';
	}, []);
	return <div>StaticsPage</div>;
}

export default StaticsPage;
