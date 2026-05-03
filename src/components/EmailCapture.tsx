"use client";
import { useState } from "react";
import { Send, Zap } from "lucide-react";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubmitted(true); setEmail(""); }
  };

  return (
    <section className="py-24 px-4 relative">
      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="glass-card rounded-3xl p-10 md:p-14 text-center glow-border" style={{ borderRadius: "1.5rem" }}>
          <div className="w-14 h-14 btn-neon rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Zap size={24} className="text-white" />
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">Stay in the Loop</h2>
          <p className="text-white/40 text-sm mb-8 max-w-md mx-auto">
            Join my list for exclusive recommendations, deals, and behind-the-scenes content from race weekends.
          </p>
          {submitted ? (
            <div className="glass-card rounded-2xl p-6">
              <p className="text-white font-medium">You&apos;re in! 🏁 Check your inbox soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com" required aria-label="Email address"
                className="flex-1 px-5 py-3.5 glass-input rounded-full text-white text-sm placeholder:text-white/20" />
              <button type="submit"
                className="btn-neon px-7 py-3.5 text-white text-sm font-semibold rounded-full inline-flex items-center gap-2">
                Subscribe <Send size={14} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
