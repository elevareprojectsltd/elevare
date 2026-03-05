import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  FiAward,
  FiShield,
  FiClock,
  FiTrendingUp,
  FiUsers,
  FiCheckCircle,
} from "react-icons/fi";

/* ===============================
   BACKGROUND IMAGES
   
   High-quality Pexels images optimized for performance.
   Using WebP format with compression for fast loading.
================================ */
const sideImg =
  "https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=900";

const statsBg =
  "https://images.pexels.com/photos/1117452/pexels-photo-1117452.jpeg?auto=compress&cs=tinysrgb&w=1920";

/* ===============================
   COMPANY STATISTICS DATA
   
   Centralized stats make updates easy and consistent.
   These numbers highlight Elevare's track record and credibility.
================================ */
const STATS = [
  { value: 10,   suffix: "+",  label: "Years of Excellence", description: "Decade of proven results" },
  { value: 200, suffix: "+",  label: "Projects Completed",  description: "Across Nigeria & beyond"  },
  { value: 98,   suffix: "%",  label: "Client Satisfaction", description: "Consistently delivering"  },
  { value: 4.8,  suffix: "/5", label: "Average Rating",      description: "Trusted by hundreds"      },
];

/* ===============================
   KEY BENEFITS DATA
   
   Six core value propositions that differentiate Elevare
   from competitors. Each benefit has an icon, title, and description.
================================ */
const BENEFITS = [
  {
    icon: FiAward,
    title: "Quality Craftsmanship",
    description:
      "Every project is executed with precision, using premium materials and industry-leading techniques that stand the test of time.",
  },
  {
    icon: FiClock,
    title: "Timely Delivery",
    description:
      "We respect your timeline. Our structured processes ensure on-schedule completion without compromising on quality.",
  },
  {
    icon: FiShield,
    title: "Safety First",
    description:
      "Rigorous safety protocols on every site protect our team, clients, and surrounding communities at all times.",
  },
  {
    icon: FiTrendingUp,
    title: "Innovative Solutions",
    description:
      "We blend modern construction technology with proven methods to deliver smarter, more efficient outcomes.",
  },
  {
    icon: FiUsers,
    title: "Experienced Team",
    description:
      "Our seasoned professionals bring deep expertise across construction, planning, and project management.",
  },
  {
    icon: FiCheckCircle,
    title: "End-to-End Service",
    description:
      "From feasibility studies to final handover, we handle every detail so you don't have to.",
  },
];

