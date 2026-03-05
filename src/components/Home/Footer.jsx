import { motion } from "framer-motion";
import {
  FiFacebook,
  FiInstagram,
  FiLinkedin,
} from "react-icons/fi";
import { FaTiktok } from "react-icons/fa6";
import { Link } from "react-router-dom";
import logo from "../../assets/elevare-logo.webp";

/* ===============================
   ANIMATION VARIANTS

   Purpose: Define reusable animation patterns for Framer Motion.
   These create smooth entrance effects without causing layout shifts
   by only animating transform and opacity properties.

   fadeUp          — Slides each column up while fading in. Accepts a
                     custom delay index (i) so each grid column staggers
                     independently without needing a container variant.
   staggerContainer — Parent wrapper that triggers child animations in
                     sequence. staggerChildren: 0.15 means each column
                     starts 0.15s after the previous one.
================================ */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: i * 0.1, // custom={0|1|2|3} on each column drives this delay
    },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Each child column animates 0.15s after the previous
    },
  },
};

/* ===============================
   FOOTER COMPONENT

   Displays the site-wide footer with:
   - Brand column: logo, tagline, and social media icon links
   - Navigation column: internal SPA links via React Router <Link>
   - Services column: links to Construction and Technology service pages
   - Legal column: Terms, Privacy Policy, and Customer Support links
   - Animated divider line that scales in from left → right
   - Animated copyright line that fades up on scroll
   - Fully theme-aware via CSS variables (--hero-bg, --hero-text, etc.)

   Props:
   - darkMode: passed in from the parent layout — available for
     conditional styling if needed as the site theme evolves.
================================ */
export default function Footer({ darkMode }) {

  /* SOCIAL LINKS DATA
     Defined inside the component so it has access to the imported
     icon components. Each entry contains:
     - icon  : The React Icon component to render
     - url   : Full external URL — opens in a new tab
     - label : aria-label text for screen reader accessibility
  */
  const SOCIAL_LINKS = [
    {
      icon: FiLinkedin,
      url: "https://www.linkedin.com/company/elevareprojectsltd",
      label: "LinkedIn",
    },
    {
      icon: FiInstagram,
      url: "https://www.instagram.com/elevareprojectsltd_",
      label: "Instagram",
    },
    {
      icon: FiFacebook,
      url: "https://www.facebook.com/elevareprojectsltd",
      label: "Facebook",
    },
    {
      icon: FaTiktok,
      url: "https://www.tiktok.com/@elevareprojects_?_r=1&_t=ZS-93yI7W7Vzam",
      label: "Tiktok",
    },
  ];

  return (
    <footer
      className="relative pt-64 pb-10 transition-colors duration-300"
      style={{
        backgroundColor: "var(--hero-bg)",
        color: "var(--hero-text)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6">

        {/* FOOTER GRID
            
            4-column grid on md+ screens, single column on mobile.
            staggerContainer sequences each column's fadeUp animation
            so they cascade in left → right as the footer enters view.
        */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-12"
        >

          {/* BRAND COLUMN — custom={0} animates first */}
          <motion.div variants={fadeUp} custom={0}>

            {/* Logo routes to /home via SPA Link (no page reload) */}
            <Link to="/home">
              <img
                src={logo}
                alt="Elevare Projects"
                className="w-24 mb-6 cursor-pointer"
              />
            </Link>

            {/* BRAND TAGLINE — summarises Elevare's hybrid positioning */}
            <p className="text-sm opacity-80 leading-relaxed">
              Elevare Projects Ltd is a hybrid firm balancing physical
              construction and project management with modern digital
              and Agile solutions.
            </p>

            {/* SOCIAL ICONS
                Rendered from SOCIAL_LINKS array above.
                Each is an external <a> with target="_blank" and
                rel="noopener noreferrer" for security.
                aria-label on each icon ensures screen readers
                announce the platform name, not just an empty button.
            */}
            <div className="flex gap-4 mt-6">
              {SOCIAL_LINKS.map(({ icon: Icon, url, label }, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full border transition
                    border-[var(--hero-border)]
                    hover:bg-[var(--hero-btn-hover-bg)]
                    hover:text-[var(--hero-btn-hover-text)]"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* NAVIGATION COLUMN — custom={1} animates second */}
          <motion.div variants={fadeUp} custom={1}>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li>
                <Link to="/" className="hover:opacity-100 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:opacity-100 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:opacity-100 transition">
                  Portfolio / Projects
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:opacity-100 transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* SERVICES COLUMN — custom={2} animates third */}
          <motion.div variants={fadeUp} custom={2}>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li>
                <Link
                  to="/services/construction"
                  className="hover:opacity-100 transition"
                >
                  Construction & Property
                </Link>
              </li>
              <li>
                <Link
                  to="/services/technology"
                  className="hover:opacity-100 transition"
                >
                  Technology & Digital
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* LEGAL COLUMN — custom={3} animates fourth (last) */}
          <motion.div variants={fadeUp} custom={3}>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3 text-sm opacity-80">
             
              <li>
                <Link to="/privacy" className="hover:opacity-100 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:opacity-100 transition">
                  Customer Support
                </Link>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* ANIMATED DIVIDER LINE

            scaleX animates from 0 → 1 (origin-left) so the line
            draws itself from left to right as it enters the viewport.
            Gives a subtle but satisfying visual separator entrance.
        */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-20 border-t origin-left"
          style={{ borderColor: "var(--hero-border)" }}
        />

        {/* COPYRIGHT LINE

            Simple fade + slide up animation. opacity: 0.7 in the
            visible state keeps it visually subordinate to the grid
            content above — copyright is supporting info, not primary.
        */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.7, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-6 text-center text-sm"
        >
          © Copyright 2026, All Rights Reserved by Elevare Ltd
        </motion.p>

      </div>
    </footer>
  );
}