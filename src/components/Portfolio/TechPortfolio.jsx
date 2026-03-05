import { motion } from "framer-motion";
import { FiArrowUpRight, FiCode, FiGlobe, FiSmartphone, FiZap, FiLayout, FiPackage } from "react-icons/fi";

/* ===============================
   TECH PROJECTS DATA

   Purpose: Single source of truth for all technology portfolio entries.
   Each object maps directly to a <TechProjectCard /> rendered in the grid.

   Fields:
   - number       : Display index shown faintly on the card (aesthetic only)
   - title        : Project name shown as the card heading
   - category     : Short label shown above the title in uppercase
   - tech         : Array of tags shown at the bottom of each card
   - description  : One-sentence summary of what the project does
   - href         : Live URL — opens in a new tab when the card is clicked
   - icon         : React Icon component used for the category icon
   - accent       : Hex colour used for icon bg, tag pills, hover glow,
                    top border line, and arrow button — unique per card
                    so each project has its own visual identity

   HOW TO ADD A NEW PROJECT:
   Copy any object below, update the fields, and add it to the array.
   The grid layout and animations update automatically.
================================ */
const TECH_PROJECTS = [
  {
    number: "01",
    title: "Fabs Logistics",
    category: "Web Application",
    tech: ["React", "CSS", "JavaScript"],
    description:
      "A full logistics web app for Fabs Logistics — built to manage shipments, track deliveries, and streamline operations for a growing logistics business.",
    href: "https://fabs-logistics.vercel.app",
    icon: FiGlobe,
    accent: "#2563eb",
  },
  {
    number: "02",
    title: "Idariji",
    category: "Web Application",
    tech: ["React", "JavaScript", "Vercel"],
    description:
      "A modern web application delivered end-to-end — from architecture through to deployment — with clean UI and a performant user experience.",
    href: "https://idariji.vercel.app",
    icon: FiLayout,
    accent: "#0891b2",
  },
  {
    number: "03",
    title: "A3 Spaces",
    category: "Corporate Website",
    tech: ["React", "Tailwind CSS", "Vercel"],
    description:
      "A polished management consulting website for A3 Spaces — designed to communicate credibility, showcase services, and generate client enquiries.",
    href: "https://a3-spaces.vercel.app",
    icon: FiGlobe,
    accent: "#7c3aed",
  },
  {
    number: "04",
    title: "The Imaginarium Gallery",
    category: "Web App",
    tech: ["React", "REST API", "Authentication"],
    description:
      "An image gallery web app with user authentication. Users log in to browse and manage a curated collection of images in a clean, responsive interface.",
    href: "https://image-gallery-pi-three.vercel.app",
    icon: FiCode,
    accent: "#059669",
  },
  {
    number: "05",
    title: "Moviebox",
    category: "Entertainment App",
    tech: ["React", "TMDB API", "JavaScript"],
    description:
      "A movie discovery web app powered by the TMDB API — users can browse trending films, search titles, and explore details in a sleek cinema-inspired UI.",
    href: "https://moviebox-bay.vercel.app",
    icon: FiSmartphone,
    accent: "#dc2626",
  },
  {
    number: "06",
    title: "Uber Product Research",
    category: "Product Management",
    tech: ["Product Research", "User Analysis", "Strategy"],
    description:
      "Entry-level product research certification project conducted for Uber — covering user research, competitive analysis, and structured product recommendations.",
    href: "https://drive.google.com/file/d/1svmv60Fq_cLGpKuXkGqoCveOBUhMfvoT/view?usp=sharing",
    icon: FiPackage,
    accent: "#4f46e5",
  },
];

