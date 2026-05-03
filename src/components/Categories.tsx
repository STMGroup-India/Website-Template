import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { categories } from "@/data/products";

export default function Categories() {
  return (
    <section id="categories" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-violet text-xs font-semibold uppercase tracking-widest mb-3">Explore</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
            Browse by Category
          </h2>
          <p className="text-white/40 text-sm">
            Everything organized by how I use it.
          </p>
          <div className="shimmer-line w-24 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group glass-card flex items-center gap-4 rounded-2xl p-6"
            >
              <span className="text-4xl">{cat.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white text-sm group-hover:text-accent-light transition-colors duration-300">
                  {cat.name}
                </h3>
                <p className="text-xs text-white/30 mt-0.5 truncate">{cat.description}</p>
              </div>
              <ChevronRight size={18} className="text-white/10 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