/* ===============================
   ANIMATED COUNTER COMPONENT
   
   Counts up from 0 to target value when scrolled into view.
   Uses Intersection Observer to trigger animation only once.
   Handles both integers (1500) and decimals (4.8) correctly.
================================ */
function AnimatedCounter({ value, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  // Trigger animation when element enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) setHasStarted(true);
      },
      { threshold: 0.5 } // Trigger when 50% visible
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  // Animate counter from 0 to target value
  useEffect(() => {
    if (!hasStarted) return;
    
    const isDecimal = value % 1 !== 0; // Check if decimal (e.g., 4.8)
    const duration = 2000; // 2 second animation
    const steps = 60; // 60 frames for smooth animation
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        // Round to 1 decimal for decimals, floor for integers
        setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [hasStarted, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ===============================
   ANIMATION VARIANTS
   
   Reusable Framer Motion animation patterns.
   All use transform/opacity to prevent layout shifts.
================================ */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

/* ===============================
   WHY CHOOSE US COMPONENT
   
   Three-part section showcasing company strengths:
   1. Stats banner with animated counters
   2. Two-column "Why Choose Us" with image
   3. Benefits grid with 6 key value propositions
================================ */
export default function WhyChooseUs() {
  return (
    <section
      className="w-full transition-colors duration-300"
      style={{ backgroundColor: "var(--synergy-bg)" }}
      aria-label="Why Choose Elevare Projects"
    >

      {/* ============================================
          PART 1: STATS BANNER WITH ANIMATED COUNTERS
          
          Full-width banner with construction background image,
          dark overlay, and 4 key statistics that count up on scroll.
      ============================================ */}
      <div className="relative w-full py-24 overflow-hidden">

        {/* Background image with dark overlay for text readability */}
        <div className="absolute inset-0 z-0">
          <img
            src={statsBg}
            alt="Construction site background"
            className="w-full h-full object-cover"
            width="1920"
            height="600"
            loading="lazy"
          />
          {/* Dark overlay: 88% opacity navy blue (#001F3F) */}
          <div className="absolute inset-0 bg-[#001F3F]/88" />
        </div>

        {/* Decorative blur circles for visual depth */}
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-blue-400/10 blur-3xl" />
        </div>

        <div className="relative z-10 w-[90%] lg:w-[80%] mx-auto">

          {/* Section label */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center text-xs tracking-[0.3em] uppercase text-blue-300/70 font-medium mb-4"
          >
            Our Track Record
          </motion.p>

          {/* Section heading */}
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center text-3xl md:text-4xl font-bold text-white mb-16"
          >
            Numbers That Speak for Themselves
          </motion.h2>

          {/* Stats grid with animated counters */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
            role="list"
            aria-label="Company statistics"
          >
            {STATS.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-2xl p-5 lg:p-8 text-center overflow-hidden group cursor-default"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  backdropFilter: "blur(12px)",
                }}
                role="listitem"
              >
                {/* Hover glow effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{
                    background: "linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(59, 130, 246, 0.05))",
                  }}
                />
                
                {/* Top accent line that expands on hover */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 h-[3px] w-12 rounded-full group-hover:w-20 transition-all duration-500"
                  style={{ backgroundColor: "var(--synergy-heading-highlight)" }}
                />
                
                {/* Animated counter value */}
                <div className="relative z-10 text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 mt-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                
                {/* Stat label */}
                <div className="relative z-10 text-xs md:text-base font-semibold text-blue-200 mb-1">
                  {stat.label}
                </div>
                
                {/* Stat description (hidden on mobile to save space) */}
                <div className="relative z-10 text-xs text-white/40 hidden sm:block">
                  {stat.description}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ============================================
          PART 2: WHY CHOOSE US - TWO COLUMN LAYOUT
          
          Left: Large construction image
          Right: Heading, description, and feature list
      ============================================ */}
      <div className="w-[90%] lg:w-[80%] mx-auto py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT - IMAGE WITH DECORATIVE ELEMENTS */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative px-2"
          >
            {/* Main image - responsive height adjustments */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[320px] sm:h-[400px] lg:h-[500px]">
              <img
                src={sideImg}
                alt="Elevare Projects construction site demonstrating quality craftsmanship and safety standards"
                className="w-full h-full object-cover"
                width="900"
                height="500"
                loading="lazy"
              />
              {/* Subtle gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Decorative border box (hidden on mobile to prevent overflow) */}
            <div
              className="hidden lg:block absolute -top-4 -left-4 w-32 h-32 rounded-2xl -z-10 border-4"
              style={{ borderColor: "var(--synergy-heading-highlight)" }}
              aria-hidden="true"
            />
          </motion.div>

          {/* RIGHT - CONTENT */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <p
              className="text-xs md:text-sm tracking-[0.3em] uppercase mb-4 opacity-70"
              style={{ color: "var(--synergy-text)" }}
            >
              Why Choose Us
            </p>
            
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
              style={{ color: "var(--synergy-heading-main)" }}
            >
              Built on Trust,
              <br />
              <span style={{ color: "var(--synergy-heading-highlight)" }}>
                Delivered with Excellence
              </span>
            </h2>
            
            <p
              className="text-base md:text-lg leading-relaxed mb-8 opacity-80"
              style={{ color: "var(--synergy-text)" }}
            >
              We don't just build structures — we build relationships. Every
              project we undertake reflects our commitment to quality,
              transparency, and long-term value for our clients.
            </p>

            {/* Feature list with checkmarks */}
            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
              role="list"
            >
              {[
                "Pre-construction Planning & Feasibility",
                "Renovations & Interior Fit-outs",
                "Site Supervision & Facility Upgrades",
                "Agile Project Management",
              ].map((item, i) => (
                <motion.li
                  key={i}
                  variants={fadeUp}
                  className="flex items-center gap-3"
                  role="listitem"
                >
                  {/* Blue checkmark circle */}
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "var(--synergy-heading-highlight)" }}
                    aria-hidden="true"
                  >
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span
                    className="text-base font-medium"
                    style={{ color: "var(--synergy-text)" }}
                  >
                    {item}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>

      {/* ============================================
          PART 3: BENEFITS GRID (6 CARDS)
          
          3-column grid on desktop, responsive down to 1 column on mobile.
          Each card has an icon, title, and description.
      ============================================ */}
      <div
        className="w-full py-16 lg:py-24"
        style={{ backgroundColor: "var(--synergy-bg)" }}
      >
        <div className="w-[90%] lg:w-[80%] mx-auto">

          {/* Section header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-12 lg:mb-16"
          >
            <p
              className="text-xs md:text-sm tracking-[0.3em] uppercase mb-4 opacity-70"
              style={{ color: "var(--synergy-text)" }}
            >
              Our Strengths
            </p>
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ color: "var(--synergy-heading-main)" }}
            >
              Why Elevare Projects?
            </h2>
          </motion.div>

          {/* Benefits grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            role="list"
            aria-label="Company benefits and strengths"
          >
            {BENEFITS.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="group rounded-2xl p-6 lg:p-8 border-2 hover:shadow-xl transition-all duration-300"
                  style={{
                    backgroundColor: "var(--synergy-bg)",
                    borderColor: "var(--synergy-card-border)",
                  }}
                  role="listitem"
                >
                  {/* Icon circle */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: "var(--synergy-heading-highlight)" }}
                    aria-hidden="true"
                  >
                    <IconComponent size={26} className="text-white" />
                  </div>

                  {/* Benefit title */}
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: "var(--synergy-text)" }}
                  >
                    {benefit.title}
                  </h3>

                  {/* Benefit description */}
                  <p
                    className="text-sm leading-relaxed opacity-75"
                    style={{ color: "var(--synergy-text)" }}
                  >
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>

    </section>
  );
}