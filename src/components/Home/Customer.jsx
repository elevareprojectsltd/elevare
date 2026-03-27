import { motion } from "framer-motion";

/* ===============================
   TESTIMONIALS DATA

   Purpose: Single source of truth for all customer testimonial entries.
   Each object maps directly to a <TestimonialCard /> in the sliding track.

   Fields:
   - name  : Full name of the client — displayed bold below their avatar
   - role  : Job title and company — displayed at reduced opacity beneath name
   - text  : The testimonial body.

   HOW TO ADD A NEW TESTIMONIAL:
   Copy any object below, update the fields, and add it to the array.
   The slider duplicates the array automatically to create the infinite
   loop effect — no changes needed anywhere else.
================================ */
const TESTIMONIALS = [
  {
    name: "Bello Olanrewaju Saheed",
    role: "MEP Services Engineer / Contractor",
    text: "Working with Elevare Projects Ltd has been a game-changer for our onsite execution. As MEP contractors, we often face gaps between design intent and physical installation, but their team bridges that divide perfectly. Their grasp of technical precision combined with a streamlined digital workflow ensured that our mechanical and electrical systems were integrated without a single clash. They don't just manage a project; they optimize it.",
  },
  {
    name: "Adegboyega Macaulay",
    role: "Contractor",
    text: "As a specialist in glass partitions and architectural glazing, our work requires millimeter-level precision and perfect timing. Elevare Projects Ltd provided the structural oversight and technical coordination we needed to ensure our installations integrated flawlessly with the surrounding infrastructure. Their ability to manage multidisciplinary teams meant that our glass doors and partitions were installed without a single site-clash or delay.",
  },
  {
    name: "Ediomo Bassey",
    role: "Studio Lead",
    text: "Working with Elevare Projects Ltd was an exceptional experience. Their unique blend of creativity, technical expertise, and unwavering dedication is truly impressive. Throughout our collaboration, Elevare demonstrated a keen ability to design innovative, functional spaces that are as aesthetically striking as they are structurally sound. Their high level of proficiency in BIM software and digital tools ensured that every phase of the project was executed with precision. Beyond the technical side, Elevare's collaborative spirit and proactive problem-solving skills make them an invaluable partner for any multidisciplinary project. I confidently recommend Elevare Projects Ltd for any architectural or infrastructure endeavor.",
  },
  {
    name: "Taiwo Oluwatosin Paul",
    role: "Creative Director, The Homelyf Interiors Ltd",
    text: "Elevare Projects Ltd is the perfect technical partner for The Homelyf Interiors Ltd. Their proficiency in BIM and their innovative approach to functional spaces have been game-changers for our interior projects. They don't just manage a build; they help bring a creative vision to life with dedication and precision. We confidently recommend them for any architectural or interior infrastructure project.",
  },
  {
    name: "Jimoh Ishaq Junior",
    role: "Sales Manager",
    text: "Elevare Projects Ltd delivers a level of quality that speaks for itself. Their ability to build beautiful, technically sound environments has been a major driver of our sales success. Partnering with Elevare means bringing a gold-standard product to market every time. They are truly an invaluable asset to our team.",
  },
];

/* ===============================
   ANIMATION VARIANTS
================================ */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

/* ===============================
   TESTIMONIAL CARD COMPONENT
================================ */
function TestimonialCard({ name, role, text }) {
  return (
    <article
      className="testimonial-card"
      aria-label={`Testimonial from ${name}, ${role}`}
    >
      <div className="h-full flex flex-col justify-between rounded-2xl p-5 bg-[var(--synergy-card-bg)] text-[var(--synergy-card-text)] border-2 border-[var(--synergy-card-border)] shadow-lg">

        {/* STAR RATING */}
        <div className="flex gap-1 mb-4 text-yellow-400 text-lg" aria-hidden="true">
          ★★★★★
        </div>

        {/* TESTIMONIAL BODY */}
        <p className="text-sm md:text-base leading-relaxed opacity-80 mb-4">
          "{text}"
        </p>

        {/* AUTHOR INFO */}
        <div className="flex items-center gap-3 mt-auto">
          {/* Black placeholder in place of profile image */}
          <div
            className="w-12 h-12 rounded-full flex-shrink-0"
            style={{ backgroundColor: "#000000" }}
            aria-hidden="true"
          />
          <div>
            <p className="font-semibold text-sm">{name}</p>
            <p className="text-xs opacity-70">{role}</p>
          </div>
        </div>

      </div>
    </article>
  );
}

