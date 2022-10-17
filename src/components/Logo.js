import { Link } from 'react-router-dom';
/**
 * Componente Logo del sistema
 * @component Logo
 * @exports Logo
 */
export default function Logo() {
	return (
		<Link to="/" style={{ textDecoration: 'none' }}>
			<img src="/svgs/logo.svg" style={{ width: 170, height: 'auto' }} />
		</Link>
	);
}
