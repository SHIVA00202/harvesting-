import React from 'react';

const Footer = () => {
  // Define key links and details
  const currentYear = new Date().getFullYear();
  const brandName = "AquaSense"; // Placeholder for your application's brand name
  const cgwbLink = "http://cgwb.gov.in/";

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-8 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: Logo, Tip, and Grid Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-gray-200">
          
          {/* Column 1: Brand/Logo and Tip */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-700">
                {brandName}
            </h3>
            <p className="text-sm font-medium text-emerald-700 flex items-start space-x-2">
                <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span className="text-gray-600">Tip: **Harvesting water** is essential for long-term sustainable resource management in arid regions.</span>
            </p>
          </div>

          {/* Column 2: Resources */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href={cgwbLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-600 hover:text-blue-600 transition duration-150 text-sm"
                >
                  CGWB Official Portal
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition duration-150 text-sm">
                  Technical Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition duration-150 text-sm">
                  Climate Data API
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Company/Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition duration-150 text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition duration-150 text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition duration-150 text-sm">
                  Cookie Preferences
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:support@aquasense.com" className="text-gray-600 hover:text-blue-600 transition duration-150 text-sm">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition duration-150 text-sm">
                  FAQ / Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition duration-150 text-sm">
                  System Status
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section: Copyright */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
          <div>
            &copy; {currentYear} {brandName}. All rights reserved.
          </div>
          <div className="mt-2 sm:mt-0 text-gray-400">
            Powered by Sustainable Water Intelligence
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
