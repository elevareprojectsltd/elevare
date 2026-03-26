import { motion } from "framer-motion";
import { FiFacebook, FiInstagram, FiLinkedin, FiMail } from "react-icons/fi";
import { FaTiktok } from "react-icons/fa6";
import { Link } from "react-router-dom";
import logo from "../../assets/elevare-logo.webp";

/* ================================
   ANIMATION VARIANTS
================================ */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: i * 0.1 },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

/* ================================
   SOCIAL LINKS
================================ */
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
    label: "TikTok",
  },
  {
    icon: FiMail,
    url: "mailto:Elevareprojectsltd@gmail.com",
    label: "Gmail",
  },
];

/* ================================
   NAV COLUMNS
================================ */
const NAV_COLUMNS = [
  {
    heading: "Navigation",
    links: [
      { label: "Home", to: "/" },
      { label: "About Us", to: "/about" },
      { label: "Portfolio / Projects", to: "/portfolio" },
      { label: "Contact Us", to: "/contact" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Construction & Property", to: "/services/construction" },
      { label: "Technology & Digital", to: "/services/technology" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Customer Support", to: "/contact" },
    ],
  },
];

/* ================================
   FOOTER2 COMPONENT
================================ */
export default function Footer2({ darkMode }) {
  return (
    <footer
      className="relative pt-16 pb-10 transition-colors duration-300"
      style={{
        backgroundColor: "var(--hero-bg)",
        color: "var(--hero-text)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6">

        {/* ── MAIN GRID ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-12"
        >

          {/* BRAND COLUMN */}
          <motion.div variants={fadeUp} custom={0} className="flex flex-col gap-4">

            {/* Logo — image imported from assets, swap path if needed */}
            <Link to="/home">
              <img
                src={logo}
                alt="Elevare Projects"
                className="w-24 cursor-pointer"
              />
            </Link>

            {/* Tagline */}
            <p
              className="text-sm leading-relaxed"
              style={{ opacity: 0.7, maxWidth: "260px" }}
            >
              Elevare Projects Ltd is a hybrid firm balancing physical
              construction and project management with modern digital
              and Agile solutions.
            </p>

            {/* Social icons — Gmail uses mailto: to open mail client */}
            <div className="flex gap-3 mt-1">
              {SOCIAL_LINKS.map(({ icon: Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-full border transition-all duration-200"
                  style={{ borderColor: "var(--hero-border)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--hero-btn-hover-bg)";
                    e.currentTarget.style.color = "var(--hero-btn-hover-text)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "inherit";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* NAV COLUMNS */}
          {NAV_COLUMNS.map(({ heading, links }, colIndex) => (
            <motion.div
              key={heading}
              variants={fadeUp}
              custom={colIndex + 1}
              className="flex flex-col gap-4"
            >
              <h4
                className="font-semibold text-sm tracking-wide"
                style={{ color: "var(--hero-text)" }}
              >
                {heading}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm transition-opacity duration-200"
                      style={{ opacity: 0.65 }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.65")}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* ── DIVIDER — draws left to right on scroll ── */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-14 border-t origin-left"
          style={{ borderColor: "var(--hero-border)" }}
        />

        {/* ── COPYRIGHT ── */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.6, y: 0 }}
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