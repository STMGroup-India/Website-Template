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
      <section className="pt-32 pb-20 px-4 relative">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-1.5 mb-6">
              <Zap size={14} className="text-accent" />
              <span className="text-xs font-medium text-accent-light">Open for Collaborations</span>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Let&apos;s Create{" "}
              <span className="gradient-text-cool">Together</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
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
                <div className="glass-card rounded-2xl p-6 text-center group">
                  <stat.icon size={20} className="mx-auto mb-3 text-white/15 group-hover:text-accent transition-colors duration-500" />
                  <p className="text-2xl md:text-3xl font-bold text-white font-display">{stat.value}</p>
                  <p className="text-xs text-white/30 mt-1">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Marquee */}
      <section className="py-12 px-4 overflow-hidden">
        <AnimatedSection>
          <p className="text-center text-xs text-white/20 uppercase tracking-widest mb-6">Brands I&apos;ve Worked With</p>
          <div className="relative">
            <div className="flex animate-marquee gap-16 items-center justify-center">
              {[...brandLogos, ...brandLogos].map((brand, i) => (
                <span key={i} className="text-3xl font-bold text-white/[0.06] whitespace-nowrap tracking-tight select-none font-display">{brand}</span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Media Kit */}
      <section className="py-16 px-4">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto">
            <div className="relative glass-card rounded-3xl p-10 md:p-14 text-center glow-border overflow-hidden" style={{ borderRadius: "1.5rem" }}>
              <div className="relative z-10">
                <div className="w-16 h-16 btn-neon rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Download size={28} className="text-white" />
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">Download My Media Kit</h2>
                <p className="text-white/40 text-sm md:text-base mb-8 max-w-md mx-auto">
                  Get the full breakdown of my audience demographics, past collaborations, content style, and rates.
                </p>
                <button className="btn-neon inline-flex items-center gap-2 text-white px-8 py-3.5 rounded-full text-sm font-semibold">
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
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">Get in Touch</h2>
              <p className="text-white/40 text-sm">Have a project in mind? I&apos;d love to hear about it.</p>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={150}>
            <div className="glass-card rounded-3xl p-5 sm:p-8 md:p-10 glow-border" style={{ borderRadius: "1.5rem" }}>
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 glass-card rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-400" />
                  </div>
                  <p className="text-xl font-semibold text-white font-display">Message sent!</p>
                  <p className="text-sm text-white/40 mt-2">I&apos;ll get back to you within 48 hours. 🏁</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-medium text-white/30 mb-2">Your Name</label>
                      <input id="name" type="text" required value={form.name} onChange={(e) => update("name", e.target.value)}
                        className="w-full px-4 py-3 glass-input rounded-xl text-sm text-white placeholder:text-white/15" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-white/30 mb-2">Email</label>
                      <input id="email" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)}
                        className="w-full px-4 py-3 glass-input rounded-xl text-sm text-white placeholder:text-white/15" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-xs font-medium text-white/30 mb-2">Company / Brand</label>
                    <input id="company" type="text" value={form.company} onChange={(e) => update("company", e.target.value)}
                      className="w-full px-4 py-3 glass-input rounded-xl text-sm text-white placeholder:text-white/15" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-medium text-white/30 mb-2">Message</label>
                    <textarea id="message" rows={5} required value={form.message} onChange={(e) => update("message", e.target.value)}
                      className="w-full px-4 py-3 glass-input rounded-xl text-sm text-white placeholder:text-white/15 resize-none" />
                  </div>
                  <button type="submit" className="w-full md:w-auto btn-neon inline-flex items-center justify-center gap-2 text-white px-10 py-3.5 rounded-full text-sm font-semibold">
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
