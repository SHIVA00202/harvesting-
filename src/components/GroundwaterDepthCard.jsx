import React, { useState } from 'react';
import { motion } from 'framer-motion';

// --- PLACEHOLDERS FOR EXTERNAL DEPENDENCIES ---

// 1. Placeholder Hook (Simulates data, Groundwater Depth is now part of the state)
const useDashboard = () => {
    // Current simulated depth in meters (0m means water is at the surface, 100m means very deep)
    const [depthMeters, setDepthMeters] = useState(15); 
    const dashboardData = { depthMeters };

    // Function to simulate dynamic updates (for testing purposes)
    const toggleDepth = () => {
      setDepthMeters(prev => {
        if (prev === 15) return 55; // Low to Medium
        if (prev === 55) return 95; // Medium to High
        return 15; // High to Low
      });
    };

    return { dashboardData, toggleDepth };
};

// 2. Placeholder for DashboardCard (to maintain styling structure)
const DashboardCard = ({ title, icon, className, children }) => (
    <div
      className={`p-6 bg-white rounded-xl shadow-lg h-full ${className || ''}`}
      style={{ minHeight: '320px', transition: 'all 0.3s' }}
    >
      <div className="flex items-center justify-between mb-4 border-b pb-2 border-gray-100">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
          <span className="text-2xl text-blue-500">{icon}</span>
          <span>{title}</span>
        </h3>
      </div>
      {children}
      {/* Toggle button added for easy testing of state change */}
      
    </div>
);

// 3. Placeholder Icon (Water Drop/Level icon)
const FaWaterLevel = (props) => (
    <svg {...props} className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66c3.12 3.12 3.12 8.19 0 11.31s-8.19 3.12-11.31 0c-3.12-3.12-3.12-8.19 0-11.31L12 2.69z"></path>
        <path d="M12 18V8.75"></path>
        <path d="M10 16.75h4"></path>
    </svg>
);

// --- GROUNDWATER DEPTH CARD COMPONENT ---

const GroundwaterDepthCard = () => {
    const { dashboardData } = useDashboard();
    const { depthMeters } = dashboardData || {};
    const maxDepth = 100; // Define maximum possible depth for visualization

    // Calculate water fill percentage: 100% - (Actual Depth / Max Depth) * 100
    // If depthMeters is 15, fill is 85%. If depthMeters is 95, fill is 5%.
    const waterFillPercent = Math.max(0, Math.min(100, 100 - (depthMeters / maxDepth) * 100));

    // Determine status and color based on depth
    let status, color, statusBg;
    if (depthMeters <= 30) {
        status = 'Excellent';
        color = '#10b981'; // Emerald Green (Good Water Level)
        statusBg = 'bg-emerald-100 text-emerald-800';
    } else if (depthMeters <= 65) {
        status = 'Moderate';
        color = '#f59e0b'; // Amber Yellow (Caution)
        statusBg = 'bg-amber-100 text-amber-800';
    } else {
        status = 'Critical';
        color = '#ef4444'; // Red (Low Water Level)
        statusBg = 'bg-red-100 text-red-800';
    }

    // Styles for the liquid wave effect (subtle animation)
    const waveStyle = {
      // SVG for a subtle wave pattern, color adjusted based on depth
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 40'%3E%3Cpath fill='${encodeURIComponent(color)}' fill-opacity='0.2' d='M0 20 Q 20 5 40 20 T 80 20 V 40 H 0 Z'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat-x',
      backgroundSize: '80px 40px',
    };

    return (
      <DashboardCard
        title="Groundwater Depth"
        icon={<FaWaterLevel className={`text-[${color}] drop-shadow-sm`} />}
        className="bg-white border border-blue-100 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
      >
        <div className="flex flex-col items-center justify-center h-full relative z-10 p-4">
          
          {/* Main Display Container */}
          <div className="flex w-full justify-between items-end mb-4">
            <div className="text-center">
                <p className="text-5xl font-extrabold" style={{ color: color }}>
                    {depthMeters}
                </p>
                <p className="text-lg text-gray-500">meters</p>
            </div>
            
            {/* Status Indicator with Animated Ping (The "ggg" animation) */}
            <div className="relative flex items-center">
                {/* Pulsating Ping Effect - Hidden when status is Excellent for less distraction */}
                {status !== 'Excellent' && (
                    <motion.span
                        className={`absolute w-full h-full rounded-full`}
                        style={{ backgroundColor: color }}
                        animate={{
                            scale: [1, 1.5, 2.5],
                            opacity: [0.8, 0.4, 0],
                        }}
                        transition={{
                            duration: 2.0,
                            repeat: Infinity,
                            ease: 'easeOut',
                        }}
                    />
                )}
                
                {/* Status Text (Layered on top of the ping) */}
                <span className={`relative px-3 py-1 text-sm font-semibold rounded-full ${statusBg} shadow-md`}>
                    {status}
                </span>
            </div>
          </div>
          
          {/* Enhanced Well Visualization (The "Image") */}
          <div className="relative w-1/2 max-w-[150px] h-56 flex flex-col items-center">
            
            {/* Ground/Soil Layer */}
            <div className="w-full h-8 bg-amber-800 rounded-t-lg shadow-xl relative z-20 border-b-4 border-amber-900">
                {/* Visual line separating cap from soil */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gray-600/50"></div>
                {/* 0m Depth Marker (Top of Ground) */}
                <div className="absolute top-0 left-0 w-full text-center py-1 text-xs font-bold text-white bg-gray-700/80">
                    0m
                </div>
            </div>
            
            {/* Well Cylinder */}
            <div className="w-2/3 h-full bg-gray-200 border-x-4 border-gray-700 overflow-hidden relative shadow-inner z-10">
                
                {/* The Water Fill Level */}
                <motion.div
                  key={waterFillPercent} // Key changes on depth update to reset animation
                  className="absolute bottom-0 left-0 w-full"
                  style={{ height: '0%', backgroundColor: color, ...waveStyle }}
                  initial={{ height: '0%' }}
                  animate={{ height: `${waterFillPercent}%` }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                >
                  {/* Animated Wave Surface */}
                  <motion.div 
                    className="absolute top-0 left-0 w-[200%] h-8"
                    style={{ 
                        ...waveStyle, 
                        // Set the wave color to the solid color for better contrast
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 40'%3E%3Cpath fill='${encodeURIComponent(color)}' fill-opacity='1' d='M0 20 Q 20 5 40 20 T 80 20 V 40 H 0 Z'/%3E%3C/svg%3E")`,
                        transform: 'translateY(-100%)' 
                    }}
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  />
                </motion.div>
                
                {/* Depth Marker (Bottom of Well) */}
                <div className="absolute bottom-0 left-0 w-full text-center py-1 text-xs font-bold text-gray-700 bg-gray-300">
                    {maxDepth}m
                </div>
            </div>

          </div>

          <p className="text-xs text-gray-500 mt-4">
            Higher depth number indicates lower water availability.
          </p>
          
        </div>
      </DashboardCard>
    );
};

export default GroundwaterDepthCard;

