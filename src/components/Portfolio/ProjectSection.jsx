import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiX, FiMapPin, FiCalendar, FiChevronLeft, FiChevronRight } from "react-icons/fi";

/* ===============================
   REAL IMAGE IMPORTS
   Each variable name is unique — no duplicates allowed in JS.

   Mapping:
   A  = Club Concierge Office Fit-out  → A1, A2
   B  = Ifx Residence Renovation       → NO images yet (Pexels fallback)
   C  = Zinari Apartments              → C1, C2, C3
   D  = Hopewell Towers                → D1, D2, D3, D4, D5, D6
   E  = Zinari / Ligali Towers         → E1, E2, E3, E4, E5, E6, E7
   F  = Casem Cathedral                → F1, F2
   G  = Club Concierge / KADO's        → G1–G11
================================ */

// ── Hopewell Towers (D) ──
import D1 from "../../assets/D1.webp";
import D2 from "../../assets/D2.webp";
import D3 from "../../assets/D3.webp";
import D4 from "../../assets/D4.webp";
import D5 from "../../assets/D5.webp";
import D6 from "../../assets/D6.webp";

// ── Zinari Apartments / Ligali Towers (E) ──
import E1 from "../../assets/E1.webp";
import E2 from "../../assets/E2.webp";
import E3 from "../../assets/E3.webp";
import E4 from "../../assets/E4.webp";
import E5 from "../../assets/E5.webp";
import E6 from "../../assets/E6.webp";
import E7 from "../../assets/E7.webp";

// ── Casem Cathedral (F) ──
import F1 from "../../assets/F1.webp";
import F2 from "../../assets/F2.webp";

// ── Club Concierge / KADO's Factory (G) — 11 images ──
import G1 from "../../assets/G1.webp";
import G2 from "../../assets/G2.webp";
import G3 from "../../assets/G3.webp";
import G4 from "../../assets/G4.webp";
import G5 from "../../assets/G5.webp";
import G6 from "../../assets/G6.webp";
import G7 from "../../assets/G7.webp";
import G8 from "../../assets/G8.webp";
import G9 from "../../assets/G9.webp";
import G10 from "../../assets/G10.webp";
import G11 from "../../assets/G11.webp";

/* ===============================
   PROJECTS DATA
   images[0]    = BEFORE (Pexels placeholder until real photos exist)
   images[1..n] = AFTER  (real .webp assets)
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
      G1,
      G2,
      G3,
      G4,
      G5,
      G6,
      G7,
      G8,
      G9,
      G10,
      G11,
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
      /* TODO: replace all with real B*.webp imports once photos are added to assets */
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
      E1, E2, E3, E4, E5, E6, E7,
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
      D1, D2, D3, D4, D5, D6,
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
      E1, E2, E3, E4,
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
      F1, F2,
    ],
  },
];

/* ===============================
   ANIMATION VARIANTS
================================ */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const modalVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const imageSwap = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

