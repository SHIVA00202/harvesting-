import React from 'react';
import { MapPinIcon } from '@heroicons/react/24/solid';

const Header = () => (
  <header className="bg-white shadow-md p-4 flex justify-between items-center">
    <h1 className="text-xl font-bold text-gray-800">RTRWH & Artificial Recharge Dashboard</h1>
    <div className="flex items-center space-x-2 text-sm text-gray-600">
      <MapPinIcon className="h-5 w-5 text-red-500" />
      <span>Ranchi, Jharkhand</span>
    </div>
  </header>
);

export default Header;