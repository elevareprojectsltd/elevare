import { motion } from "framer-motion";

/* ===============================
   ANIMATION VARIANTS

   Purpose: Define reusable animation patterns for Framer Motion.
   These create smooth entrance effects without causing layout shifts
   by only animating transform and opacity properties.

   container  — Parent wrapper that triggers staggered child animations.
                staggerChildren: 0.14 means each child starts 0.14s after
                the previous one — used on the <section> itself so every
                direct child (label, heading, divider, cards, vision) staggers.
   fadeUp     — General entrance: slides up 24px while fading in. Used for
                the eyebrow label, heading, divider, and vision callout.
   scaleIn    — Card entrance: scales from 95% → 100% while fading in.
                Used on each story card so they feel like they materialise
                into the page rather than just sliding up.
================================ */
const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14, // Each direct child animates 0.14s after the previous
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

/* ===============================
   OUR STORY SECTION COMPONENT

   Displays the brand origin and vision narrative with:
   - Eyebrow label + heading + decorative divider (staggered via container)
   - Three story cards with scaleIn entrance, hover accent line, quote mark,
     and a numbered badge in the top-right corner of each card
   - Featured vision callout with a highlighted border at the bottom
   - Decorative background blur blobs for ambient depth
   - Decorative dot row at the very bottom as a visual closer
   - Fully theme-aware via CSS variables (--synergy-bg, --synergy-card-*, etc.)

   WHY whileInView ON THE <section> (not individual children):
   The container variant on the parent <section> propagates the stagger
   to all children automatically. This means only one whileInView trigger
   is needed — the section entering the viewport starts the entire sequence.
================================ */
export default function OurStorySection() {

  /* STORY CONTENT DATA
     Defined inside the component as a local constant.
     Each object currently only has a `text` field — structured as an
     array so additional fields (e.g. title, icon) can be added later
     without refactoring the render logic below.
  */
  const storyContent = [
    {
      text: `Elevare emerged from a simple but powerful observation: the construction and project management industry needed to bridge the gap between traditional structural integrity and modern digital efficiency. We recognized that building excellence required more than just technical expertise—it demanded a transformation in how projects are conceptualized, managed, and delivered.`,
    },
    {
      text: `Our journey began with a commitment to solve the persistent challenges of capacity development and sustainability in the built environment. Through innovative thinking and a dedication to community growth, we've evolved into a comprehensive solutions provider that seamlessly integrates physical construction expertise with cutting-edge digital/Agile methodologies.`,
    },
    {
      text: `Today, Elevare stands as a testament to what's possible when experience meets innovation. Our vision is clear: to build a world-class African company recognized for precision, innovation, and excellence in project delivery and digital transformation—creating spaces and systems that empower businesses and communities to achieve their full potential.`,
    },
  ];

  return (
    <motion.section
      className="w-full py-10 lg:py-16 relative overflow-hidden"
      style={{
        backgroundColor: "var(--synergy-bg)",
        color: "var(--synergy-text)",
      }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }} // Fires once 25% of the section is visible
    >

      {/* DECORATIVE BACKGROUND ELEMENTS

          Ambient blur blobs add depth without distracting from the
          text-heavy content. pointer-events-none is implicit via
          absolute positioning — they sit behind z-10 content.
          opacity-5 keeps them very subtle in both light and dark mode.
      */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5 blur-3xl"
           style={{ backgroundColor: "var(--synergy-heading-highlight)" }}
           aria-hidden="true"
      />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-5 blur-3xl"
           style={{ backgroundColor: "var(--synergy-heading-highlight)" }}
           aria-hidden="true"
      />

      {/* CONTENT WRAPPER
          Progressively narrower on larger screens (90% → 75% → 65% → 58%)
          so the long-form text doesn't stretch uncomfortably on wide displays.
          text-center applies to all children by default.
      */}
      <div className="w-[90%] md:w-[75%] lg:w-[65%] xl:w-[58%] mx-auto text-center relative z-10">

        {/* EYEBROW LABEL
            Very tight tracking (0.45em) and small size make this a subtle
            category signal rather than a competing heading.
        */}
        <motion.p
          variants={fadeUp}
          className="text-[11px] tracking-[0.45em] uppercase opacity-60 mb-6"
        >
          Our Story
        </motion.p>

        {/* MAIN HEADING
            <br className="hidden sm:block"> breaks the line only on sm+
            so mobile gets a single flowing line without a forced break
            that would look awkward on narrow screens.
        */}
        <motion.h2
          variants={fadeUp}
          className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.2] tracking-tight mb-10"
          style={{ color: "var(--synergy-heading-main)" }}
        >
          Where Structural Integrity
          <br className="hidden sm:block" />
          Meets Digital Intelligence.
        </motion.h2>

        {/* DECORATIVE DIVIDER — mirrors the —•— pattern used site-wide */}
        <motion.div
          variants={fadeUp}
          className="w-14 h-[2px] mx-auto mb-14 rounded-full"
          style={{ backgroundColor: "var(--synergy-heading-highlight)" }}
          aria-hidden="true"
        />

        {/* STORY CARDS
            Each card uses scaleIn via the parent container's stagger.
            group class on the wrapper enables group-hover: on the
            accent line inside — so the line animates when the card
            is hovered, not just when the line itself is hovered.
        */}
        <div className="space-y-8">
          {storyContent.map((item, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              custom={index}
              className="relative group"
            >

              {/* CARD CONTAINER
                  backdrop-blur-sm adds a frosted glass effect when content
                  scrolls behind the card in certain layouts.
                  hover:shadow-xl gives tactile depth feedback on interaction.
              */}
              <div
                className="rounded-2xl p-8 md:p-10 lg:p-12 backdrop-blur-sm border transition-all duration-300 hover:shadow-xl"
                style={{
                  backgroundColor: "var(--synergy-card-bg)",
                  borderColor: "var(--synergy-card-border)",
                }}
              >

                {/* DECORATIVE OPENING QUOTE MARK
                    Font-serif gives it a classic typographic character.
                    opacity-20 keeps it a watermark rather than competing
                    with the actual text content.
                    aria-hidden — screen readers don't need to announce it.
                */}
                <div
                  className="absolute -top-4 left-8 text-6xl font-serif opacity-20"
                  style={{ color: "var(--synergy-heading-highlight)" }}
                  aria-hidden="true"
                >
                  "
                </div>

                {/* STORY TEXT PARAGRAPH */}
                <p
                  className="text-sm md:text-base lg:text-lg leading-relaxed relative z-10"
                  style={{ color: "var(--synergy-card-text)" }}
                >
                  {item.text}
                </p>

                {/* HOVER ACCENT LINE
                    Slides from w-0 → w-full on group-hover using CSS transition.
                    Positioned at the very bottom of the card (bottom-0).
                    rounded-b-2xl matches the card's border radius.
                */}
                <div
                  className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
                  style={{ backgroundColor: "var(--synergy-heading-highlight)" }}
                  aria-hidden="true"
                />
              </div>

              {/* NUMBERED BADGE
                  Positioned absolutely in the top-right corner of the card.
                  -right-3 -top-3 overlaps the card border slightly for a
                  "pinned" visual effect. Numbered 1–3 via index + 1.
              */}
              <div
                className="absolute -right-3 -top-3 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-lg"
                style={{
                  backgroundColor: "var(--synergy-heading-highlight)",
                  color: "#ffffff",
                }}
                aria-hidden="true"
              >
                {index + 1}
              </div>

            </motion.div>
          ))}
        </div>

        {/* VISION STATEMENT — FEATURED CALLOUT

            Differentiated from the story cards by using a 2px highlighted
            border instead of the standard card-border colour.
            This makes it feel like a pull-quote or a featured statement
            rather than a continuation of the story cards above.
        */}
        <motion.div
          variants={fadeUp}
          className="mt-16 relative"
        >
          <div
            className="rounded-2xl p-8 md:p-10 border-2 backdrop-blur-sm shadow-2xl"
            style={{
              backgroundColor: "var(--synergy-card-bg)",
              borderColor: "var(--synergy-heading-highlight)",
            }}
          >
            {/* VISION EYEBROW LABEL */}
            <p
              className="text-xs tracking-[0.3em] uppercase mb-4 opacity-60"
              style={{ color: "var(--synergy-card-text)" }}
            >
              Our Vision
            </p>

            {/* VISION QUOTE — the company's formal vision statement */}
            <p
              className="text-lg md:text-xl lg:text-2xl font-semibold leading-relaxed"
              style={{ color: "var(--synergy-card-text)" }}
            >
              "To build a world-class African company recognized for precision, innovation and excellence in project delivery and digital transformation."
            </p>
          </div>
        </motion.div>

        {/* BOTTOM DECORATIVE DOT ROW
            Three dots rendered via Array(3) spread.
            Acts as a visual full-stop / section closer.
            opacity-40 keeps them subtle — supporting decoration only.
        */}
        <motion.div
          variants={fadeUp}
          className="mt-12 flex items-center justify-center gap-2"
          aria-hidden="true"
        >
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full opacity-40"
              style={{
                backgroundColor: "var(--synergy-heading-highlight)",
              }}
            />
          ))}
        </motion.div>

      </div>
    </motion.section>
  );
}