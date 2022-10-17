import { useState } from 'react';
import {
	MapContainer,
	TileLayer,
	Marker,
	useMapEvents,
	MapConsumer,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
/**
 * Visualizador de mapas de la libreria OpenStretMap
 * @component MapView
 * @property {Function} sendPosition envia las coordenadas elegidas en el mapa
 * @exports MapView
 */
export default function MapView({ sendPosition }) {
	const [position, setPosition] = useState(null);
	const positionDefault = [-17.393862599382608, -66.14674424552783];
	/**
	 * Carga un icono personalizado porque el icono por defecto de Leaftlet no se rederiza
	 * @constant myIcon
	 */
	const myIcon = new L.Icon({
		iconUrl: '/svgs/location.svg',
		iconRetinaUrl: '/svgs/location.svg',
		iconAnchor: [13, 50],
		popupAnchor: [-3, -76],
		shadowUrl: null,
		shadowSize: null,
		shadowAnchor: null,
		iconSize: new L.Point(35, 50),
	});

	return (
		<MapContainer
			style={{ width: '100%', height: '100%' }}
			center={positionDefault}
			scrollWheelZoom={false}
			zoom={13}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<MapConsumer>
				{() => {
					/**
					 * Renderiza los marcadores, y evita que existan mas de dos marcadores.
					 * ojo esta funcion es importante!
					 * @function useMapEvents
					 */
					const map = useMapEvents({
						click(e) {
							const { lat, lng } = e.latlng;
							setPosition([lat, lng]);
							sendPosition(e.latlng);
						},
					});
					return position === null ? null : (
						<Marker position={position} icon={myIcon}></Marker>
					);
				}}
			</MapConsumer>
		</MapContainer>
	);
}