/* ===============================
   ANIMATION VARIANTS

   Purpose: Define reusable animation patterns for Framer Motion.
   These create smooth entrance effects without causing layout shifts
   by only animating transform and opacity properties.

   fadeUp           — Section header entrance: slides up + fades in.
   staggerContainer — Triggers staggered animation across all child cards.
                      delayChildren gives the header time to animate first.
   itemVariant      — Individual card entrance: consumed by staggerContainer.
================================ */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,   // Each card animates 0.1s after the previous
      delayChildren: 0.1,     // Wait 0.1s before the first card starts
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ===============================
   TECH PROJECT CARD COMPONENT

   Renders a single project entry as an anchor tag so the entire
   card is clickable and navigates to the live project URL.

   Visual behaviours on hover:
   - Card lifts 8px (whileHover y: -8)
   - Top accent border slides from 0 → 100% width (CSS transition)
   - Background gradient glow fades in (opacity-0 → opacity-100)
   - Icon scales up slightly (scale-110)
   - Arrow icon rotates 12deg

   DARK MODE — CARD BACKGROUND:
   In dark mode --synergy-card-bg is white and --synergy-bg is #06284d.
   The cards intentionally stay on --synergy-card-bg (white) in dark mode
   to match the rest of the construction portfolio cards which also use
   the white card surface on the dark blue page background.
   Text inside cards uses --synergy-card-text (#031f3a) so it stays
   readable on the white card surface in both modes.

   WHY <motion.a> NOT <Link>:
   All projects link to external URLs (Vercel, Netlify, Google Drive),
   so we use a native <a> with target="_blank" and rel="noopener noreferrer"
   instead of React Router's <Link>, which is for internal SPA routes only.
================================ */
function TechProjectCard({ project }) {
  const IconComponent = project.icon;

  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      variants={itemVariant}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      aria-label={`View ${project.title} — ${project.category} project`}
      className="group relative rounded-2xl p-6 lg:p-8 border-2 transition-all duration-300 hover:shadow-2xl overflow-hidden block focus:outline-none focus:ring-2 focus:ring-offset-2"
      style={{
        // Uses --synergy-card-bg so the card surface matches the rest of
        // the portfolio cards — white in both light and dark mode.
        backgroundColor: "var(--synergy-card-bg)",
        borderColor: "var(--synergy-card-border)",
      }}
    >
      {/* HOVER BACKGROUND GLOW
          Fades in on hover to give each card a unique coloured ambient
          glow that matches its accent. opacity-0 by default so it has
          zero visual weight until the user interacts with the card.
      */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${project.accent}08, ${project.accent}04)` }}
        aria-hidden="true"
      />

      {/* TOP ACCENT LINE
          Slides from w-0 → w-full on hover using CSS transition.
          Each card has a unique colour so the grid feels varied,
          not repetitive. Positioned absolute at the very top of the card.
      */}
      <div
        className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 rounded-t-2xl pointer-events-none"
        style={{ backgroundColor: project.accent }}
        aria-hidden="true"
      />

      {/* NUMBER + ARROW ROW
          Number is decorative (very low opacity).
          Arrow button scales and rotates on hover to reinforce
          the "this card is a link" affordance visually.
      */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <span
          className="text-xs font-bold tracking-[0.2em] opacity-30"
          style={{ color: "var(--synergy-card-text)" }}
          aria-hidden="true"
        >
          {project.number}
        </span>

        <div
          className="w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300 group-hover:scale-110"
          style={{ borderColor: project.accent, color: project.accent }}
          aria-hidden="true"
        >
          <FiArrowUpRight
            size={16}
            className="transform group-hover:rotate-12 transition-transform duration-300"
          />
        </div>
      </div>

      {/* CATEGORY ICON
          Icon background uses the accent colour at ~10% opacity so it
          tints without overpowering. Scales up slightly on hover.
      */}
      <div
        className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
        style={{ backgroundColor: `${project.accent}18`, color: project.accent }}
        aria-hidden="true"
      >
        <IconComponent size={22} />
      </div>

      {/* CATEGORY LABEL
          Uses --synergy-card-text so it stays readable on the white
          card surface in both light and dark mode.
      */}
      <p
        className="relative z-10 text-xs font-semibold tracking-widest uppercase mb-2 opacity-60"
        style={{ color: "var(--synergy-card-text)" }}
      >
        {project.category}
      </p>

      {/* PROJECT TITLE
          Uses --synergy-card-text (not --synergy-heading-main) so the
          dark blue title remains readable on the white card in dark mode.
      */}
      <h3
        className="relative z-10 text-xl font-bold mb-3 transition-colors duration-300"
        style={{ color: "var(--synergy-card-text)" }}
      >
        {project.title}
      </h3>

      {/* PROJECT DESCRIPTION
          Uses --synergy-card-text for consistent readability on white card.
      */}
      <p
        className="relative z-10 text-sm leading-relaxed mb-6 opacity-65"
        style={{ color: "var(--synergy-card-text)" }}
      >
        {project.description}
      </p>

      {/* TECH / SKILL TAGS
          Background and border both use the card's accent at low opacity
          so the tags feel cohesive with the card's colour identity.
      */}
      <div className="relative z-10 flex flex-wrap gap-2">
        {project.tech.map((tag, i) => (
          <span
            key={i}
            className="text-xs px-3 py-1 rounded-full font-medium"
            style={{
              backgroundColor: `${project.accent}12`,
              color: project.accent,
              border: `1px solid ${project.accent}25`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.a>
  );
}

/* ===============================
   TECH PORTFOLIO SECTION — MAIN COMPONENT

   Displays the full technology portfolio grid with:
   - Left-aligned section header with eyebrow label and highlighted heading
   - Responsive 1 → 2 → 3 column card grid with staggered entrance
   - Each card links to a live project URL in a new tab
   - Bottom CTA strip with animated ping dot and "Start a Project" button
   - Decorative background blur blobs for visual depth
   - Fully theme-aware via CSS variables

   DARK MODE — SECTION BACKGROUND:
   The section uses --synergy-bg (#06284d in dark mode) as its background,
   matching the page. Cards sit on --synergy-card-bg (white) on top of it,
   giving the same white-card-on-dark-blue look as the construction section.
   The CTA strip also uses --synergy-card-bg so it lifts off the background.
================================ */
export default function TechPortfolio() {
  return (
    <section
      className="w-full py-16 lg:py-24 transition-colors duration-300 relative overflow-hidden"
      aria-labelledby="tech-portfolio-heading"
      style={{ backgroundColor: "var(--synergy-bg)" }}
    >

      {/* DECORATIVE BACKGROUND BLOBS
          Positioned outside the visible area (-top-40, -bottom-40)
          so only the soft glow bleeds into the section edges.
          pointer-events-none ensures they never block any interactions.
      */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-5"
          style={{ backgroundColor: "var(--synergy-heading-highlight)" }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-5"
          style={{ backgroundColor: "var(--synergy-heading-highlight)" }}
        />
      </div>

      <div className="w-[90%] lg:w-[80%] mx-auto relative z-10">

        {/* SECTION HEADER
            Left-aligned intentionally — asymmetric layout gives this
            section a different rhythm from the centred headers elsewhere.
            Text uses --synergy-heading-main / --synergy-text so it
            switches correctly between light (#000) and dark (#fff) mode.
        */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-2xl mb-16"
        >
          {/* EYEBROW LABEL */}
          <p
            className="text-xs md:text-sm tracking-[0.3em] uppercase mb-4 opacity-70"
            style={{ color: "var(--synergy-text)" }}
          >
            Technology & Digital
          </p>

          {/* MAIN HEADING
              id ties to aria-labelledby on the parent <section>.
          */}
          <h2
            id="tech-portfolio-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6"
            style={{ color: "var(--synergy-heading-main)" }}
          >
            Work We're
            <br />
            <span style={{ color: "var(--synergy-heading-highlight)" }}>
              Proud Of
            </span>
          </h2>

          {/* SUPPORTING DESCRIPTION */}
          <p
            className="text-base md:text-lg leading-relaxed opacity-70"
            style={{ color: "var(--synergy-text)" }}
          >
            Each project represents a real challenge solved with smart technology,
            clean code, and Agile thinking. Click any card to see the live project
            or full case study.
          </p>
        </motion.div>

        {/* PROJECTS GRID
            staggerContainer staggers each TechProjectCard's entrance
            so they cascade into view one after another — not all at once.
            amount: 0.05 triggers the animation early so cards are already
            animating before the user scrolls all the way to the bottom.
        */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          {TECH_PROJECTS.map((project, index) => (
            <TechProjectCard key={index} project={project} />
          ))}
        </motion.div>

        {/* BOTTOM CTA STRIP
            Uses --synergy-card-bg so it lifts off the --synergy-bg page
            background in both light and dark mode — consistent with cards.
            Text uses --synergy-card-text for the same reason.

            The animated ping dot (relative + animate-ping) draws the eye
            to the strip subtly — communicating "live / active" without
            being distracting.
        */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl p-6 border-2"
          style={{
            // Uses --synergy-card-bg so the strip has the same white surface
            // as the cards in dark mode — not the same dark blue as the bg.
            borderColor: "var(--synergy-card-border)",
            backgroundColor: "var(--synergy-card-bg)",
          }}
        >
          {/* LEFT — STATUS DOT + PROMPT TEXT */}
          <div className="flex items-center gap-4">
            {/* Animated ping dot — signals "we're active and available" */}
            <span className="relative flex h-3 w-3 flex-shrink-0" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-400" />
            </span>
            <p
              className="text-sm font-medium"
              style={{ color: "var(--synergy-card-text)" }}
            >
              Have a project in mind? We'd love to hear about it.
            </p>
          </div>

          {/* RIGHT — CTA BUTTON
              Uses <motion.a> pointing to the internal /contact route.
              Switch to <Link to="/contact"> if preferred inside a Router context.
          */}
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Start a project with Elevare — go to contact page"
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white flex-shrink-0 transition-all duration-300 shadow-lg hover:shadow-xl"
            style={{ backgroundColor: "var(--synergy-heading-highlight)" }}
          >
            Start a Project
            <FiArrowUpRight size={16} />
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}