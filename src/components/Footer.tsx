import Link from "next/link";
import { creator } from "@/data/creator";

export default function Footer() {
  return (
    <footer className="relative z-20 border-t border-white/[0.05] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <Link href="/" className="font-display text-lg font-bold text-white tracking-tight">
              ALEX<span className="gradient-text">TORQUE</span>
            </Link>
            <p className="text-xs text-white/20 mt-1">F1 Content Creator & Affiliate Partner</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm">
            <Link href="/" className="text-white/30 hover:text-white transition-colors duration-300">Home</Link>
            <Link href="/#products" className="text-white/30 hover:text-white transition-colors duration-300">Products</Link>
            <Link href="/collaborate" className="text-white/30 hover:text-white transition-colors duration-300">Collaborate</Link>
            <Link href="/admin" className="text-white/30 hover:text-white transition-colors duration-300">Admin</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {Object.entries(creator.socials).map(([platform, url]) => (
              <a key={platform} href={url} target="_blank" rel="noopener noreferrer"
                className="text-xs capitalize text-white/20 hover:text-white transition-colors duration-300">
                {platform}
              </a>
            ))}
          </div>
        </div>
        <div className="shimmer-line mt-8 mb-6" />
        <div className="text-center text-xs">
          <p className="text-white/30">© {new Date().getFullYear()} {creator.name}. All rights reserved.</p>
          <p className="mt-1 text-white/15">Some links are affiliate links. I may earn a commission at no extra cost to you.</p>
          <p className="mt-1 text-white/15">Powered by STM Groups</p>
        </div>
      </div>
    </footer>
  );
}
