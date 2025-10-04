import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import DashboardCard from '../DashboardCard';
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const FeasibilityCheckCard = () => {
  const { dashboardData } = useDashboard();
  const { feasibility } = dashboardData;

  const feasibilityMap = {
    High: { color: '#2E7D32', icon: <FaCheckCircle />, value: 3 },
    Medium: { color: '#FBC02D', icon: <FaExclamationTriangle />, value: 2 },
    Low: { color: '#C62828', icon: <FaTimesCircle />, value: 1 },
  };

  const data = [
    { name: 'Feasibility', value: feasibilityMap[feasibility].value },
    { name: 'Remaining', value: 3 - feasibilityMap[feasibility].value },
  ];
  
  const COLORS = [feasibilityMap[feasibility].color, '#E0E0E0'];

  return (
    <DashboardCard title="Feasibility Check" icon={feasibilityMap[feasibility].icon}>
      <div className="flex flex-col items-center justify-center h-full">
        <ResponsiveContainer width="100%" height={150}>
          <PieChart>
            <Tooltip />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              startAngle={180}
              endAngle={-180}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <p className="text-2xl font-bold mt-2" style={{ color: feasibilityMap[feasibility].color }}>
          {feasibility}
        </p>
        <p className="text-gray-500">Based on your inputs</p>
      </div>
    </DashboardCard>
  );
};

export default FeasibilityCheckCard;