import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Star } from "lucide-react";
import { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group bg-white rounded-2xl border border-red-100/60 overflow-hidden hover:shadow-xl hover:shadow-red-100/40 transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-square bg-neutral-50 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.isFavorite && (
          <span className="absolute top-3 left-3 bg-accent text-white text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
            <Star size={12} fill="currentColor" /> Creator Favorite
          </span>
        )}
      </div>

      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-neutral-900 text-sm leading-snug mb-1 group-hover:text-accent transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-neutral-500 line-clamp-2 mb-3">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-neutral-900">{product.price}</span>
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-white bg-accent px-3.5 py-2 rounded-full hover:bg-red-700 transition-colors"
          >
            Shop Now <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}
