"use client";

import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";

const experiences = [
  {
    role: "Data Engineer",
    company: "Technocas",
    location: "Karachi, Pakistan",
    period: "April 2026 – Present",
    current: true,
    bullets: [
      "Developed end-to-end web scraping pipelines using Python, Apify, and Playwright to extract data from dynamic websites.",
      "Designed and implemented ETL workflows transforming raw data into structured formats for downstream analysis.",
      "Integrated datasets with Metabase for reporting and dashboard creation, enhancing data accessibility.",
    ],
    tech: ["Python", "Apify", "Playwright", "Metabase", "ETL"],
  },
  {
    role: "Backend Developer",
    company: "Zank AI",
    location: "Remote — USA",
    period: "Feb 2026 – Present",
    current: true,
    bullets: [
      "Developed scalable backend services using Python and REST APIs, designing structured database schemas.",
      "Implemented secure authentication and authorization, maintaining production-level systems.",
      "Collaborated with cross-functional teams to integrate backend services with AI components.",
    ],
    tech: ["Python", "FastAPI", "REST API", "PostgreSQL", "Auth"],
  },
  {
    role: "Software Engineer (AI)",
    company: "HexaVibes Solutions",
    location: "Karachi, Pakistan",
    period: "Aug 2024 – Dec 2025",
    current: false,
    bullets: [
      "Integrated ML models into applications and optimized inference workflows for production use.",
      "Delivered scalable AI-driven features working across cross-functional teams.",
    ],
    tech: ["Python", "ML/AI", "TensorFlow", "Production Systems"],
  },
  {
    role: "Agentic AI Developer",
    company: "UXGENIE",
    location: "Karachi, Pakistan",
    period: "Sep 2025 – Oct 2025",
    current: false,
    bullets: [
      "Built agentic AI workflows and automation pipelines for UX research tooling.",
    ],
    tech: ["Agentic AI", "Python", "Automation"],
  },
  {
    role: "Frontend Developer",
    company: "High Tech Software House",
    location: "Karachi, Pakistan",
    period: "Aug 2025 – Sep 2025",
    current: false,
    bullets: [
      "Developed and deployed landing pages and portfolio websites using React (TypeScript) and Tailwind CSS.",
      "Implemented responsive, modern UI/UX ensuring cross-browser compatibility.",
    ],
    tech: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    role: "Freelancer",
    company: "Fiverr",
    location: "Remote",
    period: "Dec 2025 – Present",
    current: true,
    bullets: [
      "Delivering custom data engineering, scraping, and backend solutions for clients globally.",
    ],
    tech: ["Python", "Scraping", "Data Pipelines"],
  },
];

export default function Experience() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="experience" className="py-28 px-6 bg-[#0d1530] relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-subheading">Where I&apos;ve Worked</p>
          <h2 className="section-heading">
            Work <span className="text-cyan-400">Experience</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/40 via-cyan-400/20 to-transparent" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <ExperienceCard key={i} exp={exp} index={i} globalInView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({
  exp,
  index,
  globalInView,
}: {
  exp: (typeof experiences)[0];
  index: number;
  globalInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={globalInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-12 md:pl-16"
    >
      {/* Timeline dot */}
      <div className="absolute left-2 md:left-4 top-4 w-4 h-4 rounded-full border-2 border-cyan-400 bg-[#0d1530] flex items-center justify-center">
        {exp.current && (
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        )}
      </div>

      {/* Card */}
      <div className="group p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-cyan-400/20 hover:bg-white/[0.04] transition-all duration-300 glow-border">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
          <div>
            <h3 className="font-sora text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
              {exp.role}
            </h3>
            <p className="font-dm text-slate-400 text-sm">
              {exp.company}
              <span className="text-slate-600 mx-2">·</span>
              {exp.location}
            </p>
          </div>
          <span
            className={`text-xs font-dm px-3 py-1 rounded-full self-start whitespace-nowrap ${
              exp.current
                ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/20"
                : "bg-white/5 text-slate-500 border border-white/5"
            }`}
          >
            {exp.period}
          </span>
        </div>

        {/* Bullets */}
        <ul className="space-y-2 mb-4">
          {exp.bullets.map((b, bi) => (
            <li key={bi} className="flex gap-3 text-sm font-dm text-slate-400 leading-relaxed">
              <span className="text-cyan-400 mt-1 flex-shrink-0">▹</span>
              {b}
            </li>
          ))}
        </ul>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-2">
          {exp.tech.map((t) => (
            <span
              key={t}
              className="text-xs font-dm px-2.5 py-1 rounded-md bg-cyan-400/5 text-cyan-400/80 border border-cyan-400/10"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
