import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const CAROUSEL_CARDS = [
  {
    label: "Mission Statement",
    text: "To deliver innovative, cost-effective and efficient construction and technology solutions that turn client ideas into high-quality, successful outcomes.",
  },
  {
    label: "Vision Statement",
    text: "To build a world-class African company recognized for precision, innovation and excellence in project delivery and digital transformation.",
  },
  {
    label: "Value Proposition",
    text: "Driving the development cycle through hybrid construction and tech expertise: we manage your project from initial concept to final handover with data-driven efficiency and innovative engineering.",
  },
];

function CyclingCards() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % CAROUSEL_CARDS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div variants={fadeUp} className="mt-16 relative" style={{ minHeight: "180px" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="rounded-2xl p-8 md:p-10 border-2 backdrop-blur-sm shadow-2xl"
          style={{
            backgroundColor: "var(--synergy-card-bg)",
            borderColor: "var(--synergy-heading-highlight)",
          }}
        >
          <p
            className="text-xs tracking-[0.3em] uppercase mb-4 opacity-60"
            style={{ color: "var(--synergy-card-text)" }}
          >
            {CAROUSEL_CARDS[index].label}
          </p>
          <p
            className="text-lg md:text-xl lg:text-2xl font-semibold leading-relaxed"
            style={{ color: "var(--synergy-card-text)" }}
          >
            "{CAROUSEL_CARDS[index].text}"
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-5">
        {CAROUSEL_CARDS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              backgroundColor: "var(--synergy-heading-highlight)",
              opacity: i === index ? 1 : 0.3,
              transform: i === index ? "scale(1.4)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function OurStorySection() {
  const storyContent = [
    {
      text: `Elevare emerged from a simple but powerful observation: the construction and project management industry needed to bridge the gap between traditional structural integrity and modern digital efficiency. We recognized that building excellence required more than just technical expertise, it demanded a transformation in how projects are conceptualized, managed, and delivered.`,
    },
    {
      text: `Our journey began with a commitment to solve the persistent challenges of capacity development and sustainability in the built environment. Through innovative thinking and a dedication to community growth, we've evolved into a comprehensive solutions provider that seamlessly integrates physical construction expertise with cutting-edge digital/Agile methodologies.`,
    },
    {
      text: `Today, Elevare stands as a testament to what's possible when experience meets innovation. Our vision is clear: to build a world-class African company recognized for precision, innovation, and excellence in project delivery and digital transformation, creating spaces and systems that empower businesses and communities to achieve their full potential.`,
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
      viewport={{ once: true, amount: 0.25 }}
    >
      {/* DECORATIVE BACKGROUND BLOBS */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5 blur-3xl"
           style={{ backgroundColor: "var(--synergy-heading-highlight)" }}
           aria-hidden="true"
      />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-5 blur-3xl"
           style={{ backgroundColor: "var(--synergy-heading-highlight)" }}
           aria-hidden="true"
      />

      <div className="w-[90%] md:w-[75%] lg:w-[65%] xl:w-[58%] mx-auto text-center relative z-10">

        {/* EYEBROW */}
        <motion.p
          variants={fadeUp}
          className="text-[11px] tracking-[0.45em] uppercase opacity-60 mb-6"
        >
          Our Story
        </motion.p>

        {/* HEADING — split into two lines only on sm+ to avoid merge on mobile */}
        <motion.h2
          variants={fadeUp}
          className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.2] tracking-tight mb-10"
          style={{ color: "var(--synergy-heading-main)" }}
        >
          Where Structural Integrity{" "}
          <br className="hidden sm:block" />
          Meets Digital Intelligence.
        </motion.h2>

        {/* DIVIDER */}
        <motion.div
          variants={fadeUp}
          className="w-14 h-[2px] mx-auto mb-14 rounded-full"
          style={{ backgroundColor: "var(--synergy-heading-highlight)" }}
          aria-hidden="true"
        />

        {/* STORY CARDS */}
        <div className="space-y-8">
          {storyContent.map((item, index) => (
            <motion.div
              key={index}
              variants={scaleIn}
              custom={index}
              className="relative group"
            >
              <div
                className="rounded-2xl p-8 md:p-10 lg:p-12 backdrop-blur-sm border transition-all duration-300 hover:shadow-xl"
                style={{
                  backgroundColor: "var(--synergy-card-bg)",
                  borderColor: "var(--synergy-card-border)",
                }}
              >
                <div
                  className="absolute -top-4 left-8 text-6xl font-serif opacity-20"
                  style={{ color: "var(--synergy-heading-highlight)" }}
                  aria-hidden="true"
                >
                  "
                </div>
                <p
                  className="text-sm md:text-base lg:text-lg leading-relaxed relative z-10"
                  style={{ color: "var(--synergy-card-text)" }}
                >
                  {item.text}
                </p>
                <div
                  className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
                  style={{ backgroundColor: "var(--synergy-heading-highlight)" }}
                  aria-hidden="true"
                />
              </div>
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

        {/* ── MISSION / VISION / VALUE — FADE SWAP ── */}
        <CyclingCards />

      </div>
    </motion.section>
  );
}