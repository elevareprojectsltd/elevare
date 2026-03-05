import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/* ===============================
   ANIMATION VARIANTS
================================ */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
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

export default function HeroIntro() {
  return (
    <section
      className="w-full bg-[var(--hero-bg)] text-[var(--hero-text)]"
      style={{ minHeight: "650px" }}
    >
      <div className="max-w-[1200px] mx-auto px-6 pt-10 lg:pt-20 pb-20 text-center">

        {/* HEADING */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={slideInLeft}
            className="text-4xl md:text-4xl lg:text-5xl font-bold leading-tight"
          >
            Building the Future Through Integrated
          </motion.div>

          <motion.div
            variants={slideInRight}
            className="text-4xl md:text-4xl lg:text-5xl font-bold leading-tight mt-2"
          >
            Construction &{" "}
            <span className="underline underline-offset-4 md:underline-offset-8 decoration-[var(--hero-btn-hover-bg)]">
              Tech Solutions
            </span>
          </motion.div>
        </motion.div>

        {/* DESCRIPTION */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-6 text-base md:text-lg opacity-80 max-w-[800px] mx-auto break-words"
        >
          Empowering built environment and digital landscape. We support full development cycle with intelligent construction and tailored technology services.
        </motion.p>

        {/* CTA BUTTONS */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          {/* PRIMARY CTA — Construction Services */}
          <motion.div variants={scaleIn} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/services/construction"
              className="
                inline-block px-6 py-3 rounded-md font-medium border
                bg-[var(--hero-btn-bg)]
                text-[var(--hero-btn-text)]
                border-[var(--hero-border)]
                hover:bg-[var(--hero-btn-hover-bg)]
                hover:text-[var(--hero-btn-hover-text)]
                transition-colors duration-300
                shadow-lg hover:shadow-xl
              "
            >
              View Construction Services →
            </Link>
          </motion.div>

          {/* SECONDARY CTA — Digital Solutions */}
          <motion.div variants={scaleIn} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/services/technology"
              className="
                inline-block px-6 py-3 rounded-md font-medium border
                bg-[var(--hero-btn-bg)]
                text-[var(--hero-btn-text)]
                border-[var(--hero-border)]
                hover:bg-[var(--hero-btn-hover-bg)]
                hover:text-[var(--hero-btn-hover-text)]
                transition-colors duration-300
                shadow-lg hover:shadow-xl
              "
            >
              Explore Digital Solutions →
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}