import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import DashboardCard from '../DashboardCard';
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

const FeasibilityCheckCard = () => {
  const { dashboardData } = useDashboard();
  const { feasibility } = dashboardData;

  const feasibilityMap = {
    High: { color: '#16a34a', icon: <FaCheckCircle />, value: 3 },
    Medium: { color: '#eab308', icon: <FaExclamationTriangle />, value: 2 },
    Low: { color: '#dc2626', icon: <FaTimesCircle />, value: 1 },
  };

  const current = feasibilityMap[feasibility] || feasibilityMap.Low;
  const data = [
    { name: 'Feasibility', value: current.value },
    { name: 'Remaining', value: 3 - current.value },
  ];
  const COLORS = [current.color, '#e5e7eb']; // Soft gray background for remaining

  return (
    <DashboardCard
      title="Feasibility Check"
      icon={current.icon}
      className="relative overflow-hidden bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {/* Smooth animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[300px] h-[300px] bg-gradient-to-br from-green-300/20 to-blue-400/30 rounded-full blur-3xl"
          animate={{ x: [0, 10, -10, 0], y: [0, -10, 10, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] bg-gradient-to-br from-blue-400/20 to-cyan-300/30 rounded-full blur-3xl bottom-0 right-0"
          animate={{ x: [0, -10, 10, 0], y: [0, 10, -10, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Main content */}
      <motion.div
        className="flex flex-col items-center justify-center h-full relative z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <ResponsiveContainer width="100%" height={150}>
          <PieChart>
            <Tooltip
              contentStyle={{ backgroundColor: 'white', borderRadius: 8, border: '1px solid #e5e7eb', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
            />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={75}
              startAngle={180}
              endAngle={-180}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <motion.p
          className="text-3xl font-extrabold mt-2"
          style={{ color: current.color }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {feasibility}
        </motion.p>
        <p className="text-gray-500 text-sm mt-1">Based on your inputs</p>

        {/* Static underline for professionalism */}
        <div className="w-2/3 h-1 mt-3 bg-gradient-to-r from-green-400 via-blue-400 to-cyan-400 rounded-full" />
      </motion.div>
    </DashboardCard>
  );
};

export default FeasibilityCheckCard;
