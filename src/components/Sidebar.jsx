import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { FaRulerCombined, FaUsers, FaTree, FaMapMarkedAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const InputField = ({ icon, label, name, value, onChange, placeholder, unit }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
  >
    <label
      htmlFor={name}
      className="flex items-center text-sm font-medium text-sky-800 mb-1"
    >
      <span className="text-sky-600 text-lg">{icon}</span>
      <span className="ml-2">{label}</span>
    </label>
    <div className="relative">
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-3 pr-12 py-2 border border-sky-200 rounded-lg shadow-sm bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-sky-400 focus:border-sky-400 outline-none text-gray-700 transition-all"
      />
      {unit && (
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 text-sm">
          {unit}
        </span>
      )}
    </div>
  </motion.div>
);

const Sidebar = () => {
  const { inputs, handleInputChange, generateDashboard } = useDashboard();

  const handleSubmit = (e) => {
    e.preventDefault();
    generateDashboard();
  };

  return (
    <aside className="w-full lg:w-72 bg-gradient-to-b from-sky-50 via-cyan-50 to-green-50 p-6 rounded-2xl shadow-lg border border-sky-200 overflow-hidden relative">
      {/* Animated background light blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute w-[250px] h-[250px] bg-sky-300/20 rounded-full blur-3xl -top-10 -left-10"
          animate={{ x: [0, 10, -10, 0], y: [0, -10, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[200px] h-[200px] bg-emerald-300/20 rounded-full blur-3xl bottom-0 right-0"
          animate={{ x: [0, -10, 10, 0], y: [0, 10, -10, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <h2 className="text-lg font-semibold mb-6 text-sky-800 border-b border-sky-200 pb-2">
        Input Parameters
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
        <InputField
          icon={<FaRulerCombined />}
          label="Roof Area"
          name="roofArea"
          value={inputs.roofArea}
          onChange={handleInputChange}
          placeholder="e.g., 120"
          unit="sq. m"
        />
        <InputField
          icon={<FaUsers />}
          label="Number of Dwellers"
          name="dwellers"
          value={inputs.dwellers}
          onChange={handleInputChange}
          placeholder="e.g., 4"
        />
        <InputField
          icon={<FaTree />}
          label="Available Open Space"
          name="openSpace"
          value={inputs.openSpace}
          onChange={handleInputChange}
          placeholder="e.g., 50"
          unit="sq. m"
        />
        <InputField
          icon={<FaMapMarkedAlt />}
          label="Location"
          name="location"
          value={inputs.location}
          onChange={handleInputChange}
          placeholder="City, State"
        />

        <motion.button
          type="submit"
          className="w-full bg-gradient-to-r from-sky-500 via-blue-500 to-emerald-500 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Generate Analysis
        </motion.button>
      </form>
    </aside>
  );
};

export default Sidebar;
