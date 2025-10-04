import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import heroBackground from "../assets/g2.png";

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Home = () => {
  const navigate=useNavigate()
  return (
    <div className="relative w-full h-screen overflow-hidden font-inter">
      {/* Background Image with Ken Burns, Gradient & Vignette */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main image */}
        <img
          src={heroBackground}
          alt="Water conservation background"
          className="w-full h-full object-cover scale-110 animate-kenburns brightness-[0.8] contrast-[1.1] saturate-[1.2]"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-950/80 via-slate-900/70 to-teal-900/80 mix-blend-multiply" />

        {/* Soft light for text readability */}
        <div className="absolute inset-0 bg-sky-900/20 backdrop-blur-[2px]" />

        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.6)_100%)]" />
      </div>

      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full z-20">
        <Navbar />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-6 md:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl backdrop-blur-xl bg-white/10 p-10 md:p-16 rounded-[2rem] shadow-[0_0_30px_rgba(255,255,255,0.1)] border border-white/20"
        >
          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6 bg-gradient-to-r from-sky-300 via-teal-200 to-sky-100 text-transparent bg-clip-text"
          >
            Transforming Water Scarcity into Security
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-xl text-sky-100/90 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            Harness the power of data and geospatial intelligence to assess
            rooftop rainwater harvesting potential and enable aquifer recharge
            for a sustainable tomorrow.
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={itemVariants}>
            <Link
              to="/dashboard"
              className="group relative inline-block text-lg font-semibold 
              text-white bg-gradient-to-r from-sky-500 to-teal-500 
              py-4 px-10 rounded-full shadow-lg overflow-hidden
              hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] transition-all duration-300 ease-out"
            >
              <span
                className="absolute left-0 top-0 h-full w-full 
                bg-white/20 -translate-x-full transition-transform 
                duration-700 ease-in-out group-hover:translate-x-0 rounded-full"
              />
              <span className="relative z-10 tracking-wide" onClick={()=>{navigate('/dashboard')}}>
                Go to Dashboard → 
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
