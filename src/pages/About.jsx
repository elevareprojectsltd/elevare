import AboutHero from "../components/About/AboutHero";
import ExperienceSection from "../components/About/ExperienceSection";
import StatsSection from "../components/About/StatsSection";
import OurStorySection from "../components/About/OurStorySection";
import TeamSection from "../components/About/Team";
import Footer from "../components/Home/Footer";
import ContactSection from "../components/Home/ContactSection";


export default function About() {
  return (
    <>
      <AboutHero />
      <ExperienceSection />
      <StatsSection />
      <OurStorySection />
      <TeamSection />
       <ContactSection/>
        <Footer/>
      

     
    </>
  );
}