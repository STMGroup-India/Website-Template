import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Star } from "lucide-react";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);
  if (!product) {
    return (
      <div className="pt-28 pb-16 px-4 text-center">
        <p className="text-neutral-500">Product not found.</p>
        <Link href="/" className="text-accent text-sm mt-4 inline-block">← Back home</Link>
      </div>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/#products" className="inline-flex items-center gap-1.5 text-sm text-neutral-400 hover:text-accent mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to all products
        </Link>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-neutral-50 border border-red-100/40">
            <Image src={product.image} alt={product.name} fill className="object-cover" priority />
            {product.isFavorite && (
              <span className="absolute top-4 left-4 bg-accent text-white text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1">
                <Star size={12} fill="currentColor" /> Creator Favorite
              </span>
            )}
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-xs text-neutral-400 uppercase tracking-wider mb-2">
              {product.category.replace("-", " ")}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">{product.name}</h1>
            <p className="text-2xl font-bold text-accent mb-4">{product.price}</p>
            <p className="text-neutral-600 text-sm leading-relaxed mb-6">{product.review || product.description}</p>
            <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-accent text-white px-8 py-3.5 rounded-full font-medium text-sm hover:bg-red-700 transition-colors w-full md:w-auto shadow-md shadow-red-200/40">
              Buy Now <ExternalLink size={14} />
            </a>
            <p className="text-[11px] text-neutral-400 mt-3">Affiliate link — I may earn a small commission at no extra cost to you.</p>
          </div>
        </div>
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-neutral-900 mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {related.map((p) => (<ProductCard key={p.id} product={p} />))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
