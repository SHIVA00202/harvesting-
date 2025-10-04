import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import DashboardCard from '../DashboardCard';
import { FaCloudRain } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RainfallDataCard = () => {
  const { dashboardData } = useDashboard();
  
  return (
    <DashboardCard title="Annual Rainfall Data" icon={<FaCloudRain />}>
      <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer>
          <BarChart data={dashboardData.rainfall} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip wrapperClassName="!bg-white !border-gray-300 !rounded-lg !shadow-lg" />
            <Legend />
            <Bar dataKey="value" name="Rainfall (mm)" fill="#3B82F6" barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
};

export default RainfallDataCard;