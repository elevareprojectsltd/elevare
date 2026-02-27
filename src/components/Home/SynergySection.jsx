import { motion } from "framer-motion";
import { BiShieldQuarter } from "react-icons/bi";
import { PiTreeStructureBold, PiCommand } from "react-icons/pi";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

import hero2 from "../../assets/hero-2.webp";
import hero4 from "../../assets/hero-4.webp";

/* ===============================
   SYNERGY ITEMS DATA

   Purpose: The three value pillars shown in the top card grid.
   Each maps to a <motion.article> in the synergy cards section.

   Fields:
   - id          : React key
   - title       : Card heading
   - description : One-line value statement
   - icon        : React Icon component
   - accent      : Unique colour for the icon background and icon itself —
                   gives each card its own visual identity in the grid
================================ */
const SYNERGY_ITEMS = [
  {
    id: "precision",
    title: "Precision",
    description: "Expert supervision and quality control.",
    icon: BiShieldQuarter,
    accent: "#2563eb",   // Blue — signals trust and reliability
  },
  {
    id: "agility",
    title: "Agility",
    description: "Modern workflows for faster delivery.",
    icon: PiCommand,
    accent: "#7c3aed",   // Purple — signals speed and technology
  },
  {
    id: "efficiency",
    title: "Efficiency",
    description: "Cost-effective planning and procurement.",
    icon: PiTreeStructureBold,
    accent: "#059669",   // Green — signals growth and value
  },
];

/* ===============================
   SERVICE TRACK ITEMS DATA

   Purpose: The two core service tracks shown in the bottom grid.
   Each maps to a <ServiceTrackCard /> with its own visual identity.

   Fields:
   - id          : React key and used to route the button to the correct page
   - title       : Card heading
   - subtitle    : Tagline shown below the title
   - img         : Local webp asset — imported at top of file
   - features    : Bullet list of three key offerings
   - buttonText  : CTA label on the card button
   - accent      : Primary colour used for the image overlay gradient,
                   feature check icons, subtitle text, and button hover —
                   makes each track feel visually distinct from the other
   - link        : Internal SPA route the button navigates to
================================ */
const OUR_SERVICE_ITEMS = [
  {
    id: "construction",
    title: "Construction & Property",
    subtitle: "Building Your Vision.",
    img: hero4,
    features: [
      "End-to-End Building Construction",
      "Renovations & Facility Enhancements",
      "Interior Fit-outs",
    ],
    buttonText: "Start Your Build",
    accent: "#031f3a",   // Dark navy — grounded, structural, physical
    link: "/services/construction",
  },
  {
    id: "technology",
    title: "Technology & Digital",
    subtitle: "Powering Your Operations.",
    img: hero2,
    features: [
      "Web & App Development",
      "Agile / Scrum Coaching & Delivery",
      "Technology Advisory & Training",
    ],
    buttonText: "Upgrade Your Tech",
    accent: "#2563eb",   // Blue — forward-looking, digital, innovative
    link: "/services/technology",
  },
];

/* ===============================
   ANIMATION VARIANTS

   Purpose: Grouped into a single `animations` object so related variants
   stay together and don't pollute the module scope with many const names.

   animations.fadeUp        — Header blocks slide up 30px while fading in.
                              Custom cubic-bezier [0.22, 1, 0.36, 1] gives
                              a natural, slightly springy deceleration.
   animations.staggerContainer — Parent wrapper that sequences child cards.
                              staggerChildren: 0.15 cascades left → right.
                              delayChildren: 0.1 gives the header time to
                              settle before the first card starts.
   animations.card          — Individual card entrance consumed by
                              staggerContainer. y: 40 gives more travel
                              than fadeUp (y: 30) — cards feel weightier.

   viewportConfig           — Shared viewport config reused on all
                              whileInView triggers to avoid repetition.
                              amount: 0.2 fires once 20% is visible.
================================ */
const animations = {
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  },

  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,  // Each card animates 0.15s after the previous
        delayChildren: 0.1      // Wait 0.1s before the first card starts
      }
    }
  },

  card: {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  }
};

const viewportConfig = { once: true, amount: 0.2 };

