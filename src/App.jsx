import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { DashboardProvider } from './context/DashboardContext';
import { motion, AnimatePresence } from 'framer-motion';
import natural from './assets/natural.png';

// Card components
import FeasibilityCheckCard from './components/cards/FeasibilityCheckCard';
import RainfallDataCard from './components/cards/RainfallDataCard';
import RunoffGenerationCard from './components/cards/RunoffGenerationCard';
import AquiferInfoCard from './components/cards/AquiferInfoCard';
import Login from './components/Login';
import Register from './components/Register';
import Signup from './components/Signup';
import Feasibility from './components/Feasibility';
import Harvesting from './components/Harvesting';
import GroundwaterDepthCard from './components/GroundwaterDepthCard';
import CostBenefitCard from './components/CostBenefitCard';

// ================= Layout =================
const Layout = ({ children }) => {
  const location = useLocation();

  const hideLayout =
    location.pathname === '/login' ||
    location.pathname === '/signup' ||
    location.pathname === '/register';

  const hideSidebar = location.pathname === '/feasibility';

  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative overflow-hidden">
      <Header />
      <div className="flex flex-col lg:flex-row flex-grow p-4 lg:p-8 space-y-8 lg:space-y-0 lg:space-x-8">
        {!hideSidebar && <Sidebar />}
        <main className="flex-1 relative">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

// ================= Rain Animation (Used only on Dashboard) =================
const RainAnimation = () => {
  useEffect(() => {
    const container = document.querySelector('.rain-container');
    const numDrops = 70; // Rain intensity

    if (container) {
      container.innerHTML = '';
      for (let i = 0; i < numDrops; i++) {
        const drop = document.createElement('div');
        drop.className = 'rain-drop';
        drop.style.left = `${Math.random() * 100}vw`;
        drop.style.animationDuration = `${0.8 + Math.random()}s`;
        drop.style.animationDelay = `${Math.random()}s`;
        drop.style.height = `${10 + Math.random() * 20}px`;
        container.appendChild(drop);
      }
    }
  }, []);

  return (
    <>
      <div className="rain-container absolute inset-0 overflow-hidden pointer-events-none z-0"></div>
      <style>{`
       .rain-drop {
          position: absolute;
          top: -20px;
          width: 2px;
          background: rgba(0, 0, 0, 0.2);
          border-radius: 50%;
          transform: rotate(-20deg);
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        @keyframes fall {
          0% {
            transform: translateY(0) rotate(-20deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(-20deg);
            opacity: 0.2;
          }
        }
      `}</style>
    </>
  );
};

// ================= Dashboard =================
const Dashboard = () => (
  <AnimatePresence>
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 relative z-10"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: { staggerChildren: 0.1 },
        },
      }}
    >
      {/* Rain only on dashboard */}
      <RainAnimation />

      {/* === Row 1 === */}
       <div className="background-white p-6 rounded-xl shadow-lg flex items-center justify-center relative overflow-hidden"
       > <FeasibilityCheckCard /></div>
     
      <RunoffGenerationCard />
      <div className="background-white p-6 rounded-xl shadow-lg flex items-center justify-center relative overflow-hidden">
        <img src={natural} alt="Natural Water Recharge" className="w-full h-full object-cover opacity-2" />
      </div>

      {/* === Row 2 === */}
      <div className="md:col-span-2 xl:col-span-3">
        <RainfallDataCard />
      </div>

      {/* === Row 3 === */}
      <AquiferInfoCard />
      <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-center text-gray-500">
        <GroundwaterDepthCard />
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-center text-gray-500">
        <CostBenefitCard />
      </div>

      {/* === Row 4 === */}
      <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-center text-gray-500 md:col-span-2 xl:col-span-3">
        Recharge Structure Dimensions Card
      </div>
    </motion.div>
  </AnimatePresence>
);

// ================= App Wrapper =================
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
            <Route path="/harvesting" element={<Harvesting />} />
            <Route path="/feasibility" element={<Feasibility />} />
          </Routes>
        </Layout>
      </Router>
    </DashboardProvider>
  );
};

export default App;
