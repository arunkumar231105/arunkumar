"use client";

import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import {
  HiCircleStack,
  HiGlobeAlt,
  HiServer,
  HiCloud,
  HiBolt,
} from "react-icons/hi2";

const areas = [
  {
    Icon: HiCircleStack,
    title: "Data Engineering & ETL Pipelines",
    description:
      "Design and ship end-to-end data pipelines — raw source ingestion to warehouse-ready structured tables. Orchestrate multi-stage ETL workflows with schema handling, validation, and automated alerting.",
    signals: ["Apache Airflow", "Snowflake", "AWS S3", "ETL Orchestration"],
    icon: "bg-cyan-400/10 border-cyan-400/20 text-cyan-400",
    border: "hover:border-cyan-400/30",
    pill: "bg-cyan-400/5 text-cyan-400/70 border-cyan-400/10",
    shadow: "group-hover:shadow-cyan-400/5",
  },
  {
    Icon: HiGlobeAlt,
    title: "Web Scraping & Data Extraction",
    description:
      "Extract structured data from any website — static HTML through to fully JavaScript-rendered platforms. Build resilient scrapers with anti-bot handling, retry logic, and multi-source pipelines at scale.",
    signals: ["Selenium", "Playwright", "BeautifulSoup", "Apify", "Requests"],
    icon: "bg-blue-400/10 border-blue-400/20 text-blue-400",
    border: "hover:border-blue-400/30",
    pill: "bg-blue-400/5 text-blue-400/70 border-blue-400/10",
    shadow: "group-hover:shadow-blue-400/5",
  },
  {
    Icon: HiServer,
    title: "Backend API Development",
    description:
      "Build production-grade REST APIs — authentication, RBAC, database modeling, caching, and financial-grade reliability. Architect backend systems that handle real user data and concurrent requests safely.",
    signals: ["FastAPI", "PostgreSQL", "JWT", "Redis", "Docker"],
    icon: "bg-indigo-400/10 border-indigo-400/20 text-indigo-400",
    border: "hover:border-indigo-400/30",
    pill: "bg-indigo-400/5 text-indigo-400/70 border-indigo-400/10",
    shadow: "group-hover:shadow-indigo-400/5",
  },
  {
    Icon: HiCloud,
    title: "Cloud & Infrastructure",
    description:
      "Deploy, containerize, and scale backend systems on AWS. Comfortable across S3, EC2, Lambda, SQS, and Glue — with Docker for containerization and Redis for caching and session management.",
    signals: ["AWS S3", "EC2", "Lambda", "Docker", "Redis"],
    icon: "bg-sky-400/10 border-sky-400/20 text-sky-400",
    border: "hover:border-sky-400/30",
    pill: "bg-sky-400/5 text-sky-400/70 border-sky-400/10",
    shadow: "group-hover:shadow-sky-400/5",
  },
  {
    Icon: HiBolt,
    title: "Workflow Automation & Scripting",
    description:
      "Automate repetitive data and business workflows end-to-end using Python. From scheduled ETL triggers and data reporting to n8n pipelines — eliminate manual steps at every layer of the stack.",
    signals: ["Python", "n8n", "Apache Airflow", "Task Scheduling"],
    icon: "bg-amber-400/10 border-amber-400/20 text-amber-400",
    border: "hover:border-amber-400/30",
    pill: "bg-amber-400/5 text-amber-400/70 border-amber-400/10",
    shadow: "group-hover:shadow-amber-400/5",
  },
];

export default function CoreExpertise() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="expertise" className="py-28 px-6 bg-[#0d1530] relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-subheading">What I Do Best</p>
          <h2 className="section-heading">
            Core <span className="text-cyan-400">Expertise</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {areas.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`group relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] ${area.border} hover:shadow-xl ${area.shadow} transition-all duration-300`}
            >
              {/* Icon */}
              <div
                className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-5 ${area.icon}`}
              >
                <area.Icon className="w-5 h-5" />
              </div>

              {/* Title */}
              <h3 className="font-sora text-base font-semibold text-white mb-3 leading-snug">
                {area.title}
              </h3>

              {/* Description */}
              <p className="font-dm text-sm text-slate-400 leading-relaxed mb-5">
                {area.description}
              </p>

              {/* Signal pills */}
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {area.signals.map((s) => (
                  <span
                    key={s}
                    className={`text-[11px] font-dm px-2 py-0.5 rounded-md border ${area.pill}`}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
