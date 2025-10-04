import React from 'react';
import { useDashboard } from '../App';

// --- ICONS ---
const BuildingOfficeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M1.75 4.5a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.5a.75.75 0 01-.75-.75zM1.75 8a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.5A.75.75 0 011.75 8zM2.5 12a.75.75 0 000 1.5h14.5a.75.75 0 000-1.5H2.5z" clipRule="evenodd" />
  </svg>
);
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.41-1.412A6.962 6.962 0 0010 11.5c-2.25 0-4.33.88-5.965 2.383z" />
  </svg>
);
const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1">
      <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
    </svg>
);

const Sidebar = () => {
  const { inputs, handleInputChange, handleSubmit, loading } = useDashboard();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    // Responsive: Hidden on mobile, visible from 'md' screens up. Integrated with a right border.
    <aside className="hidden md:flex flex-col w-72 bg-white p-6 border-r border-gray-200">
      <div className="flex items-center gap-2 mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Feasibility Inputs</h2>
      </div>

      <form onSubmit={handleFormSubmit} className="flex flex-col flex-grow">
        <div className="space-y-5">
          {/* Input with Icon */}
          <div className="relative">
            <label htmlFor="roofArea" className="block text-sm font-medium text-gray-600 mb-1">Roof Area (m²)</label>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 pt-6">
              <BuildingOfficeIcon className="text-gray-400" />
            </div>
            <input required type="number" name="roofArea" value={inputs.roofArea} onChange={handleInputChange} className="block w-full rounded-lg border-gray-300 bg-gray-50 pl-10 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" />
          </div>

          {/* Input with Icon */}
          <div className="relative">
            <label htmlFor="dwellers" className="block text-sm font-medium text-gray-600 mb-1">Number of Dwellers</label>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 pt-6">
              <UsersIcon className="text-gray-400" />
            </div>
            <input required type="number" name="dwellers" value={inputs.dwellers} onChange={handleInputChange} className="block w-full rounded-lg border-gray-300 bg-gray-50 pl-10 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm" />
          </div>
          
          {/* You can add more inputs (Open Space, Location) here following the same pattern */}
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className="group mt-auto w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-teal-500 text-white py-3 px-4 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:bg-gray-400 disabled:from-gray-400"
        >
          {loading ? 'Generating...' : 'Generate Report'}
          {!loading && <ArrowRightIcon />}
        </button>
      </form>
    </aside>
  );
};

export default Sidebar;