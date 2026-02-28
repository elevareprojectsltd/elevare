import { motion } from "framer-motion";
import { useState } from "react";
import { FiCheck, FiUser, FiMail, FiPhone, FiMessageSquare, FiLayers, FiZap } from "react-icons/fi";

/* ===============================
   FORMSPREE CONFIGURATION

   WHY FORMSPREE:
   Formspree handles form submissions directly from the frontend — no
   backend, no server, no extra API routes needed. Submissions are
   received at your Formspree dashboard and forwarded to your email.

   HOW IT WORKS:
   Each form submission sends a POST request with a JSON body to your
   unique Formspree endpoint. Formspree validates the request, stores
   the submission, and emails it to the address linked to your account.

   FREE TIER: 50 submissions/month. Upgrade at formspree.io if needed.

   ENDPOINT: The URL below is your unique Formspree form endpoint.
   Do not share this publicly to avoid spam abuse.
================================ */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mlgwvnzk";

/* ===============================
   ANIMATION VARIANTS

   Purpose: Define reusable animation patterns for Framer Motion.
   These create smooth entrance effects without causing layout shifts
   by only animating transform and opacity properties.

   fadeUp  — General entrance: slides up + fades in. Accepts a custom
             delay index (i) so fields stagger without a container wrapper.
   scaleIn — Card/modal entrance: subtle scale from 95% → 100%.
   slideIn — Horizontal reveal: used for the conditional dropdown so it
             feels like a natural extension of the selected card above it.
================================ */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.1 },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const slideIn = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ===============================
   SERVICE CATEGORIES DATA

   Purpose: Single source of truth for all service options.
   Structured as an object so:
   - The category key ("Construction" / "Technology") is sent as the
     "service_interest" field in the Formspree payload, making it easy
     to filter submissions in the Formspree dashboard.
   - The services array populates the conditional dropdown.
   - The icon and color are consumed by the selection card UI.

   WHY HERE (outside the component):
   Defined at module level so it is never re-created on re-renders.
   Adding a new service only requires editing this object — the form
   UI, validation, and submission payload all update automatically.
================================ */
const serviceCategories = {
  Construction: {
    icon: FiLayers,
    color: "#2563eb",
    services: [
      "Project Management",
      "Renovations & Facility Enhancements",
      "New Construction",
      "Site Feasibility Review",
    ],
  },
  Technology: {
    icon: FiZap,
    color: "#3b82f6",
    services: [
      "Agile Consulting",
      "Digital Transformation",
      "IT Solutions",
      "Software Development",
    ],
  },
};

