import ProductCard from "@/app/functions/productcard";

interface ProductCardProps {
  open: boolean;
}

export default function ProductCategoryOffers({ open }: ProductCardProps) {
  return (
    <details
      className="mb-4 rounded-xl border border-gray-200 shadow-sm transition-all duration-300"
      open={open}
    >
      <summary
        className="font-semibold text-topcolor text-xl px-4 py-2 cursor-pointer
        bg-gradient-to-r from-orange-100 to-orange-200 sticky top-0 z-10"
      >
        Category
      </summary>

      <hr className="border-t border-gray-300 mb-4" />

      {/* Products Grid */}
      <div
        className="grid gap-4 px-4 pb-4 
        sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
      >
        <ProductCard
          productName="Paneer Cake Word Dokf Dklfj"
          price={100}
          line1="Pan cake for free"
          line2="Limited time only"
          line3="pan cake for free"
        />
      </div>
    </details>
  );
}
