"use client";
import { Play } from "lucide-react";

const content = [
  { type: "reel", title: "Monaco GP Paddock Tour", thumbnail: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&h=800&fit=crop", url: "#" },
  { type: "video", title: "My Race Weekend Camera Setup", thumbnail: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop", url: "#" },
  { type: "reel", title: "Best F1 Merch Haul 2025", thumbnail: "https://images.unsplash.com/photo-1541348263662-e068662d82af?w=600&h=800&fit=crop", url: "#" },
  { type: "video", title: "Tech I Pack for Every Grand Prix", thumbnail: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?w=600&h=400&fit=crop", url: "#" },
  { type: "reel", title: "Silverstone Vlog Day 1", thumbnail: "https://images.unsplash.com/photo-1625758476104-f2ed6c81248e?w=600&h=800&fit=crop", url: "#" },
  { type: "video", title: "Product Demo: GoPro at 200mph", thumbnail: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop", url: "#" },
];

export default function CreatorContent() {
  return (
    <section id="content" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-cyan text-xs font-semibold uppercase tracking-widest mb-3">Watch</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">Latest Content</h2>
          <p className="text-white/40 text-sm">Reels, videos, and product demos from the world of F1.</p>
          <div className="shimmer-line w-24 mx-auto mt-6" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {content.map((item, i) => (
            <a key={i} href={item.url}
              className="group relative rounded-2xl overflow-hidden glass-card"
              style={{ aspectRatio: item.type === "reel" ? "9/16" : "16/9" }}>
              <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/30 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="w-14 h-14 glass-card rounded-full flex items-center justify-center btn-neon">
                  <Play size={22} className="text-white ml-0.5" fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="text-[10px] uppercase tracking-wider text-white/30 font-medium">
                  {item.type === "reel" ? "Instagram Reel" : "YouTube"}
                </span>
                <p className="text-white text-xs font-medium mt-1 line-clamp-2">{item.title}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
