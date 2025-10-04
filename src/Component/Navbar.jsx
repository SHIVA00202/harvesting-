import React from 'react';
import { NavLink } from 'react-router-dom';

// Icon for the brand/logo - represents growth/harvesting
const LeafIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
    <path d="M.93 6.94c.08.05.17.1.25.16l.01.01c.42.3.9.54 1.4.72a9.93 9.93 0 001.38.49c.41.13.82.24 1.24.34A10.01 10.01 0 0110 19a10.01 10.01 0 015.79-1.84c.42-.1.83-.21 1.24-.34a9.93 9.93 0 001.38-.49c.5-.18.98-.42 1.4-.72l.01-.01c.08-.06.17-.11.25-.16a1 1 0 00-1.28-1.55 9.99 9.99 0 01-3.14.99 10.02 10.02 0 00-9.26-.01 9.99 9.99 0 01-3.14-1 1 1 0 10-1.28 1.55zM4.2 8.03A10.013 10.013 0 0110 3a10.013 10.013 0 015.8 5.03l.02.04a1 1 0 001.76-1.04l-.02-.04A12.013 12.013 0 0010 1 12.013 12.013 0 002.44 7.03l-.02.04a1 1 0 101.76 1.04l.02-.04z" />
  </svg>
);

// Icon for the AI button
const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path fillRule="evenodd" d="M10.868 2.884c.321.64.321 1.415 0 2.055a7.5 7.5 0 01-1.071 9.183c.64.321 1.415.321 2.055 0a7.5 7.5 0 019.183-1.071c.321-.64.321-1.415 0-2.055a7.5 7.5 0 011.071-9.183c-.64-.321-1.415-.321-2.055 0a7.5 7.5 0 01-9.183 1.071zM11.204 1.904a.75.75 0 00-1.06-.053L8.29 3.706a.75.75 0 00-.053 1.06l1.855 1.854a.75.75 0 001.06.053l1.855-1.854a.75.75 0 00.053-1.06L11.204 1.904z" clipRule="evenodd" />
    </svg>
);

const Navbar = () => {
    // A function to handle link classes, making it cleaner
    const getLinkClassName = ({ isActive }) => {
        const baseClasses = "relative group px-3 py-2 rounded-md text-sm font-medium text-slate-700 transition-colors duration-300";
        const activeClasses = "font-semibold text-sky-600";
        const underlineClasses = "after:content-[''] after:absolute after:bottom-[5px] after:left-0 after:h-[2px] after:w-full after:bg-sky-500 after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-in-out";
        const activeUnderline = "after:scale-x-100";
    
        return `${baseClasses} ${underlineClasses} ${isActive ? `${activeClasses} ${activeUnderline}` : ''}`;
      };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-sky-50/80 backdrop-blur-lg shadow-sm border-b border-sky-200/75">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo with Thematic Icon and Gradient Text */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex items-center gap-2 text-xl font-bold">
                <span className="text-sky-500"><LeafIcon /></span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-teal-600">
                    ProjectVarsha
                </span>
            </NavLink>
          </div>

          {/* Elegant Navigation Links with Underline Effect */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavLink to="/" className={getLinkClassName}>Home</NavLink>
            <NavLink to="/fesibility" className={getLinkClassName}>Feasibility</NavLink>
            <NavLink to="/harvesting" className={getLinkClassName}>Harvesting</NavLink>
            <NavLink to="/arvr" className={getLinkClassName}>AR/VR</NavLink>
          </div>
          
          {/* Thematic CTA Buttons */}
          <div className="flex items-center space-x-3">
            <NavLink
              to="/ai"
              className="flex items-center gap-2 text-white font-semibold bg-gradient-to-r from-sky-500 to-green-500 px-4 py-2 rounded-full shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
            >
              <SparklesIcon />
              Varsha AI
            </NavLink>
            <NavLink
              to="/register"
              className="hidden sm:block text-sky-600 font-semibold px-4 py-2 rounded-full border-2 border-sky-500 hover:bg-sky-500 hover:text-white transition-colors duration-300"
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;