"use client";
import Image from "next/image";
import { creator } from "@/data/creator";
import { Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-24 px-4 overflow-hidden">
      {/* Large decorative ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/[0.03] animate-spin-slow pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/[0.04] animate-spin-slow pointer-events-none" style={{ animationDirection: "reverse", animationDuration: "30s" }} />

      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
        {/* Avatar with glow ring */}
        <div className="relative w-32 h-32 mb-8 group">
          <div className="absolute inset-[-4px] rounded-full bg-gradient-to-r from-accent via-violet to-cyan opacity-60 blur-md animate-pulse-glow" />
          <div className="absolute inset-[-2px] rounded-full bg-gradient-to-r from-accent via-violet to-cyan opacity-80 glow-border" style={{ borderRadius: "9999px" }} />
          <Image
            src={creator.avatar}
            alt={creator.name}
            fill
            className="rounded-full object-cover relative z-10 ring-2 ring-black/50"
            priority
          />
          <span className="absolute -bottom-2 -right-2 z-20 bg-accent text-white text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1 btn-neon">
            <Sparkles size={12} /> F1
          </span>
        </div>

        {/* Name with gradient */}
        <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-3 tracking-tight text-center w-full">
          {creator.name.split(" ")[0]}{" "}
          <span className="gradient-text-cool">{creator.name.split(" ")[1]}</span>
        </h1>
        <p className="text-sm text-white/30 mb-2 font-mono text-center">{creator.handle}</p>
        <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-xl mb-10 text-center px-2">
          {creator.bio}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
          <a href="#products" className="btn-neon px-8 py-3.5 text-white text-sm font-semibold rounded-full text-center">
            Shop My Picks
          </a>
          <a href="#categories" className="btn-glass px-8 py-3.5 text-white text-sm font-medium rounded-full text-center">
            My Setup
          </a>
          <a href="/collaborate" className="btn-glass px-8 py-3.5 text-white text-sm font-medium rounded-full text-center">
            Work With Me
          </a>
        </div>

        {/* Stats in glass cards */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
          {Object.entries(creator.stats).map(([key, val]) => (
            <div key={key} className="glass-card rounded-2xl p-4 text-center">
              <p className="text-xl md:text-2xl font-bold text-white font-display">{val}</p>
              <p className="text-[11px] text-white/30 capitalize mt-1">{key.replace(/([A-Z])/g, " $1").trim()}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
