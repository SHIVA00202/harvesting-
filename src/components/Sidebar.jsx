import React from 'react';
import { useDashboard } from '../context/DashboardContext';
import { FaRulerCombined, FaUsers, FaTree, FaMapMarkedAlt } from 'react-icons/fa';

const InputField = ({ icon, label, name, value, onChange, placeholder, unit }) => (
  <div>
    <label htmlFor={name} className="flex items-center text-sm font-medium text-gray-700 mb-1">
      {icon}
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
        className="w-full pl-3 pr-12 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-brand-blue focus:border-brand-blue"
      />
      {unit && <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 text-sm">{unit}</span>}
    </div>
  </div>
);


const Sidebar = () => {
  const { inputs, handleInputChange, generateDashboard } = useDashboard();

  const handleSubmit = (e) => {
    e.preventDefault();
    generateDashboard();
  };

  return (
    <aside className="w-full lg:w-72 bg-white p-6 shadow-lg flex-shrink-0">
      <h2 className="text-lg font-semibold mb-6 text-gray-800">Input Parameters</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
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

        <button
          type="submit"
          className="w-full bg-brand-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-300 transform hover:scale-105"
        >
          Generate Analysis
        </button>
      </form>
    </aside>
  );
};

export default Sidebar;