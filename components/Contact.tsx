"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";

const contactLinks = [
  {
    label: "Email",
    value: "arunkumarjuswani12@gmail.com",
    href: "mailto:arunkumarjuswani12@gmail.com",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "arun-kumar-b578a128b",
    href: "https://www.linkedin.com/in/arun-kumar-b578a128b/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "arunkumar231105",
    href: "https://github.com/arunkumar231105",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: "+92-317-3918432",
    href: "tel:+923173918432",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
];

// FormSubmit delivers to this inbox; first-ever submission triggers a one-time
// activation email that must be confirmed before messages start arriving.
const FORM_ENDPOINT = "https://formsubmit.co/ajax/arunkumarjuswani12@gmail.com";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const { ref, inView } = useInView(0.15);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...form,
          _subject: `Portfolio contact from ${form.name}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="py-28 px-6 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-[#e2572b]/40 to-transparent" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="section-subheading">Let&apos;s Talk</p>
          <h2 className="section-heading">
            Get In <span className="text-[#e2572b]">Touch</span>
          </h2>
          <p className="font-dm text-[#52525b] text-base max-w-xl mx-auto mt-4">
            Open to remote roles in Data Engineering, Backend, or AI integration. Whether it&apos;s
            a job, project, or just a hello — my inbox is always open.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-4 p-4 rounded-xl border-2 border-[#16130e]/10 bg-[#ffffff] hover:border-[#e2572b]/60 hover:bg-[#f7f7f5] transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#e2572b]/10 border border-[#e2572b]/30 flex items-center justify-center text-[#e2572b] flex-shrink-0 group-hover:bg-[#e2572b]/20 transition-colors">
                  {link.icon}
                </div>
                <div>
                  <p className="font-sora text-xs font-semibold text-[#71717a] uppercase tracking-wider">
                    {link.label}
                  </p>
                  <p className="font-dm text-sm text-[#16130e] group-hover:text-[#e2572b] transition-colors">
                    {link.value}
                  </p>
                </div>
                <svg
                  className="w-4 h-4 text-[#71717a] ml-auto group-hover:text-[#e2572b] group-hover:translate-x-1 transition-all"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            ))}
          </motion.div>

          {/* Contact form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label className="block font-dm text-xs text-[#52525b] uppercase tracking-wider mb-1.5">
                Name
              </label>
              <input
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-xl bg-[#f7f7f5] border-2 border-[#16130e]/15 text-[#16130e] font-dm text-sm placeholder-[#71717a] focus:outline-none focus:border-[#e2572b] focus:ring-2 focus:ring-[#e2572b]/20 transition-all"
              />
            </div>
            <div>
              <label className="block font-dm text-xs text-[#52525b] uppercase tracking-wider mb-1.5">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl bg-[#f7f7f5] border-2 border-[#16130e]/15 text-[#16130e] font-dm text-sm placeholder-[#71717a] focus:outline-none focus:border-[#e2572b] focus:ring-2 focus:ring-[#e2572b]/20 transition-all"
              />
            </div>
            <div>
              <label className="block font-dm text-xs text-[#52525b] uppercase tracking-wider mb-1.5">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="What's on your mind?"
                className="w-full px-4 py-3 rounded-xl bg-[#f7f7f5] border-2 border-[#16130e]/15 text-[#16130e] font-dm text-sm placeholder-[#71717a] focus:outline-none focus:border-[#e2572b] focus:ring-2 focus:ring-[#e2572b]/20 transition-all resize-none"
              />
            </div>
            {status === "success" && (
              <div className="w-full py-3 px-4 rounded-xl bg-green-600/10 border border-green-600/30 text-green-700 font-dm text-sm text-center">
                Message sent! I&apos;ll get back to you soon.
              </div>
            )}
            {status === "error" && (
              <div className="w-full py-3 px-4 rounded-xl bg-red-600/10 border border-red-600/30 text-red-700 font-dm text-sm text-center">
                Something went wrong. Please try again or email me directly.
              </div>
            )}
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="w-full py-3.5 rounded-full bg-[#16130e] text-[#ffffff] font-sora font-bold text-sm hover:bg-[#e2572b] transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {status === "loading" ? "Sending..." : status === "success" ? "Sent!" : "Send Message"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
