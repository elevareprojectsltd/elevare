import { motion } from "framer-motion";
import { FiMail, FiMapPin } from "react-icons/fi";
import { BsHeadset } from "react-icons/bs";

/* ===============================
   ANIMATION VARIANTS
   
   Purpose: Reusable Framer Motion patterns for smooth
   entrance animations of contact cards without layout shifts.
================================ */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15, // Stagger timing per card
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

/* ===============================
   CONTACT INFO COMPONENT
   
   Purpose: Display Elevare contact information with:
   - Responsive 3-column desktop layout
   - 2-column tablet layout with centered location
   - Single-column mobile layout
   - Animated entrance for each card
   - Hover effects and semantic accessibility
================================ */
export default function ContactInfo() {

  /* CONTACT DATA */
  const contactData = [
    {
      icon: BsHeadset,
      title: "Our Phone",
      details: [
        { text: "(+234) 810 494 1162", link: "tel:+2348104941162" },
        { text: "(+234) 906 422 7399", link: "tel:+2349064227399" },
      ],
    },
    {
      icon: FiMail,
      title: "Our Mail Box",
      details: [
        { text: "Elevareprojectsltd@gmail.com", link: "mailto:Elevareprojectsltd@gmail.com" },
        { text: "info@elevareprojectsltd.com", link: "mailto:info@elevareprojectsltd.com" },
      ],
    },
    {
      icon: FiMapPin,
      title: "Our Location",
      details: [
        { text: "Oluwasina Street Off Onijemo,", link: null },
        { text: "Ifako Ijaye, Ogba, Lagos State", link: null },
      ],
    },
  ];

  return (
    <section
      className="w-full py-16 lg:py-20 relative overflow-hidden"
      style={{ backgroundColor: "var(--synergy-bg)", color: "var(--synergy-text)" }}
      aria-label="Contact Information Section"
    >

      {/* CONTAINER FOR ALL CARDS */}
      <motion.div
        className="w-[90%] lg:w-[80%] mx-auto relative z-10"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >

        {/* =========================
            DESKTOP VIEW (3-Column Grid)
        ========================= */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {contactData.map((item, index) => (
            <motion.div key={index} variants={fadeUp} custom={index} className="group h-full">
              <div
                className="rounded-2xl p-8 lg:p-10 border transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 text-center h-full flex flex-col"
                style={{
                  backgroundColor: "var(--synergy-card-bg)",
                  borderColor: "var(--synergy-card-border)",
                  minHeight: "280px",
                }}
              >
                {/* ICON */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 mx-auto"
                  style={{
                    backgroundColor: "var(--synergy-bg)",
                    border: "2px solid var(--synergy-card-border)",
                  }}
                >
                  <item.icon
                    size={28}
                    style={{ color: "var(--synergy-heading-highlight)" }}
                  />
                </div>

                {/* TITLE */}
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: "var(--synergy-card-text)" }}
                >
                  {item.title}
                </h3>

                {/* DETAILS */}
                <div className="space-y-2 mt-auto">
                  {item.details.map((detail, idx) =>
                    detail.link ? (
                      <a
                        key={idx}
                        href={detail.link}
                        className="block text-sm opacity-70 hover:opacity-100 transition-all duration-300"
                        style={{ color: "var(--synergy-card-text)" }}
                      >
                        {detail.text}
                      </a>
                    ) : (
                      <p
                        key={idx}
                        className="text-sm opacity-70"
                        style={{ color: "var(--synergy-card-text)" }}
                      >
                        {detail.text}
                      </p>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* =========================
            TABLET VIEW (2-Column Grid + Centered Location)
        ========================= */}
        <div className="hidden md:grid lg:hidden gap-8">

          {/* PHONE & EMAIL */}
          <div className="grid grid-cols-2 gap-8">
            {contactData.slice(0, 2).map((item, index) => (
              <motion.div key={index} variants={fadeUp} custom={index} className="group h-full">
                <div
                  className="rounded-2xl p-8 border transition-all duration-300 hover:shadow-2xl text-center h-full flex flex-col"
                  style={{
                    backgroundColor: "var(--synergy-card-bg)",
                    borderColor: "var(--synergy-card-border)",
                    minHeight: "260px",
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 mx-auto"
                    style={{
                      backgroundColor: "var(--synergy-bg)",
                      border: "2px solid var(--synergy-card-border)",
                    }}
                  >
                    <item.icon
                      size={28}
                      style={{ color: "var(--synergy-heading-highlight)" }}
                    />
                  </div>

                  <h3
                    className="text-xl font-bold mb-4"
                    style={{ color: "var(--synergy-card-text)" }}
                  >
                    {item.title}
                  </h3>

                  <div className="space-y-2 mt-auto">
                    {item.details.map((detail, idx) =>
                      detail.link ? (
                        <a
                          key={idx}
                          href={detail.link}
                          className="block text-sm opacity-70 hover:opacity-100 transition-all duration-300"
                          style={{ color: "var(--synergy-card-text)" }}
                        >
                          {detail.text}
                        </a>
                      ) : (
                        <p
                          key={idx}
                          className="text-sm opacity-70"
                          style={{ color: "var(--synergy-card-text)" }}
                        >
                          {detail.text}
                        </p>
                      )
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* LOCATION CENTERED */}
          <motion.div variants={fadeUp} custom={2} className="max-w-md mx-auto w-full group">
            <div
              className="rounded-2xl p-8 border transition-all duration-300 hover:shadow-2xl text-center flex flex-col"
              style={{
                backgroundColor: "var(--synergy-card-bg)",
                borderColor: "var(--synergy-card-border)",
                minHeight: "260px",
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 mx-auto"
                style={{
                  backgroundColor: "var(--synergy-bg)",
                  border: "2px solid var(--synergy-card-border)",
                }}
              >
                <FiMapPin
                  size={28}
                  style={{ color: "var(--synergy-heading-highlight)" }}
                />
              </div>

              <h3
                className="text-xl font-bold mb-4"
                style={{ color: "var(--synergy-card-text)" }}
              >
                {contactData[2].title}
              </h3>

              <div className="space-y-2 mt-auto">
                {contactData[2].details.map((detail, idx) => (
                  <p
                    key={idx}
                    className="text-sm opacity-70"
                    style={{ color: "var(--synergy-card-text)" }}
                  >
                    {detail.text}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* =========================
            MOBILE VIEW (Single Column)
        ========================= */}
        <div className="md:hidden space-y-6">
          {contactData.map((item, index) => (
            <motion.div key={index} variants={fadeUp} custom={index} className="group">
              <div
                className="rounded-2xl p-6 border transition-all duration-300 hover:shadow-xl text-center flex flex-col"
                style={{
                  backgroundColor: "var(--synergy-card-bg)",
                  borderColor: "var(--synergy-card-border)",
                  minHeight: "220px",
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 mx-auto"
                  style={{
                    backgroundColor: "var(--synergy-bg)",
                    border: "2px solid var(--synergy-card-border)",
                  }}
                >
                  <item.icon
                    size={24}
                    style={{ color: "var(--synergy-heading-highlight)" }}
                  />
                </div>

                <h3
                  className="text-lg font-bold mb-3"
                  style={{ color: "var(--synergy-card-text)" }}
                >
                  {item.title}
                </h3>

                <div className="space-y-2 mt-auto">
                  {item.details.map((detail, idx) =>
                    detail.link ? (
                      <a
                        key={idx}
                        href={detail.link}
                        className="block text-sm opacity-70 hover:opacity-100 transition-all duration-300"
                        style={{ color: "var(--synergy-card-text)" }}
                      >
                        {detail.text}
                      </a>
                    ) : (
                      <p
                        key={idx}
                        className="text-sm opacity-70"
                        style={{ color: "var(--synergy-card-text)" }}
                      >
                        {detail.text}
                      </p>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </motion.div>
    </section>
  );
}