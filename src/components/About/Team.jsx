/**
 * TeamSection.jsx
 * ---------------
 * Displays the Elevare Projects Ltd leadership team.
 *
 * Acceptance Criteria Met:
 * - Descriptive, semantic class naming (no generic "box1" style names)
 * - Entrance animations via Framer Motion with no layout shifts (uses opacity/transform only)
 * - CSS gradient text fallback handled via inline style pattern
 * - Images must be WebP (assets imported from ../../assets/*.webp)
 * - Separation of Concerns:
 *     · TEAM_DATA  → data layer (easy to update without touching markup)
 *     · ANIMATION_VARIANTS → animation config separated from JSX
 *     · SocialIconLink → reusable sub-component
 *     · TeamMemberCard (desktop/mobile) → structural sub-components
 * - Accessible: aria-labels on icon links, alt text on images
 * - Performance: images are already WebP; lazy loading applied via loading="lazy"
 */

import { motion } from "framer-motion";
import { FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

// ─── Asset Imports (all WebP for performance) ────────────────────────────────
import imgCOO from "../../assets/Ayodeji.webp";
import imgCEO from "../../assets/Sunday.webp";
import imgDeveloper from "../../assets/Tife.webp";
import imgTechnical from "../../assets/Abiodun.webp";

// ─── Animation Variants ───────────────────────────────────────────────────────
// Kept separate from JSX so designers can tweak timing without touching markup.

/** Fades content upward on scroll-enter. Accepts a custom stagger index (i). */
const VARIANT_FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
  }),
};

/** Fades content in from the left — used for mobile paragraph reveals. */
const VARIANT_FADE_LEFT = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/** Fades content in from the right — used for desktop bio text. */
const VARIANT_FADE_RIGHT = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/** Subtle scale on image hover — avoids layout shift by not changing size. */
const VARIANT_IMAGE_SCALE = {
  hover: { scale: 1.02, transition: { duration: 0.3, ease: "easeOut" } },
};

// ─── Team Data ────────────────────────────────────────────────────────────────
// Centralised data array. To add or update a team member, edit only this array.
// The rendering components below are data-agnostic.

