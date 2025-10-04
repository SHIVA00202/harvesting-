import React from 'react';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const DashboardCard = ({ title, icon, children }) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col"
      variants={cardVariants}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center mb-4">
        <div className="text-2xl text-brand-blue mr-3">{icon}</div>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      </div>
      <div className="flex-grow">{children}</div>
    </motion.div>
  );
};

export default DashboardCard;