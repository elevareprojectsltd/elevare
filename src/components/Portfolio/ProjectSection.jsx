import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiX, FiMapPin, FiCalendar, FiChevronLeft, FiChevronRight } from "react-icons/fi";

/* ===============================
   REAL IMAGE IMPORTS

   Mapping:
   I  = Ifx Residence Renovation       → I1–I11
   D  = Hopewell Towers                → D1–D6
   E  = Zinari Apartments              → E1–E7
   F  = Casem Cathedral                → F1, F2
   G  = Club Concierge / KADO's        → G1, G3–G15
   R  = Residential & Interior Portf.  → R1–R14
        R1–R7  used in Residential Development card (7 images)
        R8–R14 used in Interior Fit-outs card (7 images)
        R15 removed entirely
================================ */

// ── Ifx Residence (I) ──
import I1  from "../../assets/I1.webp";
import I2  from "../../assets/I2.webp";
import I3  from "../../assets/I3.webp";
import I4  from "../../assets/I4.webp";
import I5  from "../../assets/I5.webp";
import I6  from "../../assets/I6.webp";
import I7  from "../../assets/I7.webp";
import I8  from "../../assets/I8.webp";
import I9  from "../../assets/I9.webp";
import I10 from "../../assets/I10.webp";
import I11 from "../../assets/I11.webp";

// ── Hopewell Towers (D) ──
import D1 from "../../assets/D1.webp";
import D2 from "../../assets/D2.webp";
import D3 from "../../assets/D3.webp";
import D4 from "../../assets/D4.webp";
import D5 from "../../assets/D5.webp";
import D6 from "../../assets/D6.webp";

// ── Zinari Apartments (E) ──
// NOTE: Ligali Towers removed — E images now serve Zinari only
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

// ── Club Concierge / KADO's Factory (G) ──
// G12–G15 = before images  |  G1, G3–G11 = after images
import G1  from "../../assets/G1.webp";
import G3  from "../../assets/G3.webp";
import G4  from "../../assets/G4.webp";
import G5  from "../../assets/G5.webp";
import G6  from "../../assets/G6.webp";
import G7  from "../../assets/G7.webp";
import G8  from "../../assets/G8.webp";
import G9  from "../../assets/G9.webp";
import G10 from "../../assets/G10.webp";
import G11 from "../../assets/G11.webp";
import G12 from "../../assets/G12.webp";
import G13 from "../../assets/G13.webp";
import G14 from "../../assets/G14.webp";
import G15 from "../../assets/G15.webp";

// ── Residential Portfolio (R) ──
// R1–R7  → Residential Development card (7 images, gallery type)
// R8–R14 → Interior Fit-outs card (7 images, gallery type)
// R15 removed entirely
import R1  from "../../assets/R1.webp";
import R2  from "../../assets/R2.webp";
import R3  from "../../assets/R3.webp";
import R4  from "../../assets/R4.webp";
import R5  from "../../assets/R5.webp";
import R6  from "../../assets/R6.webp";
import R7  from "../../assets/R7.webp";
import R8  from "../../assets/R8.webp";
import R9  from "../../assets/R9.webp";
import R10 from "../../assets/R10.webp";
import R11 from "../../assets/R11.webp";
import R12 from "../../assets/R12.webp";
import R13 from "../../assets/R13.webp";
import R14 from "../../assets/R14.webp";

