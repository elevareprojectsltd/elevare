import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import hero1 from "../../assets/hero-1.webp";
import hero2 from "../../assets/hero-2.webp";
import hero3 from "../../assets/hero-3.webp";
import hero4 from "../../assets/hero-4.webp";
import hero5 from "../../assets/hero-5.webp";

/* ─── DESIGN CONCEPT ───────────────────────────────────────────────────────────
   CINEMATIC ARCHITECTURAL SLIDER

   Aesthetic direction: editorial architecture photography — the kind you see
   in Wallpaper* magazine or Dezeen. Full-bleed images, extreme widescreen crop,
   film-grain overlay, and a stripped-back control language borrowed from
   professional photography portfolios.

   Key design decisions:
   1. WIDESCREEN CROP — 21:9 aspect ratio (cinematic) instead of 16:9 (TV).
      Architecture looks dramatically better in ultra-wide format.

   2. SLIDE TRANSITION — Images don't crossfade. Instead, the next image
      slides in from the right while the current one moves left, with a
      subtle scale-up on the incoming image. Feels like turning pages in a
      portfolio rather than a TV broadcast.

   3. NAVIGATION — No dots. Instead:
      - Far left: current slide number in large editorial type (01 / 05)
      - Far right: thin vertical progress bar that fills as slides advance
      - Bottom: a single thin scrub bar — click anywhere to jump to that slide
      - Prev / next arrows are minimal chevrons that appear only on hover

   4. FILM GRAIN — SVG fractalNoise at low opacity adds tactile depth and
      elevates the images from "web stock photo" to "editorial quality".

   5. PARALLAX — The image moves slightly on mouse position using
      useMotionValue + useSpring, creating a subtle 3D depth effect.

   6. CAPTION BAR — A slim frosted bar at the bottom shows the slide number
      and a short label. Fades in with each new slide.
─────────────────────────────────────────────────────────────────────────────── */

const SLIDES = [
  { img: hero1, label: "Architecture & Design" },
  { img: hero2, label: "Construction Excellence" },
  { img: hero3, label: "Interior Precision" },
  { img: hero4, label: "Project Delivery" },
  { img: hero5, label: "Digital Innovation" },
];

const INTERVAL = 5000;

/* Slide direction: +1 = next (right→left), -1 = prev (left→right) */
const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? "100%" : "-100%",
    scale: 1.08,
    opacity: 0,
  }),
  center: {
    x: 0,
    scale: 1,
    opacity: 1,
    transition: {
      x: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
      scale: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.4 },
    },
  },
  exit: (dir) => ({
    x: dir > 0 ? "-60%" : "60%",
    scale: 0.96,
    opacity: 0,
    transition: {
      x: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
      scale: { duration: 0.75 },
      opacity: { duration: 0.35 },
    },
  }),
};

const captionVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.35 } },
  exit:    { opacity: 0, y: -6, transition: { duration: 0.25 } },
};

