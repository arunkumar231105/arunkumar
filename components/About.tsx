"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "../hooks/useInView";

const stats = [
  { value: "3+", label: "Companies" },
  { value: "4+", label: "Projects" },
  { value: "2", label: "Certifications" },
  { value: "2027", label: "Graduating" },
];

export default function About() {
  const { ref, inView } = useInView(0.2);

  return (
    <section id="about" className="py-28 px-6 bg-[#0a0f1e] relative">
      {/* Subtle top border glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-subheading">Get to Know Me</p>
          <h2 className="section-heading">
            About <span className="text-cyan-400">Me</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex justify-center md:justify-start"
          >
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-cyan-400/40 to-cyan-400/10 blur-sm" />
              <div className="absolute -inset-px rounded-2xl border border-cyan-400/30" />
              <div className="relative rounded-2xl overflow-hidden w-72 h-80 md:w-80 md:h-96 animate-glow">
                <Image
                  src="/arun-kumar.jpeg"
                  alt="Arun Kumar"
                  fill
                  className="object-cover object-top"
                  priority
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/20 to-transparent" />
              </div>
              {/* Decorative corner accent */}
              <div className="absolute -bottom-3 -right-3 w-16 h-16 border-r-2 border-b-2 border-cyan-400/40 rounded-br-lg" />
              <div className="absolute -top-3 -left-3 w-16 h-16 border-l-2 border-t-2 border-cyan-400/40 rounded-tl-lg" />
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="font-dm text-slate-300 text-base leading-relaxed mb-5">
              I&apos;m a Software Engineering student at{" "}
              <span className="text-white font-medium">SZABIST, Karachi</span> (graduating 2027),
              currently working as a{" "}
              <span className="text-cyan-400 font-medium">Data Engineer at Technocas</span> and{" "}
              <span className="text-cyan-400 font-medium">Backend Developer at Zank AI</span>, a
              US-based fintech startup — both roles I hold simultaneously.
            </p>
            <p className="font-dm text-slate-300 text-base leading-relaxed mb-5">
              I specialize in building end-to-end data pipelines, scraping systems, and production
              backend infrastructure. From wrangling 10k+ product records out of e-commerce sites
              to designing Snowflake ETL workflows with Airflow — I build things that work at scale.
            </p>
            <p className="font-dm text-slate-300 text-base leading-relaxed mb-8">
              I&apos;m also trained in{" "}
              <span className="text-white font-medium">Cloud Data Engineering at SMIT</span> and
              hold an{" "}
              <span className="text-white font-medium">Oracle Cloud GenAI certification</span>.
              Open to remote roles in Cloud Data Engineering, Backend, or AI integration.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className="text-center p-3 rounded-xl border border-white/5 bg-white/[0.02]"
                >
                  <p className="font-sora text-xl font-bold text-cyan-400">{stat.value}</p>
                  <p className="font-dm text-xs text-slate-500 mt-0.5">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
