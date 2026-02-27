import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import {
  FiCode,
  FiGlobe,
  FiZap,
  FiLayers,
  FiCpu,
  FiTrendingUp,
  FiUsers,
  FiSettings,
} from "react-icons/fi";

/* ===============================
   SERVICES DATA
================================ */
const TECH_SERVICES = [
  {
    icon: FiGlobe,
    tag: "01",
    title: "Web & App Development",
    description:
      "Custom websites, web apps, and mobile solutions built with modern frameworks. From MVPs to enterprise-grade platforms.",
    highlights: ["React / Next.js", "Mobile Apps", "E-commerce"],
  },
  {
    icon: FiZap,
    tag: "02",
    title: "Agile / Scrum Coaching & Delivery",
    description:
      "Transform how your team works. We embed Agile practices, run sprints, and coach teams to ship faster with confidence.",
    highlights: ["Sprint Planning", "Team Coaching", "Scrum Delivery"],
  },
  {
    icon: FiTrendingUp,
    tag: "03",
    title: "Digital Transformation",
    description:
      "End-to-end consulting to modernize your business — from legacy systems to cloud-native, data-driven operations.",
    highlights: ["Cloud Migration", "Process Automation", "Data Strategy"],
  },
  {
    icon: FiCpu,
    tag: "04",
    title: "Technology Advisory & Training",
    description:
      "Strategic guidance on tech stack decisions, vendor selection, and hands-on training for your internal teams.",
    highlights: ["Tech Audits", "Staff Training", "Roadmapping"],
  },
  {
    icon: FiLayers,
    tag: "05",
    title: "IT Solutions & Infrastructure",
    description:
      "Reliable IT setup, network management, and infrastructure support tailored to your business needs.",
    highlights: ["Network Setup", "IT Support", "Cloud Infrastructure"],
  },
  {
    icon: FiCode,
    tag: "06",
    title: "Software Development",
    description:
      "Bespoke software engineered to solve your exact problems — scalable, secure, and built to last.",
    highlights: ["Custom Software", "API Integration", "SaaS Products"],
  },
  {
    icon: FiSettings,
    tag: "07",
    title: "Systems Integration",
    description:
      "Connect your tools and platforms seamlessly. We design and implement integrations that eliminate silos.",
    highlights: ["API Connections", "CRM/ERP", "Workflow Automation"],
  },
  {
    icon: FiUsers,
    tag: "08",
    title: "UI/UX Design",
    description:
      "User-centred design that converts. We craft intuitive interfaces that delight users and drive results.",
    highlights: ["Prototyping", "User Research", "Design Systems"],
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
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ===============================
   SERVICE CARD
================================ */
function TechServiceCard({ service }) {
  const IconComponent = service.icon;

  return (
    <motion.div
      variants={cardVariant}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-2xl p-6 lg:p-8 border-2 transition-all duration-300 hover:shadow-2xl overflow-hidden cursor-default"
      style={{
        backgroundColor: "var(--synergy-bg)",
        borderColor: "var(--synergy-card-border)",
      }}
    >
      {/* Hover background shift - Steel Blue/Navy */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(37, 99, 235, 0.06), rgba(6, 40, 77, 0.08))",
        }}
      />

      {/* Left accent bar */}
      <div
        className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
        style={{ backgroundColor: "var(--synergy-heading-highlight)" }}
      />

      {/* Tag number */}
      <div
        className="text-xs font-bold tracking-widest mb-4 opacity-40"
        style={{ color: "var(--synergy-text)" }}
      >
        {service.tag}
      </div>

      {/* Icon + Title row */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
          style={{
            backgroundColor: "var(--synergy-heading-highlight)",
            opacity: 0.9,
          }}
        >
          <IconComponent size={22} className="text-white" />
        </div>

        {/* Arrow - appears on hover */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300"
          style={{
            backgroundColor: "var(--synergy-heading-highlight)",
          }}
        >
          <FiArrowUpRight size={14} className="text-white" />
        </div>
      </div>

      {/* Title */}
      <h3
        className="text-lg font-bold mb-3 transition-colors duration-300"
        style={{ color: "var(--synergy-heading-main)" }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p
        className="text-sm leading-relaxed mb-5 opacity-75"
        style={{ color: "var(--synergy-text)" }}
      >
        {service.description}
      </p>

      {/* Highlight tags */}
      <div className="flex flex-wrap gap-2">
        {service.highlights.map((tag, i) => (
          <span
            key={i}
            className="text-xs px-3 py-1 rounded-full font-medium"
            style={{
              backgroundColor: "var(--synergy-card-border)",
              color: "var(--synergy-text)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ===============================
   MAIN COMPONENT
================================ */
export default function TechServicesSection() {
  return (
    <section
      className="w-full py-16 lg:py-24 transition-colors duration-300"
      style={{ backgroundColor: "var(--synergy-bg)" }}
    >
      <div className="w-[90%] lg:w-[80%] mx-auto">

        {/* HEADER */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-16">

          {/* Left - Heading */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <p
              className="text-xs md:text-sm tracking-[0.3em] uppercase mb-4 opacity-70"
              style={{ color: "var(--synergy-text)" }}
            >
              Technology & Digital
            </p>
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
              style={{ color: "var(--synergy-heading-main)" }}
            >
              Digital Solutions
              <br />
              <span style={{ color: "var(--synergy-heading-highlight)" }}>
                Built to Scale
              </span>
            </h2>
          </motion.div>

          {/* Right - Description + CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.1 }}
          >
            <p
              className="text-base md:text-lg leading-relaxed mb-6 opacity-80"
              style={{ color: "var(--synergy-text)" }}
            >
              From agile coaching to full-stack development, our tech services
              power organizations to move faster, deliver smarter, and scale
              with confidence.
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl font-bold text-white flex items-center gap-2 shadow-lg transition-all duration-300"
                style={{ backgroundColor: "var(--synergy-heading-highlight)" }}
              >
                Upgrade Your Tech
                <FiArrowRight size={18} />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* DIVIDER with label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-12"
        >
          <div
            className="h-[2px] flex-1 rounded-full opacity-20"
            style={{ backgroundColor: "var(--synergy-text)" }}
          />
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase"
            style={{
              backgroundColor: "var(--synergy-heading-highlight)",
              color: "#ffffff",
            }}
          >
            {/* Blinking dot */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
            </span>
            8 Services Available
          </div>
          <div
            className="h-[2px] flex-1 rounded-full opacity-20"
            style={{ backgroundColor: "var(--synergy-text)" }}
          />
        </motion.div>

        {/* SERVICES GRID */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {TECH_SERVICES.map((service, index) => (
            <TechServiceCard key={index} service={service} />
          ))}
        </motion.div>

        {/* BOTTOM CTA BANNER */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative"
          style={{
            backgroundColor: "var(--synergy-heading-highlight)",
          }}
        >
          {/* Background grid pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Decorative circles */}
          <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/10" />
          <div className="absolute -left-6 -bottom-6 w-24 h-24 rounded-full bg-white/10" />

          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Ready to transform your digital operations?
            </h3>
            <p className="text-white/80 text-base">
              Let's build something remarkable together.
            </p>
          </div>

          <Link to="/contact" className="relative z-10 flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#001F3F" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white font-bold rounded-xl flex items-center gap-2 shadow-xl transition-all duration-300"
              style={{ color: "var(--synergy-heading-highlight)" }}
            >
              Get Started
              <FiArrowRight size={18} />
            </motion.button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}