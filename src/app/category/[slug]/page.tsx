import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = categories.find((c) => c.slug === params.slug);
  const categoryProducts = products.filter((p) => p.category === params.slug);

  if (!category) {
    return (
      <div className="pt-28 pb-16 px-4 text-center">
        <p className="text-white/40">Category not found.</p>
        <Link href="/" className="text-accent text-sm mt-4 inline-block">← Back home</Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/#categories" className="inline-flex items-center gap-1.5 text-sm text-white/30 hover:text-accent mb-8 transition-colors duration-300">
          <ArrowLeft size={16} /> All categories
        </Link>
        <div className="text-center mb-14">
          <span className="text-5xl mb-4 block">{category.icon}</span>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">{category.name}</h1>
          <p className="text-white/40 text-sm max-w-md mx-auto">{category.description}</p>
          <div className="shimmer-line w-24 mx-auto mt-6" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
