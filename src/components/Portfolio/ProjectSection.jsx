import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiX, FiChevronLeft, FiChevronRight, FiMapPin, FiCalendar } from "react-icons/fi";

/* ===============================
   PROJECTS DATA

   Purpose: Single source of truth for all construction portfolio entries.
   Each object maps directly to a <ProjectCard /> in the grid and
   populates the <GalleryModal /> when the card is clicked.

   Fields:
   - id          : Unique identifier used as the React key on each card
   - name        : Project name — shown as the card heading and modal title
   - location    : City and state — displayed with a FiMapPin icon
   - year        : Completion year — displayed with a FiCalendar icon
   - category    : Project type — shown as a frosted badge on the card image
   - scope       : Elevare's role — shown below the title on card and in modal
   - description : Full project summary — truncated to 3 lines on the card
                   (line-clamp-3), full text shown in the modal detail panel
   - highlights  : Bullet points shown only in the modal — not on the card
   - images      : Array of Pexels URLs. Replace with real project photography
                   when available. First image is shown by default on the card.
                   ?auto=compress&cs=tinysrgb&w=800 keeps file sizes small
                   without visible quality loss — important for PageSpeed score.

   HOW TO ADD A NEW PROJECT:
   Copy any object below, update all fields, and add it to the array.
   The grid, modal, and image carousel all update automatically.
================================ */
const PROJECTS = [
  {
    id: 1,
    name: "Club Concierge Office Fit-out",
    location: "Ikeja, Lagos",
    year: "2024",
    category: "Interior Design & Fit-out",
    scope: "Architect, Fit-out, Project Manager",
    description:
      "Successful transformation of an existing space into a vibrant, fully functional office for a travel agency. The completed design reflects the excitement of global exploration while supporting efficient day-to-day operations and meaningful client interactions.",
    highlights: [
      "Welcoming reception area with travel-inspired design",
      "Organized workstations for travel consultants",
      "Flexible meeting and consultation spaces",
      "Modern technology integration with digital displays",
      "Natural and energy-efficient lighting",
      "Acoustic considerations for client privacy",
    ],
    images: [
      "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2883049/pexels-photo-2883049.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1181248/pexels-photo-1181248.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 2,
    name: "Ifx Residence Renovation",
    location: "Lekki, Lagos",
    year: "2024",
    category: "Residential Renovation",
    scope: "Architect, Fit-out, Project Manager",
    description:
      "Complete fit-out of a 1-room duplex, transforming it into a functional and stylish living space. The design maximized space efficiency while creating a modern, comfortable, and inviting environment.",
    highlights: [
      "Living area with natural light optimization",
      "Fully equipped kitchenette",
      "Private bedroom and bathroom",
      "Striking metal and wood stairwell design feature",
      "High-quality finishes and smart storage solutions",
      "Contemporary, cozy, and efficient home",
    ],
    images: [
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 3,
    name: "Zinari Apartments",
    location: "Abuja, Nigeria",
    year: "2023",
    category: "Residential Development",
    scope: "Architect, Project Manager",
    description:
      "A contemporary 5-bedroom semi-detached residential development designed to combine functionality with modern elegance. Three bedrooms are en-suite with walk-in closets, offering comfort and privacy.",
    highlights: [
      "5-bedroom semi-detached design",
      "3 en-suite bedrooms with walk-in closets",
      "Spacious living room and dining area",
      "Large kitchen with pantry, utilities, and laundry",
      "Basement den for recreation",
      "Clean lines and balanced proportions",
    ],
    images: [
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 4,
    name: "Hopewell Towers",
    location: "Victoria Island, Lagos",
    year: "2023",
    category: "Residential Development",
    scope: "Architect, Project Manager",
    description:
      "A luxury twin-block residential development comprising four 4-bedroom maisonette apartments and an exclusive 3-bedroom penthouse. Designed for modern living with emphasis on space, comfort, and privacy.",
    highlights: [
      "Twin-block residential development",
      "4-bedroom maisonette apartments",
      "Exclusive 3-bedroom penthouse",
      "Open-plan living areas with terraces",
      "Ground-level parking and service areas",
      "Durable cladding and glazed elements",
    ],
    images: [
      "https://images.pexels.com/photos/380768/pexels-photo-380768.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 5,
    name: "Ligali Towers",
    location: "Victoria Island, Lagos",
    year: "2023",
    category: "Commercial Hotel",
    scope: "Architect",
    description:
      "A 20-story 3-star hotel development located on Ligali Ayorinde Street. Features 62 guest rooms and suites, five meeting spaces, spa, fitness center, restaurant, and infinity rooftop pool.",
    highlights: [
      "20-story hotel development",
      "62 guest rooms and suites",
      "Five meeting spaces, spa, and fitness center",
      "Restaurant and infinity rooftop pool",
      "Aluminum cladding with double-glazed curtain walling",
      "Distinctive curved geometry",
    ],
    images: [
      "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
  {
    id: 6,
    name: "Casem Cathedral",
    location: "Ologolo, Lagos",
    year: "2023",
    category: "Religious Architecture",
    scope: "Architect",
    description:
      "Contemporary cathedral design combining modern architectural elements with traditional religious symbolism. Features clean lines, natural lighting, and community spaces.",
    highlights: [
      "Contemporary cathedral design",
      "Modern architectural elements",
      "Natural lighting integration",
      "Community worship spaces",
      "Traditional symbolism with modern execution",
      "Acoustically optimized sanctuary",
    ],
    images: [
      "https://images.pexels.com/photos/208277/pexels-photo-208277.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
  },
];

/* ===============================
   ANIMATION VARIANTS

   Purpose: Define reusable animation patterns for Framer Motion.
   These create smooth entrance effects without causing layout shifts
   by only animating transform and opacity properties.

   fadeUp         — Card and header entrance: slides up 30px while fading in.
                    Used on the section header block and each ProjectCard
                    via the staggerContainer parent.
   staggerContainer — Grid wrapper that sequences all ProjectCard entrances.
                    staggerChildren: 0.1 cascades cards left → right.
                    delayChildren: 0.1 lets the header finish first.
   modalVariant   — GalleryModal scales from 95% → 100% on open.
                    exit reverses this on close. duration: 0.2 on exit
                    is faster than enter (0.3) so closing feels snappy.
================================ */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const modalVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 }, // Faster exit so closing feels snappy
  },
};

/* ===============================
   PROJECT CARD COMPONENT

   Renders a single project as a clickable card. Clicking anywhere
   on the card calls onClick(project) which sets selectedProject in
   the parent — triggering the GalleryModal to open.

   WHY group CLASS:
   Enables group-hover: on child elements (image scale, arrow opacity,
   title colour) without JS state — pure CSS hover from parent to children.

   IMAGE CAROUSEL:
   Each card has its own currentImageIndex state so multiple cards can
   be browsed simultaneously without affecting each other.
   e.stopPropagation() on the arrow buttons prevents the card's onClick
   from firing when the user clicks a navigation arrow.
================================ */
function ProjectCard({ project, onClick }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  /* IMAGE NAVIGATION
     e.stopPropagation() prevents the card's onClick (which opens the
     modal) from firing when the user clicks prev/next arrows.         */
  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex(
      (prev) => (prev - 1 + project.images.length) % project.images.length
    );
  };

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      onClick={() => onClick(project)}
      className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
      style={{
        backgroundColor: "var(--synergy-bg)",
        border: "2px solid var(--synergy-card-border)",
      }}
    >

      {/* IMAGE CAROUSEL AREA */}
      <div className="relative h-64 overflow-hidden">

        {/* PROJECT IMAGE
            group-hover:scale-105 zooms the image subtly on card hover
            — a Ken Burns effect that signals interactivity.
        */}
        <img
          src={project.images[currentImageIndex]}
          alt={project.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* GRADIENT OVERLAY
            from-black/70 at the bottom keeps the category badge and
            counter readable regardless of the image's own colours.
        */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* IMAGE NAVIGATION ARROWS
            Only rendered when there are multiple images.
            opacity-0 by default, fade in on group-hover so they
            don't clutter the default card state.
        */}
        {project.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/30"
            >
              <FiChevronLeft className="text-white" size={18} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/30"
            >
              <FiChevronRight className="text-white" size={18} />
            </button>
          </>
        )}

        {/* IMAGE COUNTER — "1 / 4" style position indicator */}
        <div className="absolute bottom-3 right-3 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs text-white">
          {currentImageIndex + 1} / {project.images.length}
        </div>

        {/* CATEGORY BADGE
            Uses inline backdropFilter for frosted glass — Tailwind's
            backdrop-blur requires a wrapper div, so inline style is cleaner.
        */}
        <div className="absolute top-3 left-3">
          <span
            className="text-xs font-bold px-3 py-1 rounded-full text-white"
            style={{
              backgroundColor: "rgba(37, 99, 235, 0.85)",
              backdropFilter: "blur(8px)",
            }}
          >
            {project.category}
          </span>
        </div>
      </div>

      {/* CARD CONTENT */}
      <div className="p-5">

        {/* META ROW — location + year with icons */}
        <div className="flex items-center gap-3 mb-3 text-xs opacity-60" style={{ color: "var(--synergy-text)" }}>
          <div className="flex items-center gap-1">
            <FiMapPin size={12} />
            <span>{project.location}</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1">
            <FiCalendar size={12} />
            <span>{project.year}</span>
          </div>
        </div>

        {/* PROJECT TITLE
            group-hover:text-blue-600 changes colour on card hover
            to reinforce that the whole card is a clickable element.
        */}
        <h3
          className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors duration-300"
          style={{ color: "var(--synergy-heading-main)" }}
        >
          {project.name}
        </h3>

        {/* SCOPE — Elevare's role on this project */}
        <p className="text-sm mb-3 opacity-60" style={{ color: "var(--synergy-text)" }}>
          {project.scope}
        </p>

        {/* DESCRIPTION PREVIEW
            line-clamp-3 truncates to 3 lines with an ellipsis.
            Full description is visible in the modal detail panel.
        */}
        <p
          className="text-sm leading-relaxed line-clamp-3 opacity-75"
          style={{ color: "var(--synergy-text)" }}
        >
          {project.description}
        </p>

        {/* VIEW GALLERY CTA
            Text-only — the entire card is already a click target.
            Uses the brand highlight colour to draw the eye downward.
        */}
        <div className="mt-4 text-sm font-semibold" style={{ color: "var(--synergy-heading-highlight)" }}>
          View Gallery →
        </div>
      </div>
    </motion.div>
  );
}

/* ===============================
   GALLERY MODAL COMPONENT

   Full-screen lightbox triggered when a ProjectCard is clicked.
   Displays the full project details alongside a navigable image gallery.

   LAYOUT:
   - Left panel  : Image gallery with prev/next arrows, dot thumbnails,
                   and an image counter
   - Right panel : Full project details — category, title, meta, scope,
                   description, and key highlights bullet list

   CLOSE BEHAVIOUR:
   - Clicking the modal backdrop (the outer motion.div) calls onClose
   - Clicking the × button calls onClose
   - e.stopPropagation() on the inner content div prevents backdrop
     clicks from firing when the user interacts inside the modal

   DOT THUMBNAILS:
   Active dot stretches to w-8 (pill shape) for clear visual feedback.
   Clicking any dot jumps directly to that image index.

   SCROLL:
   overflow-y-auto on the right panel allows long highlight lists to
   scroll within the modal without the modal itself overflowing.
================================ */
function GalleryModal({ project, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  return (
    <motion.div
      variants={modalVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose} // Clicking the backdrop closes the modal
    >

      {/* BACKDROP — dark overlay with blur so page content recedes */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      {/* MODAL CONTENT
          e.stopPropagation() prevents backdrop clicks from firing
          when the user clicks anywhere inside the modal panel.
          max-h-[90vh] keeps the modal within the viewport on short screens.
      */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-6xl max-h-[90vh] rounded-3xl overflow-hidden"
        style={{ backgroundColor: "var(--synergy-bg)" }}
      >

        {/* CLOSE BUTTON — always visible in the top-right corner */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors duration-300"
        >
          <FiX className="text-white" size={24} />
        </button>

        {/* MODAL GRID — single column on mobile, 50/50 split on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

          {/* LEFT PANEL — IMAGE GALLERY */}
          <div className="relative h-96 lg:h-auto bg-black">

            {/* ACTIVE IMAGE */}
            <img
              src={project.images[currentIndex]}
              alt={project.name}
              className="w-full h-full object-cover"
            />

            {/* PREV / NEXT ARROWS */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors duration-300"
            >
              <FiChevronLeft className="text-white" size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors duration-300"
            >
              <FiChevronRight className="text-white" size={24} />
            </button>

            {/* IMAGE COUNTER */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/70 backdrop-blur-sm text-sm text-white">
              {currentIndex + 1} / {project.images.length}
            </div>

            {/* DOT THUMBNAILS
                Active dot stretches to w-8 (pill) for clear visual feedback.
                Clicking any dot jumps directly to that image index.
            */}
            <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-2 px-4">
              {project.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? "bg-white w-8" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT PANEL — PROJECT DETAILS
              overflow-y-auto allows the highlights list to scroll within
              the panel on screens where the modal height is constrained.
          */}
          <div className="p-8 overflow-y-auto max-h-[90vh] lg:max-h-auto">

            {/* CATEGORY BADGE */}
            <span
              className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-4"
              style={{
                backgroundColor: "rgba(37, 99, 235, 0.12)",
                color: "var(--synergy-heading-highlight)",
              }}
            >
              {project.category}
            </span>

            {/* PROJECT TITLE */}
            <h2
              className="text-3xl font-bold mb-4"
              style={{ color: "var(--synergy-heading-main)" }}
            >
              {project.name}
            </h2>

            {/* META — location + year */}
            <div className="flex items-center gap-4 mb-6 text-sm opacity-70" style={{ color: "var(--synergy-text)" }}>
              <div className="flex items-center gap-2">
                <FiMapPin size={16} />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCalendar size={16} />
                <span>{project.year}</span>
              </div>
            </div>

            {/* SCOPE */}
            <div className="mb-6">
              <h4 className="text-sm font-bold mb-2 uppercase tracking-wider opacity-60" style={{ color: "var(--synergy-text)" }}>
                Scope
              </h4>
              <p className="text-base" style={{ color: "var(--synergy-text)" }}>
                {project.scope}
              </p>
            </div>

            {/* FULL DESCRIPTION — no line-clamp, complete text shown */}
            <div className="mb-6">
              <h4 className="text-sm font-bold mb-2 uppercase tracking-wider opacity-60" style={{ color: "var(--synergy-text)" }}>
                Description
              </h4>
              <p className="text-base leading-relaxed opacity-80" style={{ color: "var(--synergy-text)" }}>
                {project.description}
              </p>
            </div>

            {/* KEY HIGHLIGHTS
                Bullet dot uses the brand highlight colour.
                flex-shrink-0 on the dot prevents it from squishing
                when highlight text wraps onto multiple lines.
            */}
            <div>
              <h4 className="text-sm font-bold mb-3 uppercase tracking-wider opacity-60" style={{ color: "var(--synergy-text)" }}>
                Key Highlights
              </h4>
              <ul className="space-y-2">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm" style={{ color: "var(--synergy-text)" }}>
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: "var(--synergy-heading-highlight)" }}
                    />
                    <span className="opacity-75">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ===============================
   CONSTRUCTION PORTFOLIO COMPONENT — MAIN

   Displays the full construction portfolio with:
   - Left-aligned section header with eyebrow label and highlighted heading
   - Responsive 1 → 2 → 3 column card grid with staggered entrance
   - Each card has an image carousel, category badge, meta, description preview
   - Clicking any card opens the GalleryModal lightbox
   - AnimatePresence handles the modal's enter/exit animation cycle

   STATE:
   selectedProject — null when the modal is closed. Set to the clicked
                     project object to open the modal. Reset to null
                     by GalleryModal's onClose to close it.

   WHY AnimatePresence WRAPS THE MODAL:
   Without AnimatePresence, the modal disappears instantly when
   selectedProject is set to null. AnimatePresence keeps the component
   mounted long enough for the exit animation to complete.
================================ */
export default function ConstructionPortfolio() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section
      className="w-full py-16 lg:py-24 transition-colors duration-300"
      style={{ backgroundColor: "var(--synergy-bg)" }}
    >
      <div className="w-[90%] lg:w-[80%] mx-auto">

        {/* SECTION HEADER — left-aligned to match TechPortfolio layout */}
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
            Construction & Property
          </p>

          {/* MAIN HEADING */}
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6"
            style={{ color: "var(--synergy-heading-main)" }}
          >
            What We've
            <br />
            <span style={{ color: "var(--synergy-heading-highlight)" }}>
              Built
            </span>
          </h2>

          {/* SUPPORTING DESCRIPTION */}
          <p
            className="text-base md:text-lg leading-relaxed opacity-70"
            style={{ color: "var(--synergy-text)" }}
          >
            From residential homes to commercial developments — explore our portfolio
            of construction projects across Nigeria. Click any project to view the full gallery.
          </p>
        </motion.div>

        {/* PROJECTS GRID
            staggerContainer cascades each ProjectCard's entrance.
            amount: 0.05 fires early so cards animate before the user
            has fully scrolled to the bottom of the grid.
        */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={setSelectedProject} // Passes the full project object to open the modal
            />
          ))}
        </motion.div>

      </div>

      {/* GALLERY MODAL
          AnimatePresence keeps the modal mounted during its exit animation
          when selectedProject is set back to null by onClose.
      */}
      <AnimatePresence>
        {selectedProject && (
          <GalleryModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}