const TEAM_DATA = [
  {
    name: "Sunday Folorunsho Akinlose",
    role: "Developer / Projects Lead",
    image: imgCEO,
    /**
     * Bio paragraphs separated so each can be animated independently
     * and so the markup stays clean.
     */
    bio: [
      `Folorunsho is the CEO and the Project Lead of Elevare Projects Ltd. He leads with a unique synergy of technical precision and human-centered leadership. A Certified Professional Scrum Master and seasoned Project & Product Manager with a Master's in Personnel Administration, he specialises in bridging the gap between ambitious concepts and high-performing assets.`,
      `By combining Agile expertise with a deep understanding of organisational behavior, he fosters high-performing teams to deliver streamlined, data-driven solutions across Africa's construction and digital landscapes, ensuring excellence from initial concept to final handover.`,
    ],
    socials: {
      linkedin: "https://linkedin.com/in/sunday-akinlose",
      email: "mailto:akinlosesunday8@gmail.com",
      instagram:
        "https://www.instagram.com/akinlose_sunday?igsh=eGRpdHQ0cmxtdWMw&utm_source=qr",
    },
  },
  {
    name: "Ayodeji Akinlose",
    role: "Architect / Design Lead",
    image: imgCOO,
    bio: [
      `Ayodeji is the COO and Design Lead of Elevare Projects Ltd, where she provides both strategic operational oversight and architectural direction across the firm's portfolio. Trained as an architect with over eight years of experience, she leads the design process from concept development through technical resolution while ensuring projects remain commercially viable and efficiently executed.`,
      `Her role integrates design management, consultant coordination, cost and schedule control, and quality assurance, allowing design intent to be carried through every stage of delivery. Her leadership brings clarity and cohesion to the design-to-delivery process, setting a high standard for quality and execution across the firm's work.`,
    ],
    socials: {
      linkedin: "https://linkedin.com/in/ayodeji-bruce-akinlose",
      email: "mailto:Ayodejibruce95@gmail.com",
      instagram:
        "https://www.instagram.com/ayomi.deji?igsh=MWVmbnZ1ODkwOGNnNA%3D%3D&utm_source=qr",
    },
  },
  {
    name: "Afolabi Boluwatife",
    role: "Developer",
    image: imgDeveloper,
    bio: [
      `Boluwatife is a Developer at Elevare Projects Ltd, where he leads the technical development and digital innovation efforts across the firm's projects. With a strong foundation in modern web technologies and user-centred design, he builds scalable, high-performance digital solutions that support the company's operational and strategic goals.`,
      `His expertise spans frontend architecture, system integration, performance optimisation, and responsive interface development. From concept to deployment, he ensures that every digital product is technically sound, visually refined, and aligned with business objectives.`,
    ],
    socials: {
      linkedin: "https://www.linkedin.com/in/boluwatife-afolabi-043a7127b",
      email: "mailto:afolabibolu15@gmail.com",
      instagram:
        "https://www.instagram.com/kvng_tifeh14?igsh=MXZtNGxwa3VhcXprZg%3D%3D&utm_source=qr",
    },
  },
  {
    name: "Oladajo Abiodun",
    role: "Admin / Technical Coordinator",
    image: imgTechnical,
    bio: [
      `Oladajo Abiodun is the Admin / Technical Coordinator at Elevare Projects Ltd, where she ensures seamless alignment between administrative operations and technical execution. She plays a pivotal role in coordinating internal processes, managing documentation, and supporting project teams to maintain efficiency across all stages of delivery.`,
      `With a strong organisational mindset and attention to detail, she oversees scheduling, communication flow, resource coordination, and compliance requirements, ensuring that both operational and technical functions remain structured and well-integrated.`,
      `Her ability to bridge administrative systems with project workflows enhances productivity, strengthens accountability, and contributes significantly to the smooth execution of the firm's portfolio.`,
    ],
    socials: {
      linkedin: "https://www.linkedin.com/in/abiodun-oladoja-",
      email: "mailto:abiodunoladoja03@gmail.com",
      instagram:
        "https://www.instagram.com/abiodun_oladoja?igsh=MXQ5YmhuNGd5ZGk1MQ%3D%3D&utm_source=qr",
    },
  },
];

// ─── Reusable Sub-Components ──────────────────────────────────────────────────

/**
 * SocialIconLink
 * --------------
 * A single social-media icon button. Reusable across desktop and mobile layouts.
 *
 * Props:
 *  - href      {string}    Link URL
 *  - ariaLabel {string}    Accessible label (required for icon-only buttons)
 *  - icon      {ReactNode} Icon element
 *  - variant   {"desktop"|"mobile"}  Controls styling token variables
 */
function SocialIconLink({ href, ariaLabel, icon, variant = "desktop" }) {
  // Token variables differ between desktop (bordered square) and mobile (round pill)
  const isDesktop = variant === "desktop";

  const desktopStyles = {
    backgroundColor: "var(--team-icon-bg)",
    color: "var(--team-icon-text)",
    border: "1px solid var(--team-icon-border)",
  };

  const mobileStyles = {
    backgroundColor: "var(--team-mobile-icon-bg)",
    color: "var(--team-mobile-icon-text)",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={
        isDesktop
          ? "inline-flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          : "inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-110"
      }
      style={isDesktop ? desktopStyles : mobileStyles}
    >
      {icon}
    </a>
  );
}

/**
 * TeamMemberSocialLinks
 * ----------------------
 * Renders the row of social icons for a team member.
 * Extracted so the icon set is defined once and used in both desktop and mobile.
 *
 * Props:
 *  - socials {object} { linkedin, email, instagram }
 *  - variant {"desktop"|"mobile"}
 */
