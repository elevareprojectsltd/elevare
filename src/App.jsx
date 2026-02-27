import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact"
import Construction from "./pages/Construction"
import Technology from "./pages/Technology"
import Portfolio from "./pages/Portfolio";
import PrivacyPolicy from "./pages/PrivacyPolicy";


function App() {
  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
      }}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services/construction" element={<Construction />} />
        <Route path="/services/technology" element={<Technology />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />

      </Routes>
    </div>
  );
}

export default App;
