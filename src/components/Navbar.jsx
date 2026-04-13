import { useEffect, useState } from "react";
import {
  FiMenu,
  FiX,
  FiMoon,
  FiSun,
  FiChevronDown,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/elevare-logo.webp";

/* ===============================
   NAV LINKS CONFIG

   Purpose: Single source of truth for all navigation destinations.
   Defined outside the component so it's never re-created on re-renders.

   NAV_LINKS    — Primary navigation items. Sliced into two groups:
                  slice(0,2) renders before the Services dropdown,
                  slice(2) renders after it — keeping Services centred
                  between the other nav items visually.
   SERVICE_LINKS — Dropdown sub-items under "Services". Each entry
                  includes a description shown in the desktop dropdown
                  and the mobile accordion for added context.
================================ */
const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Portfolio / Projects", path: "/portfolio" },
  { label: "Contact Us", path: "/contact" },
];

const SERVICE_LINKS = [
  {
    label: "Construction & Property",
    description: "Development & infrastructure",
    path: "/services/construction",
  },
  {
    label: "Technology & Digital",
    description: "Web & software solutions",
    path: "/services/technology",
  },
];

/* ===============================
   ANIMATION VARIANTS

   Purpose: Define reusable animation patterns for Framer Motion.
   These create smooth entrance/exit effects without layout shifts.

   mobileMenuVariants    — Sidebar slides in from x: 100% (off right edge)
                           and slides back out on close. type: "tween" is used
                           instead of "spring" for a more controlled, linear feel
                           appropriate for a navigation panel.
   mobileNavItemVariants — Each nav link in the sidebar slides in from x: 20
                           with a staggered delay driven by the custom index (i).
                           custom={index} on each <motion.li> drives this delay.
   dropdownVariants      — Desktop Services dropdown fades in, drops down 10px,
                           and scales from 95% → 100%. exit reverses this.
                           duration: 0.15 on exit is faster than enter (0.2)
                           so closing feels snappy and doesn't block navigation.
================================ */
const mobileMenuVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "tween", duration: 0.3, ease: "easeInOut" },
  },
  exit: {
    x: "100%",
    transition: { type: "tween", duration: 0.3, ease: "easeInOut" },
  },
};

const mobileNavItemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1, // custom={i} on each item drives this stagger delay
      duration: 0.3,
      ease: "easeOut",
    },
  }),
};

const dropdownVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  exit: {
    opacity: 0, y: -10, scale: 0.95,
    transition: { duration: 0.15 }, // Faster exit so closing feels snappy
  },
};

/* ===============================
   DESKTOP NAV LINK COMPONENT

   Reusable link item for the desktop navigation bar.
   whileHover y: -2 gives a subtle lift on hover that signals
   interactivity without a full colour change on the list item.
   Hover colour uses CSS variable --nav-hover-text so it responds
   correctly to both light mode (dark blue) and dark mode (white).
================================ */
function DesktopNavLink({ label, path }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.li
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ color: hovered ? "var(--nav-hover-text)" : "inherit", transition: "color 0.2s" }}
    >
      <Link to={path}>{label}</Link>
    </motion.li>
  );
}

