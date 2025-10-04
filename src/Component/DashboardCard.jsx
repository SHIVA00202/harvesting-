import React from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { useDashboard } from '../App';
import DashboardCard from './DashboardCard';
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';

const FeasibilityCard = () => {
  const { results } = useDashboard();
  const feasibility = results?.feasibility || 'N/A';
  
  const feasibilityMap = {
    High: { 
      value: 90, 
      gradientId: 'high-gradient', 
      textColor: 'text-green-500',
      bgColor: 'bg-green-100/20',
      description: 'Excellent conditions for rainwater harvesting with significant potential.',
      Icon: CheckCircleIcon,
    },
    Medium: { 
      value: 60, 
      gradientId: 'medium-gradient',
      textColor: 'text-yellow-500',
      bgColor: 'bg-yellow-100/20',
      description: 'Good conditions, but may require specific structure types for optimal results.',
      Icon: ExclamationTriangleIcon,
    },
    Low: { 
      value: 30, 
      gradientId: 'low-gradient',
      textColor: 'text-red-500',
      bgColor: 'bg-red-100/20',
      description: 'Challenging conditions. Feasibility is limited due to geological or rainfall factors.',
      Icon: ExclamationTriangleIcon,
    },
    'N/A': { 
      value: 0, 
      gradientId: 'na-gradient',
      textColor: 'text-gray-400',
      bgColor: 'bg-gray-200/20',
      description: 'Submit your data to generate a feasibility report.',
      Icon: () => null,
    },
  };

  const currentStatus = feasibilityMap[feasibility];
  const data = [{ value: currentStatus.value, fill: `url(#${currentStatus.gradientId})` }];
  
  return (
    <DashboardCard title="Feasibility Check">
      <div className="relative flex justify-center h-40">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart 
            innerRadius="75%" 
            outerRadius="100%" 
            data={data} 
            startAngle={180} 
            endAngle={0}
            barSize={20}
          >
            <defs>
              <linearGradient id="high-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity={1}/>
                <stop offset="100%" stopColor="#34D399" stopOpacity={0.9}/>
              </linearGradient>
              <linearGradient id="medium-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity={1}/>
                <stop offset="100%" stopColor="#FBBF24" stopOpacity={0.9}/>
              </linearGradient>
              <linearGradient id="low-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EF4444" stopOpacity={1}/>
                <stop offset="100%" stopColor="#F87171" stopOpacity={0.9}/>
              </linearGradient>
              <linearGradient id="na-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9CA3AF" stopOpacity={1}/>
                <stop offset="100%" stopColor="#D1D5DB" stopOpacity={0.9}/>
              </linearGradient>
            </defs>
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar 
              background={{ fill: '#E5E7EB' }} 
              clockWise 
              dataKey="value" 
              cornerRadius={10} 
              animationDuration={800}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        
        {/* Centered Text Display */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 flex flex-col items-center">
          <span className={`text-4xl font-bold ${currentStatus.textColor}`}>
            {currentStatus.value}
          </span>
          <span className={`text-sm font-semibold -mt-1 ${currentStatus.textColor}`}>
            {feasibility}
          </span>
        </div>
      </div>
      
      {/* Dynamic Contextual Text */}
      <div className={`flex items-center justify-center text-center text-sm mt-4 p-2 rounded-lg ${currentStatus.bgColor} ${currentStatus.textColor}`}>
        <currentStatus.Icon className={`w-5 h-5 mr-2 shrink-0`} />
        <p>{currentStatus.description}</p>
      </div>
    </DashboardCard>
  );
};

export default FeasibilityCard;
