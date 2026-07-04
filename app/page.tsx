import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import CaseStudies from "../components/CaseStudies";
import Testimonials from "../components/Testimonials";
import CoreExpertise from "../components/CoreExpertise";
import Skills from "../components/Skills";
import Certifications from "../components/Certifications";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ScrollProgress from "../components/ScrollProgress";
import ArunGPT from "../components/ArunGPT";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <CaseStudies />
      <Testimonials />
      <CoreExpertise />
      <Skills />
      <Certifications />
      <Contact />
      <Footer />
      <ArunGPT />
    </main>
  );
}
