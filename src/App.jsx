import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { DashboardProvider } from './context/DashboardContext';
import { motion, AnimatePresence } from 'framer-motion';

// Card components
import FeasibilityCheckCard from './components/cards/FeasibilityCheckCard';
import RainfallDataCard from './components/cards/RainfallDataCard';
import RunoffGenerationCard from './components/cards/RunoffGenerationCard';
import AquiferInfoCard from './components/cards/AquiferInfoCard';
import Login from './components/Login';
import Register from './components/Register';
import Signup from './components/Signup';
import Feasibility from './components/Feasibility';

// Layout wrapper to hide header/sidebar/footer on auth pages
const Layout = ({ children }) => {
  const location = useLocation();

  // Condition to hide the ENTIRE layout (for login, etc.)
  const hideLayout =
    location.pathname === '/login' ||
    location.pathname === '/signup' ||
    location.pathname === '/register';

  // New condition to hide ONLY the sidebar
  const hideSidebar = location.pathname === '/feasibility';

  if (hideLayout) {
    return <>{children}</>; // Show only the page (no layout)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-col lg:flex-row flex-grow p-4 lg:p-8 space-y-8 lg:space-y-0 lg:space-x-8">
        
        {/* Conditionally render the Sidebar based on the new condition */}
        {!hideSidebar && <Sidebar />}

        <main className="flex-1">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

const Dashboard = () => (
  <AnimatePresence>
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {/* === Row 1 === */}
      <FeasibilityCheckCard />
      <RunoffGenerationCard />
      <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-center text-gray-500">
        Suggested Structures Card
      </div>

      {/* === Row 2 === */}
      <div className="md:col-span-2 xl:col-span-3">
        <RainfallDataCard />
      </div>

      {/* === Row 3 === */}
      <AquiferInfoCard />
      <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-center text-gray-500">
        Groundwater Depth Card
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-center text-gray-500">
        Cost & Benefit Card
      </div>

      {/* === Row 4 === */}
      <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-center text-gray-500 md:col-span-2 xl:col-span-3">
        Recharge Structure Dimensions Card
      </div>
    </motion.div>
  </AnimatePresence>
);

const App = () => {
  return (
    <DashboardProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/feasibility" element={<Feasibility />} />
          </Routes>
        </Layout>
      </Router>
    </DashboardProvider>
  );
};

export default App;