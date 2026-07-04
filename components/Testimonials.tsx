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
    color: "from-black/10 to-black/10",
    border: "border-white/15",
  },
  {
    quote:
      "Arun consistently delivered scalable backend solutions at Zank AI. His understanding of API design and database optimization is well above his experience level.",
    name: "Team Lead",
    role: "Zank AI — US Fintech",
    initials: "ZA",
    color: "from-black/10 to-black/10",
    border: "border-white/15",
  },
  {
    quote:
      "He integrated our ML models into production seamlessly and improved inference performance significantly. Great communicator and fast learner.",
    name: "Tech Lead",
    role: "HexaVibes Solutions",
    initials: "HV",
    color: "from-black/10 to-black/10",
    border: "border-white/15",
  },
];

export default function Testimonials() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="testimonials" className="py-28 px-6 band-teal relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-[#ffffff]/40 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-subheading text-[#16130e]">Kind Words</p>
          <h2 className="section-heading text-[#ffffff]">
            What People <span className="text-[#ffd8c2]">Say</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`relative p-6 rounded-2xl border-2 ${t.border} bg-gradient-to-br ${t.color} hover:border-[#ffffff]/50 transition-colors duration-300 flex flex-col gap-4`}
            >
              {/* Quote mark */}
              <span className="text-4xl text-[#ffd8c2] font-sora leading-none select-none">&ldquo;</span>

              <p className="font-dm text-[#e6eef0] text-sm leading-relaxed -mt-4">
                {t.quote}
              </p>

              <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/15">
                <div className={`w-9 h-9 rounded-full bg-[#ffffff]/10 border border-[#ffffff]/60 flex items-center justify-center font-sora font-bold text-xs text-[#ffd8c2]`}>
                  {t.initials}
                </div>
                <div>
                  <p className="font-sora text-sm font-semibold text-[#ffffff]">{t.name}</p>
                  <p className="font-dm text-xs text-[#e6eef0]/70">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
