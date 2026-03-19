import Link from "next/link";
import { creator } from "@/data/creator";

export default function Footer() {
  return (
    <footer className="relative z-20 bg-neutral-900 text-neutral-400 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <Link href="/" className="text-lg font-bold text-white tracking-tight">
              ALEX<span className="text-accent">TORQUE</span>
            </Link>
            <p className="text-xs mt-1">F1 Content Creator & Affiliate Partner</p>
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/#products" className="hover:text-white transition-colors">Products</Link>
            <Link href="/collaborate" className="hover:text-white transition-colors">Collaborate</Link>
            <Link href="/admin" className="hover:text-white transition-colors">Admin</Link>
          </div>
          <div className="flex gap-4">
            {Object.entries(creator.socials).map(([platform, url]) => (
              <a key={platform} href={url} target="_blank" rel="noopener noreferrer" className="text-xs capitalize hover:text-white transition-colors">
                {platform}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-neutral-800 text-center text-xs">
          <p>© {new Date().getFullYear()} {creator.name}. All rights reserved.</p>
          <p className="mt-1 text-neutral-600">Some links are affiliate links. I may earn a commission at no extra cost to you.</p>
          <p className="mt-1 text-neutral-600">Powered by STM Groups</p>
        </div>
      </div>
    </footer>
  );
}
