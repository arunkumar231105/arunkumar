"use client";

import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { SiPython, SiPandas, SiFastapi, SiSnowflake, SiDocker, SiGit } from "react-icons/si";

const skillGroups = [
  {
    category: "Languages",
    Icon: SiPython,
    skills: ["Python", "SQL", "Java", "C/C++", "HTML", "CSS", "TypeScript"],
  },
  {
    category: "Data & Scraping",
    Icon: SiPandas,
    skills: ["Pandas", "NumPy", "Selenium", "BeautifulSoup", "Apify", "Playwright", "Metabase"],
  },
  {
    category: "Frameworks",
    Icon: SiFastapi,
    skills: ["FastAPI", "Node.js", "React", "Next.js", "Express"],
  },
  {
    category: "Databases",
    Icon: SiSnowflake,
    skills: ["MySQL", "SQL Server", "Snowflake", "PostgreSQL", "Firebase"],
  },
  {
    category: "Cloud & DevOps",
    Icon: SiDocker,
    skills: ["AWS S3", "EC2", "Lambda", "SQS", "SNS", "Glue", "Athena", "QuickSight", "Docker", "Redis"],
  },
  {
    category: "Tools & Platforms",
    Icon: SiGit,
    skills: ["Git", "GitHub", "VS Code", "Vercel", "Figma", "n8n", "Apache Airflow"],
  },
];

export default function Skills() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="skills" className="py-28 px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-[#e2572b]/40 to-transparent" />

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
            Technical <span className="text-[#e2572b]">Skills</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
              className="p-6 rounded-2xl border-2 border-[#16130e]/10 bg-[#ffffff] hover:border-[#e2572b]/60 hover:bg-[#f7f7f5] transition-all duration-300 group"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-[#e2572b]/10 border border-[#e2572b]/30 flex items-center justify-center flex-shrink-0">
                  <group.Icon className="w-4 h-4 text-[#e2572b]" />
                </div>
                <h3 className="font-sora text-sm font-semibold text-[#16130e] uppercase tracking-wider">
                  {group.category}
                </h3>
              </div>

              {/* Skill badges */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-dm px-3 py-1.5 rounded-lg border border-[#16130e]/15 bg-[#16130e]/5 text-[#3f3f46] hover:border-[#e2572b]/30 hover:text-[#e2572b] hover:bg-[#e2572b]/10 transition-all duration-150 cursor-default"
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
