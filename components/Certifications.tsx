"use client";

import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";

const certifications = [
  {
    name: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
    issuer: "Oracle",
    icon: "O",
    color: "from-[#ffffff] to-[#ffffff]",
    border: "border-[#16130e]/10",
    iconBg: "bg-red-500/10 text-red-600",
    verifyUrl: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=",
  },
  {
    name: "Oracle Cloud Infrastructure Certified AI Foundations Associate",
    issuer: "Oracle",
    icon: "O",
    color: "from-[#ffffff] to-[#ffffff]",
    border: "border-[#16130e]/10",
    iconBg: "bg-red-500/10 text-red-600",
    verifyUrl: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=",
  },
  {
    name: "Google Prompting Essentials",
    issuer: "Google Career Certificates",
    icon: "G",
    color: "from-[#ffffff] to-[#ffffff]",
    border: "border-[#16130e]/10",
    iconBg: "bg-blue-500/10 text-blue-600",
    verifyUrl: "https://grow.google/certificates/",
  },
  {
    name: "AWS Educate: Introduction to Cloud 101",
    issuer: "Amazon Web Services",
    icon: "A",
    color: "from-[#ffffff] to-[#ffffff]",
    border: "border-[#16130e]/10",
    iconBg: "bg-yellow-500/10 text-yellow-700",
    verifyUrl: "https://aws.amazon.com/education/awseducate/",
  },
  {
    name: "Object Oriented Programming in Java",
    issuer: "Coursera / Online",
    icon: "☕",
    color: "from-[#ffffff] to-[#ffffff]",
    border: "border-[#16130e]/10",
    iconBg: "bg-[#e2572b]/10 text-[#e2572b]",
    verifyUrl: "https://www.coursera.org/",
  },
];

export default function Certifications() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="certifications" className="py-28 px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-[#e2572b]/40 to-transparent" />

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
            <span className="text-[#e2572b]">Certifications</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert, i) => (
            <motion.a
              key={i}
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative p-5 rounded-2xl border-2 ${cert.border} bg-gradient-to-br ${cert.color} hover:border-[#e2572b]/60 hover:bg-[#f7f7f5] hover:scale-[1.02] transition-all duration-300 group cursor-pointer block`}
            >
              {/* Verify link icon */}
              <div className="absolute top-4 right-4 text-[#e2572b]/40 group-hover:text-[#e2572b]/80 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
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
                  <h3 className="font-sora text-sm font-semibold text-[#16130e] leading-snug mb-1">
                    {cert.name}
                  </h3>
                  <p className="font-dm text-xs text-[#71717a]">{cert.issuer}</p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
