import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/* ===============================
   ANIMATION VARIANTS

   Purpose: Define reusable animation patterns for Framer Motion.
   These create smooth entrance effects without causing layout shifts
   by only animating transform and opacity properties.

   fadeUp  — Slides content up 30px while fading in. Used for the heading,
             description, and button so they sequence top → bottom.
   scaleIn — Scales the CTA card from 95% → 100% as it enters the viewport,
             giving the whole card a satisfying "materialise" entrance.
================================ */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

/* ===============================
   CONTACT CTA SECTION COMPONENT

   Displays the bottom-of-page Call To Action banner with:
   - Animated card entrance using scaleIn
   - SEO-optimised h2 heading (id linked to aria-labelledby)
   - Supporting description for search engines
   - SPA-safe navigation via React Router <Link>
   - Fully accessible: aria-labelledby on section, aria-label on button
================================ */
export default function ContactSection() {
  return (
    <>
      {/* 
        ================================
        SEO IMPROVEMENTS
        ================================
        - Semantic <section> tag
        - Proper heading structure (h2)
        - Clear keyword usage (Elevare Projects, book a session, contact experts)
        - Descriptive text for search engines
      */}

      <section
        className="relative top-50 z-30 -mt-40"
        aria-labelledby="contact-cta-heading" // Improves accessibility + SEO
      >
        <div className="max-w-[1200px] mx-auto px-6">

          {/* ANIMATED CARD CONTAINER

              scaleIn animates the entire card from 95% → 100% as it enters
              the viewport. amount: 0.3 means the animation fires once 30%
              of the card is visible — prevents it triggering off-screen.
          */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="bg-[#06284D] rounded-2xl py-20 px-6 md:px-16 text-center shadow-2xl text-white"
          >

            {/* MAIN CTA HEADING

                id="contact-cta-heading" links this heading to the
                aria-labelledby on the parent <section> — important
                for screen readers and search engine landmark association.
                Important for SEO hierarchy on the page.
            */}
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              id="contact-cta-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
            >
              Begin your journey with Elevare Projects
            </motion.h2>

            {/* SUPPORTING DESCRIPTION

                SEO-friendly supporting text. Kept concise and descriptive
                to reinforce the CTA intent for both users and search engines.
                delay: 0.2 staggers it 0.2s after the heading animates in.
            */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-base md:text-lg opacity-80 max-w-[760px] mx-auto"
            >
              Connect with our experts by completing the enquiry form below.
            </motion.p>

            {/* CTA BUTTON — SPA NAVIGATION

                Using React Router <Link> instead of <a href> keeps routing
                within the SPA and avoids a full page reload.

                Hover state inverts the colour scheme (white bg, dark text)
                for a clear, accessible interactive affordance.

                delay: 0.4 staggers it after the description so the sequence
                reads naturally: heading → description → button.
            */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-10"
            >
              <Link
                to="/contact"
                aria-label="Book a consultation session with Elevare Projects"
                className="
                  inline-block
                  px-10 py-3 rounded-md font-medium border
                  border-white transition-all duration-300
                  hover:bg-white hover:text-[#031f3a]
                "
              >
                Book a session →
              </Link>
            </motion.div>

          </motion.div>
        </div>
      </section>
    </>
  );
}