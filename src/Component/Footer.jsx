import React, { useState, useEffect } from 'react';

// --- ICONS ---
const LeafIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path d="M.93 6.94c.08.05.17.1.25.16l.01.01c.42.3.9.54 1.4.72a9.93 9.93 0 001.38.49c.41.13.82.24 1.24.34A10.01 10.01 0 0110 19a10.01 10.01 0 015.79-1.84c.42-.1.83-.21 1.24-.34a9.93 9.93 0 001.38-.49c.5-.18.98-.42 1.4-.72l.01-.01c.08-.06.17-.11.25-.16a1 1 0 00-1.28-1.55 9.99 9.99 0 01-3.14.99 10.02 10.02 0 00-9.26-.01 9.99 9.99 0 01-3.14-1 1 1 0 10-1.28 1.55zM4.2 8.03A10.013 10.013 0 0110 3a10.013 10.013 0 015.8 5.03l.02.04a1 1 0 001.76-1.04l-.02-.04A12.013 12.013 0 0010 1 12.013 12.013 0 002.44 7.03l-.02.04a1 1 0 101.76 1.04l.02-.04z" />
  </svg>
);

const LightBulbIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path fillRule="evenodd" d="M10 2a.75.75 0 01.75.75v1.25a.75.75 0 01-1.5 0V2.75A.75.75 0 0110 2zM5.404 4.343a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 11-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zm9.192 0a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM10 4.25a5.75 5.75 0 100 11.5 5.75 5.75 0 000-11.5zM2.75 10a.75.75 0 01.75-.75h1.25a.75.75 0 010 1.5H3.5a.75.75 0 01-.75-.75zm12.25 0a.75.75 0 01.75-.75h1.25a.75.75 0 010 1.5h-1.25a.75.75 0 01-.75-.75zM5.404 15.657a.75.75 0 011.06 0l1.06-1.061a.75.75 0 111.06 1.06l-1.06 1.06a.75.75 0 01-1.06 0zm9.192-1.06a.75.75 0 010-1.06l-1.06 1.06a.75.75 0 11-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zM10 15.25a.75.75 0 01.75.75v1.25a.75.75 0 01-1.5 0v-1.25A.75.75 0 0110 15.25z" clipRule="evenodd" />
    </svg>
);

// Array of tips to be displayed dynamically
const tips = [
  "A simple mesh filter over drain pipes can prevent leaves from clogging your system.",
  "For every 100 sq. meters of roof area, you can harvest over 55,000 liters of water annually in an average rainfall zone.",
  "The first 10-20 minutes of rain (first flush) should be diverted to clean the roof before collecting water.",
  "Regularly clean your storage tanks and recharge structures before the monsoon season begins for best results.",
];

const Footer = () => {
  const [currentTip, setCurrentTip] = useState('');

  // Effect to pick a random tip when the component mounts
  useEffect(() => {
    setCurrentTip(tips[Math.floor(Math.random() * tips.length)]);
  }, []);

  return (
    <footer className="bg-white/70 backdrop-blur-md border-t border-gray-200/80">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* Column 1: Branding & Project Info */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sky-500"><LeafIcon /></span>
              <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-teal-600">
                ProjectVarsha
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Sustainable water management through technology. An initiative for a water-secure future in Ranchi.
            </p>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-md font-semibold text-gray-800 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="https://cgwb.gov.in" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-sky-600 transition-colors">CGWB Official Site</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-sky-600 transition-colors">Project Methodology</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-sky-600 transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          {/* Column 3: Dynamic Educational Tip */}
          <div>
            <h3 className="text-md font-semibold text-gray-800 tracking-wider uppercase flex items-center justify-center md:justify-start gap-2">
              <LightBulbIcon className="text-amber-500" />
              Water Wise Tip
            </h3>
            <p className="mt-4 text-sm text-gray-600 bg-sky-50/50 p-3 rounded-lg border border-sky-200/50">
              {currentTip}
            </p>
          </div>

        </div>
        
        {/* Bottom Bar: Copyright and Location */}
        <div className="mt-8 pt-6 border-t border-gray-200/80 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} ProjectVarsha Dashboard. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;