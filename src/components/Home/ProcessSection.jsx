import { motion } from "framer-motion";
import {
  FaLayerGroup,
  FaDraftingCompass,
  FaWrench,
  FaShieldAlt,
} from "react-icons/fa";

/* ===============================
   PROCESS STEPS DATA

   Purpose: Single source of truth for all four delivery process steps.
   Each object maps directly to a process card in the grid.

   Fields:
   - step        : Numeric index shown in the "Step N" badge above each card
   - title       : Card heading — the phase name
   - description : Two-line summary using \n for a natural line break.
                   Rendered with whitespace-pre-line so the \n is respected.
   - icon        : React Icon component displayed in the circular icon well

   HOW TO ADD A NEW STEP:
   Copy any object, update the fields, and add it to the array.
   The grid layout and stagger animation update automatically.
================================ */
const PROCESS_STEPS = [
  {
    step: 1,
    title: "Concept & Design",
    description: "Architectural reviews and\nUI/UX advisory.",
    icon: FaLayerGroup,
  },
  {
    step: 2,
    title: "Procurement & Planning",
    description: "Sourcing materials and\nAgile backlog grooming.",
    icon: FaDraftingCompass,
  },
  {
    step: 3,
    title: "Construction & Development",
    description: "Site execution and software engineering.",
    icon: FaWrench,
  },
  {
    step: 4,
    title: "Handover & Support",
    description:
      "Quality checks, facility maintenance, and digital deployment.",
    icon: FaShieldAlt,
  },
];

/* ===============================
   ANIMATION VARIANTS

   Purpose: Define reusable animation patterns for Framer Motion.
   These create smooth entrance effects without causing layout shifts
   by only animating transform and opacity properties.

   processContainerVariants — Stagger parent for the 4 process cards.
                              staggerChildren: 0.12 cascades cards left → right.
                              delayChildren: 0.1 gives the viewport a moment
                              to settle before the first card starts.

   processCardVariants      — Each card enters with a combination of:
                              - y: 60 → 0 (slides up)
                              - rotateX: -15 → 0 (3D tilt from below)
                              - scale: 0.9 → 1 (subtle grow)
                              Custom cubic-bezier [0.25, 0.46, 0.45, 0.94]
                              gives a natural deceleration on arrival.
                              opacity uses a shorter duration (0.6) so the
                              card becomes visible before the motion completes.

   iconVariants             — Icon spins in from -180deg with a spring.
                              type: "spring" with stiffness: 200, damping: 15
                              gives a satisfying bouncy snap on entrance.
                              delay: 0.2 fires after the card itself arrives.
                              whileHover rotates 360deg for a playful interaction.

   statementContainerVariants — Stagger parent for the 3 statement cards.
                              Faster than processContainerVariants (0.08)
                              because statement cards are text-only and
                              don't need as much visual separation.

   statementVariants        — Simple fade + slide up for the statement cards.
                              Lighter than processCardVariants — no 3D tilt —
                              because statements are supporting content, not
                              the primary visual focus of the section.

   stepBadgeVariants        — The "Step N" pill badge springs in from y: -20
                              (above the card) with a tight spring so it feels
                              like it drops into place. delay: 0.3 fires after
                              the card and icon have both settled.

   accentBarVariants        — The coloured bar above each statement card
                              animates width: 0 → 2.5rem (w-10). This draws
                              the user's eye to the card heading on scroll.
================================ */
const processContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,  // Each card animates 0.12s after the previous
      delayChildren: 0.1,     // Wait 0.1s before the first card starts
    },
  },
};

const processCardVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    rotateX: -15, // 3D tilt from below — requires perspective on the parent
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for natural deceleration
      opacity: { duration: 0.6 }       // Opacity resolves faster than the motion
    },
  },
};

const iconVariants = {
  hidden: {
    scale: 0,
    rotate: -180 // Full counter-clockwise spin on entrance
  },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
      delay: 0.2 // Fires after the card has arrived
    },
  },
};

const statementContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08, // Faster stagger — statement cards are lighter visually
    },
  },
};

const statementVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const stepBadgeVariants = {
  hidden: {
    scale: 0,
    y: -20 // Starts above the card edge and drops into position
  },
  visible: {
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 12,
      delay: 0.3 // Fires after the card and icon have settled
    }
  }
};

const accentBarVariants = {
  hidden: {
    width: 0,
  },
  visible: {
    width: "2.5rem", // Equivalent to w-10
    transition: {
      duration: 0.4,
      ease: "easeOut",
    }
  }
};

/* ===============================
   PROCESS SECTION COMPONENT

   Displays the full delivery process and brand statements with:

   PROCESS CARDS (top grid):
   - 1 → 2 → 4 column responsive grid
   - Each card has a "Step N" pill badge, rotating icon, title, description
   - 3D tilt entrance (rotateX) requires perspective: "1000px" on the card
   - Icons spin 360deg on hover for playful micro-interaction
   - Cards lift 8px and scale 1.03 on hover

   STATEMENT CARDS (bottom grid):
   - Mission, Vision, Value Proposition — each with a unique accent colour
   - Animated accent bar draws from width 0 → 2.5rem on scroll
   - Value Proposition centres itself on tablet (md:col-span-2 + max-w-sm)
     but fills its column normally on desktop (lg:col-span-1)
   - Bold <span> highlights within body text reinforce key brand phrases

   THEME:
   - Process card bg uses rgba(255,255,255,0.02) for a barely-there
     glass effect that works in both light and dark mode
   - Icon wells use hardcoded #031f3a (the dark navy brand colour) so
     they always contrast regardless of theme
   - Statement card borders use Tailwind's blue/indigo/cyan utilities
     rather than CSS variables — intentional fixed colour for brand consistency
================================ */
export default function ProcessSection() {
  return (
    <section
      className="w-full pt-10 md:pt-10 transition-colors duration-300"
      aria-labelledby="process-section-heading"
      style={{
        backgroundColor: "var(--synergy-bg)",
        color: "var(--synergy-text)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* PROCESS STEPS GRID

            processContainerVariants staggers all four cards left → right.
            amount: 0.2 triggers animation once 20% of the grid is visible.
            perspective: "1000px" on each card enables the rotateX 3D effect
            in processCardVariants — without it, rotateX has no visible impact.
        */}
        <motion.div
          variants={processContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {PROCESS_STEPS.map(
            ({ step, title, description, icon: Icon }) => (
              <motion.div
                key={step}
                variants={processCardVariants}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                className="relative rounded-2xl p-6 text-center border backdrop-blur-sm"
                style={{
                  background: "rgba(255,255,255,0.02)", // Subtle glass tint — works in dark + light mode
                  borderColor: "var(--synergy-card-border)",
                  perspective: "1000px"                 // Required for rotateX in processCardVariants
                }}
              >

                {/* STEP BADGE
                    Positioned absolute at -top-3 so it overlaps the card
                    border, giving a "pinned label" visual effect.
                    Springs in from y: -20 via stepBadgeVariants.
                */}
                <motion.span
                  variants={stepBadgeVariants}
                  className="absolute -top-3 left-1/2 -translate-x-1/2
                             px-3 py-1 text-xs font-semibold rounded-full border"
                  style={{
                    backgroundColor: "var(--synergy-bg)",
                    borderColor: "var(--synergy-card-border)",
                  }}
                >
                  Step {step}
                </motion.span>

                {/* ICON WELL
                    bg: #031f3a (dark navy) hardcoded so it always contrasts
                    regardless of light/dark theme.
                    whileHover rotates 360deg for a playful full spin.
                    Springs in from scale: 0, rotate: -180 via iconVariants.
                */}
                <motion.div
                  variants={iconVariants}
                  whileHover={{
                    rotate: 360,
                    scale: 1.1,
                    transition: { duration: 0.6, ease: "easeInOut" }
                  }}
                  className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{ backgroundColor: "#031f3a", color: "#fff" }}
                >
                  <Icon className="w-7 h-7" />
                </motion.div>

                {/* CARD TITLE */}
                <h3 className="font-semibold tracking-wide">
                  {title}
                </h3>

                {/* CARD DESCRIPTION
                    whitespace-pre-line respects the \n in description strings
                    so each two-part description breaks naturally onto two lines.
                */}
                <p className="mt-3 text-sm opacity-75 whitespace-pre-line leading-relaxed">
                  {description}
                </p>

              </motion.div>
            )
          )}
        </motion.div>

        {/* STATEMENTS GRID — Mission, Vision, Value Proposition

            statementContainerVariants staggers the three cards.
            amount: 0.15 fires early so cards animate before the user
            has fully scrolled to the bottom of the section.
        */}
        <motion.div
          variants={statementContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >

          {/* MISSION STATEMENT — blue accent */}
          <motion.div
            variants={statementVariants}
            className="rounded-2xl p-8 border-2 border-blue-300 shadow-sm"
          >
            {/* ACCENT BAR — animates width 0 → 2.5rem on scroll */}
            <motion.div
              variants={accentBarVariants}
              className="h-1 mb-6 rounded-full bg-blue-500"
              aria-hidden="true"
            />
            <h3 className="text-xl font-semibold tracking-wide mb-4">
              Mission Statement
            </h3>
            {/* Bold <span> tags highlight the three core brand pillars */}
            <p className="text-sm md:text-base opacity-80 leading-relaxed">
              To deliver <span className="font-medium">innovative</span>,{" "}
              <span className="font-medium">cost-effective</span> and{" "}
              <span className="font-medium">efficient</span> construction and
              technology solutions that turn client ideas into high-quality,
              successful outcomes.
            </p>
          </motion.div>

          {/* VISION STATEMENT — indigo accent */}
          <motion.div
            variants={statementVariants}
            className="rounded-2xl p-8 border-2 border-indigo-300 shadow-sm"
          >
            {/* ACCENT BAR — animates width 0 → 2.5rem on scroll */}
            <motion.div
              variants={accentBarVariants}
              className="h-1 mb-6 rounded-full bg-indigo-500"
              aria-hidden="true"
            />
            <h3 className="text-xl font-semibold tracking-wide mb-4">
              Vision Statement
            </h3>
            {/* Bold <span> tags highlight the company's aspirational keywords */}
            <p className="text-sm md:text-base opacity-80 leading-relaxed">
              To build a{" "}
              <span className="font-medium">world-class African company</span>{" "}
              recognized for <span className="font-medium">precision</span>,{" "}
              <span className="font-medium">innovation</span> and{" "}
              <span className="font-medium">excellence</span> in project delivery
              and digital transformation.
            </p>
          </motion.div>

          {/* VALUE PROPOSITION — cyan accent

              md:col-span-2 + md:max-w-sm + md:mx-auto centres this card
              on tablet where it would otherwise stretch across 2 columns.
              lg:col-span-1 + lg:max-w-none restores normal grid behaviour
              on desktop where all 3 cards fill one row.
          */}
          <motion.div
            variants={statementVariants}
            className="
              rounded-2xl
              p-8
              border-2
              border-cyan-300
              shadow-sm
              md:col-span-2
              md:max-w-sm
              md:mx-auto
              lg:col-span-1
              lg:max-w-none
            "
          >
            {/* ACCENT BAR — animates width 0 → 2.5rem on scroll */}
            <motion.div
              variants={accentBarVariants}
              className="h-1 mb-6 rounded-full bg-cyan-500"
              aria-hidden="true"
            />
            <h3 className="text-xl font-semibold tracking-wide mb-4">
              Value Proposition
            </h3>
            {/* Bold <span> tags highlight the four key delivery differentiators */}
            <p className="text-sm md:text-base opacity-80 leading-relaxed">
              Driving the development cycle through{" "}
              <span className="font-medium">hybrid construction</span> and{" "}
              <span className="font-medium">tech expertise</span>, managing your
              project from concept to final handover with{" "}
              <span className="font-medium">data-driven efficiency</span> and{" "}
              <span className="font-medium">innovative engineering</span>.
            </p>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
}