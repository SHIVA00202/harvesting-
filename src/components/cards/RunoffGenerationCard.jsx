import React from 'react';
import { motion } from 'framer-motion';

const Water = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22a4 4 0 0 0 4-4c0-2-3-5-4-8-1 3-4 6-4 8a4 4 0 0 0 4 4z"></path>
    <path d="M14.5 9.5c0 2-2.5 4-2.5 4s-2.5-2-2.5-4a2.5 2.5 0 0 1 5 0z"></path>
  </svg>
);

const DashboardCard = ({ title, icon, className, children }) => (
  <div className={`p-6 rounded-2xl shadow-lg h-full relative overflow-hidden ${className || ''}`} style={{ minHeight: '280px' }}>
    <div className="flex items-center justify-between mb-4 border-b pb-2 border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
        <span className="text-2xl">{icon}</span>
        <span>{title}</span>
      </h3>
    </div>
    {children}
  </div>
);

const useDashboard = () => {
  const mockRunoff = 12500000; 
  const dashboardData = { runoff: mockRunoff };
  return { dashboardData };
};

const RunoffGenerationCard = () => {
  const { dashboardData } = useDashboard();
  const runoffValue = dashboardData.runoff || 0;

  const runoffLiters = runoffValue.toLocaleString('en-US');
  const runoffCubicMeters = (runoffValue / 1000).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <DashboardCard
      title="Annual Runoff Generation"
      icon={<Water className="text-blue-500 w-6 h-6" />}
      className="relative overflow-hidden bg-white/90 backdrop-blur-sm border border-gray-200 shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-blue-300"
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute w-[300px] h-[300px] bg-sky-200/50 rounded-full blur-3xl animate-pulse -top-20 -left-20"></div>
        <div className="absolute w-[300px] h-[300px] bg-cyan-200/50 rounded-full blur-3xl animate-pulse delay-500 bottom-0 right-0"></div>
      </div>

      {/* Animated icon */}
      <motion.div
        className="absolute top-4 right-4 text-sky-400/50 text-6xl opacity-70"
        animate={{ y: [0, 8, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Water className="w-10 h-10" />
      </motion.div>

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center flex flex-col items-center justify-center py-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-lg text-gray-500 font-medium">Potential Water Volume</p>
        <motion.p
          className="text-6xl font-extrabold text-sky-700 tracking-tight drop-shadow-md mt-1"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
        >
          {runoffLiters}
        </motion.p>
        <p className="text-xl font-semibold text-gray-600 mt-0.5">Liters</p>

        <div className="w-1/3 h-px bg-gray-300 my-4"></div>

        <motion.div
          className="mt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <p className="text-3xl font-bold text-emerald-600">
            {runoffCubicMeters} <span className="text-lg font-semibold">m³</span>
          </p>
          <p className="text-sm text-gray-500 mt-0.5">Cubic Meters / Year</p>
        </motion.div>
      </motion.div>
    </DashboardCard>
  );
};

export default RunoffGenerationCard;
