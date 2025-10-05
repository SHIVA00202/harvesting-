import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import DashboardCard from '../DashboardCard';
import { FaLayerGroup } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const AquiferInfoCard = () => {
  const { dashboardData } = useDashboard();
  const { aquifer } = dashboardData || { aquifer: {} };
  const { lat = 20.5937, lng = 78.9629, type = 'N/A', capacity = 'N/A' } = aquifer; // Default India coords

  const position = [lat, lng];

  return (
    <DashboardCard
      title="Aquifer Location & Attributes"
      icon={<FaLayerGroup className="text-sky-600" />}
      className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-100 border border-sky-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[350px] h-[350px] bg-gradient-to-br from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl -top-20 -left-20"
          animate={{ x: [0, 20, -20, 0], y: [0, -15, 15, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] bg-gradient-to-br from-sky-400/20 to-green-300/20 rounded-full blur-3xl bottom-0 right-0"
          animate={{ x: [0, -20, 20, 0], y: [0, 10, -10, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div
        className="relative z-10 flex flex-col space-y-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Aquifer Details */}
        <motion.div
          className="bg-white/70 backdrop-blur-lg rounded-xl p-4 border border-blue-100 shadow-inner"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm sm:text-base text-gray-700">
            <span className="font-semibold text-gray-900">Aquifer Type:</span>{' '}
            <span className="text-sky-700">{type}</span>
          </p>
          <p className="text-sm sm:text-base mt-2 text-gray-700">
            <span className="font-semibold text-gray-900">Estimated Capacity:</span>{' '}
            <span className="font-bold text-lg text-emerald-600 ml-1">{capacity}</span>
          </p>
        </motion.div>

        {/* Map */}
        <motion.div
          key={`${lat}-${lng}`}
          className="flex-grow rounded-xl border border-sky-200 shadow-inner overflow-hidden min-h-[300px] h-[300px]" // Set definite height
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <MapContainer
            center={position}
            zoom={12}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <Marker position={position}>
              <Popup>
                <strong>Aquifer Location</strong>
                <br />
                Coordinates: {lat.toFixed(4)}, {lng.toFixed(4)}
              </Popup>
            </Marker>
          </MapContainer>
        </motion.div>
      </motion.div>
    </DashboardCard>
  );
};

export default AquiferInfoCard;
