import { motion } from "framer-motion";

/* ===============================
   TESTIMONIALS DATA

   Purpose: Single source of truth for all customer testimonial entries.
   Each object maps directly to a <TestimonialCard /> in the sliding track.

   Fields:
   - name  : Full name of the client — displayed bold below their avatar
   - role  : Job title and company — displayed at reduced opacity beneath name
   - image : Pexels portrait URL. Replace with real client photos when available.
             Always use ?auto=compress&cs=tinysrgb&w=200 params for performance.
   - text  : The testimonial body. Keep to 2–3 sentences for visual consistency.

   HOW TO ADD A NEW TESTIMONIAL:
   Copy any object below, update the fields, and add it to the array.
   The slider duplicates the array automatically to create the infinite
   loop effect — no changes needed anywhere else.
================================ */
const TESTIMONIALS = [
  {
    name: "Chidinma Okafor",
    role: "Project Director, Construction Firm",
    image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200",
    text: "What stood out about Elevare Projects Ltd was their project management discipline. Every phase was clearly structured, timelines were respected, and communication was consistent. Their reliability gave us complete confidence in the outcome.",
  },
  {
    name: "Adebayo Olawale",
    role: "Operations Manager, Real Estate",
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200",
    text: "Elevare Projects Ltd brings reliability to a level we hadn't experienced before. Their project management blended hands-on construction expertise with agile planning tools, ensuring progress stayed on course.",
  },
  {
    name: "Amina Bello",
    role: "Development Lead, Infrastructure",
    image: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=200",
    text: "From concept to execution, Elevare Projects Ltd demonstrated exceptional project management. Their ability to coordinate teams and adapt to changes made them a dependable partner.",
  },
  {
    name: "Emeka Nwosu",
    role: "Facilities Manager",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200",
    text: "Working with Elevare Projects Ltd felt seamless. Risks were managed early, quality remained consistent, and delivery stayed aligned with expectations throughout the project.",
  },
  {
    name: "Folake Adeyemi",
    role: "Technology Consultant",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200",
    text: "Their hybrid approach to construction and technology stood out. Elevare Projects Ltd delivered structured execution backed by smart digital tools.",
  },
  {
    name: "Ibrahim Musa",
    role: "Product Owner",
    image: "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=200",
    text: "Clear communication, disciplined planning, and consistent execution defined our experience. Elevare Projects Ltd exceeded expectations across every milestone.",
  },
];

