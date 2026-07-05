"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const ROLES = ["Data Engineer", "Backend Developer", "AI Builder", "ETL Architect"];

function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), speed);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), speed / 2);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setWordIndex((w) => (w + 1) % words.length);
    }

    setDisplay(current.substring(0, charIndex));
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return display;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Hero() {
  const role = useTypewriter(ROLES);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Content floats up as hero exits
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const contentYSpring = useSpring(contentY, { stiffness: 80, damping: 25 });

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16"
    >
      {/* Open-to-work corner note — like the "open from 8am–10pm" in retro menus */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{ opacity: contentOpacity }}
        className="hidden md:block absolute bottom-10 left-10 font-sora font-extrabold text-lg leading-snug"
      >
        <span className="text-[#16130e]">open to</span>
        <br />
        <span className="text-[#e2572b]">remote</span>{" "}
        <span className="text-[#16130e]">work</span>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: contentYSpring, opacity: contentOpacity }}
        className="relative z-10 text-center px-6 max-w-3xl lg:max-w-4xl mx-auto"
      >
        <motion.div
          className="w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Available badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-[#16130e] bg-[#ffffff] text-[#16130e] text-xs font-sora font-bold uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#e2572b] animate-pulse" />
              Available for Remote Work
            </span>
          </motion.div>

          {/* Eyebrow */}
          <motion.p
            variants={itemVariants}
            className="font-sora text-[#e2572b] text-sm font-bold uppercase tracking-widest mb-6"
          >
            Hello, I&apos;m
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="font-sora text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-[#16130e] mb-6 leading-tight"
          >
            Arun <span className="text-[#e2572b]">Kumar</span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div
            variants={itemVariants}
            className="font-sora text-xl md:text-2xl lg:text-3xl font-bold mb-8 h-10 flex items-center justify-center"
          >
            <span className="text-[#52525b]">I&apos;m a&nbsp;</span>
            <span className="text-[#567e88]">
              {role}
              <span className="animate-pulse text-[#e2572b]">|</span>
            </span>
          </motion.div>

          {/* Bio snippet */}
          <motion.p
            variants={itemVariants}
            className="font-dm text-[#52525b] text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Building production-grade ETL pipelines, backend systems, and AI-powered tools.
            Currently at{" "}
            <span className="text-[#16130e] font-bold">Technocas</span> &{" "}
            <span className="text-[#16130e] font-bold">Zank AI</span>.
            Oracle Cloud GenAI Certified.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={() => {
                const el = document.getElementById("projects");
                if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
              }}
              className="btn-ink w-full sm:w-auto"
            >
              View My Work
            </button>

            <a href="/Arun_Resume.pdf" download className="btn-outline-ink w-full sm:w-auto">
              Download Resume
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </motion.div>

          {/* Social icons */}
          <motion.div
            variants={itemVariants}
            className="flex gap-5 justify-center mt-10"
          >
            <a
              href="https://github.com/arunkumar231105"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#16130e]/60 hover:text-[#e2572b] transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/arun-kumar-b578a128b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#16130e]/60 hover:text-[#e2572b] transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="mailto:arunkumarjuswani12@gmail.com"
              className="text-[#16130e]/60 hover:text-[#e2572b] transition-colors"
              aria-label="Email"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <span className="text-[#52525b] text-xs font-sora font-bold tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-[#e2572b] to-transparent"
        />
      </motion.div>
    </section>
  );
}