/* ===============================
   BEFORE / AFTER TAB VIEWER
================================ */
function BeforeAfterTabs({ images, compact = false }) {
  const [active, setActive]         = useState("before");
  const [afterIndex, setAfterIndex] = useState(0);

  const afterImages  = images.slice(1);
  const currentImage = active === "before" ? images[0] : afterImages[afterIndex];

  const prevAfter = (e) => {
    e.stopPropagation();
    setAfterIndex((p) => (p - 1 + afterImages.length) % afterImages.length);
  };
  const nextAfter = (e) => {
    e.stopPropagation();
    setAfterIndex((p) => (p + 1) % afterImages.length);
  };
  const switchTab = (tab, e) => {
    e.stopPropagation();
    setActive(tab);
    setAfterIndex(0);
  };

  const tabPad  = compact ? "text-[10px] px-3 py-1" : "text-xs px-5 py-1.5";
  const dotSize = compact ? "w-[5px] h-[5px]"        : "w-[6px] h-[6px]";

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* PILL TAB BAR */}
      <div
        className="absolute top-3 left-1/2 -translate-x-1/2 z-10 flex rounded-full"
        style={{
          background: "var(--synergy-card-bg)",
          border:     "1px solid var(--synergy-card-border)",
          padding:    "3px",
          gap:        "2px",
          boxShadow:  "0 2px 12px rgba(0,0,0,0.25)",
        }}
      >
        {["before", "after"].map((tab) => {
          const isActive = active === tab;
          return (
            <button
              key={tab}
              onClick={(e) => switchTab(tab, e)}
              className={`flex items-center gap-1.5 font-bold tracking-widest uppercase transition-all duration-300 rounded-full ${tabPad}`}
              style={{
                color:      isActive ? "#fff" : "var(--synergy-text)",
                background: isActive ? "var(--synergy-heading-highlight)" : "transparent",
                opacity:    isActive ? 1 : 0.6,
                boxShadow:  isActive ? "0 0 12px rgba(37,99,235,0.35)" : "none",
              }}
            >
              {isActive && (
                <span
                  className={`inline-block rounded-full flex-shrink-0 ${dotSize}`}
                  style={{ background: "#fff", boxShadow: "0 0 5px #fff" }}
                />
              )}
              {tab}
            </button>
          );
        })}
      </div>

      {/* IMAGE AREA */}
      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={`${active}-${afterIndex}`}
            src={currentImage}
            alt={active === "before" ? "Before" : `After ${afterIndex + 1}`}
            variants={imageSwap}
            initial="hidden"
            animate="visible"
            exit="exit"
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Prev / Next arrows — After tab only, >1 image */}
        {active === "after" && afterImages.length > 1 && (
          <>
            <button
              onClick={prevAfter}
              className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full text-white transition-all duration-200 hover:scale-110"
              style={{
                width: compact ? "28px" : "36px", height: compact ? "28px" : "36px",
                background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <FiChevronLeft size={compact ? 14 : 18} />
            </button>
            <button
              onClick={nextAfter}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full text-white transition-all duration-200 hover:scale-110"
              style={{
                width: compact ? "28px" : "36px", height: compact ? "28px" : "36px",
                background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <FiChevronRight size={compact ? 14 : 18} />
            </button>
          </>
        )}

        {/* Bottom-left label + counter */}
        <div className="absolute bottom-3 left-3 z-10 pointer-events-none flex items-center gap-2">
          <span
            className={`font-black tracking-[0.18em] uppercase ${compact ? "text-[9px] px-2 py-0.5" : "text-[10px] px-3 py-1"}`}
            style={{
              background: active === "after" ? "var(--synergy-heading-highlight)" : "rgba(0,0,0,0.6)",
              color: "#fff", borderRadius: "5px", backdropFilter: "blur(4px)",
            }}
          >
            {active}
          </span>
          {active === "after" && afterImages.length > 1 && (
            <span
              className={`font-mono font-bold ${compact ? "text-[9px] px-2 py-0.5" : "text-[10px] px-2 py-0.5"}`}
              style={{
                background: "rgba(0,0,0,0.55)", color: "rgba(255,255,255,0.85)",
                borderRadius: "5px", backdropFilter: "blur(4px)",
              }}
            >
              {afterIndex + 1} / {afterImages.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ===============================
   PROJECT CARD
================================ */
function ProjectCard({ project, index, onClick }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      onClick={() => onClick(project)}
      className="group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer"
      style={{
        background: "var(--synergy-card-bg)",
        border:     "1px solid var(--synergy-card-border)",
        boxShadow:  "0 2px 20px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.3s, border-color 0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--synergy-heading-highlight)";
        e.currentTarget.style.boxShadow   = "0 0 0 1px var(--synergy-heading-highlight), 0 8px 40px rgba(37,99,235,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--synergy-card-border)";
        e.currentTarget.style.boxShadow   = "0 2px 20px rgba(0,0,0,0.06)";
      }}
    >
      <div className="relative h-56 overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <BeforeAfterTabs images={project.images} compact={true} />
        <div
          className="absolute top-3 right-3 z-10 font-mono font-bold text-xs pointer-events-none"
          style={{
            background: "var(--synergy-card-bg)", color: "var(--synergy-card-text)",
            border: "1px solid var(--synergy-card-border)", borderRadius: "6px",
            padding: "2px 8px", opacity: 0.9,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5" onClick={() => onClick(project)}>
        <div className="mb-3">
          <span
            className="font-mono text-[10px] font-semibold tracking-widest uppercase px-2 py-1 rounded"
            style={{
              background: "rgba(37,99,235,0.08)", color: "var(--synergy-heading-highlight)",
              border: "1px dashed rgba(37,99,235,0.35)",
            }}
          >
            {project.category}
          </span>
        </div>
        <h3
          className="text-lg font-bold leading-snug mb-1 transition-colors duration-200 group-hover:text-blue-600"
          style={{ color: "var(--synergy-card-text)" }}
        >
          {project.name}
        </h3>
        <p className="text-xs mb-3 font-medium" style={{ color: "var(--synergy-card-text)", opacity: 0.5 }}>
          {project.scope}
        </p>
        <p className="text-sm leading-relaxed line-clamp-3 flex-1" style={{ color: "var(--synergy-card-text)", opacity: 0.7 }}>
          {project.description}
        </p>
        <div className="mt-4 pt-4 flex items-center justify-between" style={{ borderTop: "1px solid var(--synergy-card-border)" }}>
          <div className="flex items-center gap-3 text-xs" style={{ color: "var(--synergy-card-text)", opacity: 0.5 }}>
            <span className="flex items-center gap-1"><FiMapPin size={11} />{project.location}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><FiCalendar size={11} />{project.year}</span>
          </div>
          <span
            className="text-xs font-bold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ color: "var(--synergy-heading-highlight)" }}
          >
            Open →
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ===============================
   GALLERY MODAL
================================ */
function GalleryModal({ project, onClose }) {
  return (
    <motion.div
      variants={modalVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3"
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

      {/* SHELL */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-7xl h-[92vh] rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: "var(--synergy-bg)",
          border: "1px solid var(--synergy-card-border)",
          boxShadow: "0 0 0 1px rgba(37,99,235,0.2), 0 40px 80px rgba(0,0,0,0.5)",
        }}
      >
        {/* HEADER */}
        <div
          className="flex items-center justify-between px-5 py-3 flex-shrink-0"
          style={{ borderBottom: "1px solid var(--synergy-card-border)", background: "var(--synergy-card-bg)" }}
        >
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400 opacity-80" />
              <span className="w-3 h-3 rounded-full bg-yellow-400 opacity-80" />
              <span className="w-3 h-3 rounded-full bg-green-400 opacity-80" />
            </div>
            <span
              className="font-mono text-xs pl-3 opacity-50"
              style={{ color: "var(--synergy-text)", borderLeft: "1px solid var(--synergy-card-border)" }}
            >
              {project.category} / {project.name}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 hover:bg-red-500/15"
            style={{ background: "rgba(128,128,128,0.1)", color: "var(--synergy-text)" }}
          >
            <FiX size={16} />
          </button>
        </div>

        {/* BODY — stacked on mobile, side-by-side on desktop */}
        <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-hidden lg:overflow-hidden">

          {/* IMAGE PANEL */}
          <div
            className="h-[55vw] max-h-[300px] lg:h-auto lg:max-h-none w-full lg:w-[62%] flex-shrink-0 flex flex-col bg-black border-b border-b-white/10 lg:border-b-0 lg:border-r lg:border-r-white/10"
            
          >
            <div className="relative flex-1 overflow-hidden min-h-0">
              <BeforeAfterTabs images={project.images} compact={false} />
            </div>
            <div
              className="flex items-center justify-center gap-2 py-2 flex-shrink-0"
              style={{ background: "var(--synergy-card-bg)", borderTop: "1px solid var(--synergy-card-border)" }}
            >
              <span className="font-mono text-[10px] font-semibold tracking-widest opacity-40" style={{ color: "var(--synergy-text)" }}>
                1 BEFORE · {project.images.length - 1} AFTER
              </span>
              <span className="w-1 h-1 rounded-full" style={{ background: "var(--synergy-heading-highlight)" }} />
              <span className="font-mono text-[10px] font-semibold tracking-widest opacity-70" style={{ color: "var(--synergy-heading-highlight)" }}>
                USE ARROWS TO BROWSE
              </span>
            </div>
          </div>

          {/* TEXT PANEL */}
          <div className="flex-1 overflow-y-auto p-6" style={{ background: "var(--synergy-bg)" }}>
            <span
              className="font-mono text-[10px] font-semibold tracking-widest uppercase px-2 py-1 rounded inline-block mb-4"
              style={{ background: "rgba(37,99,235,0.08)", color: "var(--synergy-heading-highlight)", border: "1px dashed rgba(37,99,235,0.35)" }}
            >
              {project.category}
            </span>
            <h2 className="text-2xl font-bold mb-3 leading-tight" style={{ color: "var(--synergy-heading-main)" }}>
              {project.name}
            </h2>
            <div className="flex items-center gap-4 mb-5 text-xs opacity-60" style={{ color: "var(--synergy-text)" }}>
              <span className="flex items-center gap-1.5"><FiMapPin size={13} />{project.location}</span>
              <span className="flex items-center gap-1.5"><FiCalendar size={13} />{project.year}</span>
            </div>
            <div className="mb-5" style={{ borderTop: "1px solid var(--synergy-card-border)" }} />
            <div className="mb-5">
              <p className="font-mono text-[10px] font-bold uppercase tracking-widest mb-1.5 opacity-40" style={{ color: "var(--synergy-text)" }}>Scope</p>
              <p className="text-sm" style={{ color: "var(--synergy-text)" }}>{project.scope}</p>
            </div>
            <div className="mb-5">
              <p className="font-mono text-[10px] font-bold uppercase tracking-widest mb-1.5 opacity-40" style={{ color: "var(--synergy-text)" }}>Description</p>
              <p className="text-sm leading-relaxed opacity-75" style={{ color: "var(--synergy-text)" }}>{project.description}</p>
            </div>
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-widest mb-3 opacity-40" style={{ color: "var(--synergy-text)" }}>Key Highlights</p>
              <ul className="space-y-2.5">
                {project.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "var(--synergy-text)" }}>
                    <span
                      className="font-mono text-[10px] font-bold flex-shrink-0 mt-0.5 w-5 h-5 rounded flex items-center justify-center"
                      style={{ background: "rgba(37,99,235,0.1)", color: "var(--synergy-heading-highlight)", border: "1px solid rgba(37,99,235,0.25)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="opacity-75">{h}</span>
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
   MAIN EXPORT
================================ */
export default function ConstructionPortfolio() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section
      className="w-full py-16 lg:py-24 transition-colors duration-300"
      style={{ backgroundColor: "var(--synergy-bg)" }}
    >
      <div className="w-[90%] lg:w-[80%] mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-2xl mb-16"
        >
          <p className="text-xs md:text-sm tracking-[0.3em] uppercase mb-4" style={{ color: "var(--synergy-text)", opacity: 0.7 }}>
            Construction & Property
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6" style={{ color: "var(--synergy-heading-main)" }}>
            What We've<br />
            <span style={{ color: "var(--synergy-heading-highlight)" }}>Built</span>
          </h2>
          <p className="text-base md:text-lg leading-relaxed" style={{ color: "var(--synergy-text)", opacity: 0.7 }}>
            From residential homes to commercial developments — explore our portfolio
            of construction projects across Nigeria. Click any project to view the full gallery.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} onClick={setSelectedProject} />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <GalleryModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}