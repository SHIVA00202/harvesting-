import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// ASSETS
import google from "../assets/google.jpg"; // Ensure this path is correct
import backgroundImage from "../assets/background.png"; // Ensure this is your chosen background

// --- ICONS ---
// Re-using the LeafIcon from the navbar for brand consistency
const LeafIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8">
    <path d="M.93 6.94c.08.05.17.1.25.16l.01.01c.42.3.9.54 1.4.72a9.93 9.93 0 001.38.49c.41.13.82.24 1.24.34A10.01 10.01 0 0110 19a10.01 10.01 0 015.79-1.84c.42-.1.83-.21 1.24-.34a9.93 9.93 0 001.38-.49c.5-.18.98-.42 1.4-.72l.01-.01c.08-.06.17-.11.25-.16a1 1 0 00-1.28-1.55 9.99 9.99 0 01-3.14.99 10.02 10.02 0 00-9.26-.01 9.99 9.99 0 01-3.14-1 1 1 0 10-1.28 1.55zM4.2 8.03A10.013 10.013 0 0110 3a10.013 10.013 0 015.8 5.03l.02.04a1 1 0 001.76-1.04l-.02-.04A12.013 12.013 0 0010 1 12.013 12.013 0 002.44 7.03l-.02.04a1 1 0 101.76 1.04l.02-.04z" />
  </svg>
);

const EnvelopeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
      <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
    </svg>
);


const Register = () => {
  // State for staggered animations
  const [logoVisible, setLogoVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);
  const [linksVisible, setLinksVisible] = useState(false);

  useEffect(() => {
    // Sequentially trigger animations
    const timer1 = setTimeout(() => setLogoVisible(true), 200);
    const timer2 = setTimeout(() => setHeaderVisible(true), 400);
    const timer3 = setTimeout(() => setButtonsVisible(true), 600);
    const timer4 = setTimeout(() => setLinksVisible(true), 800);

    // Cleanup timers on component unmount
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center font-sans bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-sky-900/50 via-slate-900/70 to-teal-900/60" />

      <div className="flex flex-col items-center justify-center w-full px-4 sm:px-6 relative z-10">
        <div
          className="bg-slate-900/30 backdrop-blur-2xl shadow-2xl rounded-3xl w-full max-w-md p-6 sm:p-10 text-center border-2 border-white/10"
        >
          {/* 1. Thematic Logo Animation */}
          <div className={`transition-all duration-700 ease-out ${logoVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <div className="inline-block p-3 bg-sky-500/10 rounded-full mb-4 border border-sky-400/20">
              <LeafIcon />
            </div>
          </div>
          
          {/* 2. Header Animation */}
          <div className={`transition-all duration-700 ease-out delay-200 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <h1 className="text-4xl sm:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-teal-300 [text-shadow:_0_2px_4px_rgb(0_0_0_/_20%)]">
              Begin Your Harvest
            </h1>
            <p className="text-sky-100/80 text-sm sm:text-base mb-8">
              Join ProjectVarsha and cultivate your potential.
            </p>
          </div>
          
          {/* 3. Buttons Animation */}
          <div className={`transition-all duration-700 ease-out delay-400 ${buttonsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {/* Primary Button with Shine Effect */}
            <button className="group relative w-full py-3 mb-4 rounded-xl bg-sky-500 text-white font-semibold shadow-lg hover:bg-sky-600 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 focus:ring-offset-slate-900 overflow-hidden flex items-center justify-center gap-2">
                <span className="absolute left-0 top-0 h-full w-full bg-white/20 -translate-x-full transition-transform duration-500 ease-in-out group-hover:translate-x-0" />
                <EnvelopeIcon />
                <span className="relative">Sign Up with Email or Phone</span>
            </button>
            {/* Secondary Button */}
            <button className="w-full py-3 mb-4 rounded-xl bg-white/80 backdrop-blur-sm text-slate-800 font-medium shadow-md hover:bg-white transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center">
              <img src={google} alt="Google Logo" className="w-5 h-5 mr-3" />
              Continue with Google
            </button>
          </div>
          
          {/* 4. Links Animation */}
          <div className={`transition-all duration-700 ease-out delay-[600ms] ${linksVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <hr className="my-6 border-t border-slate-600/50" />
            
            <p className="text-sm text-slate-300">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-sky-400 hover:text-sky-300 hover:underline transition">
                Log In
              </Link>
            </p>

            <p className="text-xs text-slate-400/80 mt-8">
              By signing up, you agree to our{" "}
              <Link to="/terms" className="text-sky-400/80 hover:text-sky-300">Terms</Link>{" "}and{" "}
              <Link to="/privacy" className="text-sky-400/80 hover:text-sky-300">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;