/* ===============================
   CUSTOMER TESTIMONIALS COMPONENT
================================ */
export default function CustomerTestimonials() {
  return (
    <section
      className="relative w-full py-12 md:py-16 lg:py-20 overflow-hidden transition-colors duration-300"
      aria-labelledby="testimonials-heading"
      style={{ backgroundColor: "var(--synergy-bg)", color: "var(--synergy-text)" }}
    >

      {/* DECORATIVE BACKGROUND ELEMENTS */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-40 h-40 rounded-full bg-blue-400/5 blur-3xl" />
      </div>

      {/* SECTION HEADER */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="text-center mb-12 md:mb-16 px-4 relative z-10"
      >
        {/* EYEBROW LABEL */}
        <motion.div variants={fadeUp} className="inline-block mb-4">
          <span
            className="text-xs md:text-sm tracking-[0.3em] uppercase font-medium opacity-70"
            style={{ color: "var(--synergy-text)" }}
          >
            What Our Clients Say
          </span>
        </motion.div>

        {/* MAIN HEADING */}
        <motion.h2
          variants={fadeUp}
          id="testimonials-heading"
          className="text-3xl md:text-4xl lg:text-5xl font-bold"
          style={{ color: "var(--synergy-heading-main)" }}
        >
          Customer Testimonials
        </motion.h2>

        {/* DECORATIVE DIVIDER */}
        <motion.div
          variants={scaleIn}
          className="flex items-center justify-center gap-2 mt-6"
          aria-hidden="true"
        >
          <div className="h-[2px] w-12 rounded-full" style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
          <div className="h-2 w-2 rounded-full"      style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
          <div className="h-[2px] w-12 rounded-full" style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
        </motion.div>
      </motion.div>

      {/* SLIDER WRAPPER */}
      <div className="relative w-full overflow-x-hidden">

        {/* LEFT GRADIENT OVERLAY */}
        <div
          className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none hidden sm:block"
          style={{ background: "linear-gradient(to right, var(--synergy-bg), transparent)" }}
          aria-hidden="true"
        />

        {/* RIGHT GRADIENT OVERLAY */}
        <div
          className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none hidden sm:block"
          style={{ background: "linear-gradient(to left, var(--synergy-bg), transparent)" }}
          aria-hidden="true"
        />

        {/* INFINITE SLIDING TRACK */}
        <div className="testimonial-track" role="region" aria-label="Scrolling customer testimonials">
          <div className="testimonial-slider">
            {[...TESTIMONIALS, ...TESTIMONIALS].map(({ name, role, text }, index) => (
              <TestimonialCard
                key={index}
                name={name}
                role={role}
                text={text}
              />
            ))}
          </div>
        </div>
      </div>

      {/* SLIDER STYLES */}
      <style>{`
        .testimonial-track {
          width: 100%;
          overflow: hidden;
          position: relative;
        }

        .testimonial-slider {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          animation: testimonial-slide 45s linear infinite;
        }

        .testimonial-card {
          flex-shrink: 0;
          width: 300px;
          min-height: 240px;
        }

        @media (min-width: 640px) {
          .testimonial-card { width: 340px; }
        }

        @media (min-width: 768px) {
          .testimonial-card { width: 360px; }
          .testimonial-slider { gap: 2rem; }
        }

        @keyframes testimonial-slide {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .testimonial-slider {
            animation: none;
          }
        }
      `}</style>

    </section>
  );
}