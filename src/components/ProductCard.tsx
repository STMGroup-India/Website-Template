import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Star } from "lucide-react";
import { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group glass-card rounded-2xl overflow-hidden">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/30 to-transparent opacity-80" />

        {product.isFavorite && (
          <span className="absolute top-3 left-3 btn-neon text-white text-[10px] px-2.5 py-1 rounded-full font-semibold flex items-center gap-1">
            <Star size={10} fill="currentColor" /> Favorite
          </span>
        )}

        {/* Price floating badge */}
        <div className="absolute bottom-3 right-3 glass-card rounded-full px-3 py-1.5">
          <span className="text-sm font-bold text-white font-display">{product.price}</span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-white text-sm leading-snug group-hover:text-accent-light transition-colors duration-300">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-white/30 line-clamp-2">{product.description}</p>
        <a
          href={product.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-white btn-neon px-4 py-2 rounded-full w-full justify-center"
        >
          Shop Now <ExternalLink size={12} />
        </a>
      </div>
    </div>
  );
}
