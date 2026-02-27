import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

/* ===============================
   SERVICES DATA

   Purpose: Single source of truth for all construction service entries.
   Each object maps directly to a <ServiceCard /> in the grid.

   Fields:
   - title       : Service name — shown as the card heading
   - description : One-line summary — shown below the title in the card
   - image       : Pexels image URL. ?auto=compress&cs=tinysrgb&w=800
                   keeps file sizes small without visible quality loss.
                   Replace with real project photography when available.
   - link        : Internal SPA route — all currently point to
                   /services/construction. Update individually if
                   dedicated sub-pages are created per service.

   HOW TO ADD A NEW SERVICE:
   Copy any object, update the fields, and add it to the array.
   The grid layout and stagger animation update automatically.
================================ */
const SERVICES = [
  {
    title: "General Contracting",
    description: "End-to-end project management from planning to completion",
    image: "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800",
    link: "/services/construction"
  },
  {
    title: "Residential Construction",
    description: "Custom homes and residential developments built to perfection",
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
    link: "/services/construction"
  },
  {
    title: "Commercial Projects",
    description: "Office buildings, retail spaces, and commercial complexes",
    image: "https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=800",
    link: "/services/construction"
  },
  {
    title: "Renovations & Remodeling",
    description: "Transform existing spaces with modern upgrades and enhancements",
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800",
    link: "/services/construction"
  },
  {
    title: "Architecture & Planning",
    description: "Innovative design solutions and comprehensive planning services",
    image: "https://images.pexels.com/photos/271667/pexels-photo-271667.jpeg?auto=compress&cs=tinysrgb&w=800",
    link: "/services/construction"
  },
  {
    title: "Project Management",
    description: "Expert coordination and oversight for seamless execution",
    image: "https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800",
    link: "/services/construction"
  }
];

/* ===============================
   ANIMATION VARIANTS

   Purpose: Define reusable animation patterns for Framer Motion.
   These create smooth entrance effects without causing layout shifts
   by only animating transform and opacity properties.

   fadeUp         — Section header and CTA button entrance: slides up
                    30px while fading in. Also used on the bottom CTA.
   staggerContainer — Grid wrapper that sequences all card entrances.
                    staggerChildren: 0.1 cascades cards left → right.
                    delayChildren: 0.2 lets the header settle first
                    before the first card starts animating.
   cardVariant    — Individual card entrance consumed by staggerContainer.
                    Lighter than fadeUp (y: 20 not 30) — cards are
                    secondary content so a subtler entrance is appropriate.
================================ */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,  // Each card animates 0.1s after the previous
      delayChildren: 0.2     // Wait 0.2s before the first card starts
    }
  }
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

/* ===============================
   SERVICES GRID COMPONENT

   Displays the construction services overview with:
   - Centred section header with eyebrow label and supporting description
   - Responsive 1 → 2 → 3 column card grid with staggered entrance
   - Each card wraps in a React Router <Link> making the entire card
     a navigation element — no separate "read more" button needed
   - On hover: image scales 1.1×, gradient overlay fades in, arrow
     icon slides up from below, card lifts 8px, title turns blue
   - Bottom CTA button navigates to the full Portfolio page

   WHY <article> FOR EACH CARD:
   <article> is the correct HTML5 semantic tag for a self-contained
   piece of content that could stand independently — a service card
   qualifies. This improves accessibility landmark structure and SEO.

   WHY whileHover ON <motion.img> NOT THE CONTAINER:
   Applying scale to the image independently (not the whole card)
   means the card border and content stay fixed while only the image
   zooms — avoiding a jarring full-card scale effect.
================================ */
export default function ServicesGrid() {
  return (
    <section
      className="w-full py-16 lg:py-24 transition-colors duration-300"
      aria-labelledby="services-grid-heading"
      style={{ backgroundColor: "var(--synergy-bg)" }}
    >
      <div className="w-[90%] lg:w-[80%] mx-auto">

        {/* SECTION HEADER — centred layout for this section
            Intentionally centred (unlike TechPortfolio/ConstructionPortfolio
            which are left-aligned) to give this overview section a
            different visual rhythm on the page.
        */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12 lg:mb-16"
        >
          {/* EYEBROW LABEL */}
          <p
            className="text-xs md:text-sm tracking-[0.3em] uppercase mb-4 opacity-70"
            style={{ color: "var(--synergy-text)" }}
          >
            What We Do
          </p>

          {/* MAIN HEADING
              id ties to aria-labelledby on the parent <section>.
          */}
          <h2
            id="services-grid-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: "var(--synergy-heading-main)" }}
          >
            We Build Everything You Need
          </h2>

          {/* SUPPORTING DESCRIPTION
              max-w-2xl + mx-auto constrains line length for comfortable
              reading on wide screens without centred text stretching too far.
          */}
          <p
            className="text-base md:text-lg max-w-2xl mx-auto opacity-80"
            style={{ color: "var(--synergy-text)" }}
          >
            From concept to completion, our comprehensive construction services deliver excellence at every stage.
          </p>
        </motion.div>

        {/* SERVICES GRID
            staggerContainer cascades each card's entrance via cardVariant.
            amount: 0.1 fires early so cards are animating before the user
            has scrolled fully into the grid.
        */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {SERVICES.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariant}
            >
              {/* LINK WRAPPER — entire card is a navigation element.
                  Using <Link> instead of a button inside the card keeps
                  the markup clean and makes the full card clickable
                  without nested interactive elements.
              */}
              <Link to={service.link}>
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="group h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                  style={{
                    backgroundColor: "var(--synergy-card-bg)",
                    border: "2px solid var(--synergy-card-border)"
                  }}
                >

                  {/* IMAGE AREA */}
                  <div className="relative h-64 overflow-hidden">

                    {/* SERVICE IMAGE
                        whileHover scale is applied to the image independently
                        so only the image zooms — the card border stays fixed.
                    */}
                    <motion.img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />

                    {/* GRADIENT OVERLAY
                        opacity-0 by default — fades in on group-hover to
                        darken the image and make the arrow icon readable.
                    */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* ARROW ICON
                        Appears on hover with a slide-up effect via
                        translate-y-2 → translate-y-0 CSS transition.
                        Hardcoded #001F3F (darkest navy) for the icon colour
                        so it always reads clearly against the white circle.
                    */}
                    <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <FiArrowRight className="text-[#001F3F]" size={20} />
                    </div>
                  </div>

                  {/* CARD CONTENT */}
                  <div className="p-6">

                    {/* SERVICE TITLE
                        group-hover:text-blue-600 changes colour on card hover
                        to reinforce that the whole card is a clickable link.
                    */}
                    <h3
                      className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors duration-300"
                      style={{ color: "var(--synergy-card-text)" }}
                    >
                      {service.title}
                    </h3>

                    {/* SERVICE DESCRIPTION */}
                    <p
                      className="text-sm leading-relaxed opacity-80"
                      style={{ color: "var(--synergy-card-text)" }}
                    >
                      {service.description}
                    </p>
                  </div>
                </motion.article>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA BUTTON
            delay: 0.4 staggers it after the grid has finished animating in.
            whileHover scale: 1.05 + whileTap scale: 0.95 give satisfying
            press feedback. Routes to /portfolio to show full project work.
        */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12 lg:mt-16"
        >
          <Link to="/portfolio">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl font-bold text-white flex items-center gap-2 mx-auto shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ backgroundColor: "var(--synergy-heading-highlight)" }}
            >
              View Our Works
              <FiArrowRight />
            </motion.button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}