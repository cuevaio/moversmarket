'use client';

import { Icon } from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

export const Map = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  const position = { lat: latitude, lng: longitude };

  const houseIcon = new Icon({
    iconUrl: '/location-pin.svg', // Replace with actual house icon URL
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: '400px', width: '100%', borderRadius: '0.75rem' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <Marker position={position} icon={houseIcon} />
    </MapContainer>
  );
};

export default Map;
