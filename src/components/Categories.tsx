import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { categories } from "@/data/products";

export default function Categories() {
  return (
    <section id="categories" className="py-16 px-4 bg-red-50/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
            Browse by Category
          </h2>
          <p className="text-neutral-500 text-sm">
            Everything organized by how I use it.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group flex items-center gap-4 bg-white rounded-2xl p-5 border border-red-100/60 hover:border-accent/30 hover:shadow-lg hover:shadow-red-100/30 transition-all duration-300"
            >
              <span className="text-3xl">{cat.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-neutral-900 text-sm group-hover:text-accent transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5 truncate">{cat.description}</p>
              </div>
              <ChevronRight size={18} className="text-neutral-300 group-hover:text-accent group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
