import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import google from "../assets/google.jpg";
import backgroundImage from "../assets/background.png"; // Same as Login/Register

// --- ICONS ---
const LeafIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-8 h-8">
    <path d="M.93 6.94c.08.05.17.1.25.16l.01.01c.42.3.9.54 1.4.72a9.93 9.93 0 001.38.49c.41.13.82.24 1.24.34A10.01 10.01 0 0110 19a10.01 10.01 0 015.79-1.84c.42-.1.83-.21 1.24-.34a9.93 9.93 0 001.38-.49c.5-.18.98-.42 1.4-.72l.01-.01c.08-.06.17-.11.25-.16a1 1 0 00-1.28-1.55 9.99 9.99 0 01-3.14.99 10.02 10.02 0 00-9.26-.01 9.99 9.99 0 01-3.14-1 1 1 0 10-1.28 1.55zM4.2 8.03A10.013 10.013 0 0110 3a10.013 10.013 0 015.8 5.03l.02.04a1 1 0 001.76-1.04l-.02-.04A12.013 12.013 0 0010 1 12.013 12.013 0 002.44 7.03l-.02.04a1 1 0 101.76 1.04l.02-.04z" />
  </svg>
);

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // For staged animations
  const [logoVisible, setLogoVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [linksVisible, setLinksVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const t1 = setTimeout(() => setLogoVisible(true), 200);
    const t2 = setTimeout(() => setHeaderVisible(true), 400);
    const t3 = setTimeout(() => setFormVisible(true), 600);
    const t4 = setTimeout(() => setLinksVisible(true), 800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // TODO: replace with your API logic
      if (email && password && name) {
        localStorage.setItem("user", JSON.stringify({ name, email }));
        navigate("/");
      } else {
        setError("Please fill in all fields");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    // TODO: Add Google signup logic
    alert("Google signup clicked!");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center font-sans bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-sky-900/50 via-slate-900/70 to-teal-900/60" />

      <div className="flex flex-col items-center justify-center w-full px-4 sm:px-6 relative z-10">
        <div className="bg-slate-900/30 backdrop-blur-2xl shadow-2xl rounded-3xl w-full max-w-md p-6 sm:p-10 text-center border-2 border-white/10">
          
          {/* Logo */}
          <div className={`transition-all duration-700 ${logoVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
            <div className="inline-block p-3 bg-sky-500/10 rounded-full mb-4 border border-sky-400/20">
              <LeafIcon />
            </div>
          </div>

          {/* Header */}
          <div className={`transition-all duration-700 delay-200 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <h1 className="text-4xl sm:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-teal-300">
              Create Account
            </h1>
            <p className="text-sky-100/80 text-sm sm:text-base mb-6">
              Join ProjectVarsha today
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={submitHandler}
            className={`transition-all duration-700 delay-400 ${formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 text-sm placeholder-gray-400"
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 text-sm placeholder-gray-400"
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 mb-6 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 text-sm placeholder-gray-400"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mb-4 rounded-xl bg-sky-500 text-white font-semibold shadow-lg hover:bg-sky-600 transition-all duration-300"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>

            <button
              type="button"
              onClick={handleGoogleSignup}
              className="w-full py-3 mb-4 rounded-xl bg-white/80 backdrop-blur-sm text-slate-800 font-medium shadow-md hover:bg-white transition-all duration-300 flex items-center justify-center"
            >
              <img src={google} alt="Google Logo" className="w-5 h-5 mr-3" />
              Sign up with Google
            </button>
          </form>

          {/* Links */}
          <div className={`transition-all duration-700 delay-600 ${linksVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            <p className="text-sm text-slate-300 mb-3">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-sky-400 hover:text-sky-300">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