/* ===============================
   CONTACT FORM COMPONENT

   Displays the full lead-generation enquiry form with:
   - Service category selection cards (Construction / Technology)
   - Conditional specific-service dropdown (resets on category change)
   - Real-time field validation with animated error messages
   - Formspree fetch-based submission with JSON payload
   - Animated success modal with service-specific confirmation copy
   - Fully accessible: labels, aria attributes, focus states, role="alert"
   - Theme-aware: all colors use CSS variables for dark/light mode support
================================ */
export default function ContactForm() {

  /* --------------------------------
     FORM STATE

     formData        — Controlled inputs. serviceInterest drives the
                       conditional dropdown; specificService resets to ""
                       whenever serviceInterest changes (see handleChange).
     showModal       — Toggles the success confirmation modal overlay.
     modalContent    — Title + message set dynamically based on which
                       service category was chosen at submission time.
     errors          — Field-level validation messages. Cleared individually
                       as the user corrects each field (better UX than
                       wiping all errors on any keystroke).
     isSubmitting    — Disables the submit button and shows a spinner
                       during the Formspree fetch call to prevent double-sends.
     focusedField    — Tracks the active input to apply a custom focus ring
                       via inline style (Tailwind focus: utilities can't
                       read dynamic CSS variable border colors).
  -------------------------------- */
  const [formData, setFormData] = useState({
    fullName:        "",
    email:           "",
    phone:           "",
    serviceInterest: "",
    specificService: "",
    message:         "",
  });

  const [showModal, setShowModal]       = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });
  const [errors, setErrors]             = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  /* --------------------------------
     HANDLE CHANGE

     Single handler for all text inputs and selects.

     KEY BEHAVIOUR — serviceInterest reset:
     When the user switches category (Construction → Technology),
     specificService resets to "" so the dropdown never carries over
     a value that doesn't belong to the new category's service list.
     This prevents a mismatched payload reaching Formspree.
  -------------------------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Reset specificService whenever the parent category changes
      ...(name === "serviceInterest" && { specificService: "" }),
    }));

    // Clear this field's error as soon as the user starts correcting it
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  /* --------------------------------
     VALIDATE FORM

     Runs synchronously on submit before any async work begins.
     Returns true only if zero errors — the submit handler exits
     early if false, so the user always sees inline errors first.
  -------------------------------- */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim())
      newErrors.fullName        = "Full name is required";
    if (!formData.email.trim())
      newErrors.email           = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email           = "Please enter a valid email address";
    if (!formData.phone.trim())
      newErrors.phone           = "Phone number is required";
    if (!formData.serviceInterest)
      newErrors.serviceInterest = "Please select a service category";
    if (!formData.specificService)
      newErrors.specificService = "Please select a specific service";
    if (!formData.message.trim())
      newErrors.message         = "Please tell us about your project";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* --------------------------------
     HANDLE FORM SUBMIT — FORMSPREE SUBMISSION

     This is the core submission logic. Here's the "why":

     1. FORMSPREE FETCH REQUEST
        We POST a JSON body to FORMSPREE_ENDPOINT using the native fetch API.
        Formspree reads the JSON fields and forwards them to your linked email.
        The "Accept: application/json" header tells Formspree to respond with
        JSON (not a redirect), so we can handle success/error in JS ourselves.

     2. PAYLOAD STRUCTURE
        Every field the team needs to action the lead is included:
        - _subject: Sets the email subject line in Formspree's outgoing email.
          Format: "[Inquiry] Category - Specific Service"
          Tech uses the shorthand "Tech" to match Elevare's internal naming.
          Example outputs:
            "[Inquiry] Construction - Project Management"
            "[Inquiry] Tech - Agile Consulting"
        - All other keys map to readable column names in the Formspree dashboard.

     3. SERVICE-SPECIFIC MODAL COPY
        Construction leads see copy about a site feasibility review.
        Technology leads see copy about an Agile discovery call.
        Sets accurate expectations and reduces follow-up friction.

     4. ERROR HANDLING
        If Formspree responds with ok: false (e.g. network error, spam block),
        the catch block surfaces a friendly alert so the user can retry.
  -------------------------------- */
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Exit early — inline errors are already shown

    setIsSubmitting(true);

    try {
      /* --
         BUILD EMAIL SUBJECT LINE
         Formspree uses the reserved "_subject" key to set the email subject.
         Format: "[Inquiry] Category - Specific Service"
         Tech uses "Tech" shorthand to match Elevare's internal naming.
      -- */
      const emailSubject =
        formData.serviceInterest === "Technology"
          ? `[Inquiry] Tech - ${formData.specificService}`
          : `[Inquiry] ${formData.serviceInterest} - ${formData.specificService}`;

      /* --
         FORMSPREE PAYLOAD
         Keys become column headers in the Formspree submissions dashboard
         and field labels in the forwarded email. Use readable names.
         "_subject" is a Formspree reserved key — it sets the email subject.
      -- */
      const payload = {
        _subject:         emailSubject,
        "Full Name":      formData.fullName,
        "Email":          formData.email,
        "Phone":          formData.phone,
        "Service":        formData.serviceInterest,
        "Specific Need":  formData.specificService,
        "Message":        formData.message,
        "Submitted At":   new Date().toLocaleString("en-NG", {
          dateStyle: "full",
          timeStyle: "short",
        }),
      };

      /* --
         POST TO FORMSPREE
         fetch() sends the payload as JSON to the Formspree endpoint.
         "Accept: application/json" prevents Formspree from redirecting
         and instead returns a JSON response we can check programmatically.
         If response.ok is false, we throw to enter the catch block.
      -- */
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method:  "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept":       "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Formspree responded with status ${response.status}`);
      }

      /* --
         SET SERVICE-SPECIFIC CONFIRMATION COPY
         Each category gets tailored messaging matching what actually
         happens next in Elevare's sales process.
      -- */
      if (formData.serviceInterest === "Construction") {
        setModalContent({
          title:   "Thank You for Your Interest!",
          message: "Our project manager will contact you within 24 hours for a site feasibility review and initial consultation.",
        });
      } else {
        setModalContent({
          title:   "Thank You for Reaching Out!",
          message: "An Agile consultant will reach out to you within 24 hours to schedule a discovery call and discuss your needs.",
        });
      }

      setShowModal(true);

      // Reset form to blank state after successful submission
      setFormData({
        fullName:        "",
        email:           "",
        phone:           "",
        serviceInterest: "",
        specificService: "",
        message:         "",
      });

    } catch (error) {
      // Log the raw Formspree error for debugging but show a friendly message to the user
      console.error("Formspree submission error:", error);
      alert("Something went wrong sending your message. Please try again or contact us directly.");
    } finally {
      // Always re-enable the submit button whether the request succeeded or failed
      setIsSubmitting(false);
    }
  };

  /* --------------------------------
     SHARED INPUT STYLE HELPER

     Returns an inline style object for all form inputs/selects/textareas.
     Centralised here so focus, error, and default border logic is defined
     in ONE place — change it here and every field updates automatically.

     WHY INLINE STYLE (not Tailwind):
     CSS variables (--synergy-*) and conditional border colors can't be
     expressed cleanly in Tailwind without long arbitrary value strings.
     Inline style keeps theme-awareness readable and maintainable.
  -------------------------------- */
  const inputStyle = (fieldName) => ({
    backgroundColor: "var(--synergy-card-bg)",
    borderColor:
      focusedField === fieldName
        ? "#4682B4"
        : errors[fieldName]
        ? "#ef4444"
        : "var(--synergy-card-border)",
    color:     "var(--synergy-card-text)",
    boxShadow: focusedField === fieldName
      ? "0 0 0 3px rgba(70, 130, 180, 0.1)"
      : "none",
  });

  /* --------------------------------
     SHARED INPUT CLASS STRING

     Tailwind classes common to all inputs / selects / textareas.
     Extracted to avoid repeating the same long className across
     every field — easier to update globally in one place.
  -------------------------------- */
  const inputClass =
    "w-full px-5 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none";

  return (
    <>
      {/* ================================
          CONTACT FORM SECTION

          - Semantic <section> for landmark navigation + SEO
          - aria-labelledby ties the heading to this landmark
          - overflow-hidden clips the decorative blur circles
          - Theme-aware bg and text via CSS variables
      ================================ */}
      <section
        className="w-full py-16 lg:py-24 relative overflow-hidden"
        aria-labelledby="contact-form-heading"
        style={{
          backgroundColor: "var(--synergy-bg)",
          color:           "var(--synergy-text)",
        }}
      >

        {/* DECORATIVE BACKGROUND ELEMENTS

            Ambient glow blobs add depth without competing with the form.
            pointer-events-none ensures they never block form interactions.
        */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-5 blur-3xl pointer-events-none"
          style={{ backgroundColor: "var(--synergy-heading-highlight)" }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-5 blur-3xl pointer-events-none"
          style={{ backgroundColor: "var(--synergy-heading-highlight)" }}
          aria-hidden="true"
        />

        <div className="w-[90%] md:w-[85%] lg:w-[75%] xl:w-[65%] mx-auto relative z-10">

          {/* SECTION HEADER */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-12 lg:mb-16"
          >
            {/* EYEBROW LABEL */}
            <p
              className="text-xs tracking-[0.3em] uppercase mb-4 opacity-70"
              style={{ color: "var(--synergy-text)" }}
            >
              Let's Connect
            </p>

            {/* MAIN HEADING
                id ties to aria-labelledby on the parent <section>.
            */}
            <h2
              id="contact-form-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              style={{ color: "var(--synergy-heading-main)" }}
            >
              Start Your Project Journey
            </h2>

            {/* DECORATIVE DIVIDER — mirrors visual language used site-wide */}
            <div className="flex items-center justify-center gap-2 mb-6" aria-hidden="true">
              <div className="h-[2px] w-12 rounded-full" style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
              <div className="h-2 w-2 rounded-full"      style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
              <div className="h-[2px] w-12 rounded-full" style={{ backgroundColor: "var(--synergy-heading-highlight)" }} />
            </div>

            <p
              className="text-base md:text-lg max-w-2xl mx-auto opacity-80"
              style={{ color: "var(--synergy-text)" }}
            >
              Fill out the form below and our team will get back to you within
              24 hours with a personalised consultation.
            </p>
          </motion.div>

          {/* FORM CARD
              scaleIn animates the card as a whole — gives a satisfying
              "materialise" entrance as the user scrolls to the form.
          */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <form
              onSubmit={handleFormSubmit}
              noValidate // Disable native browser validation — we handle it ourselves
              className="rounded-3xl p-8 md:p-10 lg:p-12 border-2 shadow-2xl backdrop-blur-sm"
              style={{
                backgroundColor: "var(--synergy-bg)",
                borderColor:     "var(--synergy-heading-highlight)",
                color:           "var(--synergy-text)",
              }}
            >
              <div className="space-y-6">

                {/* ---- FULL NAME ---- */}
                <motion.div
                  variants={fadeUp}
                  custom={0}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-semibold mb-2 flex items-center gap-2"
                    style={{ color: "var(--synergy-text)" }}
                  >
                    <FiUser size={16} style={{ color: "var(--synergy-heading-highlight)" }} />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("fullName")}
                    onBlur={() => setFocusedField(null)}
                    className={inputClass}
                    style={inputStyle("fullName")}
                    placeholder="John Doe"
                    autoComplete="name"
                  />
                  {errors.fullName && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-500 mt-2"
                      role="alert"
                    >
                      {errors.fullName}
                    </motion.p>
                  )}
                </motion.div>

                {/* ---- EMAIL & PHONE — 2-COLUMN GRID ---- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {/* EMAIL */}
                  <motion.div
                    variants={fadeUp}
                    custom={1}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold mb-2 flex items-center gap-2"
                      style={{ color: "var(--synergy-text)" }}
                    >
                      <FiMail size={16} style={{ color: "var(--synergy-heading-highlight)" }} />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className={inputClass}
                      style={inputStyle("email")}
                      placeholder="john@example.com"
                      autoComplete="email"
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-500 mt-2"
                        role="alert"
                      >
                        {errors.email}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* PHONE
                      Custom onChange strips non-numeric characters while
                      preserving a leading "+" for international numbers.
                      Sanitised value is stored in state — never raw input.
                  */}
                  <motion.div
                    variants={fadeUp}
                    custom={2}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold mb-2 flex items-center gap-2"
                      style={{ color: "var(--synergy-text)" }}
                    >
                      <FiPhone size={16} style={{ color: "var(--synergy-heading-highlight)" }} />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      inputMode="numeric"
                      value={formData.phone}
                      onChange={(e) => {
                        let value = e.target.value;
                        // Allow "+" only at position 0; strip all other non-numeric chars
                        value = value.startsWith("+")
                          ? "+" + value.slice(1).replace(/[^0-9]/g, "")
                          : value.replace(/[^0-9]/g, "");
                        handleChange({ target: { name: "phone", value } });
                      }}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                      className={inputClass}
                      style={inputStyle("phone")}
                      placeholder="+234 xxx xxx xxxx"
                      maxLength="15"
                      autoComplete="tel"
                    />
                    {errors.phone && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-500 mt-2"
                        role="alert"
                      >
                        {errors.phone}
                      </motion.p>
                    )}
                  </motion.div>
                </div>

                {/* ---- SERVICE INTEREST CARDS

                    WHY CARDS INSTEAD OF A DROPDOWN:
                    Visual cards reduce cognitive load — the user sees both
                    options simultaneously and selects with a single click.
                    The selected card fills with the brand highlight colour
                    for instant, unambiguous feedback.

                    The category key ("Construction" / "Technology") is sent
                    as "Service" in the Formspree payload and also drives the
                    email subject line built in handleFormSubmit.
                ---- */}
                <motion.div
                  variants={fadeUp}
                  custom={3}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <label
                    className="block text-sm font-semibold mb-4"
                    style={{ color: "var(--synergy-text)" }}
                  >
                    What service are you interested in? *
                  </label>

                  <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    role="group"
                    aria-label="Service category selection"
                  >
                    {Object.entries(serviceCategories).map(([category, data]) => {
                      const IconComponent = data.icon;
                      const isSelected    = formData.serviceInterest === category;

                      return (
                        <button
                          key={category}
                          type="button" // Prevent accidental form submission on click
                          aria-pressed={isSelected} // Communicates toggle state to screen readers
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              serviceInterest: category,
                              specificService: "", // Always reset dropdown on category switch
                            }));
                            if (errors.serviceInterest) {
                              setErrors((prev) => ({ ...prev, serviceInterest: "" }));
                            }
                          }}
                          className="p-5 rounded-xl border-2 transition-all duration-300 hover:shadow-lg text-left focus:outline-none focus:ring-2 focus:ring-offset-2"
                          style={{
                            backgroundColor: isSelected ? "var(--synergy-heading-highlight)" : "var(--synergy-card-bg)",
                            borderColor:     isSelected ? "var(--synergy-heading-highlight)" : "var(--synergy-card-border)",
                            color:           isSelected ? "#ffffff"                          : "var(--synergy-card-text)",
                          }}
                        >
                          <IconComponent
                            size={24}
                            className="mb-3"
                            style={{ color: isSelected ? "#ffffff" : data.color }}
                          />
                          <p className="font-semibold text-sm">{category}</p>
                        </button>
                      );
                    })}
                  </div>

                  {errors.serviceInterest && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-500 mt-2"
                      role="alert"
                    >
                      {errors.serviceInterest}
                    </motion.p>
                  )}
                </motion.div>

                {/* ---- SPECIFIC SERVICE DROPDOWN

                    CONDITIONAL RENDER:
                    Only shown after a service category card is selected.
                    slideIn (x: 20 → 0) gives it a lateral entrance that
                    feels like it slides out from the selected card —
                    reinforcing the parent–child relationship visually.

                    Options are driven entirely by the selected category's
                    `services` array in serviceCategories above.
                    The chosen value is sent as "Specific Need" in the
                    Formspree payload and appended to the email subject line.
                ---- */}
                {formData.serviceInterest && (
                  <motion.div
                    variants={slideIn}
                    initial="hidden"
                    animate="visible"
                  >
                    <label
                      htmlFor="specificService"
                      className="block text-sm font-semibold mb-2"
                      style={{ color: "var(--synergy-text)" }}
                    >
                      Select Specific Service *
                    </label>
                    <select
                      id="specificService"
                      name="specificService"
                      value={formData.specificService}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("specificService")}
                      onBlur={() => setFocusedField(null)}
                      className={inputClass}
                      style={inputStyle("specificService")}
                    >
                      <option value="">Choose a service...</option>
                      {serviceCategories[formData.serviceInterest].services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                    {errors.specificService && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-500 mt-2"
                        role="alert"
                      >
                        {errors.specificService}
                      </motion.p>
                    )}
                  </motion.div>
                )}

                {/* ---- MESSAGE ---- */}
                <motion.div
                  variants={fadeUp}
                  custom={4}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold mb-2 flex items-center gap-2"
                    style={{ color: "var(--synergy-text)" }}
                  >
                    <FiMessageSquare size={16} style={{ color: "var(--synergy-heading-highlight)" }} />
                    Tell us about your project *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    rows="5"
                    className={`${inputClass} resize-none`}
                    style={inputStyle("message")}
                    placeholder="Describe your project requirements, timeline, and any specific needs..."
                  />
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-500 mt-2"
                      role="alert"
                    >
                      {errors.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* ---- SUBMIT BUTTON

                    whileHover / whileTap give tactile micro-interaction feedback.
                    disabled during submission prevents duplicate Formspree requests.
                    Spinner SVG provides a clear loading state visual.
                ---- */}
                <motion.button
                  variants={fadeUp}
                  custom={5}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-5 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: "var(--synergy-heading-highlight)",
                    color: "#ffffff",
                  }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message →"
                  )}
                </motion.button>

              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ================================
          SUCCESS MODAL

          Rendered outside <section> so it sits above all page content.
          Clicking the backdrop closes the modal.
          e.stopPropagation() on the inner card prevents that click
          from bubbling up to the backdrop and closing prematurely.

          Title and message are set dynamically in handleFormSubmit
          based on which service category was chosen.
      ================================ */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          onClick={() => setShowModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="rounded-3xl p-10 max-w-lg w-full shadow-2xl"
            style={{ backgroundColor: "var(--synergy-card-bg)" }}
            onClick={(e) => e.stopPropagation()}
          >

            {/* SUCCESS ICON — spring animation for a satisfying "pop" */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="flex justify-center mb-6"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: "var(--synergy-heading-highlight)" }}
              >
                <FiCheck size={40} className="text-white" strokeWidth={3} />
              </div>
            </motion.div>

            {/* MODAL TITLE — service-specific, set on submission */}
            <h3
              id="modal-title"
              className="text-2xl md:text-3xl font-bold text-center mb-4"
              style={{ color: "var(--synergy-card-text)" }}
            >
              {modalContent.title}
            </h3>

            {/* DECORATIVE DIVIDER */}
            <div
              className="w-16 h-1 mx-auto mb-6 rounded-full"
              style={{ backgroundColor: "var(--synergy-heading-highlight)" }}
              aria-hidden="true"
            />

            {/* MODAL BODY — service-specific next-step messaging */}
            <p
              className="text-center text-base leading-relaxed mb-8 opacity-80"
              style={{ color: "var(--synergy-card-text)" }}
            >
              {modalContent.message}
            </p>

            {/* DISMISS BUTTON */}
            <button
              onClick={() => setShowModal(false)}
              className="w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                backgroundColor: "var(--synergy-heading-highlight)",
                color: "#ffffff",
              }}
            >
              Got it, thanks!
            </button>

          </motion.div>
        </motion.div>
      )}
    </>
  );
}