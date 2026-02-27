import { motion } from "framer-motion";

/* ===============================
   ANIMATION VARIANTS

   Purpose: Define reusable animation patterns for Framer Motion.
   These create smooth entrance effects without causing layout shifts
   by only animating transform and opacity properties.

   fadeUp       — Description paragraph slides up 30px while fading in.
                  Uses a custom cubic-bezier easing for a natural deceleration.
   staggerContainer — Parent wrapper that sequences child animations.
                  delayChildren: 0.2 gives the page a moment to settle
                  before any animation begins. Used on both the heading
                  group and the CTA button group.
   slideInLeft  — First heading line enters from the left (x: -40 → 0).
   slideInRight — Second heading line enters from the right (x: 40 → 0).
                  Together, slideInLeft + slideInRight create a "closing"
                  effect where the two lines converge toward the centre.
   scaleIn      — CTA buttons scale from 90% → 100% — a subtle pop that
                  draws attention to the primary actions without being jarring.
================================ */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1], // Custom easing
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,  // Each child animates 0.15s after the previous
      delayChildren: 0.2,     // Wait 0.2s before starting the stagger sequence
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

/* ===============================
   HERO INTRO COMPONENT

   Displays the primary homepage hero section with:
   - Two-line heading with opposing slide animations (left + right)
     that converge toward the centre for a dynamic entrance
   - Underline accent on "Tech Solutions" using the brand hover colour
   - Fade-up description paragraph with custom cubic-bezier easing
   - Two CTA buttons that scale in and lift on hover (whileHover y: -2)
   - Fully theme-aware via CSS variables (--hero-bg, --hero-text, etc.)
   - animate="visible" (not whileInView) because this is above the fold —
     it should animate on page load, not on scroll
================================ */
export default function HeroIntro() {
  return (
    <section
      className="w-full bg-[var(--hero-bg)] text-[var(--hero-text)]"
      style={{ minHeight: "650px" }}
    >
      <div className="max-w-[1200px] mx-auto px-6 pt-10 lg:pt-20 pb-20 text-center">

        {/* HEADING — STAGGERED SLIDE IN
            
            staggerContainer sequences line 1 (slideInLeft) and
            line 2 (slideInRight) so they animate 0.15s apart.
            animate="visible" fires on mount — not on scroll —
            because this heading is always above the fold.
        */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* LINE 1 — slides in from the left */}
          <motion.div
            variants={slideInLeft}
            className="text-4xl md:text-4xl lg:text-5xl font-bold leading-tight"
          >
            Building the Future Through Integrated
          </motion.div>

          {/* LINE 2 — slides in from the right, with underline accent
              
              underline-offset-8 on md+ screens gives the underline
              more breathing room at larger text sizes.
              decoration colour uses the brand hover colour variable
              so it automatically updates with the theme.
          */}
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

        {/* DESCRIPTION — FADE UP
            
            Animates independently (its own initial/animate) so it
            isn't coupled to the heading's staggerContainer timing.
            max-w-[800px] + mx-auto constrains line length for
            comfortable reading on wide screens.
        */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-6 text-base md:text-lg opacity-80 max-w-[800px] mx-auto break-words"
        >
          Empowering the built environment and the digital landscape. We support the full development cycle with intelligent construction and tailored technology services.
        </motion.p>

        {/* CTA BUTTONS — SCALE IN
            
            A second staggerContainer sequences the two buttons so they
            pop in 0.15s apart rather than simultaneously.
            whileHover: scale 1.05 + y: -2 gives a satisfying "lift"
            effect that signals interactivity clearly.
            whileTap: scale 0.98 provides tactile press feedback.
            Both buttons share identical styling — theme variables
            handle colour so they update automatically in dark/light mode.
        */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          {/* PRIMARY CTA — Construction Services */}
          <motion.button
            variants={scaleIn}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="
              px-6 py-3 rounded-md font-medium border
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
          </motion.button>

          {/* SECONDARY CTA — Digital Solutions */}
          <motion.button
            variants={scaleIn}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="
              px-6 py-3 rounded-md font-medium border
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
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}