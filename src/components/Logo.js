import { Link } from 'react-router-dom';

export default function Logo() {
	return (
		<Link to="/" style={{ textDecoration: 'none' }}>
			<img src="/svgs/logo.svg" style={{ width: 170, height: 'auto' }} />
		</Link>
	);
}
