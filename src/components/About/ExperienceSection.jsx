import { motion } from "framer-motion";

/* ===============================
   IMAGE

   Using Pexels for a professional team collaboration visual.
   ?auto=compress&cs=tinysrgb&w=1200 params reduce file size
   significantly without visible quality loss — important for
   PageSpeed Insights score targets (90+ desktop).
================================ */

// New professional image from Pexels
const experienceImg =
  "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200";

/* ===============================
   ANIMATION VARIANTS

   Purpose: Define reusable animation patterns for Framer Motion.
   These create smooth entrance effects without causing layout shifts
   by only animating transform and opacity properties.

   fadeLeft — Image slides in from the left (x: -40 → 0) as it enters
              the viewport. Used on the image column so it feels like it
              emerges from the left edge of the screen.
   fadeUp   — Content slides up (y: 30 → 0) while fading in. delay: 0.2
              staggers it slightly after the image so both animate in
              sequence rather than simultaneously.
================================ */
const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.2, ease: "easeOut" },
  },
};

/* ===============================
   EXPERIENCE SECTION COMPONENT

   Displays the "10 Years Experience" about section with:
   - Two distinct layouts: desktop (image left, content right) and
     mobile/tablet (content first, image second) for optimal reading
     order on smaller screens
   - fadeLeft on the image and fadeUp on the content so both animate
     in sequence as the section enters the viewport
   - CSS variables for full dark/light theme compatibility
   - whileInView on the parent <section> so all children animate
     together when the section scrolls into view
================================ */
export default function ExperienceSection() {
  return (
    <motion.section
      className="w-full py-9 lg:py-20 md:py-16"
      style={{
        backgroundColor: "var(--synergy-bg)",
        color: "var(--synergy-text)",
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="w-[90%] lg:w-[80%] mx-auto">

        {/* DESKTOP LAYOUT — Image left, Content right
            
            lg:grid-cols-5 gives the image 3 columns and the content 2,
            making the image dominant and visually leading the section.
            Only visible on lg and above — hidden on smaller screens.
        */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-12 lg:gap-20 items-center">

          {/* IMAGE — col-span-3 (60% of the grid width) */}
          <motion.div variants={fadeLeft} className="lg:col-span-3">
            <img
              src={experienceImg}
              alt="Professional team collaboration"
              className="w-full h-full object-cover rounded-xl shadow-lg"
              style={{ minHeight: "500px" }} // bigger image on desktop
            />
          </motion.div>

          {/* CONTENT — col-span-2 (40% of the grid width) */}
          <motion.div variants={fadeUp} className="lg:col-span-2 space-y-6">

            {/* EYEBROW LABEL */}
            <p className="tracking-[0.3em] text-xs font-semibold opacity-70">
              WELCOME
            </p>

            {/* MAIN HEADING
                
                The "10" is styled in the brand highlight colour and sized
                larger than the surrounding text to create a bold numerical
                anchor. The "Elevare" pill badge reinforces brand identity
                inline with the number.
            */}
            <h2
              className="text-4xl xl:text-5xl font-bold leading-tight"
              style={{ color: "var(--synergy-heading-main)" }}
            >
              Our{" "}
              <span className="inline-flex items-center gap-2">
                <span
                  className="text-5xl"
                  style={{ color: "var(--synergy-heading-highlight)" }}
                >
                  10
                </span>
                <span className="text-xs px-2 py-[2px] rounded-full bg-blue-600 text-white">
                  Elevare
                </span>
              </span>
              <span className="block mt-2">
                years working experience.
              </span>
            </h2>

            {/* BODY COPY — Three paragraphs covering:
                1. Full-service construction + Agile offering
                2. The 10-year hybrid delivery track record
                3. Collaborative client approach
            */}
            <p className="text-sm md:text-base opacity-70 leading-relaxed">
              From concept to completion, we offer a full range of construction and
              project management with modern digital and Agile solutions. Our
              services are designed with functionality and livability in mind.
            </p>

            <p className="text-sm md:text-base opacity-70 leading-relaxed">
              Over 10 years of balancing physical construction delivery with modern
              technology workflows. The brand reflects this duality — solidity and
              innovation.
            </p>

            <p className="text-sm md:text-base opacity-70 leading-relaxed">
              With Renovations and Facility Enhancements, we believe every project
              should be collaborative. We work closely with clients to bring their
              vision to life.
            </p>
          </motion.div>
        </div>

        {/* MOBILE/TABLET LAYOUT — Content first, Image second
            
            Content comes before the image on small screens so users
            read the context before seeing the visual — better reading
            order for mobile where images can push content far down.
            Only visible below lg — hidden on desktop.
        */}
        <div className="lg:hidden space-y-8">

          {/* CONTENT FIRST on mobile */}
          <motion.div variants={fadeUp} className="space-y-6">

            {/* EYEBROW LABEL */}
            <p className="tracking-[0.3em] text-xs font-semibold opacity-70">
              WELCOME
            </p>

            {/* MAIN HEADING — slightly smaller text scale for mobile */}
            <h2
              className="text-3xl md:text-4xl font-bold leading-tight"
              style={{ color: "var(--synergy-heading-main)" }}
            >
              Our{" "}
              <span className="inline-flex items-center gap-2">
                <span
                  className="text-4xl md:text-5xl"
                  style={{ color: "var(--synergy-heading-highlight)" }}
                >
                  10
                </span>
                <span className="text-xs px-2 py-[2px] rounded-full bg-blue-600 text-white">
                  Elevare
                </span>
              </span>
              <span className="block mt-2">
                years working experience.
              </span>
            </h2>

            {/* BODY COPY — identical content to desktop layout */}
            <p className="text-sm md:text-base opacity-70 leading-relaxed">
              From concept to completion, we offer a full range of construction and
              project management with modern digital and Agile solutions. Our
              services are designed with functionality and livability in mind.
            </p>

            <p className="text-sm md:text-base opacity-70 leading-relaxed">
              Over 10 years of balancing physical construction delivery with modern
              technology workflows. The brand reflects this duality — solidity and
              innovation.
            </p>

            <p className="text-sm md:text-base opacity-70 leading-relaxed">
              With Renovations and Facility Enhancements, we believe every project
              should be collaborative. We work closely with clients to bring their
              vision to life.
            </p>
          </motion.div>

          {/* IMAGE SECOND on mobile */}
          <motion.div variants={fadeLeft}>
            <img
              src={experienceImg}
              alt="Professional team collaboration"
              className="w-full rounded-xl shadow-lg"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}