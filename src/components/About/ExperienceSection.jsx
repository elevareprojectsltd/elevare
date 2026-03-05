import { motion } from "framer-motion";

const experienceImg =
  "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200";

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

        {/* DESKTOP LAYOUT */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-12 lg:gap-20 items-stretch">

          {/* IMAGE — stretches to match content height */}
          <motion.div variants={fadeLeft} className="lg:col-span-3">
            <img
              src={experienceImg}
              alt="Professional team collaboration"
              className="w-full h-full object-cover rounded-xl shadow-lg"
              style={{ display: "block" }}
            />
          </motion.div>

          {/* CONTENT */}
          <motion.div variants={fadeUp} className="lg:col-span-2 space-y-6 flex flex-col justify-center">

            <p className="tracking-[0.3em] text-xs font-semibold opacity-70">
              OUR EXPERIENCE
            </p>

            <h2
              className="text-4xl xl:text-5xl font-bold leading-tight"
              style={{ color: "var(--synergy-heading-main)" }}
            >
              <span
                className="text-6xl xl:text-7xl font-black block"
                style={{ color: "var(--synergy-heading-highlight)" }}
              >
                
              </span>
              <span className="block mt-1">Years of Delivering</span>
              <span
                className="block"
                style={{ color: "var(--synergy-heading-highlight)" }}
              >
                Excellence.
              </span>
            </h2>

            <p className="text-sm md:text-base opacity-70 leading-relaxed">
              From concept to completion, we offer a full range of construction and
              project management with modern digital and Agile solutions. Our
              services are designed with functionality and livability in mind.
            </p>

            <p className="text-sm md:text-base opacity-70 leading-relaxed">
             Decade of balancing physical construction delivery with modern
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

        {/* MOBILE/TABLET LAYOUT */}
        <div className="lg:hidden space-y-8">

          <motion.div variants={fadeUp} className="space-y-6">
            <p className="tracking-[0.3em] text-xs font-semibold opacity-70">
              OUR EXPERIENCE
            </p>

            <h2
              className="text-3xl md:text-4xl font-bold leading-tight"
              style={{ color: "var(--synergy-heading-main)" }}
            >
              <span
                className="text-5xl md:text-6xl font-black block"
                style={{ color: "var(--synergy-heading-highlight)" }}
              >
                10
              </span>
              <span className="block mt-1">Years of Delivering</span>
              <span
                className="block"
                style={{ color: "var(--synergy-heading-highlight)" }}
              >
                Excellence.
              </span>
            </h2>

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