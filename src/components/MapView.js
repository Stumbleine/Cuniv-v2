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
import { LocationCity, Room } from '@mui/icons-material';
import L from 'leaflet';
function LocationMarker() {
	const [position, setPosition] = useState(null);
	const map = useMapEvents({
		click() {
			map.locate();
		},
		locationfound(e) {
			setPosition(e.latlng);
			map.flyTo(e.latlng, map.getZoom());
		},
	});

	return position === null ? null : (
		<Marker position={position}>
			<Popup>You are here</Popup>
		</Marker>
	);
}
function MapView({ sendPosition }) {
	const [position, setPosition] = useState(null);
	const positionDefault = [-17.393862599382608, -66.14674424552783];
	const style = {
		mapContainer: {
			width: 300,
			height: 200,
		},
	};
	const myIcon = L.icon({
		iconUrl: 'location.svg',
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
						<Marker position={position}>
							<Popup>yo are here</Popup>
						</Marker>
					);
				}}
			</MapConsumer>
		</MapContainer>
	);
}

export default MapView;
