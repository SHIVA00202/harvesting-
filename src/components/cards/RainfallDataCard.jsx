import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';

// --- LUCIDE-REACT ICON PLACEHOLDERS ---
// Using lucide-react (or similar library) for reliable rendering in the single-file environment.
const CloudRain = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a5 5 0 0 1 0 10h-2.22"></path>
    <line x1="16" x2="16" y1="18" y2="22"></line>
    <line x1="10" x2="10" y1="18" y2="22"></line>
    <line x1="13" x2="13" y1="14" y2="18"></line>
  </svg>
);
const Calendar = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 2v4"></path>
    <path d="M16 2v4"></path>
    <rect width="18" height="18" x="3" y="4" rx="2"></rect>
    <path d="M3 10h18"></path>
  </svg>
);

// --- PLACEHOLDER COMPONENTS & HOOKS (Replaces external imports) ---

// 1. Placeholder for DashboardCard (to maintain styling structure)
const DashboardCard = ({ title, icon, className, children }) => (
  <div 
    className={`p-6 bg-white rounded-xl shadow-lg h-full ${className || ''}`}
    style={{ minHeight: '350px' }}
  >
    <div className="flex items-center justify-between mb-4 border-b pb-2 border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
        <span className="text-2xl">{icon}</span>
        <span>{title}</span>
      </h3>
    </div>
    {children}
  </div>
);

// 2. Placeholder Hook (Replaces useDashboard for runnable state)
// Provides mock rainfall data
const useDashboard = () => {
  const mockRainfallData = [
    { name: 'Jan', historic: 45, current: 52 },
    { name: 'Feb', historic: 40, current: 38 },
    { name: 'Mar', historic: 55, current: 61 },
    { name: 'Apr', historic: 70, current: 85 },
    { name: 'May', historic: 110, current: 105 },
    { name: 'Jun', historic: 150, current: 160 },
    { name: 'Jul', historic: 180, current: 175 },
    { name: 'Aug', historic: 160, current: 165 },
    { name: 'Sep', historic: 100, current: 95 },
    { name: 'Oct', historic: 80, current: 78 },
    { name: 'Nov', historic: 60, current: 65 },
    { name: 'Dec', historic: 50, current: 48 },
  ];
  
  const [data, setData] = useState(mockRainfallData);
  
  // Dummy data structure to mimic the context provider
  const dashboardData = { rainfall: data };
  
  return { dashboardData };
};

// --- MAIN COMPONENT ---

const RainfallDataCard = () => {
  const { dashboardData } = useDashboard();
  const rainfallData = dashboardData.rainfall || [];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const currentValue = payload.find(p => p.dataKey === 'current')?.value || 0;
      const historicValue = payload.find(p => p.dataKey === 'historic')?.value || 0;
      
      return (
        <div className="p-3 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-xl">
          <p className="text-sm font-bold text-gray-800 mb-1">{label}</p>
          <p className="text-sm text-sky-600">Current: <span className="font-semibold">{currentValue} mm</span></p>
          <p className="text-sm text-gray-500">Historic Avg: <span className="font-semibold">{historicValue} mm</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <DashboardCard
      title="Monthly Rainfall Analysis"
      icon={<CloudRain className="text-blue-500 w-6 h-6" />} // Using the local CloudRain icon
      // Clean, professional styling with subtle hover effect
      className="relative overflow-hidden bg-white/95 backdrop-blur-sm shadow-xl border border-gray-200 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:border-blue-300"
    >
      {/* Dynamic Background Element - Subtle rain effect */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        animate={{ 
          y: [0, 10], 
          opacity: [0.1, 0.2] 
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-full h-full bg-blue-300 rounded-full blur-3xl scale-[2]"></div>
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
            <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" /> {/* Using the local Calendar icon */}
                <span>Last 12 Months</span>
            </div>
            <span className="font-medium text-gray-700">All data in millimeters (mm)</span>
        </div>

        <div style={{ width: '100%', height: 260 }}>
          <ResponsiveContainer>
            <BarChart
              data={rainfallData}
              margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="4 4" stroke="#e0e7ff" vertical={false} />
              <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
              
              <Tooltip cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }} content={<CustomTooltip />} />
              
              <Legend 
                verticalAlign="top" 
                align="right" 
                height={36} 
                iconType="circle"
                wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }}
              />
              
              <defs>
                {/* Gradient for Current Rainfall (Vibrant Blue) */}
                <linearGradient id="currentRainGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                  <stop offset="100%" stopColor="#93c5fd" stopOpacity={0.7} />
                </linearGradient>
                {/* Gradient for Historic Average (Muted Gray/Blue) */}
                <linearGradient id="historicRainGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#cbd5e1" stopOpacity={1} />
                  <stop offset="100%" stopColor="#f1f5f9" stopOpacity={0.7} />
                </linearGradient>
              </defs>

              {/* Bar for Current Year's Rainfall */}
              <Bar
                dataKey="current"
                name="Current Rainfall"
                fill="url(#currentRainGradient)"
                barSize={10}
                radius={[4, 4, 0, 0]}
                animationDuration={1200}
              />
              {/* Bar for Historic Average */}
              <Bar
                dataKey="historic"
                name="Historic Average"
                fill="url(#historicRainGradient)"
                barSize={10}
                radius={[4, 4, 0, 0]}
                animationDuration={1200}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Informational Footer */}
        <p className="text-xs text-gray-400 mt-4 text-center">
            Comparing current monthly accumulation against 10-year historical averages.
        </p>

      </motion.div>
    </DashboardCard>
  );
};

export default RainfallDataCard;