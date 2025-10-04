import React, { createContext, useState, useContext } from 'react';

const DashboardContext = createContext();

export const useDashboard = () => useContext(DashboardContext);

// Mock function to simulate data generation
const generateMockData = (inputs) => {
  const { roofArea, dwellers } = inputs;
  const area = parseFloat(roofArea) || 0;
  const people = parseInt(dwellers) || 0;

  let feasibility = 'Low';
  if (area >= 100 && people >= 4) feasibility = 'High';
  else if (area >= 50 && people >= 2) feasibility = 'Medium';

  return {
    feasibility,
    runoff: area * 750 * 0.85, // Assuming 750mm avg rainfall & 0.85 runoff coeff.
    groundwaterDepth: 20 + Math.random() * 10,
    cost: area * 150 + people * 500,
    savings: area * 750 * 0.85 * 0.01, // Assuming cost per liter
    aquifer: {
      type: 'Alluvial Aquifer',
      capacity: 'High',
      lat: 23.3441, // Ranchi Coordinates
      lng: 85.3096,
    },
    rainfall: [
      { name: 'Jan', value: 15 }, { name: 'Feb', value: 20 }, { name: 'Mar', value: 35 },
      { name: 'Apr', value: 50 }, { name: 'May', value: 100 }, { name: 'Jun', value: 250 },
      { name: 'Jul', value: 300 }, { name: 'Aug', value: 280 }, { name: 'Sep', value: 200 },
      { name: 'Oct', value: 80 }, { name: 'Nov', value: 25 }, { name: 'Dec', value: 10 },
    ],
  };
};

export const DashboardProvider = ({ children }) => {
  const [inputs, setInputs] = useState({
    roofArea: '120',
    dwellers: '4',
    openSpace: '50',
    location: 'Ranchi, Jharkhand',
  });

  const [dashboardData, setDashboardData] = useState(generateMockData(inputs));
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const generateDashboard = () => {
    // In a real app, you would fetch data from APIs here
    const newData = generateMockData(inputs);
    setDashboardData(newData);
  };

  const value = {
    inputs,
    dashboardData,
    handleInputChange,
    generateDashboard,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};