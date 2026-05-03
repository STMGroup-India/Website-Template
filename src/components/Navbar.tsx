"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/#products", label: "Products" },
    { href: "/#categories", label: "Categories" },
    { href: "/#content", label: "Content" },
    { href: "/collaborate", label: "Collaborate" },
  ];

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 glass-nav rounded-2xl max-w-6xl mx-auto">
      <div className="px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-display text-lg font-bold tracking-tight text-white">
          ALEX<span className="gradient-text">TORQUE</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href}
              className="text-sm text-white/40 hover:text-white px-4 py-2 rounded-xl hover:bg-white/[0.06] transition-all duration-300">
              {l.label}
            </Link>
          ))}
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-white/60 hover:text-white transition-colors" aria-label="Toggle menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4 border-t border-white/[0.05]">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="block py-3 text-sm text-white/50 hover:text-white transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
