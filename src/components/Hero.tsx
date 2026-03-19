"use client";
import Image from "next/image";
import { creator } from "@/data/creator";

export default function Hero() {
  return (
    <section className="relative pt-28 pb-16 px-4 bg-gradient-to-b from-red-50/50 to-white overflow-hidden">

      {/* Content - sits above the car image */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <div className="relative w-28 h-28 mx-auto mb-6">
          <Image
            src={creator.avatar}
            alt={creator.name}
            fill
            className="rounded-full object-cover ring-4 ring-white shadow-lg shadow-red-100/50"
            priority
          />
          <span className="absolute -bottom-1 -right-1 bg-accent text-white text-xs px-2 py-0.5 rounded-full font-medium">
            F1
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
          {creator.name}
        </h1>
        <p className="text-sm text-neutral-400 mb-1">{creator.handle}</p>
        <p className="text-neutral-600 text-base leading-relaxed max-w-lg mx-auto mb-8">
          {creator.bio}
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <a href="#products" className="px-6 py-3 bg-accent text-white text-sm font-medium rounded-full hover:bg-red-700 transition-colors shadow-md shadow-red-200/50">
            Shop My Picks
          </a>
          <a href="#categories" className="px-6 py-3 bg-white text-neutral-900 text-sm font-medium rounded-full border border-neutral-200 hover:border-accent hover:text-accent transition-colors">
            My Setup
          </a>
          <a href="/collaborate" className="px-6 py-3 bg-neutral-900 text-white text-sm font-medium rounded-full hover:bg-neutral-800 transition-colors">
            Work With Me
          </a>
        </div>

        <div className="mt-10 flex justify-center gap-8 md:gap-12">
          {Object.entries(creator.stats).map(([key, val]) => (
            <div key={key} className="text-center">
              <p className="text-xl font-bold text-neutral-900">{val}</p>
              <p className="text-xs text-neutral-400 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
