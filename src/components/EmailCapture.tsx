"use client";
import { useState } from "react";
import { Send } from "lucide-react";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubmitted(true); setEmail(""); }
  };

  return (
    <section className="py-16 px-4 bg-accent">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Stay in the Loop</h2>
        <p className="text-red-100 text-sm mb-8">
          Join my list for exclusive recommendations, deals, and behind-the-scenes content from race weekends.
        </p>
        {submitted ? (
          <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
            <p className="text-white font-medium">You&apos;re in! 🏁 Check your inbox soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com" required aria-label="Email address"
              className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white text-sm placeholder:text-red-200 focus:outline-none focus:border-white transition-colors" />
            <button type="submit"
              className="px-6 py-3 bg-white text-accent text-sm font-medium rounded-full hover:bg-red-50 transition-colors inline-flex items-center gap-2">
              Subscribe <Send size={14} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