/* ===============================
   PROJECTS DATA

   Each project has a "type" field that controls how it renders:
   ─ "beforeAfter" → BeforeAfterTabs component (before/after pill switcher)
   ─ "gallery"     → GalleryViewer component (plain image slider, no tabs)

   All cards render as standard ProjectCards in the same unified grid.
   No location or year on the two service overview cards (id 6 & 7).

   DARK MODE — CARD SURFACES:
   Cards use --synergy-card-bg (white in both modes) so they lift off
   the dark blue --synergy-bg page background in dark mode — matching
   the TechPortfolio card treatment. Text inside cards uses
   --synergy-card-text (#031f3a) which stays readable on white in both modes.
   The modal panels follow the same split: image panel uses black bg,
   text panel uses --synergy-bg, header/footer bars use --synergy-card-bg.
================================ */
const PROJECTS = [
  {
    id: 1,
    type: "beforeAfter",
    name: "Club Concierge Office Fit-out",
    location: "Ikeja, Lagos",
    year: "2025",
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
    before: [G12, G13, G14, G15],
    after: [G1, G3, G4, G5, G6, G7, G8, G9, G10, G11],
  },
  {
    id: 2,
    type: "beforeAfter",
    // Year updated: 2025 → 2024
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
    before: [I7, I8, I9, I10, I11],
    after:  [I1, I2, I3, I4, I5, I6],
  },
  {
    id: 3,
    // type "gallery" — no before images, no before/after tabs
    type: "gallery",
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
    images: [E1, E2, E3, E4, E5, E6, E7],
  },
  {
    id: 4,
    // type "gallery" — no before images, no before/after tabs
    type: "gallery",
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
    images: [D1, D2, D3, D4, D5, D6],
  },
  {
    id: 5,
    type: "gallery",
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
    images: [F1, F2],
  },
  {
    id: 6,
    // Service overview card — no location or year, omitted from footer
    type: "gallery",
    name: "Residential Development",
    category: "Residential Projects",
    scope: "Design, Construction & Project Management",
    description:
      "We deliver high-quality residential developments designed for comfort, durability, and long-term value. From private homes and duplexes to apartment complexes, our projects combine thoughtful design, efficient space planning, and expert construction. With strong project management and attention to detail at every stage, we ensure each home is completed on time, within budget, and to the highest standards of craftsmanship. We don't just build structures — we create homes built to last.",
    highlights: [
      "Private homes, duplexes and apartment complexes",
      "Thoughtful design with efficient space planning",
      "Expert construction and quality finishes",
      "On-time delivery within budget",
      "Strong project management at every stage",
      "Homes built for comfort, durability and long-term value",
    ],
    images: [R1, R2, R3, R4, R5, R6, R7],
  },
  {
    id: 7,
    // Service overview card — no location or year, omitted from footer
    type: "gallery",
    name: "Interior Fit-outs",
    category: "Commercial & Workplace",
    scope: "Design, Fit-out & Project Management",
    description:
      "We design and construct high-performance commercial and office environments that support productivity, brand identity, and long-term business growth. From corporate headquarters and office complexes to retail and mixed-use developments, our projects are tailored to meet operational demands while maintaining architectural distinction. Through strategic planning, efficient space optimization, and strong project management, we deliver functional, flexible, and future-ready spaces — completed on time and to the highest quality standards.",
    highlights: [
      "Corporate offices, retail and mixed-use developments",
      "Spaces tailored to operational and brand requirements",
      "Strategic planning and efficient space optimization",
      "High-performance environments built for productivity",
      "Future-ready, flexible workplace solutions",
      "Delivered on time to the highest quality standards",
    ],
    images: [R8, R9, R10, R11, R12, R13, R14],
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
   Used by: Club Concierge, Ifx Residence.
   Accepts { before: [], after: [] }.
   Both tabs support multiple images with prev/next arrows.

   DARK MODE: Tab bar uses --synergy-card-bg (white) so it stays
   visible on the black image panel background in both modes.
   Inactive tab text uses --synergy-card-text so it reads correctly
   on the white pill surface.
================================ */
function BeforeAfterTabs({ before, after, compact = false }) {
  const [active, setActive]           = useState("before");
  const [beforeIndex, setBeforeIndex] = useState(0);
  const [afterIndex, setAfterIndex]   = useState(0);

  const images       = active === "before" ? before : after;
  const activeIndex  = active === "before" ? beforeIndex : afterIndex;
  const setIndex     = active === "before" ? setBeforeIndex : setAfterIndex;
  const currentImage = images[activeIndex];

  const prev      = (e) => { e.stopPropagation(); setIndex((p) => (p - 1 + images.length) % images.length); };
  const next      = (e) => { e.stopPropagation(); setIndex((p) => (p + 1) % images.length); };
  const switchTab = (tab, e) => { e.stopPropagation(); setActive(tab); };

  const tabPad  = compact ? "text-[10px] px-3 py-1" : "text-xs px-5 py-1.5";
  const dotSize = compact ? "w-[5px] h-[5px]"       : "w-[6px] h-[6px]";

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* PILL TAB BAR
          Uses --synergy-card-bg so the white pill is always visible
          on the dark image area beneath it in both light and dark mode.
      */}
      <div
        className="absolute top-3 left-1/2 -translate-x-1/2 z-10 flex rounded-full"
        style={{
          background: "var(--synergy-card-bg)",
          border: "1px solid var(--synergy-card-border)",
          padding: "3px", gap: "2px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
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
                // Inactive tab uses --synergy-card-text (dark blue) — readable on white pill
                color:      isActive ? "#fff" : "var(--synergy-card-text)",
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
            key={`${active}-${activeIndex}`}
            src={currentImage}
            alt={active === "before" ? `Before ${activeIndex + 1}` : `After ${activeIndex + 1}`}
            variants={imageSwap}
            initial="hidden" animate="visible" exit="exit"
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full text-white transition-all duration-200 hover:scale-110"
              style={{ width: compact ? "28px" : "36px", height: compact ? "28px" : "36px", background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.15)" }}>
              <FiChevronLeft size={compact ? 14 : 18} />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full text-white transition-all duration-200 hover:scale-110"
              style={{ width: compact ? "28px" : "36px", height: compact ? "28px" : "36px", background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.15)" }}>
              <FiChevronRight size={compact ? 14 : 18} />
            </button>
          </>
        )}

        {/* BOTTOM LEFT LABEL + COUNTER
            Always uses rgba dark backgrounds + white text so it reads
            on top of any image in both light and dark mode.
        */}
        <div className="absolute bottom-3 left-3 z-10 pointer-events-none flex items-center gap-2">
          <span
            className={`font-black tracking-[0.18em] uppercase ${compact ? "text-[9px] px-2 py-0.5" : "text-[10px] px-3 py-1"}`}
            style={{ background: active === "after" ? "var(--synergy-heading-highlight)" : "rgba(0,0,0,0.6)", color: "#fff", borderRadius: "5px", backdropFilter: "blur(4px)" }}>
            {active}
          </span>
          {images.length > 1 && (
            <span
              className={`font-mono font-bold ${compact ? "text-[9px] px-2 py-0.5" : "text-[10px] px-2 py-0.5"}`}
              style={{ background: "rgba(0,0,0,0.55)", color: "rgba(255,255,255,0.85)", borderRadius: "5px", backdropFilter: "blur(4px)" }}>
              {activeIndex + 1} / {images.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ===============================
   GALLERY VIEWER (plain image slider)
   Used by: Zinari, Hopewell, Casem, Residential Dev, Interior Fit-outs.
   No before/after tabs — just images with prev/next arrows.
   Replaces the old Pexels placeholder + BeforeAfterTabs pattern
   for projects that have no before photos.

   DARK MODE: Arrow buttons and counter use solid rgba overlays so
   they remain readable on any image in both light and dark mode.
================================ */
function GalleryViewer({ images, compact = false }) {
  const [index, setIndex] = useState(0);
  const prev = (e) => { e.stopPropagation(); setIndex((p) => (p - 1 + images.length) % images.length); };
  const next = (e) => { e.stopPropagation(); setIndex((p) => (p + 1) % images.length); };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          alt={`Image ${index + 1}`}
          variants={imageSwap}
          initial="hidden" animate="visible" exit="exit"
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full text-white transition-all duration-200 hover:scale-110"
            style={{ width: compact ? "28px" : "36px", height: compact ? "28px" : "36px", background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.15)" }}>
            <FiChevronLeft size={compact ? 14 : 18} />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center rounded-full text-white transition-all duration-200 hover:scale-110"
            style={{ width: compact ? "28px" : "36px", height: compact ? "28px" : "36px", background: "rgba(0,0,0,0.45)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.15)" }}>
            <FiChevronRight size={compact ? 14 : 18} />
          </button>
        </>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
          <span
            className={`font-mono font-bold ${compact ? "text-[9px] px-2 py-0.5" : "text-[10px] px-2 py-0.5"}`}
            style={{ background: "rgba(0,0,0,0.55)", color: "rgba(255,255,255,0.85)", borderRadius: "5px", backdropFilter: "blur(4px)" }}>
            {index + 1} / {images.length}
          </span>
        </div>
      )}
    </div>
  );
}

/* ===============================
   PROJECT CARD (standard grid card)
   Used by: ALL 7 projects.
   Renders BeforeAfterTabs if type === "beforeAfter",
   otherwise renders GalleryViewer.
   Footer row (location + year) only renders when values are present.

   DARK MODE:
   - Card surface: --synergy-card-bg (white) lifts off dark blue page bg
   - Card text: --synergy-card-text (#031f3a) readable on white in both modes
   - Card number badge: --synergy-card-bg bg + --synergy-card-text colour
   - Border on hover uses --synergy-heading-highlight (blue) — same in both
================================ */
function ProjectCard({ project, index, onClick }) {
  const isBeforeAfter = project.type === "beforeAfter";
  const hasFooterMeta = project.location || project.year;

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      onClick={() => onClick(project)}
      className="group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer"
      style={{
        // --synergy-card-bg is white in both light and dark mode
        // so cards always lift off the page background
        background: "var(--synergy-card-bg)",
        border: "1px solid var(--synergy-card-border)",
        boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
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
        {isBeforeAfter
          ? <BeforeAfterTabs before={project.before} after={project.after} compact={true} />
          : <GalleryViewer images={project.images} compact={true} />
        }
        {/* Card number badge — uses card surface colours so it's always readable */}
        <div
          className="absolute top-3 right-3 z-10 font-mono font-bold text-xs pointer-events-none"
          style={{ background: "var(--synergy-card-bg)", color: "var(--synergy-card-text)", border: "1px solid var(--synergy-card-border)", borderRadius: "6px", padding: "2px 8px", opacity: 0.9 }}>
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5" onClick={() => onClick(project)}>
        {/* Category badge */}
        <div className="mb-3">
          <span
            className="font-mono text-[10px] font-semibold tracking-widest uppercase px-2 py-1 rounded"
            style={{ background: "rgba(37,99,235,0.08)", color: "var(--synergy-heading-highlight)", border: "1px dashed rgba(37,99,235,0.35)" }}>
            {project.category}
          </span>
        </div>

        {/* Title — uses --synergy-card-text so it stays dark blue on white card */}
        <h3
          className="text-lg font-bold leading-snug mb-1 transition-colors duration-200 group-hover:text-blue-600"
          style={{ color: "var(--synergy-card-text)" }}>
          {project.name}
        </h3>

        {/* Scope */}
        <p className="text-xs mb-3 font-medium" style={{ color: "var(--synergy-card-text)", opacity: 0.5 }}>
          {project.scope}
        </p>

        {/* Description */}
        <p className="text-sm leading-relaxed line-clamp-3 flex-1" style={{ color: "var(--synergy-card-text)", opacity: 0.7 }}>
          {project.description}
        </p>

        {/* Footer — location + year — only when present */}
        {hasFooterMeta && (
          <div className="mt-4 pt-4 flex items-center justify-between" style={{ borderTop: "1px solid var(--synergy-card-border)" }}>
            <div className="flex items-center gap-3 text-xs" style={{ color: "var(--synergy-card-text)", opacity: 0.5 }}>
              {project.location && (
                <span className="flex items-center gap-1"><FiMapPin size={11} />{project.location}</span>
              )}
              {project.location && project.year && <span>·</span>}
              {project.year && (
                <span className="flex items-center gap-1"><FiCalendar size={11} />{project.year}</span>
              )}
            </div>
            <span
              className="text-xs font-bold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ color: "var(--synergy-heading-highlight)" }}>
              Open →
            </span>
          </div>
        )}

        {/* Open arrow for service cards with no footer meta */}
        {!hasFooterMeta && (
          <div className="mt-4 pt-4 flex items-center justify-end" style={{ borderTop: "1px solid var(--synergy-card-border)" }}>
            <span
              className="text-xs font-bold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ color: "var(--synergy-heading-highlight)" }}>
              Open →
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ===============================
   GALLERY MODAL
   Handles both card types:
   ─ "beforeAfter" → renders BeforeAfterTabs
   ─ "gallery"     → renders GalleryViewer
   Footer meta (location + year) only rendered when present.
   Highlights list only rendered when present.

   DARK MODE PANEL BREAKDOWN:
   - Modal shell border + outer bg: --synergy-bg (dark blue in dark mode)
   - Header bar: --synergy-card-bg (white) — matches card surfaces
   - Image panel: pure black bg — images always look their best on black
   - Image footer bar: --synergy-card-bg (white) — consistent with header
   - Text panel: --synergy-bg (dark blue in dark mode) — readable with
     --synergy-text (white/85 in dark mode) and --synergy-heading-main (white)
================================ */
function GalleryModal({ project, onClose }) {
  const isBeforeAfter = project.type === "beforeAfter";
  const galleryImages = project.type !== "beforeAfter" ? project.images : null;
  const hasFooterMeta = project.location || project.year;

  return (
    <motion.div
      variants={modalVariant}
      initial="hidden" animate="visible" exit="exit"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3"
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-7xl h-[92vh] rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: "var(--synergy-bg)",
          border: "1px solid var(--synergy-card-border)",
          boxShadow: "0 0 0 1px rgba(37,99,235,0.2), 0 40px 80px rgba(0,0,0,0.5)",
        }}
      >
        {/* MODAL HEADER
            Uses --synergy-card-bg so it stays white in dark mode —
            matching the card surfaces throughout the page.
        */}
        <div
          className="flex items-center justify-between px-5 py-3 flex-shrink-0"
          style={{ borderBottom: "1px solid var(--synergy-card-border)", background: "var(--synergy-card-bg)" }}>
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400 opacity-80" />
              <span className="w-3 h-3 rounded-full bg-yellow-400 opacity-80" />
              <span className="w-3 h-3 rounded-full bg-green-400 opacity-80" />
            </div>
            {/* Breadcrumb uses --synergy-card-text so it reads on white header */}
            <span
              className="font-mono text-xs pl-3 opacity-50"
              style={{ color: "var(--synergy-card-text)", borderLeft: "1px solid var(--synergy-card-border)" }}>
              {project.category} / {project.name}
            </span>
          </div>
          {/* Close button uses --synergy-card-text for icon colour */}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-200 hover:bg-red-500/15"
            style={{ background: "rgba(128,128,128,0.1)", color: "var(--synergy-card-text)" }}>
            <FiX size={16} />
          </button>
        </div>

        {/* MODAL BODY */}
        <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-hidden">

          {/* IMAGE PANEL — always black bg so photos look their best */}
          <div className="h-[55vw] max-h-[300px] lg:h-auto lg:max-h-none w-full lg:w-[62%] flex-shrink-0 flex flex-col bg-black border-b border-b-white/10 lg:border-b-0 lg:border-r lg:border-r-white/10">
            <div className="relative flex-1 overflow-hidden min-h-0">
              {isBeforeAfter
                ? <BeforeAfterTabs before={project.before} after={project.after} compact={false} />
                : <GalleryViewer images={galleryImages} compact={false} />
              }
            </div>
            {/* Image footer bar — uses --synergy-card-bg to match modal header */}
            <div
              className="flex items-center justify-center gap-2 py-2 flex-shrink-0"
              style={{ background: "var(--synergy-card-bg)", borderTop: "1px solid var(--synergy-card-border)" }}>
              {isBeforeAfter ? (
                <>
                  <span className="font-mono text-[10px] font-semibold tracking-widest opacity-40" style={{ color: "var(--synergy-card-text)" }}>
                    {project.before.length} BEFORE · {project.after.length} AFTER
                  </span>
                  <span className="w-1 h-1 rounded-full" style={{ background: "var(--synergy-heading-highlight)" }} />
                  <span className="font-mono text-[10px] font-semibold tracking-widest opacity-70" style={{ color: "var(--synergy-heading-highlight)" }}>
                    USE ARROWS TO BROWSE
                  </span>
                </>
              ) : (
                <>
                  <span className="font-mono text-[10px] font-semibold tracking-widest opacity-40" style={{ color: "var(--synergy-card-text)" }}>
                    {galleryImages?.length} IMAGES
                  </span>
                  <span className="w-1 h-1 rounded-full" style={{ background: "var(--synergy-heading-highlight)" }} />
                  <span className="font-mono text-[10px] font-semibold tracking-widest opacity-70" style={{ color: "var(--synergy-heading-highlight)" }}>
                    USE ARROWS TO BROWSE
                  </span>
                </>
              )}
            </div>
          </div>

          {/* TEXT PANEL
              Uses --synergy-bg so in dark mode it becomes dark blue —
              text uses --synergy-text (white/85) and --synergy-heading-main
              (white) which are both legible on the dark background.
          */}
          <div className="flex-1 overflow-y-auto p-6" style={{ background: "var(--synergy-bg)" }}>
            <span
              className="font-mono text-[10px] font-semibold tracking-widest uppercase px-2 py-1 rounded inline-block mb-4"
              style={{ background: "rgba(37,99,235,0.08)", color: "var(--synergy-heading-highlight)", border: "1px dashed rgba(37,99,235,0.35)" }}>
              {project.category}
            </span>

            <h2 className="text-2xl font-bold mb-3 leading-tight" style={{ color: "var(--synergy-heading-main)" }}>
              {project.name}
            </h2>

            {/* Location + year — only when present */}
            {hasFooterMeta && (
              <div className="flex items-center gap-4 mb-5 text-xs opacity-60" style={{ color: "var(--synergy-text)" }}>
                {project.location && <span className="flex items-center gap-1.5"><FiMapPin size={13} />{project.location}</span>}
                {project.year && <span className="flex items-center gap-1.5"><FiCalendar size={13} />{project.year}</span>}
              </div>
            )}

            <div className="mb-5" style={{ borderTop: "1px solid var(--synergy-card-border)" }} />

            {project.scope && (
              <div className="mb-5">
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest mb-1.5 opacity-40" style={{ color: "var(--synergy-text)" }}>Scope</p>
                <p className="text-sm" style={{ color: "var(--synergy-text)" }}>{project.scope}</p>
              </div>
            )}

            <div className="mb-5">
              <p className="font-mono text-[10px] font-bold uppercase tracking-widest mb-1.5 opacity-40" style={{ color: "var(--synergy-text)" }}>Description</p>
              <div className="space-y-3">
                {project.description.split("\n\n").map((para, i) => (
                  <p key={i} className="text-sm leading-relaxed opacity-75" style={{ color: "var(--synergy-text)" }}>{para}</p>
                ))}
              </div>
            </div>

            {/* Key highlights — present on all cards */}
            {project.highlights && (
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest mb-3 opacity-40" style={{ color: "var(--synergy-text)" }}>Key Highlights</p>
                <ul className="space-y-2.5">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "var(--synergy-text)" }}>
                      <span
                        className="font-mono text-[10px] font-bold flex-shrink-0 mt-0.5 w-5 h-5 rounded flex items-center justify-center"
                        style={{ background: "rgba(37,99,235,0.1)", color: "var(--synergy-heading-highlight)", border: "1px solid rgba(37,99,235,0.25)" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="opacity-75">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ===============================
   MAIN EXPORT
   Single unified grid — all 7 project cards rendered together.
   Section uses --synergy-bg so in dark mode the page background
   turns dark blue while cards (--synergy-card-bg, white) lift off it.
================================ */
export default function ConstructionPortfolio() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section
      className="w-full py-16 lg:py-24 transition-colors duration-300"
      style={{ backgroundColor: "var(--synergy-bg)" }}
    >
      <div className="w-[90%] lg:w-[80%] mx-auto">

        {/* SECTION HEADER
            Uses --synergy-heading-main (black in light, white in dark)
            and --synergy-text (dark blue in light, white/85 in dark).
        */}
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

        {/* ALL PROJECT CARDS — unified grid */}
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