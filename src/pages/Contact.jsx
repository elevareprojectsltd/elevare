import ContactForm from "../components/Contact/ContactForm";
import ContactHero from "../components/Contact/ContactHero";
import ContactInfo from "../components/Contact/ContactInfo";
import Footer from "../components/Home/Footer";
import ContactSection from "../components/Home/ContactSection";



export default function Contact() {
  return (
    <>
      <ContactHero />
      <ContactInfo />
      <ContactForm/>
      <ContactSection/>
        <Footer/>
      

     
    </>
  );
}