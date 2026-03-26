import { motion } from "framer-motion";
import { FiShield, FiLock, FiMail, FiPhone } from "react-icons/fi";

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
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

export default function PrivacyPolicy() {
  return (
    <div
      className="w-full min-h-screen transition-colors duration-300"
      style={{ backgroundColor: "var(--synergy-bg)" }}
    >
      {/* HERO SECTION */}
      <section
        className="relative w-full py-24 lg:py-32"
        style={{ backgroundColor: "#001F3F" }}
      >
        <div className="w-[90%] lg:w-[80%] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-500/20 mb-6"
          >
            <FiShield className="text-blue-400" size={36} />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Privacy Policy
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto"
          >
            Your privacy is important to us. Learn how Elevare Projects Ltd collects,
            uses, and protects your personal information.
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="text-sm text-white/60 mt-4"
          >
            Last Updated: January 2026
          </motion.p>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="w-full py-16 lg:py-24">
        <div className="w-[90%] lg:w-[70%] mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-12"
          >

            {/* Introduction */}
            <motion.div variants={fadeUp}>
              <h2
                className="text-2xl md:text-3xl font-bold mb-4"
                style={{ color: "var(--synergy-heading-main)" }}
              >
                Introduction
              </h2>
              <p
                className="leading-relaxed opacity-80"
                style={{ color: "var(--synergy-text)" }}
              >
                Elevare Projects Ltd ("we," "our," or "us") is committed to protecting and respecting
                your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard
                your information when you visit our website, use our services, or engage with us for
                construction, architecture, project management, technology development, or agile
                consulting services.
              </p>
              <p
                className="leading-relaxed opacity-80 mt-4"
                style={{ color: "var(--synergy-text)" }}
              >
                Please read this Privacy Policy carefully. By accessing or using our services, you
                acknowledge that you have read, understood, and agree to be bound by the terms of this
                Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do
                not access or use our services.
              </p>
            </motion.div>

            {/* Information We Collect */}
            <motion.div variants={fadeUp}>
              <h2
                className="text-2xl md:text-3xl font-bold mb-4"
                style={{ color: "var(--synergy-heading-main)" }}
              >
                Information We Collect
              </h2>
              <p
                className="leading-relaxed opacity-80 mb-4"
                style={{ color: "var(--synergy-text)" }}
              >
                We may collect and process the following types of information about you:
              </p>

              <h3
                className="text-xl font-bold mt-6 mb-3"
                style={{ color: "var(--synergy-heading-highlight)" }}
              >
                Personal Information
              </h3>
              <ul
                className="space-y-2 ml-6 opacity-80"
                style={{ color: "var(--synergy-text)" }}
              >
                <li className="flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
                  <span>Name, email address, phone number, and mailing address</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
                  <span>Company name, job title, and business contact information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
                  <span>Payment and billing information for services rendered</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
                  <span>Project specifications, site locations, and service requirements</span>
                </li>
              </ul>

              <h3
                className="text-xl font-bold mt-6 mb-3"
                style={{ color: "var(--synergy-heading-highlight)" }}
              >
                Technical Information
              </h3>
              <ul
                className="space-y-2 ml-6 opacity-80"
                style={{ color: "var(--synergy-text)" }}
              >
                <li className="flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
                  <span>IP address, browser type, and device information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
                  <span>Usage data, including pages visited, time spent, and navigation patterns</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
                  <span>Cookies and similar tracking technologies</span>
                </li>
              </ul>
            </motion.div>

            {/* How We Use Your Information */}
            <motion.div variants={fadeUp}>
              <h2
                className="text-2xl md:text-3xl font-bold mb-4"
                style={{ color: "var(--synergy-heading-main)" }}
              >
                How We Use Your Information
              </h2>
              <p
                className="leading-relaxed opacity-80 mb-4"
                style={{ color: "var(--synergy-text)" }}
              >
                We use the information we collect for the following purposes:
              </p>
              <ul
                className="space-y-3 ml-6 opacity-80"
                style={{ color: "var(--synergy-text)" }}
              >
                <li className="flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
                  <span><strong>Service Delivery:</strong> To provide construction, architecture, project management, technology development, and agile consulting services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
                  <span><strong>Communication:</strong> To respond to inquiries, send project updates, and provide customer support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
                  <span><strong>Billing & Payments:</strong> To process transactions and manage invoicing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
                  <span><strong>Marketing:</strong> To send newsletters, updates, and promotional materials (with your consent)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
                  <span><strong>Legal Compliance:</strong> To comply with legal obligations and protect our rights</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
                  <span><strong>Improvement:</strong> To analyze usage patterns and improve our services</span>
                </li>
              </ul>
            </motion.div>

            {/* Information Sharing */}
            <motion.div variants={fadeUp}>
              <h2
                className="text-2xl md:text-3xl font-bold mb-4"
                style={{ color: "var(--synergy-heading-main)" }}
              >
                Information Sharing and Disclosure
              </h2>
              <p
                className="leading-relaxed opacity-80 mb-4"
                style={{ color: "var(--synergy-text)" }}
              >
                We do not sell, trade, or rent your personal information to third parties. However, we may
                share your information in the following circumstances:
              </p>
              <ul
                className="space-y-3 ml-6 opacity-80"
                style={{ color: "var(--synergy-text)" }}
              >
                <li className="flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
                  <span><strong>Service Providers:</strong> With contractors, consultants, and vendors who assist in delivering our services</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
                  <span><strong>Legal Requirements:</strong> When required by law or to protect our legal rights</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
                  <span><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
                  <span><strong>With Your Consent:</strong> When you explicitly authorize us to share your information</span>
                </li>
              </ul>
            </motion.div>

            {/* Data Security */}
            <motion.div variants={fadeUp}>
              <h2
                className="text-2xl md:text-3xl font-bold mb-4"
                style={{ color: "var(--synergy-heading-main)" }}
              >
                Data Security
              </h2>
              <p
                className="leading-relaxed opacity-80"
                style={{ color: "var(--synergy-text)" }}
              >
                We implement appropriate technical and organizational measures to protect your personal
                information against unauthorized access, alteration, disclosure, or destruction. These
                measures include encryption, secure servers, access controls, and regular security audits.
              </p>
              <p
                className="leading-relaxed opacity-80 mt-4"
                style={{ color: "var(--synergy-text)" }}
              >
                However, no method of transmission over the internet or electronic storage is 100% secure.
                While we strive to protect your personal information, we cannot guarantee its absolute security.
              </p>
            </motion.div>

            {/* Your Rights */}
            <motion.div variants={fadeUp}>
              <h2
                className="text-2xl md:text-3xl font-bold mb-4"
                style={{ color: "var(--synergy-heading-main)" }}
              >
                Your Rights
              </h2>
              <p
                className="leading-relaxed opacity-80 mb-4"
                style={{ color: "var(--synergy-text)" }}
              >
                Under applicable data protection laws, you have the following rights:
              </p>
              <ul
                className="space-y-3 ml-6 opacity-80"
                style={{ color: "var(--synergy-text)" }}
              >
                <li className="flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
                  <span><strong>Access:</strong> Request access to the personal information we hold about you</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
                  <span><strong>Correction:</strong> Request correction of inaccurate or incomplete information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
                  <span><strong>Deletion:</strong> Request deletion of your personal information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
                  <span><strong>Objection:</strong> Object to the processing of your personal information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
                  <span><strong>Restriction:</strong> Request restriction of processing in certain circumstances</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
                  <span><strong>Portability:</strong> Request transfer of your data to another service provider</span>
                </li>
              </ul>
              <p
                className="leading-relaxed opacity-80 mt-4"
                style={{ color: "var(--synergy-text)" }}
              >
                To exercise any of these rights, please contact us using the information provided below.
              </p>
            </motion.div>

            {/* Cookies */}
            <motion.div variants={fadeUp}>
              <h2
                className="text-2xl md:text-3xl font-bold mb-4"
                style={{ color: "var(--synergy-heading-main)" }}
              >
                Cookies and Tracking Technologies
              </h2>
              <p
                className="leading-relaxed opacity-80 mb-4"
                style={{ color: "var(--synergy-text)" }}
              >
                We use cookies and similar tracking technologies to enhance your experience on our website.
                Cookies are small data files stored on your device that help us:
              </p>
              <ul
                className="space-y-2 ml-6 opacity-80"
                style={{ color: "var(--synergy-text)" }}
              >
                <li className="flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
                  <span>Remember your preferences and settings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
                  <span>Understand how you use our website</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
                  <span>Improve website performance and functionality</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
                  <span>Deliver relevant content and advertisements</span>
                </li>
              </ul>
              <p
                className="leading-relaxed opacity-80 mt-4"
                style={{ color: "var(--synergy-text)" }}
              >
                You can control cookie settings through your browser. However, disabling cookies may affect
                your ability to use certain features of our website.
              </p>
            </motion.div>

            {/* Third-Party Links */}
            <motion.div variants={fadeUp}>
              <h2
                className="text-2xl md:text-3xl font-bold mb-4"
                style={{ color: "var(--synergy-heading-main)" }}
              >
                Third-Party Links
              </h2>
              <p
                className="leading-relaxed opacity-80"
                style={{ color: "var(--synergy-text)" }}
              >
                Our website may contain links to third-party websites or services that are not operated by us.
                We have no control over and assume no responsibility for the content, privacy policies, or
                practices of any third-party sites or services. We encourage you to review the privacy policy
                of every site you visit.
              </p>
            </motion.div>

            {/* Children's Privacy */}
            <motion.div variants={fadeUp}>
              <h2
                className="text-2xl md:text-3xl font-bold mb-4"
                style={{ color: "var(--synergy-heading-main)" }}
              >
                Children's Privacy
              </h2>
              <p
                className="leading-relaxed opacity-80"
                style={{ color: "var(--synergy-text)" }}
              >
                Our services are not directed to individuals under the age of 18. We do not knowingly collect
                personal information from children. If you are a parent or guardian and believe your child has
                provided us with personal information, please contact us immediately so we can delete it.
              </p>
            </motion.div>

            {/* Changes to Policy */}
            <motion.div variants={fadeUp}>
              <h2
                className="text-2xl md:text-3xl font-bold mb-4"
                style={{ color: "var(--synergy-heading-main)" }}
              >
                Changes to This Privacy Policy
              </h2>
              <p
                className="leading-relaxed opacity-80"
                style={{ color: "var(--synergy-text)" }}
              >
                We may update this Privacy Policy from time to time to reflect changes in our practices or
                legal requirements. We will notify you of any material changes by posting the new Privacy
                Policy on this page and updating the "Last Updated" date. Your continued use of our services
                after such changes constitutes acceptance of the updated Privacy Policy.
              </p>
            </motion.div>

            {/* Contact Information */}
            <motion.div variants={fadeUp}>
              <h2
                className="text-2xl md:text-3xl font-bold mb-6"
                style={{ color: "var(--synergy-heading-main)" }}
              >
                Contact Us
              </h2>
              <p
                className="leading-relaxed opacity-80 mb-6"
                style={{ color: "var(--synergy-text)" }}
              >
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data
                practices, please contact us:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  className="flex items-start gap-4 p-6 rounded-xl border-2"
                  style={{
                    backgroundColor: "var(--synergy-bg)",
                    borderColor: "var(--synergy-card-border)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "var(--synergy-heading-highlight)" }}
                  >
                    <FiMail className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1" style={{ color: "var(--synergy-heading-main)" }}>
                      Email
                    </h4>
                    <a
                      href="mailto:Elevareprojectsltd@gmail.com"
                      className="block text-sm hover:underline"
                      style={{ color: "var(--synergy-heading-highlight)" }}
                    >
                      Elevareprojectsltd@gmail.com
                    </a>
                    <a
                      href="mailto:info@elevareprojectsltd.com"
                      className="block text-sm hover:underline mt-1"
                      style={{ color: "var(--synergy-heading-highlight)" }}
                    >
                      info@elevareprojectsltd.com
                    </a>
                  </div>
                </div>

                <div
                  className="flex items-start gap-4 p-6 rounded-xl border-2"
                  style={{
                    backgroundColor: "var(--synergy-bg)",
                    borderColor: "var(--synergy-card-border)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "var(--synergy-heading-highlight)" }}
                  >
                    <FiPhone className="text-white" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1" style={{ color: "var(--synergy-heading-main)" }}>
                      Phone
                    </h4>
                    <a
                      href="tel:+2348104941162"
                      className="text-sm hover:underline"
                      style={{ color: "var(--synergy-heading-highlight)" }}
                    >
                      +234 810 49 411 62
                    </a>
                    <br />
                    <a
                      href="tel:+2349064227399"
                      className="text-sm hover:underline"
                      style={{ color: "var(--synergy-heading-highlight)" }}
                    >
                      +234 906 42 273 99
                    </a>
                  </div>
                </div>
              </div>

              <p
                className="leading-relaxed opacity-80 mt-6"
                style={{ color: "var(--synergy-text)" }}
              >
                <strong>Elevare Projects Ltd</strong><br />
                Lagos, Nigeria
              </p>
            </motion.div>

          </motion.div>
        </div>
      </section>
    </div>
  );
}