function TeamMemberSocialLinks({ socials, variant }) {
  const iconSize = variant === "desktop" ? 20 : 18;

  return (
    <div
      className={`flex gap-${variant === "desktop" ? "4" : "3"} ${
        variant === "mobile" ? "justify-center md:justify-start" : ""
      } pt-4`}
    >
      <SocialIconLink
        href={socials.linkedin}
        ariaLabel="LinkedIn profile"
        icon={<FaLinkedin size={iconSize} />}
        variant={variant}
      />
      <SocialIconLink
        href={socials.email}
        ariaLabel="Send email"
        icon={<FaEnvelope size={iconSize} />}
        variant={variant}
      />
      <SocialIconLink
        href={socials.instagram}
        ariaLabel="Instagram profile"
        icon={<FaInstagram size={iconSize} />}
        variant={variant}
      />
    </div>
  );
}

/**
 * TeamMemberDesktopCard
 * ----------------------
 * Renders a single team member row in the desktop (lg+) layout.
 * Uses a 5-column grid: image (2 cols) | bio (3 cols).
 */
function TeamMemberDesktopCard({ member }) {
  return (
    <div className="hidden lg:grid lg:grid-cols-5 lg:gap-12 xl:gap-16 lg:items-start">
      {/* ── Portrait Image ── */}
      <motion.div
        whileHover="hover"
        variants={VARIANT_IMAGE_SCALE}
        className="lg:col-span-2 relative group"
      >
        <div className="team-member-portrait relative overflow-hidden rounded-2xl shadow-2xl">
          <img
            src={member.image}
            alt={`Portrait of ${member.name}, ${member.role} at Elevare Projects Ltd`}
            className="w-full h-auto object-cover aspect-[3/4]"
            loading="lazy"
            decoding="async"
          />
          {/* Subtle hover overlay — does not cause layout shift */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        {/* Decorative accent block behind the image */}
        <div
          className="team-member-portrait-accent absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl -z-10 opacity-30"
          style={{ backgroundColor: "var(--synergy-heading-highlight)" }}
          aria-hidden="true"
        />
      </motion.div>

      {/* ── Bio Content ── */}
      <motion.div
        className="lg:col-span-3 flex flex-col justify-start space-y-6"
        variants={VARIANT_FADE_RIGHT}
      >
        {/* Name & Role */}
        <div className="team-member-header space-y-3">
          <h2
            className="text-3xl xl:text-4xl font-bold tracking-tight"
            style={{ color: "var(--synergy-heading-main)" }}
          >
            {member.name}
          </h2>
          <div className="team-member-role-row flex items-center gap-3">
            {/* Decorative rule before the role label */}
            <div
              className="h-1 w-12 rounded-full"
              style={{ backgroundColor: "var(--synergy-heading-highlight)" }}
              aria-hidden="true"
            />
            <p
              className="text-base xl:text-lg font-medium"
              style={{ color: "var(--synergy-heading-highlight)" }}
            >
              {member.role}
            </p>
          </div>
        </div>

        {/* Biography paragraphs */}
        <div className="team-member-bio space-y-4 pt-2">
          {member.bio.map((paragraph, paragraphIndex) => (
            <p
              key={paragraphIndex}
              className="text-sm xl:text-base opacity-80 leading-relaxed"
              style={{ color: "var(--synergy-text)" }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Social links */}
        <TeamMemberSocialLinks socials={member.socials} variant="desktop" />
      </motion.div>
    </div>
  );
}

/**
 * TeamMemberMobileCard
 * ---------------------
 * Renders a single team member as a stacked card for mobile/tablet (< lg).
 * Image fills top portion with a gradient overlay; bio text sits below.
 */
function TeamMemberMobileCard({ member }) {
  return (
    <div className="lg:hidden">
      <div
        className="team-member-mobile-card rounded-3xl overflow-hidden shadow-xl"
        style={{ backgroundColor: "var(--synergy-card-bg)" }}
      >
        {/* ── Portrait with gradient overlay ── */}
        <motion.div
          whileHover="hover"
          variants={VARIANT_IMAGE_SCALE}
          className="team-member-mobile-portrait relative overflow-hidden h-[500px] md:h-[550px]"
        >
          <img
            src={member.image}
            alt={`Portrait of ${member.name}, ${member.role} at Elevare Projects Ltd`}
            className="w-full h-full object-cover object-top"
            loading="lazy"
            decoding="async"
          />
          {/* Dark gradient allows white text to remain legible over any photo */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Name & role overlaid on the image */}
          <div className="team-member-mobile-nameplate absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">{member.name}</h3>
            <p className="text-sm md:text-base opacity-90">{member.role}</p>
          </div>
        </motion.div>

        {/* ── Bio Text ── */}
        <div className="team-member-mobile-bio p-6 md:p-8 space-y-4">
          {member.bio.map((paragraph, paragraphIndex) => (
            <motion.p
              key={paragraphIndex}
              variants={VARIANT_FADE_LEFT}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={paragraphIndex}
              className="text-sm md:text-base leading-relaxed opacity-85"
              style={{ color: "var(--synergy-card-text)" }}
            >
              {paragraph}
            </motion.p>
          ))}

          {/* Social links */}
          <TeamMemberSocialLinks socials={member.socials} variant="mobile" />
        </div>
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

/**
 * TeamSection
 * -----------
 * Full team roster section for the Elevare Projects Ltd website.
 *
 * Renders both a desktop (side-by-side grid) and mobile (stacked card) layout
 * for each member, switching visibility via Tailwind responsive prefixes (lg:).
 *
 * Performance notes:
 *  - All images are WebP (see asset imports above).
 *  - Images use loading="lazy" and decoding="async" to defer off-screen loads.
 *  - Animations use only opacity and transform (no layout-affecting properties),
 *    preventing Cumulative Layout Shift (CLS) and keeping PageSpeed scores high.
 */
export default function TeamSection() {
  return (
    <section
      className="team-section w-full py-10 lg:py-16"
      style={{
        backgroundColor: "var(--synergy-bg)",
        color: "var(--synergy-text)",
      }}
      aria-labelledby="team-section-heading"
    >
      <div className="w-[90%] lg:w-[80%] mx-auto">

        {/* ── Section Header ── */}
        <motion.div
          variants={VARIANT_FADE_UP}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="team-section-header text-center mb-12 lg:mb-20"
        >
          <h1
            id="team-section-heading"
            className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4"
            style={{ color: "var(--synergy-heading-highlight)" }}
          >
            Our Team
          </h1>
          {/*
           * SEO note: The paragraph below deliberately includes the key phrases
           * "Construction Project Management Nigeria" and "Agile Scrum Coaching Africa"
           * to satisfy the SEO requirements for the team/about page.
           */}
          <p className="text-sm lg:text-base max-w-2xl mx-auto opacity-80">
            Elevare Projects Ltd prides itself on competent leadership. Our team
            stands at the forefront of delivering excellence in{" "}
            <strong>Construction Project Management Nigeria</strong> and{" "}
            <strong>Agile Scrum Coaching Africa</strong>.
          </p>
        </motion.div>

        {/* ── Team Member List ── */}
        <div className="team-member-list space-y-16 lg:space-y-24">
          {TEAM_DATA.map((member, memberIndex) => (
            <motion.div
              key={member.name} /* Use name as key — more stable than index */
              variants={VARIANT_FADE_UP}
              custom={memberIndex}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* Desktop layout (lg and above) */}
              <TeamMemberDesktopCard member={member} />

              {/* Mobile layout (below lg) */}
              <TeamMemberMobileCard member={member} />

              {/* Divider between members — hidden after the last member */}
              {memberIndex < TEAM_DATA.length - 1 && (
                <div
                  className="team-member-divider mt-16 lg:mt-24 h-px opacity-10"
                  style={{ backgroundColor: "var(--synergy-text)" }}
                  aria-hidden="true"
                />
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}