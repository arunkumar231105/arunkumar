"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Expertise", href: "#expertise" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Active section detection
      const sections = navLinks.map((l) => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const id = href.slice(1);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 50);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0f1e]/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-sora font-bold text-lg text-white hover:text-cyan-400 transition-colors"
        >
          AK<span className="text-cyan-400">.</span>
        </button>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const id = link.href.slice(1);
            return (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={`font-dm text-sm font-medium transition-colors relative group ${
                    active === id ? "text-cyan-400" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-cyan-400 transition-all duration-300 ${
                      active === id ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ul>

        {/* Resume CTA */}
        <a
          href="/Arun_Resume.pdf"
          download
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-400/50 text-cyan-400 text-sm font-dm font-medium hover:bg-cyan-400/10 transition-all duration-200"
        >
          Resume
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-slate-400 hover:text-white p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`w-full h-px bg-current transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`} />
            <span className={`w-full h-px bg-current transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`w-full h-px bg-current transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0d1530]/95 backdrop-blur-xl border-b border-white/5"
          >
            <ul className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-slate-300 hover:text-cyan-400 font-dm text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="/Arun_Resume.pdf"
                  download
                  className="inline-flex items-center gap-2 text-cyan-400 text-sm font-dm"
                >
                  Download Resume ↓
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
