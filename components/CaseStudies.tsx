"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "../hooks/useInView";

type CaseStudy = {
  name: string;
  tagline: string;
  period: string;
  what: { headline: string; detail: string };
  why: { headline: string; detail: string };
  where: { headline: string; detail: string };
  architecture: string;
  outcome: string;
  tech: string[];
};

const caseStudies: CaseStudy[] = [
  {
    name: "Airflow ETL: S3 → Snowflake",
    tagline: "Fully orchestrated cloud data pipeline with schema detection, automated loading, and alerting",
    period: "Jan 2026",
    what: {
      headline: "A zero-touch ETL pipeline from cloud storage to data warehouse",
      detail:
        "Built an Apache Airflow DAG that monitors an S3 bucket for incoming CSV files, automatically detects and creates the Snowflake table schema, loads data using COPY INTO, and dispatches SMTP email alerts on completion or failure — no manual steps at any stage.",
    },
    why: {
      headline: "Manual data loading doesn't scale and breaks silently",
      detail:
        "Loading files from S3 to Snowflake by hand is error-prone and collapses under volume. The business needed a system that detects new data automatically, handles schema changes without engineer intervention, and alerts the team so no one babysits a data job overnight.",
    },
    where: {
      headline: "Cloud-orchestrated, warehouse-native, alert-driven",
      detail:
        "Airflow runs as the scheduler and orchestration layer. S3 Sensors listen for new file arrivals and trigger the DAG. Snowflake receives the cleaned load via COPY INTO. SMTP delivers success and failure notifications to the team. All components are cloud-native with no on-prem dependency.",
    },
    architecture:
      "S3 Bucket → Airflow S3 Sensor → DAG Trigger → Schema Auto-Detection → COPY INTO Snowflake → SMTP Alert",
    outcome:
      "Files land in S3, the warehouse table is updated, and the team is notified — zero human in the loop, zero manual SQL.",
    tech: ["Apache Airflow", "AWS S3", "Snowflake", "Python", "SMTP", "ETL"],
  },
  {
    name: "Real-Time Chat Application",
    tagline: "Full-stack MERN messaging system with WebSocket-powered instant delivery and group rooms",
    period: "May – Jun 2025",
    what: {
      headline: "A production-grade messaging system with real-time delivery",
      detail:
        "Built a full-stack chat application supporting one-to-one and group conversations. Messages are delivered instantly via Socket.IO WebSocket connections, persisted in MongoDB for history, and rendered in a responsive React UI — no polling, no page refresh.",
    },
    why: {
      headline: "HTTP polling introduces latency and wasted server load",
      detail:
        "Traditional request-response patterns are the wrong architecture for messaging — every poll is a wasted request when there's no new data, and users feel the lag. WebSockets maintain a persistent connection so the server pushes messages the moment they arrive, at any scale.",
    },
    where: {
      headline: "Event-driven full-stack with Socket.IO room management",
      detail:
        "Node.js/Express runs the API and hosts the Socket.IO server. MongoDB persists message history and user records. React handles the client-side UI with real-time state updates via socket events. Socket.IO rooms manage group conversation broadcasting — only members of a room receive its messages.",
    },
    architecture:
      "React Client → Socket.IO Connection → Express Server → Room Manager → MongoDB Persist → Broadcast to Room Members",
    outcome:
      "Instant message delivery across clients, persistent chat history, and group room isolation — all in a single deployable MERN stack.",
    tech: ["MongoDB", "Express", "React", "Node.js", "Socket.IO", "WebSockets"],
  },
  {
    name: "AI Thief Detection System",
    tagline: "Browser-native real-time human detection — no server, no cloud API, no data leaving the device",
    period: "Jun – Jul 2025",
    what: {
      headline: "Client-side surveillance powered entirely by the browser",
      detail:
        "A Next.js application that runs a pre-trained COCO-SSD object detection model in the browser using TensorFlow.js. The webcam stream is captured via WebRTC and fed to the model frame-by-frame in real-time — detecting human presence with bounding box overlays, no server round-trip required.",
    },
    why: {
      headline: "Server-side vision systems are expensive and invasive",
      detail:
        "Traditional surveillance requires backend compute, cloud vision APIs, and continuous video uploads — adding cost, latency, and privacy risk. Running inference in the browser eliminates all of that. The model runs at the edge — on the user's own device — making the system fast, free to run, and fully private.",
    },
    where: {
      headline: "Edge inference — entirely in the browser runtime",
      detail:
        "TensorFlow.js loads and executes the COCO-SSD model inside the browser's JavaScript engine. WebRTC captures the webcam feed frame-by-frame. A Canvas overlay renders bounding boxes around detected humans in real-time. Next.js serves the app as a static bundle — no backend process running anywhere.",
    },
    architecture:
      "Webcam → WebRTC Stream → Canvas Frame Capture → TensorFlow.js COCO-SSD → Bounding Box Render → Human Alert",
    outcome:
      "Real-time human detection running at the browser edge — no backend, no cloud API, no data transmission. Fully functional offline.",
    tech: ["Next.js", "TensorFlow.js", "WebRTC", "TypeScript", "COCO-SSD", "Canvas API"],
  },
  {
    name: "Banggood E-Commerce Pipeline",
    tagline: "10,000+ product records scraped, cleaned, and loaded into a structured SQL schema via a single automated run",
    period: "Nov 2025",
    what: {
      headline: "End-to-end e-commerce data extraction and loading pipeline",
      detail:
        "Built a complete ETL pipeline that scrapes 10,000+ product listings from Banggood.com using Selenium for full browser automation, cleans and normalizes raw data with Pandas across multiple transformation stages, and loads structured records into a MySQL database ready for querying and analysis.",
    },
    why: {
      headline: "E-commerce sites actively resist scrapers at scale",
      detail:
        "Banggood uses JavaScript rendering and anti-bot protections that break basic HTTP scrapers instantly. Selenium handles full browser execution to bypass JS rendering, while custom anti-blocking logic — request throttling, session rotation, and intelligent retry mechanisms — keeps the pipeline running reliably without getting rate-limited or blocked.",
    },
    where: {
      headline: "Browser-automated, Pandas-transformed, SQL-stored",
      detail:
        "Selenium drives a headless Chrome browser to navigate product pages, handle pagination, and extract raw HTML data. Pandas handles multi-stage transformation: deduplication, type casting, null value handling, and schema enforcement. MySQL stores the final normalized records in a structured schema designed for product analytics queries.",
    },
    architecture:
      "Banggood.com → Selenium Headless Browser → Raw HTML Extraction → Pandas Multi-Stage Cleaning → Schema Validation → MySQL Load",
    outcome:
      "10,000+ structured product records available for analysis — scraped, cleaned, validated, and loaded in a single automated pipeline run.",
    tech: ["Python", "Selenium", "Pandas", "MySQL", "Headless Chrome", "ETL"],
  },
];