/* ===============================
   SYNERGY SECTION COMPONENT

   Displays two visual groupings:

   1. SYNERGY CARDS (top) — three value pillar cards with unique accent
      colours per card. hover: lifts 8px, deepens shadow, swaps bg/text
      via CSS variables (--synergy-card-hover-bg / hover-text).

   2. SERVICE TRACKS (bottom) — two full-width cards, one per service line.
      Each has a coloured image overlay, accent-coloured subtitle and check
      icons, and a CTA button that routes to the correct service page via
      React Router <Link>.

   WHY <motion.header> FOR THE TOP HEADING:
   The top heading is the primary landmark for this section — using
   <header> is semantically correct and improves screen reader navigation.
   The inner headings use h1 here but should be h2 if this section appears
   below an existing h1 on the page (check heading hierarchy per page).
================================ */
export default function SynergySection() {
  return (
    <section
      className="w-full py-10"
      aria-label="Synergy Section showcasing structure and innovation"
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* SECTION HEADER
            staggerContainer sequences: eyebrow → heading → divider → description
            so they cascade in naturally top → bottom on scroll.
        */}
        <motion.header
          className="text-center mb-16"
          variants={animations.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {/* EYEBROW LABEL */}
          <motion.p
            variants={animations.fadeUp}
            className="text-xs md:text-sm tracking-[0.3em] uppercase mb-4 opacity-70"
            style={{ color: "var(--synergy-heading-main)" }}
          >
            Why Elevare
          </motion.p>

          {/* MAIN HEADING */}
          <motion.h1
            variants={animations.fadeUp}
            className="text-4xl md:text-5xl font-bold leading-tight"
          >
            <span style={{ color: "var(--synergy-heading-main)" }}>The Synergy of Structure</span>
            <br />
            <span style={{ color: "var(--synergy-heading-highlight)" }}>& Innovation</span>
          </motion.h1>

          {/* DECORATIVE DIVIDER */}
          <motion.div
            variants={animations.fadeUp}
            className="flex items-center justify-center gap-2 mt-6"
            aria-hidden="true"
          >
            <div className="h-[2px] w-12 rounded-full" style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
            <div className="h-2 w-2 rounded-full"      style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
            <div className="h-[2px] w-12 rounded-full" style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
          </motion.div>

          {/* SUPPORTING DESCRIPTION */}
          <motion.p
            variants={animations.fadeUp}
            className="max-w-3xl mx-auto mt-6 opacity-80 leading-relaxed text-base md:text-lg"
          >
            Modern project success depends on the seamless balance between solid infrastructure and intelligent technology.
          </motion.p>
        </motion.header>

        {/* SYNERGY CARDS — three value pillars
            Each card gets a unique accent colour on its icon background
            and icon itself so the three cards feel visually distinct.
        */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={animations.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {SYNERGY_ITEMS.map(({ id, title, description, icon: Icon, accent }) => (
            <motion.article
              key={id}
              className="group rounded-xl p-8 border bg-[var(--synergy-card-bg)] text-[var(--synergy-card-text)] border-[var(--synergy-card-border)] hover:bg-[var(--synergy-card-hover-bg)] hover:text-[var(--synergy-card-hover-text)] hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-out"
              variants={animations.card}
              aria-label={`${title} synergy card`}
            >
              {/* ICON WELL — accent colour at 15% opacity for the bg,
                  full accent colour for the icon itself                */}
              <div
                className="w-12 h-12 mb-6 flex items-center justify-center rounded-full transition-all duration-300"
                style={{ backgroundColor: `${accent}18`, color: accent }}
              >
                <Icon className="w-6 h-6" />
              </div>

              <h2 className="text-xl font-semibold mb-3">{title}</h2>
              <p className="text-sm opacity-80">{description}</p>

              {/* ACCENT BOTTOM BORDER — slides in on hover */}
              <div
                className="mt-6 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{ backgroundColor: accent }}
                aria-hidden="true"
              />
            </motion.article>
          ))}
        </motion.div>

        {/* SERVICE TRACKS */}
        <section className="mt-20">

          {/* SERVICE TRACKS HEADER
              staggerContainer sequences the eyebrow label, heading,
              divider, and description so they cascade in naturally.
          */}
          <motion.div
            className="text-center mb-16"
            variants={animations.staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {/* EYEBROW LABEL */}
            <motion.p
              variants={animations.fadeUp}
              className="text-xs md:text-sm tracking-[0.3em] uppercase mb-4 opacity-70"
              style={{ color: "var(--synergy-heading-main)" }}
            >
              What We Offer
            </motion.p>

            {/* MAIN HEADING */}
            <motion.h2
              variants={animations.fadeUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
            >
              <span style={{ color: "var(--synergy-heading-main)" }}>Our Core Service</span>
              <br />
              <span style={{ color: "var(--synergy-heading-highlight)" }}>Tracks</span>
            </motion.h2>

            {/* DECORATIVE DIVIDER */}
            <motion.div
              variants={animations.fadeUp}
              className="flex items-center justify-center gap-2 mt-6"
              aria-hidden="true"
            >
              <div className="h-[2px] w-12 rounded-full" style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
              <div className="h-2 w-2 rounded-full"      style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
              <div className="h-[2px] w-12 rounded-full" style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
            </motion.div>

            {/* SUPPORTING DESCRIPTION */}
            <motion.p
              variants={animations.fadeUp}
              className="max-w-2xl mx-auto mt-6 opacity-70 leading-relaxed text-base md:text-lg"
              style={{ color: "var(--synergy-heading-main)" }}
            >
              Two specialised delivery tracks — built to work independently or together.
            </motion.p>
          </motion.div>

          {/* SERVICE TRACK CARDS
              Each card has its own accent colour that flows through:
              - Image overlay gradient (accent → transparent)
              - Subtitle text colour
              - Feature check icon colour
              - Button background on hover
              This makes Construction and Technology feel visually distinct.
          */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
            variants={animations.staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
          >
            {OUR_SERVICE_ITEMS.map(({ id, title, subtitle, img, features, buttonText, accent, link }) => (
              <motion.article
                key={id}
                className="group rounded-xl border overflow-hidden bg-[var(--synergy-card-bg)] text-[var(--synergy-card-text)] border-[var(--synergy-card-border)] hover:shadow-2xl transition-all duration-300"
                variants={animations.card}
                aria-label={`${title} service card`}
              >

                {/* IMAGE WITH ACCENT OVERLAY
                    The gradient uses the card's accent colour so Construction
                    gets a dark navy tint and Technology gets a blue tint.
                    Overlay fades in on group-hover to reveal the accent identity.
                */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={img}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                    style={{ background: `linear-gradient(to top, ${accent}, transparent)` }}
                    aria-hidden="true"
                  />
                  {/* SERVICE TITLE OVERLAY — appears on image on hover */}
                  <div className="absolute bottom-4 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-white text-sm font-semibold tracking-widest uppercase">
                      {id === "construction" ? "Construction & Property" : "Technology & Digital"}
                    </span>
                  </div>
                </div>

                {/* CARD CONTENT */}
                <div className="p-8">

                  <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--synergy-heading-main)" }}>
                    {title}
                  </h3>

                  {/* SUBTITLE — uses the card's accent colour */}
                  <p className="mb-6 font-medium" style={{ color: accent }}>
                    {subtitle}
                  </p>

                  {/* FEATURE LIST
                      Check icon uses the card's accent colour so Construction
                      bullets are navy and Technology bullets are blue.
                  */}
                  <ul className="space-y-3 mb-8">
                    {features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 opacity-80">
                        <BsCheckCircleFill
                          size={18}
                          className="mt-1 flex-shrink-0"
                          style={{ color: accent }}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA BUTTON — routes to the correct service page via Link.
                      hover bg uses the card's accent colour so Construction
                      button turns navy and Technology button turns blue.
                  */}
                  <Link to={link}>
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 py-3 rounded-lg font-medium border transition-all duration-300 text-white"
                      style={{ backgroundColor: accent, borderColor: accent }}
                    >
                      {buttonText}
                    </motion.button>
                  </Link>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>
      </div>
    </section>
  );
}
