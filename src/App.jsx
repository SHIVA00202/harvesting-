import React, { createContext, useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all your components from the single 'Component' folder
import Home from './Component/Home';
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import Login from './Component/Login';
import Register from './Component/Register';
import Signup from './Component/Signup';
import Profile from './Component/Profile';
import Feasibility from './Component/Fesibility'; // Note: spelling from your image
import Harvesting from './Component/Harvesting';
import Arvr from './Component/Arvr';
import Aiiii from './Component/Aiiii';
import DashboardCard from './Component/DashboardCard';
import FeasibilityCard from './Component/DashboardCard';

// --- State Management (Context API) ---
const DashboardContext = createContext();
export const useDashboard = () => useContext(DashboardContext);

// Placeholder for calculation logic
const calculateDashboardData = (inputs) => {
  const feasibilityScore = Math.random();
  return {
    feasibility: feasibilityScore > 0.66 ? 'High' : feasibilityScore > 0.33 ? 'Medium' : 'Low',
    runoffCapacity: inputs.roofArea * 750,
    groundwaterDepth: 10 + Math.random() * 5,
    estimatedCost: inputs.roofArea * 250,
  };
};

const DashboardProvider = ({ children }) => {
  const [inputs, setInputs] = useState({ roofArea: 100, dwellers: 4, openSpace: 50, location: 'Ranchi' });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setResults(calculateDashboardData(inputs));
      setLoading(false);
    }, 1000);
  };

  const value = { inputs, results, loading, handleInputChange, handleSubmit };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

function App() {
  return (
    <DashboardProvider>
      <Router>
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<DashboardCard />} />
           
            <Route path="/arvr" element={<Arvr />} />
            <Route path="/ai" element={<Aiiii />} />
          </Routes>
        </main>
        {/* Footer can be here if you want it on every page */}
      </Router>
    </DashboardProvider>
  );
}

export default App;