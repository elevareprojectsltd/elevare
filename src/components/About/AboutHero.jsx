import { motion } from "framer-motion";
import { useEffect } from "react";
import heroImg from "../../assets/about-hero.webp";

/* ===============================
   ANIMATION VARIANTS
   
   Purpose: Define reusable animation patterns for Framer Motion.
   These create smooth entrance effects without causing layout shifts
   by only animating transform and opacity properties.
================================ */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Each child animates 0.2s after the previous one
      delayChildren: 0.1,   // Wait 0.1s before starting the stagger
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

/* ===============================
   ABOUT HERO COMPONENT
   
   Displays the hero section for the About page with:
   - Full-screen hero image with parallax zoom effect
   - SEO-optimized heading and metadata
   - Smooth scroll indicator animation
   - Responsive typography and spacing
================================ */
export default function AboutHero() {
  
  /* SEO METADATA - Set document title and meta tags on component mount */
  useEffect(() => {
    document.title = "About Elevare Projects Ltd | Construction Project Management Nigeria";
    
    // Set or update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Learn about Elevare Projects Ltd - Nigeria's leading hybrid firm specializing in construction project management, architecture, and Agile technology solutions across Lagos, Abuja, and beyond.";
    
    // Set or update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = "Construction Project Management Nigeria, Agile Scrum Coaching Africa, Architecture Nigeria, Technology Solutions Lagos";
  }, []);

  return (
    <>
      <section
        className="relative h-[70vh] min-h-[500px] lg:h-[75vh] w-full overflow-hidden"
        aria-label="About Us Hero Section"
      >

        {/* BACKGROUND IMAGE WITH PARALLAX ZOOM EFFECT
            
            Starts at 110% scale and animates to 100% for a subtle
            parallax depth effect. Using transform instead of width/height
            ensures smooth GPU-accelerated animation with no layout shifts.
        */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={heroImg}
            alt="Elevare Projects team collaborating on construction and technology solutions in modern office"
            className="h-full w-full object-cover"
            width="1920"
            height="1080"
            loading="eager"
          />
        </motion.div>

        {/* GRADIENT OVERLAY
            
            Multi-stop gradient: Darker at top/bottom to ensure text readability
            while allowing the hero image to show through in the middle.
            Using opacity values (85%, 75%, 90%) instead of solid colors.
        */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#001F3F]/85 via-[#001F3F]/75 to-[#001F3F]/90" />
        
        {/* DECORATIVE BACKGROUND ELEMENTS
            
            Subtle blur circles add depth and visual interest without
            distracting from the main content. Positioned absolutely
            and heavily blurred for a soft glow effect.
        */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-10 w-40 h-40 rounded-full bg-blue-400/10 blur-3xl" />
        </div>

        {/* MAIN CONTENT WRAPPER */}
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto space-y-6"
          >
            {/* BREADCRUMB / PAGE LABEL */}
            <motion.div
              variants={fadeUp}
              className="inline-block"
            >
              <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-blue-300/80 font-medium">
                Who We Are
              </span>
            </motion.div>

            {/* MAIN HEADING WITH TEXT GRADIENT
                
                Uses background-clip: text for gradient effect.
                Falls back to solid white color in older browsers
                that don't support background-clip.
            */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight"
              style={{
                background: 'linear-gradient(to right, #ffffff, #93c5fd, #60a5fa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: '#ffffff', // Fallback for older browsers
              }}
            >
              About Us
            </motion.h1>

            {/* DECORATIVE DIVIDER
                
                Simple animated divider that scales in after the heading.
                Adds visual separation between heading and subtitle.
            */}
            <motion.div
              variants={scaleIn}
              className="flex items-center justify-center gap-2 pt-2"
              aria-hidden="true"
            >
              <div className="h-[2px] w-12 bg-blue-400 rounded-full" />
              <div className="h-2 w-2 bg-blue-400 rounded-full" />
              <div className="h-[2px] w-12 bg-blue-400 rounded-full" />
            </motion.div>

            {/* SUBTITLE / TAGLINE */}
            <motion.p
              variants={fadeUp}
              className="text-blue-100/90 text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed font-light"
            >
             fuck this Building excellence through innovation, integrity, and intelligent solutions.
            </motion.p>

            {/* ANIMATED SCROLL INDICATOR
                
                Bounces infinitely to encourage users to scroll down.
                Hidden on mobile devices where scroll is more intuitive.
            */}
            <motion.div
              variants={fadeUp}
              className="pt-8 hidden md:block"
            >
              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-flex flex-col items-center gap-2"
                role="presentation"
                aria-label="Scroll down to read more"
              >
                <span className="text-xs text-blue-200/60 tracking-wider uppercase">
                  Scroll to explore
                </span>
                <div className="w-6 h-10 border-2 border-blue-300/40 rounded-full flex items-start justify-center p-2">
                  <motion.div
                    animate={{
                      y: [0, 12, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-1.5 h-1.5 bg-blue-300 rounded-full"
                  />
                </div>
              </motion.div>
            </motion.div>

          </motion.div>

        </div>

        {/* BOTTOM FADE EFFECT
            
            Smooth gradient transition from hero section to the next
            section below. Uses CSS variable for theme compatibility.
        */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[var(--synergy-bg)] to-transparent" />

      </section>
    </>
  );
}