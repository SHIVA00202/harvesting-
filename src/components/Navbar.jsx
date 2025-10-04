import React from 'react';
import { TbSparkles } from "react-icons/tb";
import { Link } from 'react-router-dom';

const NavLink = ({ children, to = "#" }) => (
  <Link
    to={to}
    className="text-slate-600 font-medium hover:text-blue-700 transition-colors duration-300 relative group px-4 py-2"
  >
    {children}
    <span className="absolute bottom-1 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center"></span>
  </Link>
);

const Navbar = () => {
  return (
    // Updated navbar with a subtle "greenery to water" gradient background
    <nav className="flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-50 to-sky-100 p-2 rounded-full shadow-lg border border-gray-200">
      
      {/* Updated to use the 'to' prop for routing */}
      <NavLink to="/feasibility">Feasibility</NavLink>
      <NavLink to="/harvesting">Harvesting</NavLink>
      <NavLink to="/ar-vs">AR/VS</NavLink>

      {/* "Varsha AI" Button */}
      <Link
        to="/varsha-ai"
        className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-sky-600 text-white font-bold py-2 px-5 rounded-full hover:shadow-lg hover:shadow-cyan-500/40 hover:-translate-y-px transition-all duration-300 text-sm"
      >
        <TbSparkles className="text-cyan-200 text-lg" />
        Varsha AI
      </Link>
      
      {/* "Register" Button */}
      <Link
        to="/register"
        className="bg-white text-blue-700 border border-blue-300 font-bold py-2 px-5 rounded-full hover:bg-blue-50 hover:border-blue-400 hover:-translate-y-px transition-all duration-300 text-sm"
      >
        Register
      </Link>
    </nav>
  );
};

export default Navbar;