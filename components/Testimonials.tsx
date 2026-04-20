"use client";

import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";

const testimonials = [
  {
    quote:
      "Arun built our entire scraping and ETL pipeline from scratch. Clean code, on time, and the data quality was exactly what we needed. Will hire again.",
    name: "Client via Fiverr",
    role: "E-Commerce Startup",
    initials: "EC",
    color: "from-cyan-400/20 to-cyan-400/5",
    border: "border-cyan-400/20",
  },
  {
    quote:
      "Arun consistently delivered scalable backend solutions at Zank AI. His understanding of API design and database optimization is well above his experience level.",
    name: "Team Lead",
    role: "Zank AI — US Fintech",
    initials: "ZA",
    color: "from-blue-400/20 to-blue-400/5",
    border: "border-blue-400/20",
  },
  {
    quote:
      "He integrated our ML models into production seamlessly and improved inference performance significantly. Great communicator and fast learner.",
    name: "Tech Lead",
    role: "HexaVibes Solutions",
    initials: "HV",
    color: "from-purple-400/20 to-purple-400/5",
    border: "border-purple-400/20",
  },
];

export default function Testimonials() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="testimonials" className="py-28 px-6 bg-[#0d1530] relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-subheading">Kind Words</p>
          <h2 className="section-heading">
            What People <span className="text-cyan-400">Say</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`relative p-6 rounded-2xl border ${t.border} bg-gradient-to-br ${t.color} flex flex-col gap-4`}
            >
              {/* Quote mark */}
              <span className="text-4xl text-cyan-400/30 font-sora leading-none select-none">&ldquo;</span>

              <p className="font-dm text-slate-300 text-sm leading-relaxed -mt-4">
                {t.quote}
              </p>

              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
                <div className={`w-9 h-9 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center font-sora font-bold text-xs text-cyan-400`}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-sora text-sm font-semibold text-white">{t.name}</p>
                  <p className="font-dm text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
