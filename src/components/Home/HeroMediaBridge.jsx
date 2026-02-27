import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import hero1 from "../../assets/hero-1.webp";
import hero2 from "../../assets/hero-2.webp";
import hero3 from "../../assets/hero-3.webp";
import hero4 from "../../assets/hero-4.webp";
import hero5 from "../../assets/hero-5.webp";

/* ===============================
   HERO IMAGES

   WHY WEBP:
   WebP is the best format for this use case — 25–35% smaller file
   size than JPEG/PNG at equivalent visual quality, and supported by
   all modern browsers. Keep your .webp files as they are.
================================ */
const HERO_IMAGES = [hero1, hero2, hero3, hero4, hero5];
const SLIDE_INTERVAL_MS = 4000;

/* ===============================
   ANIMATION VARIANTS

   containerVariants — The entire media frame slides up from y:60
                       and scales from 95% → 100% on first scroll into view.
                       delay: 0.2 gives the page layout time to settle first.

   imageVariants     — Each image enters scaled up (1.1 → 1) while fading in,
                       and exits scaled down (1 → 0.95) while fading out.
                       The enter scale-down creates a subtle Ken Burns effect.

   WHY mode="wait" ON AnimatePresence:
   "wait" means the exit animation fully completes before the next image
   enters. Without this, both images overlap during transition and the
   bg-black on the container shows through — causing the black flash.
   The real fix for the black flash is below (see bg-transparent on the frame).
================================ */
const containerVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.2
    }
  }
};

const imageVariants = {
  enter: {
    opacity: 0,
    scale: 1.1,
  },
  center: {
    opacity: 1,
    scale: 1,
    transition: {
      opacity: { duration: 0.7 },
      scale: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.5
    }
  }
};

/* ===============================
   HERO MEDIA BRIDGE COMPONENT

   Sits BETWEEN the blue hero section and the white content below.
   Matches the HeroSection slider aspect ratio (16:9 / aspect-video).
   Stays centred and responsive via percentage width constraints.

   KEY FIXES APPLIED:
   1. BLACK FLASH FIX — Changed bg-black → bg-transparent on the frame.
      The black flash occurs because during crossfade both images are
      briefly at low opacity, exposing the container background.
      bg-transparent makes the container invisible when no image covers it,
      so the section background (bg-transparent on the outer wrapper) shows
      through instead of a black rectangle.

   2. HOVER TO PAUSE — isPaused state stops the setInterval from advancing
      the slide index. onMouseEnter sets isPaused true, onMouseLeave resets
      it to false. The interval is re-created cleanly via the isPaused
      dependency in the useEffect.
================================ */
export default function HeroMediaBridge() {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  /* isPaused — true when the user's cursor is over the image frame.
     Prevents the interval from advancing slides during hover.        */
  const [isPaused, setIsPaused] = useState(false);

  /* AUTO-ADVANCE INTERVAL

     Clears and restarts whenever isPaused changes so the timer
     always reflects the current pause state cleanly.
     Cleanup function (return () => clearInterval) prevents memory
     leaks when the component unmounts.
  */
  useEffect(() => {
    if (isPaused) return; // Do nothing while hovered — interval stays cleared

    const intervalId = setInterval(() => {
      setCurrentImageIndex((i) =>
        i === HERO_IMAGES.length - 1 ? 0 : i + 1
      );
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [isPaused]); // Re-run when pause state changes

  return (
    // Shift image UP slightly using negative margin to overlap the hero section below
    <section className="w-full bg-transparent -mt-20 md:-mt-40 lg:-mt-44">
      <div className="max-w-[1200px] mx-auto px-6">

        {/* Width control — constrains the frame to match HeroSection proportions */}
        <div className="w-full md:w-[80%] lg:w-[63%] mx-auto">

          {/* MEDIA FRAME

              aspect-[16/9] / aspect-video maintains correct proportions
              at all screen sizes without fixed pixel heights.

              bg-transparent REPLACES the original bg-black —
              this is the fix for the black flash during crossfade.

              onMouseEnter/onMouseLeave toggle isPaused to pause/resume
              the slideshow when the user hovers over the image.

              cursor-pointer signals to the user that the image is interactive.
          */}
          <motion.div
            className="relative aspect-[16/9] md:aspect-video rounded-xl overflow-hidden shadow-2xl bg-transparent"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{ cursor: isPaused ? "pause" : "default" }}
          >

            {/* CROSSFADE IMAGE SLIDESHOW

                AnimatePresence mode="wait" ensures the exiting image
                fully fades out before the entering image begins — prevents
                both images overlapping at low opacity simultaneously.

                key={currentImageIndex} tells Framer Motion this is a
                different element each time the index changes, triggering
                the full enter/exit animation cycle.
            */}
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={HERO_IMAGES[currentImageIndex]}
                alt={`Hero visual ${currentImageIndex + 1} of ${HERO_IMAGES.length}`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
              />
            </AnimatePresence>

            {/* PAUSE INDICATOR OVERLAY

                Shown only when isPaused is true (user is hovering).
                Subtle pill badge in the top-right corner confirms to
                the user that the slideshow is paused — clear feedback
                without being visually intrusive.
            */}
            {isPaused && (
              <div className="absolute top-3 right-3 z-10 bg-black/40 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full">
                ⏸ Paused
              </div>
            )}

            {/* SLIDE INDICATOR DOTS

                Shows which image is currently active.
                Positioned at the bottom-centre of the frame.
                Active dot is fully opaque; inactive dots are dimmed.
            */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-2">
              {HERO_IMAGES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: "white",
                    opacity: i === currentImageIndex ? 1 : 0.4,
                    transform: i === currentImageIndex ? "scale(1.3)" : "scale(1)",
                  }}
                />
              ))}
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}