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
        <p className="text-neutral-500">Category not found.</p>
        <Link href="/" className="text-accent text-sm mt-4 inline-block">← Back home</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/#categories" className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-accent mb-8 transition-colors">
          <ArrowLeft size={16} /> All categories
        </Link>
        <div className="text-center mb-10">
          <span className="text-4xl mb-3 block">{category.icon}</span>
          <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">{category.name}</h1>
          <p className="text-neutral-500 text-sm max-w-md mx-auto">{category.description}</p>
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
