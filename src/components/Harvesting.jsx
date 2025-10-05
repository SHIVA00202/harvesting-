import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import "leaflet/dist/leaflet.css";
import { motion, AnimatePresence } from "framer-motion";

const Harvesting = () => {
  const [roofArea, setRoofArea] = useState(5000);
  const [dwellers, setDwellers] = useState(55);
  const [openSpace, setOpenSpace] = useState(110);
  const [location, setLocation] = useState([28.6139, 77.209]); // Delhi default
  const [results, setResults] = useState(null);
  const [mapOpen, setMapOpen] = useState(false);

  const monthlyRainfallData = [
    { month: "Jan", rainfall: 40 },
    { month: "Feb", rainfall: 50 },
    { month: "Mar", rainfall: 80 },
    { month: "Apr", rainfall: 60 },
    { month: "May", rainfall: 20 },
    { month: "Jun", rainfall: 10 },
    { month: "Jul", rainfall: 200 },
    { month: "Aug", rainfall: 250 },
    { month: "Sep", rainfall: 220 },
    { month: "Oct", rainfall: 100 },
    { month: "Nov", rainfall: 50 },
    { month: "Dec", rainfall: 30 },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const roof = parseFloat(roofArea) || 0;
    const people = parseInt(dwellers) || 0;
    const space = parseFloat(openSpace) || 0;
    const avgAnnualRainfall = monthlyRainfallData.reduce(
      (sum, m) => sum + m.rainfall,
      0
    );
    const runoff = Math.round(roof * avgAnnualRainfall * 0.85);

    let feasibility = "Low";
    if (roof >= 100 && people >= 4 && space >= 50) feasibility = "High";
    else if (roof >= 50 && people >= 2 && space >= 20) feasibility = "Medium";

    const radarData = [
      { metric: "Roof Area", value: Math.min((roof / 150) * 100, 100) },
      { metric: "Water Consumption", value: Math.min((people / 10) * 100, 100) },
      { metric: "Rainfall", value: Math.min((avgAnnualRainfall / 1200) * 100, 100) },
      { metric: "Open Space", value: Math.min((space / 100) * 100, 100) },
      { metric: "Feasibility", value: feasibility === "High" ? 100 : feasibility === "Medium" ? 60 : 30 },
    ];

    // Suggested structures based on space
    const suggestedStructures = [];
    if (space >= 50) suggestedStructures.push("Recharge Pit", "Recharge Shaft", "Trench");
    else if (space >= 20) suggestedStructures.push("Recharge Pit", "Trench");
    else suggestedStructures.push("Rain Barrel / Tank");

    setResults({ runoff, feasibility, radarData, suggestedStructures });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 via-blue-50 to-teal-50 p-4 md:p-8 font-inter">
      {/* Header */}
      <header className="mb-8 flex flex-col md:flex-row justify-between items-center">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-green-800 mb-4 md:mb-0"
        >
          💧 Rainwater Harvesting Dashboard
        </motion.h1>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Enter Location"
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-md"
          />
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition transform hover:scale-105 shadow-md">
            Update Location
          </button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Input Form */}
        <motion.div
          className="md:w-1/4 bg-white p-6 rounded-2xl shadow-xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-green-700">Input Details</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="number"
              placeholder="Roof Area (sqm)"
              value={roofArea}
              onChange={(e) => setRoofArea(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
              required
            />
            <input
              type="number"
              placeholder="Number of Dwellers"
              value={dwellers}
              onChange={(e) => setDwellers(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
              required
            />
            <input
              type="number"
              placeholder="Available Open Space (sqm)"
              value={openSpace}
              onChange={(e) => setOpenSpace(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-sm"
              required
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition transform hover:scale-105 shadow-md"
            >
              Calculate
            </button>
          </form>
        </motion.div>

        {/* Dashboard Cards */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feasibility */}
          <motion.div
            className={`bg-white p-6 rounded-2xl shadow-xl text-center hover:shadow-2xl transition transform hover:scale-105 ${
              results?.feasibility === "High"
                ? "text-green-700"
                : results?.feasibility === "Medium"
                ? "text-yellow-600"
                : "text-red-500"
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-lg font-semibold mb-2">Feasibility</h3>
            <div className="text-2xl font-bold">{results?.feasibility || "N/A"}</div>
          </motion.div>

          {/* Runoff */}
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:scale-105"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-lg font-semibold mb-2">Estimated Runoff</h3>
            <div className="text-2xl font-bold text-blue-600">{results?.runoff ? `${results.runoff} L` : "N/A"}</div>
          </motion.div>

          {/* Suggested Structures */}
          {results && (
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:scale-105"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-lg font-semibold mb-2 text-green-700">Suggested Structures</h3>
              <ul className="list-disc list-inside space-y-1">
                {results.suggestedStructures.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className="text-gray-700 font-medium"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Radar Chart */}
          {results && (
            <motion.div
              className="bg-white p-6 rounded-2xl shadow-xl col-span-1 md:col-span-2 hover:shadow-2xl transition transform hover:scale-105"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-lg font-semibold mb-2 text-center text-green-700">
                Harvesting Potential Radar
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <RadarChart data={results.radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Potential"
                    dataKey="value"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </motion.div>
          )}

          {/* Rainfall Line Chart */}
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-xl col-span-1 md:col-span-2 hover:shadow-2xl transition transform hover:scale-105"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-lg font-semibold mb-2 text-green-700">Monthly Rainfall (mm)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={monthlyRainfallData}>
                <XAxis dataKey="month" stroke="#16a34a" />
                <YAxis stroke="#16a34a" />
                <Tooltip wrapperStyle={{ backgroundColor: "#f0fdf4", borderRadius: "8px" }} />
                <Line type="monotone" dataKey="rainfall" stroke="#16a34a" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Map */}
          <motion.div
            className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:scale-105 col-span-1 md:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3
              className="text-lg font-semibold mb-2 text-green-700 cursor-pointer"
              onClick={() => setMapOpen(!mapOpen)}
            >
              Selected Location {mapOpen ? "(Click to Minimize)" : "(Click to Expand)"}
            </h3>
            <div className={`${mapOpen ? "h-96" : "h-48"} transition-all duration-500`}>
              <MapContainer center={location} zoom={13} className="w-full h-full rounded-lg">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={location}>
                  <Popup>Selected Location</Popup>
                </Marker>
              </MapContainer>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-600">
        <p>
          💧 Learn more about rainwater harvesting at{" "}
          <a href="https://cgwb.gov.in" className="text-blue-600 underline">
            CGWB
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Harvesting;