const WWW = [
  {
    key: "what" as const,
    label: "What",
    letter: "W",
    accent: "cyan",
    border: "border-cyan-400/15",
    bg: "bg-cyan-400/5",
    badge: "bg-cyan-400 text-[#0a0f1e]",
    text: "text-cyan-400",
  },
  {
    key: "why" as const,
    label: "Why",
    letter: "W",
    accent: "blue",
    border: "border-blue-400/15",
    bg: "bg-blue-400/5",
    badge: "bg-blue-400 text-[#0a0f1e]",
    text: "text-blue-400",
  },
  {
    key: "where" as const,
    label: "Where",
    letter: "W",
    accent: "purple",
    border: "border-purple-400/15",
    bg: "bg-purple-400/5",
    badge: "bg-purple-400 text-[#0a0f1e]",
    text: "text-purple-400",
  },
];

export default function CaseStudies() {
  const [active, setActive] = useState(0);
  const { ref, inView } = useInView(0.1);
  const study = caseStudies[active];

  return (
    <section id="case-studies" className="py-28 px-6 bg-[#0a0f1e] relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="section-subheading">Deep Dives</p>
          <h2 className="section-heading">
            Case <span className="text-cyan-400">Studies</span>
          </h2>
        </motion.div>

        {/* Tab selector — scrollable on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex gap-2 mb-8 overflow-x-auto pb-1 scrollbar-none"
          style={{ scrollbarWidth: "none" }}
        >
          {caseStudies.map((cs, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`px-4 py-2 rounded-xl text-xs font-dm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                active === i
                  ? "bg-cyan-400 text-[#0a0f1e] font-semibold shadow-lg shadow-cyan-400/20"
                  : "border border-white/10 text-slate-400 hover:border-cyan-400/30 hover:text-cyan-400 bg-white/[0.02]"
              }`}
            >
              {cs.name}
            </button>
          ))}
        </motion.div>

        {/* Case study panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 md:p-8"
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-8 pb-6 border-b border-white/5">
              <div>
                <h3 className="font-sora text-xl md:text-2xl font-bold text-white mb-1.5">
                  {study.name}
                </h3>
                <p className="font-dm text-slate-400 text-sm max-w-xl">{study.tagline}</p>
              </div>
              <span className="text-xs font-dm px-3 py-1.5 rounded-full bg-white/5 text-slate-500 border border-white/5 self-start whitespace-nowrap flex-shrink-0">
                {study.period}
              </span>
            </div>

            {/* WWW Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {WWW.map(({ key, label, letter, border, bg, badge, text }) => (
                <div key={key} className={`p-5 rounded-xl border ${border} ${bg}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`w-6 h-6 rounded-md ${badge} text-[10px] font-sora font-extrabold flex items-center justify-center flex-shrink-0`}
                    >
                      {letter}
                    </span>
                    <p className={`font-sora text-xs font-semibold ${text} uppercase tracking-wider`}>
                      {label}
                    </p>
                  </div>
                  <p className="font-sora text-sm font-semibold text-white mb-2 leading-snug">
                    {study[key].headline}
                  </p>
                  <p className="font-dm text-xs text-slate-400 leading-relaxed">
                    {study[key].detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Architecture */}
            <div className="mb-6">
              <p className="font-sora text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-2">
                System Architecture
              </p>
              <div className="px-4 py-3 rounded-xl bg-[#060a15] border border-cyan-400/10 overflow-x-auto">
                <p className="font-mono text-xs text-cyan-400/60 whitespace-nowrap tracking-wide">
                  {study.architecture}
                </p>
              </div>
            </div>

            {/* Outcome */}
            <div className="flex items-start gap-3 mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <span className="text-cyan-400 flex-shrink-0 text-sm mt-0.5">◆</span>
              <div>
                <p className="font-sora text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-1">
                  Outcome
                </p>
                <p className="font-dm text-sm text-slate-300 leading-relaxed">{study.outcome}</p>
              </div>
            </div>

            {/* Stack */}
            <div>
              <p className="font-sora text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-3">
                Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {study.tech.map((t) => (
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
        </AnimatePresence>
      </div>
    </section>
  );
}
