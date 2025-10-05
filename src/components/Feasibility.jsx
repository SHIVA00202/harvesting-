import React, { useState, useEffect } from 'react';
import { FaRulerCombined, FaUsers, FaMapMarkedAlt, FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaWater } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Reusable input field
const InputField = ({ icon, label, name, value, onChange, placeholder, unit, type = "text" }) => (
  <div>
    <label htmlFor={name} className="flex items-center text-sm font-medium text-gray-700 mb-1">
      {icon}
      <span className="ml-2">{label}</span>
    </label>
    <div className="relative">
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-3 pr-12 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
      />
      {unit && <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 text-sm">{unit}</span>}
    </div>
  </div>
);

const Feasibility = () => {
  const [formData, setFormData] = useState({
    roofArea: '',
    dwellers: '',
    city: 'Ranchi',
    roofType: 'Concrete',
    monthlyRainfall: 750,
    waterConsumption: 100,
    gardenArea: 0,
    lat: 23.3441,
    lng: 85.3096,
  });
  const [results, setResults] = useState(null);
  const [raindrops, setRaindrops] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateFeasibility = (inputs) => {
    const area = parseFloat(inputs.roofArea) || 0;
    const people = parseInt(inputs.dwellers) || 0;
    const rainfall = parseFloat(inputs.monthlyRainfall) || 0;
    const roofCoefficient = inputs.roofType === "Concrete" ? 0.85 : 0.7;
    const consumption = parseFloat(inputs.waterConsumption) || 100;
    const annualHarvest = area * rainfall * roofCoefficient;

    let feasibility = 'Low';
    let icon = <FaTimesCircle className="text-red-500" />;
    let color = 'text-red-500';
    if (annualHarvest >= people * consumption * 365) {
      feasibility = 'High';
      icon = <FaCheckCircle className="text-green-500" />;
      color = 'text-green-500';
    } else if (annualHarvest >= (people * consumption * 365) / 2) {
      feasibility = 'Medium';
      icon = <FaExclamationTriangle className="text-yellow-500" />;
      color = 'text-yellow-500';
    }

    return {
      feasibility,
      icon,
      color,
      runoff: annualHarvest.toLocaleString('en-IN'),
      suggestion: `With a ${area} sq.m roof, ${people} dwellers, and ${inputs.roofType} roof type, your rainwater harvesting potential is ${feasibility}. Estimated annual collection: ${annualHarvest.toLocaleString('en-IN')} liters.`,
      rainfallData: [
        { name: 'Jun', value: rainfall * 0.33 },
        { name: 'Jul', value: rainfall * 0.4 },
        { name: 'Aug', value: rainfall * 0.35 },
        { name: 'Sep', value: rainfall * 0.25 },
      ],
      radarData: [
        { subject: 'Harvest', A: annualHarvest, fullMark: annualHarvest },
        { subject: 'Consumption', A: people * consumption * 365, fullMark: annualHarvest },
        { subject: 'Garden Area', A: parseFloat(inputs.gardenArea) || 0, fullMark: area },
        { subject: 'Runoff', A: Math.max(annualHarvest - people * consumption * 365, 0), fullMark: annualHarvest },
      ]
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResults(calculateFeasibility(formData));
  };

  useEffect(() => {
    const drops = Array.from({ length: 100 }, () => ({
      left: Math.random() * 100,
      duration: 1.5 + Math.random() * 1.5,
      delay: Math.random() * 5,
      height: 15 + Math.random() * 20,
    }));
    setRaindrops(drops);
  }, []);

  return (
    <div className="relative min-h-screen p-4 sm:p-6 lg:p-8 overflow-hidden bg-gradient-to-b from-green-200 via-blue-200 to-teal-200">
      
      {/* Falling rain lines */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {raindrops.map((drop, idx) => (
          <div
            key={idx}
            className="rain-drop"
            style={{
              left: `${drop.left}%`,
              height: `${drop.height}px`,
              animationDuration: `${drop.duration}s`,
              animationDelay: `${drop.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto z-10">
        <motion.h1 className="text-3xl font-bold text-gray-800 mb-2 text-center" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
          Rainwater Harvesting Feasibility
        </motion.h1>
        <p className="text-gray-700 mb-8 text-center">Enter your details to get a personalized rainwater harvesting assessment.</p>

        <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputField icon={<FaRulerCombined />} label="Roof Area" name="roofArea" value={formData.roofArea} onChange={handleChange} placeholder="120" unit="sq.m" />
            <InputField icon={<FaUsers />} label="Number of Dwellers" name="dwellers" value={formData.dwellers} onChange={handleChange} placeholder="4" />
            <InputField icon={<FaMapMarkedAlt />} label="City" name="city" value={formData.city} onChange={handleChange} placeholder="Ranchi" />
            <InputField icon={<FaRulerCombined />} label="Roof Type" name="roofType" value={formData.roofType} onChange={handleChange} placeholder="Concrete/Metal/Tile" />
            <InputField icon={<FaWater />} label="Monthly Rainfall" name="monthlyRainfall" value={formData.monthlyRainfall} onChange={handleChange} placeholder="750" unit="mm" />
            <InputField icon={<FaUsers />} label="Water Consumption per Person" name="waterConsumption" value={formData.waterConsumption} onChange={handleChange} placeholder="100" unit="L/day" />
            <InputField icon={<FaRulerCombined />} label="Garden/Usage Area" name="gardenArea" value={formData.gardenArea} onChange={handleChange} placeholder="0" unit="sq.m" />
            <button type="submit" className="col-span-full h-10 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition transform hover:scale-105">
              Calculate
            </button>
          </form>
        </div>

        <AnimatePresence>
          {results && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Assessment Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center text-3xl font-bold space-x-3">
                    {results.icon}
                    <span className={results.color}>{results.feasibility} Feasibility</span>
                  </div>
                  <p className="text-gray-700">{results.suggestion}</p>
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <p className="text-sm font-semibold text-indigo-800">Potential Annual Water Harvest</p>
                    <p className="text-2xl font-bold text-indigo-600">{results.runoff} Liters</p>
                  </div>
                </div>
                <div className="h-64">
                  <h3 className="text-lg font-semibold mb-2 text-gray-700">Estimated Rainfall (mm)</h3>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={results.rainfallData}>
                      <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                      <YAxis stroke="#6b7280" fontSize={12} />
                      <Tooltip wrapperClassName="!bg-white !border-gray-300 !rounded-lg !shadow-lg" />
                      <Bar dataKey="value" fill="#4f46e5" barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-2 text-gray-700">Water Metrics Radar</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={results.radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <Radar name="Metrics" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 w-full rounded-2xl overflow-hidden shadow-xl border border-gray-200">
          <MapContainer center={[formData.lat, formData.lng]} zoom={13} scrollWheelZoom={true} className="h-[500px] w-full z-0">
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <Marker position={[formData.lat, formData.lng]}>
              <Popup>
                <div className="text-sm">
                  <strong>{formData.city}</strong><br />
                  Rainwater Harvest Site
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>

      {/* Rain CSS */}
      <style>{`
        .rain-drop {
          position: absolute;
          top: -20px;
          width: 2px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 50%;
          transform: rotate(-20deg);
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        @keyframes fall {
          0% {
            transform: translateY(0) rotate(-20deg);
            opacity: 0.5;
          }
          100% {
            transform: translateY(600px) rotate(-20deg);
            opacity: 0;
          }
        }

        .leaflet-container {
          border-radius: 16px;
        }
      `}</style>
    </div>
  );
};

export default Feasibility;
