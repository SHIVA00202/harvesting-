import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

// --- PLACEHOLDERS FOR EXTERNAL DEPENDENCIES ---

// 1. Placeholder Hook (Simulates data for Cost and Benefit)
const useDashboard = () => {
    const [costData, setCostData] = useState({
        totalCost: 15000,
        annualSavings: 1500,
    }); 
    const dashboardData = { 
        ...costData,
        paybackYears: (costData.totalCost / costData.annualSavings), // Keep as number for math
    };

    // Function to simulate dynamic updates (for testing purposes)
    const toggleCost = () => {
      setCostData(prev => {
        if (prev.totalCost === 15000) {
            return { totalCost: 8000, annualSavings: 2000 }; // Good scenario (4 years payback)
        }
        return { totalCost: 15000, annualSavings: 1500 }; // Default scenario (10 years payback)
      });
    };

    return { dashboardData, toggleCost };
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
      <div className="mt-4 text-center">
        <button
          onClick={useDashboard().toggleCost}
          className="px-3 py-1 text-xs font-medium rounded-full text-blue-700 bg-blue-100 hover:bg-blue-200 transition"
        >
          Toggle Scenario (Test)
        </button>
      </div>
    </div>
);

// 3. Placeholder Icon (Money/Dollar Sign icon)
const FaMoneyBill = (props) => (
    <svg {...props} className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 5H7a4 4 0 00-4 4v6a4 4 0 004 4h10a4 4 0 004-4V9a4 4 0 00-4-4zm-5 13a3 3 0 110-6 3 3 0 010 6z"/>
    </svg>
);

// --- HELPER COMPONENTS ---

// Component for an individual metric column
const MetricColumn = ({ label, value, color, icon }) => (
    <div className="flex flex-col items-center p-3 w-1/2">
        <span className={`text-3xl ${color === 'green' ? 'text-emerald-500' : 'text-red-500'} mb-1`}>{icon}</span>
        <motion.span
            key={value}
            className={`text-xl font-bold ${color === 'green' ? 'text-emerald-600' : 'text-red-600'}`}
            initial={{ scale: 0.9, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            ${value.toLocaleString()}
        </motion.span>
        <span className="text-sm text-gray-500 mt-1">{label}</span>
    </div>
);


// --- COST & BENEFIT CARD COMPONENT ---

const CostBenefitCard = () => {
    const { dashboardData } = useDashboard();
    const { totalCost, annualSavings, paybackYears } = dashboardData;
    
    // Max reasonable payback to show 0% progress on the gauge
    const MAX_PAYBACK_YEARS = 20; 
    const MIN_PAYBACK_YEARS = 5; // Target payback for 100% progress
    const PAYBACK_RANGE = MAX_PAYBACK_YEARS - MIN_PAYBACK_YEARS;

    // Calculate Payback Progress (0% to 100%)
    // 5 years or less = 100% (Excellent)
    // 20 years or more = 0% (Critical)
    const paybackProgress = useMemo(() => {
        if (paybackYears <= MIN_PAYBACK_YEARS) return 100;
        if (paybackYears >= MAX_PAYBACK_YEARS) return 0;
        
        // Calculate progress percentage inversely proportional to years
        const yearsAboveMin = paybackYears - MIN_PAYBACK_YEARS;
        const remainingPercentage = (1 - (yearsAboveMin / PAYBACK_RANGE)) * 100;
        return Math.round(remainingPercentage);
    }, [paybackYears]);

    // Determine status and color based on payback years
    const { color, statusBg, statusText } = useMemo(() => {
        let currentStatus = { color: '#f59e0b', statusBg: 'bg-amber-100', statusText: 'Moderate' }; // Amber
        if (paybackYears <= MIN_PAYBACK_YEARS) {
            currentStatus = { color: '#10b981', statusBg: 'bg-emerald-100', statusText: 'Excellent' }; // Green
        } else if (paybackYears > 15) {
            currentStatus = { color: '#ef4444', statusBg: 'bg-red-100', statusText: 'Critical' }; // Red
        }
        return currentStatus;
    }, [paybackYears]);

    // SVG parameters for the circular progress bar
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (paybackProgress / 100) * circumference;

    return (
      <DashboardCard
        title="Cost & Benefit Analysis"
        icon={<FaMoneyBill className="text-green-500" />}
        className="bg-white rounded-2xl shadow-2xl relative overflow-hidden"
      >
        
        <div className="relative z-10 flex flex-col items-center">
            
            {/* Metric Columns (Investment vs. Savings) */}
            <div className="flex w-full justify-around mb-6 border-b pb-4 border-gray-100">
                <MetricColumn 
                    label="Investment Cost" 
                    value={totalCost} 
                    color="red" 
                    icon={<svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/></svg>}
                />
                <MetricColumn 
                    label="Annual Savings" 
                    value={annualSavings} 
                    color="green" 
                    icon={<svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>}
                />
            </div>

            {/* Circular Progress Gauge (The "animateds gg" effect) */}
            <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 130 130">
                    {/* Track */}
                    <circle
                        cx="65"
                        cy="65"
                        r={radius}
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="10"
                    />
                    {/* Progress Bar */}
                    <motion.circle
                        key={paybackProgress} // Animate on progress change
                        cx="65"
                        cy="65"
                        r={radius}
                        fill="none"
                        stroke={color}
                        strokeWidth="10"
                        strokeLinecap="round"
                        style={{
                            strokeDasharray: circumference,
                            strokeDashoffset: circumference,
                        }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1.5, ease: 'easeInOut' }}
                        className="drop-shadow-lg"
                    />
                </svg>

                {/* Center Content */}
                <div className="absolute flex flex-col items-center justify-center">
                    <p className="text-xl text-gray-500">Payback</p>
                    <motion.span
                        key={paybackYears}
                        className={`text-4xl font-extrabold transition-colors duration-500`}
                        style={{ color: color }}
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                        {paybackYears.toFixed(1)}
                    </motion.span>
                    <p className="text-sm text-gray-500">Years</p>
                </div>
            </div>
            
            {/* Status Pill */}
            <motion.span 
                key={paybackYears}
                className={`mt-4 px-4 py-1 text-sm font-semibold rounded-full shadow-md ${statusBg}`}
                style={{ color: color }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
            >
                {statusText}
            </motion.span>
            
        </div>
      </DashboardCard>
    );
};

export default CostBenefitCard;
