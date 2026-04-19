"use client";

import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";

const skillGroups = [
  {
    category: "Languages",
    icon: "⌨",
    skills: ["Python", "SQL", "Java", "C/C++", "HTML", "CSS", "TypeScript"],
  },
  {
    category: "Data & Scraping",
    icon: "🗄",
    skills: ["Pandas", "NumPy", "Selenium", "BeautifulSoup", "Apify", "Playwright", "Metabase"],
  },
  {
    category: "Frameworks",
    icon: "🔧",
    skills: ["FastAPI", "Node.js", "React", "Next.js", "Express"],
  },
  {
    category: "Databases",
    icon: "💾",
    skills: ["MySQL", "SQL Server", "Snowflake", "PostgreSQL", "Firebase"],
  },
  {
    category: "Cloud & DevOps",
    icon: "☁",
    skills: ["AWS S3", "EC2", "Lambda", "SQS", "SNS", "Glue", "Athena", "QuickSight", "Docker", "Redis"],
  },
  {
    category: "Tools & Platforms",
    icon: "🛠",
    skills: ["Git", "GitHub", "VS Code", "Vercel", "Figma", "n8n", "Apache Airflow"],
  },
];

export default function Skills() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="skills" className="py-28 px-6 bg-[#0d1530] relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-subheading">What I Work With</p>
          <h2 className="section-heading">
            Technical <span className="text-cyan-400">Skills</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
              className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-cyan-400/20 transition-all duration-300 group"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xl" aria-hidden>
                  {group.icon}
                </span>
                <h3 className="font-sora text-sm font-semibold text-white uppercase tracking-wider">
                  {group.category}
                </h3>
              </div>

              {/* Skill badges */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-dm px-3 py-1.5 rounded-lg border border-cyan-400/15 bg-cyan-400/5 text-cyan-400/80 hover:border-cyan-400/40 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-150 cursor-default"
                  >
                    {skill}
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
