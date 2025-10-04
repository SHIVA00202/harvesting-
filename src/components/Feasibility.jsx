import React, { useState } from 'react';
import { FaRulerCombined, FaUsers, FaMapMarkedAlt, FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

// A reusable input field component for our form
const InputField = ({ icon, label, name, value, onChange, placeholder, unit }) => (
    <div>
        <label htmlFor={name} className="flex items-center text-sm font-medium text-gray-700 mb-1">
            {icon}
            <span className="ml-2">{label}</span>
        </label>
        <div className="relative">
            <input
                type="text"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full pl-3 pr-12 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {unit && <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 text-sm">{unit}</span>}
        </div>
    </div>
);

const Feasibility = () => {
    // State to hold the user's form inputs
    const [formData, setFormData] = useState({
        roofArea: '',
        dwellers: '',
        location: 'Ranchi',
    });

    // State to hold the calculated results after submission
    const [results, setResults] = useState(null);

    // Function to handle changes in the input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Mock calculation function
    const calculateFeasibility = (inputs) => {
        const area = parseFloat(inputs.roofArea) || 0;
        const people = parseInt(inputs.dwellers) || 0;

        let feasibility = 'Low';
        let icon = <FaTimesCircle className="text-red-500" />;
        let color = 'text-red-500';
        if (area >= 100 && people >= 4) {
            feasibility = 'High';
            icon = <FaCheckCircle className="text-green-500" />;
            color = 'text-green-500';
        } else if (area >= 50 && people >= 2) {
            feasibility = 'Medium';
            icon = <FaExclamationTriangle className="text-yellow-500" />;
            color = 'text-yellow-500';
        }
        
        return {
            feasibility,
            icon,
            color,
            runoff: (area * 750 * 0.85).toLocaleString('en-IN'), // Assuming 750mm avg rainfall & 0.85 coeff.
            suggestion: `With a ${area} sq. m roof and ${people} dwellers, the potential for rainwater harvesting is ${feasibility}. You could potentially harvest up to ${(area * 750 * 0.85).toLocaleString('en-IN')} liters annually.`,
            rainfall: [
              { name: 'Jun', value: 250 }, { name: 'Jul', value: 300 }, { name: 'Aug', value: 280 }, { name: 'Sep', value: 200 },
            ],
        };
    };

    // Function to handle the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const calculatedResults = calculateFeasibility(formData);
        setResults(calculatedResults);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Feasibility Calculator</h1>
                <p className="text-gray-600 mb-8">Enter your details below to get a custom rainwater harvesting assessment.</p>

                {/* === Input Form === */}
                <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                        <InputField
                            icon={<FaRulerCombined />}
                            label="Roof Area"
                            name="roofArea"
                            value={formData.roofArea}
                            onChange={handleChange}
                            placeholder="e.g., 120"
                            unit="sq. m"
                        />
                        <InputField
                            icon={<FaUsers />}
                            label="Number of Dwellers"
                            name="dwellers"
                            value={formData.dwellers}
                            onChange={handleChange}
                            placeholder="e.g., 4"
                        />
                        <button
                            type="submit"
                            className="w-full h-10 bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
                        >
                            Calculate
                        </button>
                    </form>
                </div>

                {/* === Results Section (Conditionally Rendered) === */}
                <AnimatePresence>
                    {results && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white p-8 rounded-xl shadow-lg"
                        >
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Assessment Results</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Suggestion and Metrics */}
                                <div className="space-y-4">
                                    <div className="flex items-center text-3xl font-bold space-x-3">
                                        {results.icon}
                                        <span className={results.color}>{results.feasibility} Feasibility</span>
                                    </div>
                                    <p className="text-gray-700 text-lg">{results.suggestion}</p>
                                    <div className="bg-indigo-50 p-4 rounded-lg">
                                        <p className="text-sm font-semibold text-indigo-800">Potential Annual Water Harvest</p>
                                        <p className="text-2xl font-bold text-indigo-600">{results.runoff} Liters</p>
                                    </div>
                                </div>
                                {/* Graph */}
                                <div className="h-64">
                                    <h3 className="text-lg font-semibold mb-2 text-gray-700">Peak Rainfall Months (mm)</h3>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={results.rainfall}>
                                            <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                                            <YAxis stroke="#6b7280" fontSize={12} />
                                            <Tooltip wrapperClassName="!bg-white !border-gray-300 !rounded-lg !shadow-lg" />
                                            <Bar dataKey="value" name="Rainfall (mm)" fill="#4f46e5" barSize={40} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Feasibility;