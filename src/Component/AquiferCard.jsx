import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import DashboardCard from './DashboardCard';

const AquiferCard = () => {
  const position = [23.3441, 85.3096]; // Ranchi, Jharkhand

  return (
    <DashboardCard title="Aquifer Information">
      <div className="flex flex-col gap-3">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Type:</span> Weathered & Fractured Granite Gneiss
        </p>

        <div className="h-48 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
          <MapContainer
            center={position}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={position}>
              <Popup>Your Location</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </DashboardCard>
  );
};

export default AquiferCard;
