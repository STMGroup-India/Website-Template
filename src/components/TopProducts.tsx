import { products } from "@/data/products";
import ProductCard from "./ProductCard";

export default function TopProducts() {
  const featured = products.filter((p) => p.isFavorite).slice(0, 6);

  return (
    <section id="products" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
            Top Recommended Products
          </h2>
          <p className="text-neutral-500 text-sm">
            The gear I actually use and love — no fluff, just honest picks.
          </p>
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
