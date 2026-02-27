
import SynergySection from "../components/Home/SynergySection";
// import HeroSection from "../components/Herosection";
import HeroIntro from "../components/Home/HeroIntro";
import ProcessSection from "../components/Home/ProcessSection";
import Customer from "../components/Home/Customer";
import Footer from "../components/Home/Footer";
import HeroMediaBridge from "../components/Home/HeroMediaBridge";
import ContactSection from "../components/Home/ContactSection";


export default function Home() {
  return (
    <main className="w-full">
      {/* <HeroSection /> */}
      <HeroIntro />
      <HeroMediaBridge />
      <SynergySection />
      <ProcessSection />
      <Customer/>
      <ContactSection/>
      <Footer/>
      {/* <TracksSection /> */}
    </main>
  );
}
