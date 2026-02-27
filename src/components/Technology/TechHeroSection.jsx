import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCheck } from "react-icons/fi";

// Tech background image from Pexels
const heroImg = "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1920";

/* ===============================
   ANIMATION VARIANTS
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
      staggerChildren: 0.15,
      delayChildren: 0.2
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

export default function TechHeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">

      {/* BACKGROUND IMAGE WITH PARALLAX */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img
          src={heroImg}
          alt="Technology digital workspace"
          className="h-full w-full object-cover"
          loading="eager"
        />
      </motion.div>

      {/* GRADIENT OVERLAY - Deep navy like AboutHero */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#001F3F]/90 via-[#001F3F]/80 to-[#001F3F]/95" />

      {/* TECH GRID PATTERN OVERLAY */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* DECORATIVE ELEMENTS */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 right-10 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-10 w-32 h-32 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-blue-600/5 blur-3xl" />
      </div>

      {/* FLOATING CODE SNIPPET - Decorative */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute right-10 top-1/3 hidden xl:block"
      >
        <div
          className="rounded-xl p-4 text-xs font-mono text-blue-300/60 leading-6"
          style={{
            backgroundColor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div><span className="text-pink-400/70">const</span> <span className="text-blue-300/70">elevare</span> = {`{`}</div>
          <div className="pl-4"><span className="text-green-400/70">stack</span>: <span className="text-yellow-300/70">"Full-Stack"</span>,</div>
          <div className="pl-4"><span className="text-green-400/70">method</span>: <span className="text-yellow-300/70">"Agile"</span>,</div>
          <div className="pl-4"><span className="text-green-400/70">delivery</span>: <span className="text-yellow-300/70">"On-Time"</span>,</div>
          <div>{`}`}</div>
        </div>
      </motion.div>

      {/* CONTENT */}
      <div className="relative z-10 w-full">
        <div className="w-[90%] lg:w-[80%] mx-auto py-20 lg:py-32">

          {/* MAIN CONTENT */}
          <div className="max-w-4xl">

            {/* TAGLINE */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-3 mb-6"
            >
              {/* Blinking dot */}
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-400" />
              </span>
              <p className="text-sm md:text-base tracking-[0.3em] uppercase text-blue-300/80 font-medium">
                Technology & Digital
              </p>
            </motion.div>

            {/* MAIN HEADING */}
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6 text-white"
            >
              Powering Your
              <br />
              <span className="text-blue-400">
                Operations.
              </span>
            </motion.h1>

            {/* DESCRIPTION */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl leading-relaxed mb-8 max-w-2xl text-blue-100/90"
            >
              From web & app development to agile coaching and digital
              transformation — we help organizations move faster, smarter,
              and with confidence.
            </motion.p>

            {/* KEY FEATURES */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4 mb-10"
            >
              {[
                "Web & App Development",
                "Agile/Scrum Coaching",
                "Technology Advisory",
              ].map((feature, index) => (
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

            {/* CTA BUTTONS */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
            

              {/* Secondary CTA - Portfolio
              <Link to="/portfolio">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl border-2 border-white/30 backdrop-blur-sm transition-all duration-300"
                >
                  View Our Work
                </motion.button>
              </Link> */}
            </motion.div>

          </div>

          {/* STATS SECTION */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-12 border-t border-white/20"
          >
            {[
              { value: "50+", label: "Apps Delivered" },
              { value: "100%", label: "Agile Certified" },
              { value: "3x", label: "Faster Delivery" },
              { value: "24/7", label: "Tech Support" },
            ].map((stat, index) => (
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

      {/* SCROLL INDICATOR */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:block"
      >
        <div className="w-6 h-10 rounded-full border-2 border-blue-300/40 flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-blue-300 rounded-full"
          />
        </div>
      </motion.div>

      {/* BOTTOM FADE */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[var(--synergy-bg)] to-transparent" />

    </section>
  );
}