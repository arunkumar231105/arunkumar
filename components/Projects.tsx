"use client";

import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";

const projects = [
  {
    name: "Airflow ETL: S3 → Snowflake",
    period: "Jan 2026",
    description:
      "Production-style ETL DAG that detects CSV files in S3, auto-creates the Snowflake table schema, and loads data using COPY INTO. Includes SMTP email alerts and robust Sensors/Operators.",
    tech: ["Apache Airflow", "AWS S3", "Snowflake", "Python", "SMTP"],
    github: "https://github.com/arunkumar231105",
    demo: null as string | null,
  },
  {
    name: "Real-Time Chat Application",
    period: "May – Jun 2025",
    description:
      "Full-featured chat app with one-to-one and group conversations. Built on the MERN stack with Socket.IO for instant message delivery and a fully responsive UI.",
    tech: ["MongoDB", "Express", "React", "Node.js", "Socket.IO"],
    github: "https://github.com/arunkumar231105",
    demo: null as string | null,
  },
  {
    name: "AI Thief Detection System",
    period: "Jun – Jul 2025",
    description:
      "Browser-based real-time surveillance system that detects humans via webcam using TensorFlow.js — no server required. Optimized for low-latency inference in the browser.",
    tech: ["Next.js", "TensorFlow.js", "WebRTC", "TypeScript"],
    github: "https://github.com/arunkumar231105",
    demo: null as string | null,
  },
  {
    name: "Banggood E-Commerce Pipeline",
    period: "Nov 2025",
    description:
      "Full ETL pipeline that scrapes 10k+ product records from Banggood using Selenium. Implements anti-blocking mechanisms, data cleaning with Pandas, and loads into structured SQL schema.",
    tech: ["Python", "Selenium", "Pandas", "MySQL", "ETL"],
    github: "https://github.com/arunkumar231105",
    demo: null as string | null,
  },
];

const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

export default function Projects() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="projects" className="py-28 px-6 bg-[#0a0f1e] relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-subheading">What I&apos;ve Built</p>
          <h2 className="section-heading">
            Featured <span className="text-cyan-400">Projects</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} inView={inView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/arunkumar231105"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 font-dm text-sm transition-colors group"
          >
            View all projects on GitHub
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  inView,
}: {
  project: (typeof projects)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="group relative flex flex-col p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-cyan-400/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-400/10 transition-all duration-300"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/0 to-cyan-400/0 group-hover:from-cyan-400/5 group-hover:to-transparent transition-all duration-300 pointer-events-none" />

      <div className="flex items-start justify-between gap-3 mb-3 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7a2 2 0 012-2h4l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
            </svg>
          </div>
          <div>
            <h3 className="font-sora text-base font-semibold text-white group-hover:text-cyan-400 transition-colors leading-tight">
              {project.name}
            </h3>
            <p className="text-xs font-dm text-slate-600 mt-0.5">{project.period}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0 mt-1">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-cyan-400 transition-colors"
              aria-label={`Live demo for ${project.name}`}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLinkIcon />
            </a>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-cyan-400 transition-colors"
            aria-label={`GitHub repo for ${project.name}`}
            onClick={(e) => e.stopPropagation()}
          >
            <GitHubIcon />
          </a>
        </div>
      </div>

      <p className="font-dm text-slate-400 text-sm leading-relaxed mb-5 relative z-10 flex-grow">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 relative z-10">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-xs font-dm px-2.5 py-1 rounded-md bg-white/5 text-slate-400 border border-white/5 group-hover:border-cyan-400/10 group-hover:text-cyan-400/70 transition-colors"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
