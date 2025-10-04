import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import DashboardCard from '../DashboardCard';
import { FaLayerGroup } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const AquiferInfoCard = () => {
  const { dashboardData } = useDashboard();
  const { aquifer } = dashboardData;
  const position = [aquifer.lat, aquifer.lng];

  return (
    <DashboardCard title="Aquifer Information" icon={<FaLayerGroup />}>
      <div className="flex flex-col h-full">
        {/* Aquifer Details */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            <strong>Type:</strong> {aquifer.type}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Capacity:</strong> <span className="font-semibold text-green-700">{aquifer.capacity}</span>
          </p>
        </div>

        {/* Map Container - Added min-h-[250px] for guaranteed height */}
        <div className="flex-grow rounded-lg overflow-hidden z-0 min-h-[250px]">
          <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>
                Your location. <br /> Aquifer data is based on this area.
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </DashboardCard>
  );
};

export default AquiferInfoCard;