/* ===============================
   ANIMATION VARIANTS

   Purpose: Define reusable animation patterns for Framer Motion.
   These create smooth entrance effects without causing layout shifts
   by only animating transform and opacity properties.

   fadeUp          — General entrance: slides up + fades in. Used for the
                     eyebrow label and heading so they sequence naturally.
   scaleIn         — Decorative divider entrance: subtle scale from 90% → 100%.
   staggerContainer — Parent wrapper that sequences child animations
                     automatically via staggerChildren — removes the need
                     to set individual delays on every child element.
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
      staggerChildren: 0.2, // Each child animates 0.2s after the previous one
      delayChildren: 0.1,   // Wait 0.1s before starting the stagger sequence
    },
  },
};

/* ===============================
   TESTIMONIAL CARD COMPONENT

   Renders a single testimonial as a <article> element (correct semantic
   tag for a self-contained piece of content) containing:
   - Five gold stars for visual trust signal
   - Quoted testimonial body text
   - Author avatar, name, and role

   WHY <article>:
   <article> is the correct HTML5 landmark for self-contained content
   that could be distributed independently — a testimonial qualifies.
   This also improves accessibility and SEO landmark structure.

   WHY PEXELS IMAGES WITH ?auto=compress:
   The compression and width params reduce image payload significantly.
   Replace with real client photos when available — keep the same
   URL query params for performance consistency.
================================ */
function TestimonialCard({ name, role, image, text }) {
  return (
    <article
      className="testimonial-card"
      aria-label={`Testimonial from ${name}, ${role}`}
    >
      <div className="h-full flex flex-col justify-between rounded-2xl p-6 bg-[var(--synergy-card-bg)] text-[var(--synergy-card-text)] border-2 border-[var(--synergy-card-border)] shadow-lg">

        {/* STAR RATING
            Five stars rendered as text for simplicity and zero image overhead.
            aria-hidden so screen readers don't read "★★★★★" literally.
            The surrounding <article> aria-label provides context instead.
        */}
        <div className="flex gap-1 mb-4 text-yellow-400 text-lg" aria-hidden="true">
          ★★★★★
        </div>

        {/* TESTIMONIAL BODY
            Wrapped in quotes as a typographic convention.
            opacity-80 softens the text slightly relative to the author name
            so the hierarchy is clear: attribution > quote body.
        */}
        <p className="text-sm md:text-base leading-relaxed opacity-80 mb-6">
          "{text}"
        </p>

        {/* AUTHOR INFO
            mt-auto pushes the author block to the bottom of the card
            regardless of quote length — keeps all cards visually aligned
            in the slider even when testimonial text varies in length.
        */}
        <div className="flex items-center gap-3 mt-auto">
          <img
            src={image}
            alt={`Portrait of ${name}`}
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            width="48"
            height="48"
            loading="lazy" // Defer off-screen images for performance
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

   Displays the full auto-scrolling testimonials section with:
   - Staggered section header: eyebrow label → heading → divider
   - Infinite CSS marquee slider (no JavaScript scroll logic needed)
   - Left/right gradient overlays that fade cards in/out at the edges
   - Duplicated testimonial array to create a seamless infinite loop
   - Fully theme-aware via CSS variables (--synergy-bg, --synergy-card-*)
   - Accessible: <article> cards, descriptive alt text, aria-label on section

   HOW THE INFINITE SLIDER WORKS:
   The TESTIMONIALS array is spread twice: [...TESTIMONIALS, ...TESTIMONIALS]
   This creates a track that is exactly 2× the content width. The CSS
   @keyframes animation translates the track by -50% (back to the start
   of the second copy), then instantly resets to 0 — creating a seamless
   infinite loop with pure CSS and zero JavaScript scroll logic.
================================ */
export default function CustomerTestimonials() {
  return (
    <section
      className="relative w-full py-12 md:py-16 lg:py-20 overflow-hidden transition-colors duration-300"
      aria-labelledby="testimonials-heading"
      style={{ backgroundColor: "var(--synergy-bg)", color: "var(--synergy-text)" }}
    >

      {/* DECORATIVE BACKGROUND ELEMENTS

          Subtle blur circles add depth without distracting from the
          testimonial content. Positioned at section edges and clipped
          by overflow-hidden on the parent <section>.
      */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-40 h-40 rounded-full bg-blue-400/5 blur-3xl" />
      </div>

      {/* SECTION HEADER

          staggerContainer sequences the eyebrow label, heading, and
          divider automatically — no individual delay props needed.
          amount: 0.3 triggers animation once 30% of the header is visible.
      */}
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

        {/* MAIN HEADING
            id ties to aria-labelledby on the parent <section>.
        */}
        <motion.h2
          variants={fadeUp}
          id="testimonials-heading"
          className="text-3xl md:text-4xl lg:text-5xl font-bold"
          style={{ color: "var(--synergy-heading-main)" }}
        >
          Customer Testimonials
        </motion.h2>

        {/* DECORATIVE DIVIDER — mirrors the —•— pattern used site-wide */}
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

      {/* SLIDER WRAPPER

          overflow-x-hidden clips the cards that are sliding outside
          the visible area. The gradient overlays are positioned inside
          this wrapper so they sit directly over the card edges.
      */}
      <div className="relative w-full overflow-x-hidden">

        {/* LEFT GRADIENT OVERLAY
            Fades cards out as they approach the left edge, creating the
            illusion that cards emerge from behind the section boundary.
            hidden on mobile (sm:block) as the fade effect isn't needed
            on narrow screens where cards fill most of the viewport width.
        */}
        <div
          className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none hidden sm:block"
          style={{ background: "linear-gradient(to right, var(--synergy-bg), transparent)" }}
          aria-hidden="true"
        />

        {/* RIGHT GRADIENT OVERLAY — mirrors the left overlay */}
        <div
          className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none hidden sm:block"
          style={{ background: "linear-gradient(to left, var(--synergy-bg), transparent)" }}
          aria-hidden="true"
        />

        {/* INFINITE SLIDING TRACK

            HOW IT WORKS:
            The TESTIMONIALS array is duplicated: [...TESTIMONIALS, ...TESTIMONIALS]
            This creates a track that is exactly 2× the real content width.
            The CSS animation slides the track left by -50% (the exact width
            of the first copy), then snaps back to 0 — making the loop seamless.

            WHY CSS ANIMATION (not JS):
            Pure CSS @keyframes runs on the GPU compositor thread, meaning
            it never blocks the main thread or causes layout shifts. This
            approach scores better on Core Web Vitals than JS-driven sliders.
        */}
        <div className="testimonial-track" role="region" aria-label="Scrolling customer testimonials">
          <div className="testimonial-slider">
            {[...TESTIMONIALS, ...TESTIMONIALS].map(({ name, role, image, text }, index) => (
              <TestimonialCard
                key={index}
                name={name}
                role={role}
                image={image}
                text={text}
              />
            ))}
          </div>
        </div>
      </div>

      {/* SLIDER STYLES

          Scoped inside the component via a <style> tag so these rules
          don't leak into the global stylesheet and conflict with other
          components that might use similar class names.

          WHY NOT TAILWIND FOR THE ANIMATION:
          Tailwind can't express custom @keyframes or animation: values
          without modifying tailwind.config.js. The <style> tag keeps
          this self-contained and portable — drop the component anywhere
          and it works without config changes.
      */}
      <style>{`
        /* Track: full-width container that clips overflow */
        .testimonial-track {
          width: 100%;
          overflow: hidden;
          position: relative;
        }

        /* Slider: flex row wider than the viewport (max-content),
           animated to scroll continuously to the left */
        .testimonial-slider {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          animation: testimonial-slide 45s linear infinite;
        }

        /* Individual card: fixed width, fixed min-height so all
           cards are the same height regardless of quote length */
        .testimonial-card {
          flex-shrink: 0;
          width: 300px;
          min-height: 340px;
        }

        /* Responsive card widths */
        @media (min-width: 640px) {
          .testimonial-card { width: 340px; }
        }

        @media (min-width: 768px) {
          .testimonial-card { width: 360px; }
          .testimonial-slider { gap: 2rem; }
        }

        /* Core animation: translates the track left by exactly 50%
           (the width of one full set of testimonials) then snaps
           back to 0 to create a seamless infinite loop */
        @keyframes testimonial-slide {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Pause the animation when the user prefers reduced motion —
           respects accessibility preferences for vestibular disorders */
        @media (prefers-reduced-motion: reduce) {
          .testimonial-slider {
            animation: none;
          }
        }
      `}</style>

    </section>
  );
}