import { useState } from 'react';
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMapEvents,
	MapConsumer,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
function MapView({ sendPosition }) {
	const [position, setPosition] = useState(null);
	const positionDefault = [-17.393862599382608, -66.14674424552783];
	const myIcon = L.icon({
		iconUrl: '/location.svg',
		iconSize: [38, 50],
		iconAnchor: [22, 94],
		popupAnchor: [-3, -76],
		// shadowUrl: 'my-icon-shadow.png',
		// shadowSize: [68, 95],
		// shadowAnchor: [22, 94],
	});
	return (
		<MapContainer
			style={{ width: '100%', height: '100%' }}
			center={positionDefault}
			zoom={13}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			nameFunction(para,para2){}
			<MapConsumer>
				{() => {
					const map = useMapEvents({
						click(e) {
							const { lat, lng } = e.latlng;
							setPosition([lat, lng]);
							sendPosition(e.latlng);
							console.log(position);
						},
					});

					return position === null ? null : (
						<Marker position={position} icon={myIcon}>
							<Popup>yo are here</Popup>
						</Marker>
					);
				}}
			</MapConsumer>
		</MapContainer>
	);
}

export default MapView;
