import { motion } from "framer-motion";
import { useEffect } from "react";
import heroImg from "../../assets/contact-hero.webp";

/* ===============================
   ANIMATION VARIANTS
   
   Purpose: Reusable Framer Motion patterns for smooth
   entrance animations without layout shifts.
================================ */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/* ===============================
   CONTACT HERO COMPONENT
   
   Purpose: Hero section for Contact page with:
   - Full-screen parallax hero image
   - SEO-friendly heading and metadata
   - Scroll indicator to encourage exploration
   - Responsive layout and decorative elements
================================ */
export default function ContactHero() {
  
  /* SEO METADATA */
  useEffect(() => {
    document.title = "Contact Elevare Projects Ltd | Construction Nigeria";

    // Meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "Reach out to Elevare Projects Ltd for top-notch construction project management, architecture, and technology solutions across Nigeria.";

    // Meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = "Contact Elevare Projects Nigeria, Construction Project Management, Architecture Nigeria, Technology Solutions Lagos";
  }, []);

  return (
    <section
      className="relative h-[65vh] min-h-[480px] lg:h-[70vh] w-full overflow-hidden"
      aria-label="Contact Hero Section"
    >

      {/* BACKGROUND IMAGE WITH PARALLAX ZOOM EFFECT */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src={heroImg}
          alt="Contact Elevare Projects team"
          className="h-full w-full object-cover"
          width="1920"
          height="1080"
          loading="eager"
        />
      </motion.div>

      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a3a52]/90 via-[#1a3a52]/85 to-[#1a3a52]/95" />

      {/* DECORATIVE BACKGROUND ELEMENTS */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-40 h-40 rounded-full bg-blue-400/10 blur-3xl" />
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto space-y-6"
        >

          {/* MAIN HEADING */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-white"
          >
            Contact Us
          </motion.h1>

          {/* DECORATIVE DIVIDER */}
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
            className="text-blue-100/90 text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed font-light pt-2"
          >
            Let's build something exceptional together. Reach out to discuss your next project.
          </motion.p>

          {/* SCROLL INDICATOR */}
          <motion.div variants={fadeUp} className="pt-8 hidden md:block">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex flex-col items-center gap-2"
              role="presentation"
              aria-label="Get in touch scroll indicator"
            >
              <span className="text-xs text-blue-200/60 tracking-wider uppercase">
                Get in touch
              </span>
              <div className="w-6 h-10 border-2 border-blue-300/40 rounded-full flex items-start justify-center p-2">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 bg-blue-300 rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>

      {/* BOTTOM FADE EFFECT */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[var(--synergy-bg)] to-transparent" />

    </section>
  );
}