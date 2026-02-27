import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { FiArrowRight, FiCheck } from "react-icons/fi";

// Construction background image from Pexels - High-quality construction site
const heroImg = "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1920";

/* ===============================
   ANIMATION VARIANTS
   
   Purpose: Define reusable animation patterns for smooth entrance effects.
   All animations use transform/opacity to prevent layout shifts and
   ensure 60fps performance on all devices.
================================ */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Each child animates 0.15s after previous
      delayChildren: 0.2      // Wait 0.2s before starting stagger
    }
  }
};

const statVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

/* ===============================
   COMPANY STATS DATA
   
   Centralized stats to avoid duplication and make updates easier.
   These numbers highlight Elevare's experience and reliability.
================================ */
const COMPANY_STATS = {
  yearsExperience: "10+",
  projectsCompleted: "1500+",
  clientRating: "4.8/5",
  satisfactionRate: "98%"
};

/* ===============================
   KEY FEATURES DATA
   
   Quick highlights displayed as badge pills in the hero section.
================================ */
const KEY_FEATURES = [
  `${COMPANY_STATS.yearsExperience} Years Experience`,
  `${COMPANY_STATS.projectsCompleted} Projects Delivered`,
  `${COMPANY_STATS.satisfactionRate} Client Satisfaction`
];

/* ===============================
   DETAILED STATS FOR STATS SECTION
   
   Full statistics with labels for the bottom stats bar.
================================ */
const DETAILED_STATS = [
  { value: COMPANY_STATS.yearsExperience, label: "Years of Excellence" },
  { value: COMPANY_STATS.projectsCompleted, label: "Projects Completed" },
  { value: COMPANY_STATS.clientRating, label: "Client Rating" },
  { value: COMPANY_STATS.satisfactionRate, label: "Satisfaction Rate" }
];

/* ===============================
   CONSTRUCTION HERO SECTION
   
   Main hero for Construction & Property service pages.
   Features:
   - Full-screen hero with construction site background
   - SEO-optimized heading with "Construction Project Management Nigeria"
   - Animated stats and features
   - Dual CTA buttons
   - Responsive design
================================ */
export default function ConstructionHeroSection() {
  
  /* SEO METADATA - Set document title and meta tags for search engines */
  useEffect(() => {
    document.title = "Construction & Project Management Nigeria | Elevare Projects Ltd";
    
    // Set or update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Expert construction project management in Nigeria. 10+ years delivering residential, commercial, and infrastructure projects across Lagos, Abuja, and beyond. Quality you can build on.";
    
    // Set or update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = "Construction Project Management Nigeria, Architecture Services Lagos, Project Management Abuja, Construction Company Nigeria, Building Construction Nigeria";
  }, []);

  return (
    <section 
      className="relative w-full min-h-screen flex items-center overflow-hidden"
      aria-label="Construction Services Hero Section"
    >
      
      {/* BACKGROUND IMAGE WITH PARALLAX EFFECT
          
          Starts at 110% scale and zooms to 100% for depth.
          Using transform ensures GPU acceleration and smooth 60fps animation.
      */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img
          src={heroImg}
          alt="Modern construction site with cranes and building framework showcasing Elevare Projects construction management expertise"
          className="h-full w-full object-cover"
          width="1920"
          height="1080"
          loading="eager"
        />
      </motion.div>

      {/* GRADIENT OVERLAY
          
          Dark gradient ensures text readability against construction imagery.
          Matches AboutHero styling for consistent brand experience.
      */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#001F3F]/85 via-[#001F3F]/75 to-[#001F3F]/90" />
      
      {/* DECORATIVE BACKGROUND ELEMENTS
          
          Subtle blue glow effects add visual depth without distracting
          from the main content. Positioned absolutely to avoid layout shifts.
      */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-40 h-40 rounded-full bg-blue-400/10 blur-3xl" />
      </div>

      {/* MAIN CONTENT WRAPPER */}
      <div className="relative z-10 w-full">
        <div className="w-[90%] lg:w-[80%] mx-auto py-20 lg:py-32">
          
          {/* HERO CONTENT */}
          <div className="max-w-4xl">
            
            {/* COMPANY TAGLINE */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-sm md:text-base tracking-[0.3em] uppercase mb-6 text-blue-300/80 font-medium"
            >
              Construction & Property
            </motion.p>

            {/* MAIN HEADING WITH TEXT GRADIENT
                
                H1 includes "Construction Project Management Nigeria" for SEO.
                Uses background-clip: text for gradient effect with fallback.
            */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
            >
              <span className="text-white">
                Building Your Vision
              </span>
              <br />
              <span 
                style={{
                  background: 'linear-gradient(to right, #60a5fa, #3b82f6, #2563eb)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: '#60a5fa', // Fallback for older browsers
                }}
              >
                From the Ground Up
              </span>
            </motion.h1>

            {/* DESCRIPTION WITH SEO KEYWORDS */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl leading-relaxed mb-8 max-w-2xl text-blue-100/90"
            >
              Expert construction project management across Nigeria. From architecture to 
              completion, we deliver excellence in residential, commercial, and infrastructure projects.
            </motion.p>

            {/* KEY FEATURES BADGES
                
                Quick visual highlights using data from centralized COMPANY_STATS.
                This ensures consistency if stats need to be updated.
            */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4 mb-10"
            >
              {KEY_FEATURES.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
                >
                  <FiCheck className="text-blue-400" size={18} />
                  <span className="text-sm text-white font-medium">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA BUTTONS
                
                Primary: "Start Your Build" - Main conversion action
                Secondary: "View Projects" - Alternative path for browsers
            */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              {/* Primary CTA */}
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#001F3F" }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-transparent text-white font-bold rounded-xl flex items-center gap-3 shadow-lg transition-all duration-300 border-2 border-white/30"
                  aria-label="Contact us to start your construction project"
                >
                  Start Your Build
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              {/* Secondary CTA */}
              <Link to="/portfolio">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border-2 border-white/20 hover:bg-white/20 transition-all duration-300"
                  aria-label="View our completed construction projects"
                >
                  View Projects
                </motion.button>
              </Link>
            </motion.div>

          </div>

          {/* STATS SECTION
              
              Bottom stats bar shows key metrics using centralized data.
              Staggered animation creates professional reveal effect.
          */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-12 border-t border-white/20"
            role="region"
            aria-label="Company Statistics"
          >
            {DETAILED_STATS.map((stat, index) => (
              <motion.div
                key={index}
                variants={statVariant}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-gray-300 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* ANIMATED SCROLL INDICATOR
          
          Bounces infinitely to encourage scrolling.
          Hidden on mobile where scrolling is more intuitive.
      */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:block"
        role="presentation"
        aria-label="Scroll down to explore more"
      >
        <div className="w-6 h-10 rounded-full border-2 border-blue-300/40 flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-blue-300 rounded-full"
          />
        </div>
      </motion.div>

      {/* BOTTOM FADE EFFECT
          
          Smooth gradient transition to next section.
          Uses CSS variable for theme compatibility.
      */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[var(--synergy-bg)] to-transparent" />

    </section>
  );
}