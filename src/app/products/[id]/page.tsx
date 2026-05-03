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
        <p className="text-white/40">Product not found.</p>
        <Link href="/" className="text-accent text-sm mt-4 inline-block">← Back home</Link>
      </div>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="pt-28 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/#products" className="inline-flex items-center gap-1.5 text-sm text-white/30 hover:text-accent mb-8 transition-colors duration-300">
          <ArrowLeft size={16} /> Back to all products
        </Link>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="relative aspect-square rounded-2xl overflow-hidden glass-card">
            <Image src={product.image} alt={product.name} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a]/60 via-transparent to-transparent" />
            {product.isFavorite && (
              <span className="absolute top-4 left-4 btn-neon text-white text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                <Star size={12} fill="currentColor" /> Creator Favorite
              </span>
            )}
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-xs text-white/20 uppercase tracking-wider mb-2 font-mono">
              {product.category.replace("-", " ")}
            </span>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">{product.name}</h1>
            <p className="text-3xl font-bold gradient-text mb-5 font-display">{product.price}</p>
            <p className="text-white/50 text-sm leading-relaxed mb-8">{product.review || product.description}</p>
            <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer"
              className="btn-neon inline-flex items-center justify-center gap-2 text-white px-8 py-4 rounded-full font-semibold text-sm w-full md:w-auto">
              Buy Now <ExternalLink size={14} />
            </a>
            <p className="text-[11px] text-white/20 mt-3">Affiliate link — I may earn a small commission at no extra cost to you.</p>
          </div>
        </div>
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-xl font-bold text-white mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {related.map((p) => (<ProductCard key={p.id} product={p} />))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
