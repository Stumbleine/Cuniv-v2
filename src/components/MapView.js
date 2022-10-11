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

function MapView({ sendPosition }) {
	const [position, setPosition] = useState(null);
	const positionDefault = [-17.393862599382608, -66.14674424552783];
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

export default MapView;
