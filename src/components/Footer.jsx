import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white mt-8 p-4 text-center text-gray-600 shadow-inner">
      <p className="font-semibold">💧 Tip: Harvested rainwater is great for gardening and reduces your water bill!</p>
      <div className="mt-2">
        <a href="http://cgwb.gov.in/" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline">
          Visit Central Ground Water Board (CGWB)
        </a>
      </div>
    </footer>
  );
};

export default Footer;