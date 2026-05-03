import { products } from "@/data/products";
import ProductCard from "./ProductCard";

export default function TopProducts() {
  const featured = products.filter((p) => p.isFavorite).slice(0, 6);

  return (
    <section id="products" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-accent text-xs font-semibold uppercase tracking-widest mb-3">Curated Picks</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">
            Top Recommended Products
          </h2>
          <p className="text-white/40 text-sm max-w-md mx-auto">
            The gear I actually use and love — no fluff, just honest picks.
          </p>
          <div className="shimmer-line w-24 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
