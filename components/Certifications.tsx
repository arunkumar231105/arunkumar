"use client";

import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";

const certifications = [
  {
    name: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
    issuer: "Oracle",
    icon: "O",
    color: "from-red-500/20 to-red-500/5",
    border: "border-red-500/20",
    iconBg: "bg-red-500/10 text-red-400",
  },
  {
    name: "Oracle Cloud Infrastructure Certified AI Foundations Associate",
    issuer: "Oracle",
    icon: "O",
    color: "from-red-500/20 to-red-500/5",
    border: "border-red-500/20",
    iconBg: "bg-red-500/10 text-red-400",
  },
  {
    name: "Google Prompting Essentials",
    issuer: "Google Career Certificates",
    icon: "G",
    color: "from-blue-500/20 to-blue-500/5",
    border: "border-blue-500/20",
    iconBg: "bg-blue-500/10 text-blue-400",
  },
  {
    name: "AWS Educate: Introduction to Cloud 101",
    issuer: "Amazon Web Services",
    icon: "A",
    color: "from-yellow-500/20 to-yellow-500/5",
    border: "border-yellow-500/20",
    iconBg: "bg-yellow-500/10 text-yellow-400",
  },
  {
    name: "Object Oriented Programming in Java",
    issuer: "Coursera / Online",
    icon: "☕",
    color: "from-orange-500/20 to-orange-500/5",
    border: "border-orange-500/20",
    iconBg: "bg-orange-500/10 text-orange-400",
  },
  {
    name: "Getting Started with Microsoft Word",
    issuer: "Microsoft / Online",
    icon: "M",
    color: "from-indigo-500/20 to-indigo-500/5",
    border: "border-indigo-500/20",
    iconBg: "bg-indigo-500/10 text-indigo-400",
  },
];

export default function Certifications() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="certifications" className="py-28 px-6 bg-[#0a0f1e] relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-subheading">Credentials</p>
          <h2 className="section-heading">
            <span className="text-cyan-400">Certifications</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative p-5 rounded-2xl border ${cert.border} bg-gradient-to-br ${cert.color} hover:scale-[1.02] transition-all duration-300 group`}
            >
              {/* Verified badge */}
              <div className="absolute top-4 right-4 text-cyan-400/40 group-hover:text-cyan-400/70 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <div className="flex items-start gap-4">
                {/* Issuer icon */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-sora font-bold text-sm ${cert.iconBg}`}
                >
                  {cert.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-sora text-sm font-semibold text-white leading-snug mb-1">
                    {cert.name}
                  </h3>
                  <p className="font-dm text-xs text-slate-500">{cert.issuer}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
