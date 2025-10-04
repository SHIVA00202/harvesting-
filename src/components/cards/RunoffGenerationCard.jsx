import React from 'react';
import { useDashboard } from '../../context/DashboardContext';
import DashboardCard from '../DashboardCard';
import { FaWater } from 'react-icons/fa';

const RunoffGenerationCard = () => {
    const { dashboardData } = useDashboard();
    const runoffLiters = dashboardData.runoff.toLocaleString('en-IN');
    const runoffCubicMeters = (dashboardData.runoff / 1000).toFixed(2);

    return (
        <DashboardCard title="Runoff Generation Capacity" icon={<FaWater />}>
            <div className="text-center my-auto">
                <p className="text-4xl font-bold text-brand-blue">{runoffLiters}</p>
                <p className="text-lg text-gray-600">Liters / Year</p>
                <p className="mt-4 text-2xl font-semibold text-gray-800">
                    {runoffCubicMeters}
                </p>
                <p className="text-md text-gray-500">Cubic Meters / Year</p>
            </div>
        </DashboardCard>
    );
};

export default RunoffGenerationCard;