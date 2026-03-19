"use client";
import { useState, useEffect, useRef } from "react";
import { Download, Send, CheckCircle, Zap, Users, Eye, TrendingUp } from "lucide-react";
import { creator } from "@/data/creator";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function AnimatedSection({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const { ref, visible } = useScrollReveal();
  return (
    <div ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >{children}</div>
  );
}

const brandLogos = ["Mercedes", "Red Bull", "Ferrari", "McLaren", "Aston Martin", "Alpine"];

export default function CollaboratePage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };
  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="pt-28 pb-20 px-4 bg-gradient-to-b from-red-50/50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-6">
              <Zap size={14} className="text-accent" />
              <span className="text-xs font-medium text-accent">Open for Collaborations</span>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 mb-4 tracking-tight">
              Let&apos;s Create
              <span className="relative inline-block ml-3">
                <span className="relative z-10">Together</span>
                <span className="absolute bottom-1 left-0 right-0 h-3 bg-accent/15 -z-0 rounded" />
              </span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="text-neutral-500 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              I partner with brands that align with the F1 and creator lifestyle.
              Let&apos;s build something your audience and mine will love.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Instagram Followers", value: creator.stats.followers, icon: Users },
              { label: "Engagement Rate", value: creator.stats.engagement, icon: TrendingUp },
              { label: "Monthly Reach", value: creator.stats.monthlyReach, icon: Eye },
              { label: "Avg. Video Views", value: creator.stats.avgViews, icon: Zap },
            ].map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 100}>
                <div className="bg-white rounded-2xl p-6 text-center border border-red-100/60 shadow-sm hover:shadow-lg hover:shadow-red-100/30 hover:scale-105 transition-all duration-300 group">
                  <stat.icon size={20} className="mx-auto mb-3 text-neutral-300 group-hover:text-accent transition-colors" />
                  <p className="text-2xl md:text-3xl font-bold text-neutral-900">{stat.value}</p>
                  <p className="text-xs text-neutral-500 mt-1">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Marquee */}
      <section className="py-12 px-4 overflow-hidden">
        <AnimatedSection>
          <p className="text-center text-xs text-neutral-400 uppercase tracking-widest mb-6">Brands I&apos;ve Worked With</p>
          <div className="relative">
            <div className="flex animate-marquee gap-12 items-center justify-center">
              {[...brandLogos, ...brandLogos].map((brand, i) => (
                <span key={i} className="text-2xl font-bold text-red-100 whitespace-nowrap tracking-tight select-none">{brand}</span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Media Kit */}
      <section className="py-16 px-4">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-accent rounded-3xl p-10 md:p-14 text-center overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <svg className="absolute inset-0 w-full h-full">
                  <defs>
                    <pattern id="grid" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Download size={28} className="text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Download My Media Kit</h2>
                <p className="text-red-100 text-sm md:text-base mb-8 max-w-md mx-auto">
                  Get the full breakdown of my audience demographics, past collaborations, content style, and rates.
                </p>
                <button className="inline-flex items-center gap-2 bg-white text-accent px-8 py-3.5 rounded-full text-sm font-medium hover:bg-red-50 transition-all duration-300 hover:scale-105 shadow-lg">
                  <Download size={16} /> Download Media Kit (PDF)
                </button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-4 pb-24">
        <div className="max-w-2xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">Get in Touch</h2>
              <p className="text-neutral-500 text-sm">Have a project in mind? I&apos;d love to hear about it.</p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <div className="bg-white rounded-3xl border border-red-100/60 p-8 md:p-10 shadow-lg shadow-red-100/20">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <p className="text-xl font-semibold text-neutral-900">Message sent!</p>
                  <p className="text-sm text-neutral-500 mt-2">I&apos;ll get back to you within 48 hours. 🏁</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="group">
                      <label htmlFor="name" className="block text-xs font-medium text-neutral-500 mb-2 group-focus-within:text-accent transition-colors">Your Name</label>
                      <input id="name" type="text" required value={form.name} onChange={(e) => update("name", e.target.value)}
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/10 transition-all" />
                    </div>
                    <div className="group">
                      <label htmlFor="email" className="block text-xs font-medium text-neutral-500 mb-2 group-focus-within:text-accent transition-colors">Email</label>
                      <input id="email" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)}
                        className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/10 transition-all" />
                    </div>
                  </div>
                  <div className="group">
                    <label htmlFor="company" className="block text-xs font-medium text-neutral-500 mb-2 group-focus-within:text-accent transition-colors">Company / Brand</label>
                    <input id="company" type="text" value={form.company} onChange={(e) => update("company", e.target.value)}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/10 transition-all" />
                  </div>
                  <div className="group">
                    <label htmlFor="message" className="block text-xs font-medium text-neutral-500 mb-2 group-focus-within:text-accent transition-colors">Message</label>
                    <textarea id="message" rows={5} required value={form.message} onChange={(e) => update("message", e.target.value)}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/10 transition-all resize-none" />
                  </div>
                  <button type="submit" className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-accent text-white px-10 py-3.5 rounded-full text-sm font-medium hover:bg-red-700 transition-all duration-300 hover:scale-[1.02] shadow-md shadow-red-200/40">
                    Send Message <Send size={14} />
                  </button>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <style jsx>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 20s linear infinite; }
      `}</style>
    </div>
  );
}
