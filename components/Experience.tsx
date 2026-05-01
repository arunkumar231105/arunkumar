"use client";

import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";

type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  description?: string;
  bullets: string[];
  impact?: string;
  workflow?: string;
  tech: string[];
};

const experiences: Experience[] = [
  {
    role: "Data Engineer",
    company: "Technocas",
    location: "Karachi, Pakistan",
    period: "April 2026 – Present",
    current: true,
    description:
      "Owning the full data collection and delivery lifecycle — engineering scrapers that handle bot defenses, building ETL pipelines, and delivering clean, warehouse-ready datasets for business consumption.",
    bullets: [
      "Built production-grade scrapers in Python using Requests, BeautifulSoup, Playwright, and Apify — covering static HTML pages through to fully dynamic, JavaScript-rendered platforms including Pinterest.",
      "Designed multi-stage ETL pipelines that normalize raw scraped data, resolve duplicates, and enforce schema contracts before loading into the data warehouse.",
      "Automated end-to-end data workflows via Python scheduling — eliminating manual extraction runs and reducing data delivery to near-zero human intervention.",
      "Implemented transformation logic to handle inconsistent formats, null fields, and nested JSON structures across heterogeneous source sites.",
      "Integrated processed datasets with Metabase to power reporting dashboards and business intelligence queries.",
      "Built resilient scraping infrastructure with retry logic, request throttling, and session management to sustain throughput against anti-bot systems.",
    ],
    impact:
      "Raw website HTML becomes a queryable warehouse record — fully automated, no manual steps.",
    workflow:
      "Target Sites → Requests / BeautifulSoup / Playwright / Apify → Cleaning & Normalization → ETL → Data Warehouse → Metabase",
    tech: ["Python", "Requests", "BeautifulSoup", "Playwright", "Apify", "ETL", "Metabase"],
  },
  {
    role: "Backend Developer",
    company: "Zank AI",
    location: "Remote — USA",
    period: "Feb 2026 – Present",
    current: true,
    description:
      "Building core backend infrastructure for a US-based fintech startup — REST API design, database architecture, authentication systems, and banking workflow engineering.",
    bullets: [
      "Architected and shipped RESTful APIs with FastAPI powering core banking workflows: account management, transaction processing, and user onboarding.",
      "Designed and enforced JWT-based authentication and role-based access control (RBAC) across all protected endpoints.",
      "Modeled relational database schemas in PostgreSQL optimized for financial data integrity, referential consistency, and concurrent-safe operations.",
      "Engineered backend workflows for fintech-specific features — fund transfers, balance ledgers, and statement generation.",
      "Implemented Redis caching for high-frequency API responses and session data, reducing database load on hot paths.",
      "Containerized backend services with Docker for consistent local development and production deployment environments.",
      "Built and maintained a double-entry ledger system for tracking financial transactions with full audit trail support.",
    ],
    impact:
      "Shipping backend systems that handle real user financial data in a live US fintech product.",
    workflow:
      "React Frontend → FastAPI Endpoints → JWT Auth → Redis Cache → PostgreSQL / Ledger → Banking Logic → Docker → API Response",
    tech: ["Python", "FastAPI", "PostgreSQL", "JWT", "RBAC", "REST API", "Ledger", "Redis", "Docker"],
  },
  {
    role: "Software Engineer (AI)",
    company: "HexaVibes Solutions",
    location: "Karachi, Pakistan",
    period: "Aug 2024 – Dec 2025",
    current: false,
    bullets: [
      "Integrated ML models into production applications, building inference wrappers and API layers to expose model outputs as usable product features.",
      "Profiled and optimized model inference pipelines to reduce prediction latency for real-time use cases.",
      "Delivered AI-powered features across cross-functional teams, translating research outputs into stable, deployable backend services.",
    ],
    tech: ["Python", "TensorFlow", "ML Integration", "FastAPI", "Inference Optimization"],
  },
  {
    role: "Agentic AI Developer",
    company: "UXGENIE",
    location: "Karachi, Pakistan",
    period: "Sep 2025 – Oct 2025",
    current: false,
    bullets: [
      "Designed and implemented multi-step agentic AI workflows using LLM orchestration for automated UX research tooling.",
      "Built automation pipelines that replaced manual UX research tasks through AI-driven data extraction and synthesis.",
    ],
    tech: ["Agentic AI", "LLM Orchestration", "Python", "Automation"],
  },
  {
    role: "Frontend Developer",
    company: "High Tech Software House",
    location: "Karachi, Pakistan",
    period: "Aug 2025 – Sep 2025",
    current: false,
    bullets: [
      "Built pixel-perfect, responsive landing pages and portfolio sites in React (TypeScript) with Tailwind CSS.",
      "Implemented component-driven UI architecture ensuring cross-browser compatibility and consistent design fidelity.",
    ],
    tech: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    role: "Freelance Engineer",
    company: "Fiverr",
    location: "Remote — Global",
    period: "Dec 2025 – Present",
    current: true,
    bullets: [
      "Delivering custom data engineering, scraping pipelines, and backend solutions for international clients across e-commerce, research, and analytics domains.",
      "Scoped, architected, and shipped complete client projects end-to-end — from requirements to deployment.",
    ],
    tech: ["Python", "Web Scraping", "ETL", "FastAPI", "Data Pipelines"],
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
  exp: Experience;
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
      <div className="group p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-cyan-400/20 hover:bg-white/[0.04] transition-all duration-300">
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

        {/* Role description */}
        {exp.description && (
          <p className="font-dm text-slate-400 text-sm leading-relaxed mb-4 border-l-2 border-cyan-400/30 pl-3">
            {exp.description}
          </p>
        )}

        {/* Bullets */}
        <ul className="space-y-2 mb-4">
          {exp.bullets.map((b, bi) => (
            <li key={bi} className="flex gap-3 text-sm font-dm text-slate-400 leading-relaxed">
              <span className="text-cyan-400 mt-1 flex-shrink-0">▹</span>
              {b}
            </li>
          ))}
        </ul>

        {/* Workflow line */}
        {exp.workflow && (
          <div className="mb-4 px-3 py-2 rounded-lg bg-[#080c1a] border border-cyan-400/10 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            <p className="font-mono text-[10px] sm:text-[11px] text-cyan-400/50 whitespace-nowrap tracking-wide">
              {exp.workflow}
            </p>
          </div>
        )}

        {/* Impact statement */}
        {exp.impact && (
          <div className="flex items-start gap-2 mb-4">
            <span className="text-cyan-400 text-xs mt-0.5 flex-shrink-0">◆</span>
            <p className="font-dm text-xs text-slate-300 leading-relaxed">{exp.impact}</p>
          </div>
        )}

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