export default function HeroMediaBridge() {
  const [index, setIndex]     = useState(0);
  const [dir, setDir]         = useState(1);     // slide direction
  const [paused, setPaused]   = useState(false);
  const [progress, setProgress] = useState(0);   // 0–100 for the scrub bar
  const intervalRef           = useRef(null);
  const startRef              = useRef(Date.now());

  /* ── Parallax mouse tracking ── */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const px   = useSpring(rawX, { stiffness: 60, damping: 20 });
  const py   = useSpring(rawY, { stiffness: 60, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx   = (e.clientX - rect.left) / rect.width  - 0.5;
    const cy   = (e.clientY - rect.top)  / rect.height - 0.5;
    rawX.set(cx * 18);
    rawY.set(cy * 10);
  };
  const resetParallax = () => { rawX.set(0); rawY.set(0); };

  /* ── Auto-advance + scrub bar ── */
  useEffect(() => {
    if (paused) { clearInterval(intervalRef.current); return; }

    startRef.current = Date.now();
    setProgress(0);

    /* Scrub bar: update every 30ms */
    const tick = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      setProgress(Math.min((elapsed / INTERVAL) * 100, 100));
    }, 30);

    intervalRef.current = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % SLIDES.length);
      startRef.current = Date.now();
      setProgress(0);
    }, INTERVAL);

    return () => { clearInterval(tick); clearInterval(intervalRef.current); };
  }, [paused, index]);

  const goTo = (next) => {
    setDir(next > index ? 1 : -1);
    setIndex(next);
    startRef.current = Date.now();
    setProgress(0);
  };
  const prev = () => goTo((index - 1 + SLIDES.length) % SLIDES.length);
  const next = () => goTo((index + 1) % SLIDES.length);

  return (
    <section className="w-full bg-transparent -mt-20 md:-mt-40 lg:-mt-44">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="w-full md:w-[85%] lg:w-[70%] mx-auto">

          {/* ── OUTER WRAPPER — position context for all overlaid elements ── */}
          <div
            className="relative group"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => { setPaused(false); resetParallax(); }}
            onMouseMove={handleMouseMove}
          >

            {/* ── MAIN FRAME ─────────────────────────────────────────────── */}
            <div
              className="relative overflow-hidden rounded-2xl shadow-2xl"
              style={{
                aspectRatio: "21 / 9",
                background: "#0a0a0a",
                /* Architectural: dark border that fades to nothing */
                boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 32px 80px rgba(0,0,0,0.55)",
              }}
            >

              {/* Image slideshow */}
              <AnimatePresence initial={false} custom={dir} mode="sync">
                <motion.div
                  key={index}
                  custom={dir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0"
                  style={{ x: px, y: py }}
                >
                  <img
                    src={SLIDES[index].img}
                    alt={SLIDES[index].label}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  {/* Subtle vignette so edges don't blow out */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 100%)",
                    }}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Film grain overlay — SVG fractalNoise */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none z-10 opacity-[0.045] mix-blend-overlay"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                  backgroundSize: "180px",
                }}
              />

              {/* ── SLIDE COUNT — top left, editorial large type ── */}
              <div className="absolute top-4 left-5 z-20 pointer-events-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
                    exit={{ opacity: 0, y: 8, transition: { duration: 0.2 } }}
                    className="flex items-end gap-1"
                  >
                    <span
                      className="font-black leading-none tracking-tighter text-white"
                      style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)", fontFamily: "'Syne', sans-serif" }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="font-mono text-white/40 mb-1"
                      style={{ fontSize: "clamp(0.55rem, 1.2vw, 0.7rem)" }}
                    >
                      / {String(SLIDES.length).padStart(2, "0")}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ── VERTICAL PROGRESS BAR — top right ── */}
              <div
                className="absolute top-4 right-5 z-20 flex flex-col gap-1"
                style={{ height: "clamp(40px, 8vw, 64px)", width: "2px" }}
              >
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className="flex-1 rounded-full overflow-hidden cursor-pointer"
                    style={{ background: "rgba(255,255,255,0.15)" }}
                  >
                    {i === index && (
                      <motion.div
                        className="w-full rounded-full"
                        style={{ background: "#fff", height: `${progress}%` }}
                      />
                    )}
                    {i < index && (
                      <div className="w-full h-full rounded-full" style={{ background: "rgba(255,255,255,0.6)" }} />
                    )}
                  </button>
                ))}
              </div>

              {/* ── CAPTION BAR — bottom frosted strip ── */}
              <div
                className="absolute bottom-0 left-0 right-0 z-20 px-5 py-3 flex items-center justify-between"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)",
                  backdropFilter: "blur(0px)",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.p
                    key={index}
                    variants={captionVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="font-mono text-white/70 uppercase tracking-[0.2em]"
                    style={{ fontSize: "clamp(0.55rem, 1.1vw, 0.68rem)" }}
                  >
                    {SLIDES[index].label}
                  </motion.p>
                </AnimatePresence>

                {/* Pause indicator */}
                {paused && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="font-mono text-white/40 uppercase tracking-widest"
                    style={{ fontSize: "0.55rem" }}
                  >
                    ⏸ PAUSED
                  </motion.div>
                )}
              </div>

              {/* ── PREV / NEXT ARROWS — appear on hover ── */}
              <motion.button
                onClick={prev}
                aria-label="Previous slide"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center rounded-full text-white transition-all"
                style={{
                  width: "clamp(28px, 4vw, 40px)",
                  height: "clamp(28px, 4vw, 40px)",
                  background: "rgba(0,0,0,0.35)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backdropFilter: "blur(8px)",
                }}
                initial={{ opacity: 0, x: -6 }}
                whileInView={{ opacity: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                animate={{ opacity: 0 }}
                /* Show via CSS group-hover on the outer wrapper */
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 2L4 7L9 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>

              <motion.button
                onClick={next}
                aria-label="Next slide"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center rounded-full text-white"
                style={{
                  width: "clamp(28px, 4vw, 40px)",
                  height: "clamp(28px, 4vw, 40px)",
                  background: "rgba(0,0,0,0.35)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backdropFilter: "blur(8px)",
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 2L10 7L5 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>

            </div>

            {/* ── SCRUB BAR — below the frame ── */}
            <div
              className="relative mt-3 h-[2px] rounded-full overflow-hidden cursor-pointer"
              style={{ background: "rgba(0,0,0,0.1)" }}
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pct  = (e.clientX - rect.left) / rect.width;
                goTo(Math.floor(pct * SLIDES.length));
              }}
            >
              {/* Filled segment */}
              <motion.div
                className="absolute left-0 top-0 h-full rounded-full"
                style={{
                  background: "var(--synergy-heading-highlight, #2563eb)",
                  width: `${((index) / SLIDES.length) * 100 + (progress / SLIDES.length)}%`,
                }}
              />
              {/* Tick marks */}
              <div className="absolute inset-0 flex">
                {SLIDES.map((_, i) => (
                  <div key={i} className="flex-1 relative">
                    {i > 0 && (
                      <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-2 -translate-x-1/2"
                        style={{ background: "rgba(255,255,255,0.4)" }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}