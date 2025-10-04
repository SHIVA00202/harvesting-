import React from 'react';
import { FaWater, FaMapMarkerAlt } from 'react-icons/fa';
import Navbar from './Navbar'; // Import the new Navbar component

const Header = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Left Side: Title */}
      <div className="flex items-center space-x-3">
        <FaWater className="text-3xl text-brand-blue" />
        <h1 className="text-xl font-bold text-gray-800 hidden md:block">
          RTRWH & Artificial Recharge Dashboard
        </h1>
         <h1 className="text-xl font-bold text-gray-800 md:hidden">
          RTRWH Dashboard
        </h1>
      </div>

      {/* Center: Navigation */}
      <div className="hidden lg:flex">
        <Navbar />
      </div>

      {/* Right Side: Location */}
      <div className="flex items-center space-x-2 text-gray-600">
        <FaMapMarkerAlt />
        <span>Ranchi, Jharkhand</span>
      </div>
    </header>
  );
};

export default Header;