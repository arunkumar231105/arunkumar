import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Experience from "../components/Experience";
import Projects from "../components/Projects";
import Testimonials from "../components/Testimonials";
import Skills from "../components/Skills";
import Certifications from "../components/Certifications";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ScrollProgress from "../components/ScrollProgress";

export default function Home() {
  return (
    <main className="relative bg-navy-950 min-h-screen">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Testimonials />
      <Skills />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  );
}
