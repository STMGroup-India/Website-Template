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
    <section id="content" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">Latest Content</h2>
          <p className="text-neutral-500 text-sm">Reels, videos, and product demos from the world of F1.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {content.map((item, i) => (
            <a key={i} href={item.url}
              className="group relative rounded-2xl overflow-hidden bg-neutral-100 border border-red-100/40"
              style={{ aspectRatio: item.type === "reel" ? "9/16" : "16/9" }}>
              <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                  <Play size={20} className="text-accent ml-0.5" fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <span className="text-[10px] uppercase tracking-wider text-white/70 font-medium">
                  {item.type === "reel" ? "Instagram Reel" : "YouTube"}
                </span>
                <p className="text-white text-xs font-medium mt-0.5 line-clamp-2">{item.title}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
