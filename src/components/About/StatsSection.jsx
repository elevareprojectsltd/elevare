import { motion } from "framer-motion";

/* ===============================
   ANIMATION VARIANTS

   Purpose: Define reusable animation patterns for Framer Motion.
   These create smooth entrance effects without causing layout shifts
   by only animating transform and opacity properties.

   fadeUp — Each stat card slides up 20px while fading in. Accepts a
            custom delay index (i) so each card staggers independently.
            delay: i * 0.15 means card 0 starts at 0s, card 1 at 0.15s,
            card 2 at 0.30s, card 3 at 0.45s — cascading left to right.
            custom={index} on each card drives this delay value.
================================ */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15, // custom={index} on each card drives this stagger delay
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

/* ===============================
   STATS SECTION COMPONENT

   Displays four key company metrics in a responsive card grid.

   STATS DATA:
   Defined inside the component as a local constant. These are
   the headline numbers that build trust at a glance — experience,
   awards, projects, and client count.

   RESPONSIVE LAYOUT STRATEGY:
   Three separate grid layouts handle the different breakpoints.
   Tailwind can't conditionally change grid-cols with a single grid
   element across all three breakpoints cleanly without overlap, so
   three divs with show/hide classes give precise control:
   - Desktop (lg+)   : 4 columns, hover:shadow-md on cards
   - Tablet (md–lg)  : 2 columns
   - Mobile (< md)   : 1 column

   WHY THREE GRIDS INSTEAD OF ONE RESPONSIVE GRID:
   A single grid-cols-1 md:grid-cols-2 lg:grid-cols-4 would work too,
   but the desktop view also adds hover:shadow-md which is intentionally
   only on desktop. The separate grids make this distinction explicit
   without conditionally applying classes.

   STAT CARD ANATOMY:
   Each card renders three spans inline:
   - Number (text-4xl) — the headline metric
   - "+" (text-3xl)    — visual emphasis that numbers are "and above"
   - Label (text-sm)   — describing what the number represents
================================ */
export default function StatsSection() {

  /* STATS DATA
     Local constant — defined inside the component since it's only
     used here and doesn't need to be shared across the codebase.
     HOW TO UPDATE: Change the value or label strings directly.
  */
  const stats = [
    { value: "13", label: "Years of Experience" },
    { value: "11", label: "Winning  Awards" },
    { value: "50", label: "Complete Total Projects" },
    { value: "31", label: "Happy Local Clients" },
  ];

  return (
    <section
      className="w-full py-8 lg:py-12"
      style={{
        backgroundColor: "var(--synergy-bg)",
        color: "var(--synergy-text)",
      }}
    >
      <div className="w-[90%] lg:w-[80%] mx-auto">

        {/* DESKTOP VIEW — 4 columns, visible on lg and above
            hover:shadow-md on desktop only — subtle elevation on hover
            signals that the cards are visually interactive.
        */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              custom={index} // Drives the i * 0.15 delay in fadeUp
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="border rounded-xl px-6 py-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              style={{
                backgroundColor: "var(--synergy-card-bg)",
                borderColor: "var(--synergy-card-border)",
              }}
            >
              <div className="flex items-center gap-1">
                {/* NUMBER — large headline metric */}
                <span
                  className="text-4xl font-bold"
                  style={{ color: "var(--synergy-card-text)" }}
                >
                  {item.value}
                </span>
                {/* PLUS SYMBOL — slightly smaller than the number */}
                <span
                  className="text-3xl font-bold"
                  style={{ color: "var(--synergy-card-text)" }}
                >
                  +
                </span>
                {/* LABEL — describes the metric */}
                <span
                  className="text-sm font-semibold ml-1"
                  style={{ color: "var(--synergy-card-text)" }}
                >
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* TABLET VIEW — 2 columns, visible between md and lg
            hidden md:grid lg:hidden ensures this only shows on tablet.
        */}
        <div className="hidden md:grid lg:hidden md:grid-cols-2 gap-6">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="border rounded-xl px-6 py-6 shadow-sm"
              style={{
                backgroundColor: "var(--synergy-card-bg)",
                borderColor: "var(--synergy-card-border)",
              }}
            >
              <div className="flex items-center gap-1">
                {/* NUMBER */}
                <span
                  className="text-4xl font-bold"
                  style={{ color: "var(--synergy-card-text)" }}
                >
                  {item.value}
                </span>
                {/* PLUS SYMBOL */}
                <span
                  className="text-3xl font-bold"
                  style={{ color: "var(--synergy-card-text)" }}
                >
                  +
                </span>
                {/* LABEL */}
                <span
                  className="text-sm font-semibold ml-1"
                  style={{ color: "var(--synergy-card-text)" }}
                >
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* MOBILE VIEW — 1 column, visible below md
            grid md:hidden ensures this only shows on mobile.
        */}
        <div className="grid md:hidden grid-cols-1 gap-6">
          {stats.map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="border rounded-xl px-6 py-6 shadow-sm"
              style={{
                backgroundColor: "var(--synergy-card-bg)",
                borderColor: "var(--synergy-card-border)",
              }}
            >
              <div className="flex items-center gap-1">
                {/* NUMBER */}
                <span
                  className="text-4xl font-bold"
                  style={{ color: "var(--synergy-card-text)" }}
                >
                  {item.value}
                </span>
                {/* PLUS SYMBOL */}
                <span
                  className="text-3xl font-bold"
                  style={{ color: "var(--synergy-card-text)" }}
                >
                  +
                </span>
                {/* LABEL */}
                <span
                  className="text-sm font-semibold ml-1"
                  style={{ color: "var(--synergy-card-text)" }}
                >
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}