/* ===============================
   SERVICES DROPDOWN COMPONENT

   Renders the desktop hover dropdown for the Services nav item.
   Only mounted when isOpen is true — AnimatePresence handles
   the enter/exit animation cycle via dropdownVariants.

   WHY onMouseEnter/onMouseLeave (not onClick):
   Hover-triggered dropdowns feel more natural on desktop where
   the user is already moving their cursor toward the menu items.
   The parent <motion.li> in Navbar handles the hover state.
================================ */
function ServicesDropdown({ isOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="absolute top-full left-0 mt-4 w-64 rounded-xl shadow-xl z-50"
          style={{ backgroundColor: "var(--nav-bg)" }}
        >
          <ul className="py-3 text-sm">
            {SERVICE_LINKS.map((service, index) => (
              <motion.li
                key={service.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }} // Subtle stagger between the two service items
              >
                <Link
                  to={service.path}
                  className="block px-5 py-3 transition"
                  style={{ color: "var(--text-color)" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--nav-hover-text)";
                    e.currentTarget.style.background = "var(--nav-hover-bg)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--text-color)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <p className="font-medium">{service.label}</p>
                  <p className="text-xs opacity-70">{service.description}</p>
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ===============================
   NAVBAR COMPONENT

   Displays the site-wide navigation bar with:
   - Desktop: logo left, nav links centre, dark mode + hamburger right
   - Mobile: logo left, dark mode + close button right, full sidebar overlay
   - Services dropdown on desktop (hover-triggered)
   - Services accordion on mobile (click-triggered)
   - Dark mode toggle that applies the "dark" class to <html>
   - Body scroll lock when the mobile sidebar is open

   STATE:
   menuOpen           — Controls mobile sidebar visibility
   servicesOpen       — Controls desktop Services dropdown visibility
   mobileServicesOpen — Controls mobile Services accordion expand/collapse
   darkMode           — Toggles dark class on <html> for theme switching

   HOVER FIX:
   All hover colour changes now use CSS variables (--nav-hover-text,
   --nav-hover-bg) defined in index.css. In light mode these resolve to
   dark blue; in dark mode they resolve to white. Tailwind's hardcoded
   hover:text-[#06284D] classes have been replaced throughout so the
   dark mode experience is consistent.
================================ */
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  /* DARK MODE EFFECT
     Adds/removes the "dark" class on <html> whenever darkMode changes.
     CSS variables scoped to .dark then handle all colour switches
     across the site without any prop drilling.
  */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  /* SCROLL LOCK EFFECT
     Prevents the page from scrolling behind the mobile sidebar overlay.
     Cleanup restores overflow when the sidebar closes or the component
     unmounts — prevents a stuck overflow: hidden state.
  */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [menuOpen]);

  /* INLINE HOVER HANDLER HELPERS
     Used on any element where Tailwind's static hover classes can't
     respond to CSS variables. Reads the current variable value at
     hover time so light/dark mode is always respected.
  */
  const onHoverIn  = (e) => { e.currentTarget.style.color = "var(--nav-hover-text)"; };
  const onHoverOut = (e) => { e.currentTarget.style.color = "var(--text-color)"; };

  return (
    <>
      {/* DESKTOP + MOBILE NAV BAR
          z-50 keeps the navbar above all page content.
          CSS variables handle bg and border colour for theme compatibility.
          fixed top-0 left-0 right-0 pins the navbar to the top of the
          viewport so it remains visible as the user scrolls down the page.
      */}
      <nav
        className="w-full border-b transition-colors duration-300 fixed top-0 left-0 right-0 z-50"
        style={{ backgroundColor: "var(--nav-bg)", borderColor: "var(--nav-border)" }}
      >
        <div className="w-[90%] lg:w-[80%] mx-auto">
          <div className="flex items-center justify-between h-20">

            {/* LOGO — routes to "/" via SPA Link (no page reload) */}
            <Link to="/" className="flex items-center">
              <motion.img
                src={logo}
                alt="Elevare"
                className="h-15 w-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
            </Link>

            {/* DESKTOP NAVIGATION
                Hidden on mobile (hidden lg:flex).
                NAV_LINKS is sliced into two groups so the Services
                dropdown sits naturally between them in the centre.
            */}
            <ul
              className="hidden lg:flex items-center gap-10 font-medium"
              style={{ color: "var(--text-color)" }}
            >
              {/* Home + About Us — rendered before the Services dropdown */}
              {NAV_LINKS.slice(0, 2).map((item) => (
                <DesktopNavLink key={item.label} {...item} />
              ))}

              {/* SERVICES DROPDOWN
                  onMouseEnter/onMouseLeave on the parent <li> controls
                  the ServicesDropdown visibility via servicesOpen state.
                  The chevron rotates 180° when the dropdown is open.
                  Hover colour uses --nav-hover-text via inline handlers
                  so it turns white in dark mode and dark blue in light mode.
              */}
              <motion.li
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 transition"
                  style={{ color: "inherit" }}
                  onMouseEnter={onHoverIn}
                  onMouseLeave={onHoverOut}
                >
                  Services
                  <motion.div
                    animate={{ rotate: servicesOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiChevronDown />
                  </motion.div>
                </button>

                <ServicesDropdown isOpen={servicesOpen} />
              </motion.li>

              {/* Portfolio + Contact Us — rendered after the Services dropdown */}
              {NAV_LINKS.slice(2).map((item) => (
                <DesktopNavLink key={item.label} {...item} />
              ))}
            </ul>

            {/* RIGHT CONTROLS — dark mode toggle + mobile hamburger */}
            <div className="flex items-center gap-4">

              {/* DARK MODE TOGGLE
                  whileHover rotate: 15 gives the icon a playful tilt.
                  Icon swaps between FiMoon (light mode) and FiSun (dark mode).
                  Hover colour uses --nav-hover-text so it turns white in dark mode.
              */}
              <motion.button
                onClick={() => setDarkMode(!darkMode)}
                className="text-xl transition"
                style={{ color: "var(--text-color)" }}
                aria-label="Toggle dark mode"
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={onHoverIn}
                onMouseLeave={onHoverOut}
              >
                {darkMode ? <FiSun /> : <FiMoon />}
              </motion.button>

              {/* MOBILE HAMBURGER / CLOSE BUTTON
                  Only visible below lg breakpoint (lg:hidden).
                  Styled as a rounded square pill with three custom bars.
                  Middle bar is shorter for a more intentional look.
                  Background uses --nav-border so it adapts to light/dark mode.
              */}
              <motion.button
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-200"
                style={{ backgroundColor: "var(--nav-border)", color: "var(--text-color)" }}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                whileTap={{ scale: 0.92 }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--nav-hover-bg)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--nav-border)"; }}
              >
                <FiMenu size={20} />
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* SPACER
          Pushes page content below the fixed navbar so nothing is
          hidden behind it. Height matches the navbar's h-20 (80px).
      */}
      <div className="h-20" />

      {/* MOBILE SIDEBAR OVERLAY
          Rendered outside the <nav> so it can cover the full viewport.
          AnimatePresence enables exit animations when menuOpen → false.
      */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* BACKDROP
                Semi-transparent overlay behind the sidebar.
                onClick closes the menu when the user taps outside.
                z-40 sits below the sidebar (z-50) but above page content.
            */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* SIDEBAR PANEL
                Slides in from x: 100% (right edge) via mobileMenuVariants.
                max-w-sm caps the width on larger phones/tablets.
                z-50 ensures it sits above the backdrop.
            */}
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm z-50 lg:hidden shadow-2xl"
              style={{ backgroundColor: "var(--nav-bg)" }}
            >
              <div className="flex flex-col h-full">

                {/* SIDEBAR HEADER — styled X close button in a rounded square */}
                <div
                  className="flex items-center justify-end p-6 border-b"
                  style={{ borderColor: "var(--nav-border)" }}
                >
                  <motion.button
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center w-9 h-9 rounded-lg transition-colors duration-200"
                    style={{ backgroundColor: "var(--nav-border)", color: "var(--text-color)" }}
                    aria-label="Close menu"
                    whileTap={{ scale: 0.9 }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "var(--nav-hover-bg)"; e.currentTarget.style.color = "var(--nav-hover-text)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "var(--nav-border)"; e.currentTarget.style.color = "var(--text-color)"; }}
                  >
                    <FiX size={18} />
                  </motion.button>
                </div>

                {/* SIDEBAR NAV LINKS
                    overflow-y-auto allows scrolling if many links are added.
                    Each link closes the sidebar (onClick setMenuOpen(false))
                    so the user doesn't have to manually dismiss it.
                    Hover colour uses inline handlers for CSS variable support.
                */}
                <nav className="flex-1 overflow-y-auto py-6">
                  <ul
                    className="flex flex-col px-6 space-y-6 font-medium"
                    style={{ color: "var(--text-color)" }}
                  >
                    {/* Home + About Us — custom index 0 and 1 drive stagger delay */}
                    {NAV_LINKS.slice(0, 2).map((item, index) => (
                      <motion.li
                        key={item.label}
                        variants={mobileNavItemVariants}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                      >
                        <Link
                          to={item.path}
                          onClick={() => setMenuOpen(false)}
                          className="block py-2 transition"
                          style={{ color: "var(--text-color)" }}
                          onMouseEnter={onHoverIn}
                          onMouseLeave={onHoverOut}
                        >
                          {item.label}
                        </Link>
                      </motion.li>
                    ))}

                    {/* MOBILE SERVICES ACCORDION
                        Click-triggered (not hover) because hover is unavailable
                        on touch screens. Accordion expands height: 0 → auto
                        so the layout adjusts naturally without fixed heights.
                        custom={2} continues the stagger sequence from the links above.
                    */}
                    <motion.li
                      className="pt-4 border-t"
                      style={{ borderColor: "var(--nav-border)" }}
                      variants={mobileNavItemVariants}
                      custom={2}
                      initial="hidden"
                      animate="visible"
                    >
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="flex items-center justify-between w-full py-2 transition"
                        style={{ color: "var(--text-color)" }}
                        onMouseEnter={onHoverIn}
                        onMouseLeave={onHoverOut}
                      >
                        <span>Services</span>
                        <motion.div
                          animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <FiChevronDown />
                        </motion.div>
                      </button>

                      {/* ACCORDION CONTENT — animates height 0 → auto on expand */}
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 space-y-4 pl-4">
                              {SERVICE_LINKS.map((service, index) => (
                                <motion.li
                                  key={service.label}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                >
                                  <Link
                                    to={service.path}
                                    onClick={() => setMenuOpen(false)}
                                    className="block py-2 transition"
                                    style={{ color: "var(--text-color)" }}
                                    onMouseEnter={onHoverIn}
                                    onMouseLeave={onHoverOut}
                                  >
                                    <p className="font-medium">{service.label}</p>
                                    <p className="text-xs opacity-70 mt-1">{service.description}</p>
                                  </Link>
                                </motion.li>
                              ))}
                            </div>
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </motion.li>

                    {/* Portfolio + Contact Us — custom index 3+ continues stagger */}
                    {NAV_LINKS.slice(2).map((item, index) => (
                      <motion.li
                        key={item.label}
                        variants={mobileNavItemVariants}
                        custom={index + 3}
                        initial="hidden"
                        animate="visible"
                      >
                        <Link
                          to={item.path}
                          onClick={() => setMenuOpen(false)}
                          className="block py-2 transition"
                          style={{ color: "var(--text-color)" }}
                          onMouseEnter={onHoverIn}
                          onMouseLeave={onHoverOut}
                        >
                          {item.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}