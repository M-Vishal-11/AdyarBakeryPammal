import ProductCard from "./productcard";

interface ProductCardProps {
  open: boolean;
}

export default function ProductCategory({ open }: ProductCardProps) {
  return (
    <details className="mb-2 transition:open duration-200" open={open}>
      <summary className="font-semibold text-topcolor text-xl ml-2 mt-3 sticky top-0">
        Category
      </summary>
      <hr className="mb-2" />
      {/* Products */}

      <div className="flex flex-col gap-[3vh] lg:grid lg:grid-cols-2 lg:gap-[6vh] lg:mr-4">
        <ProductCard
          productName="paneer cake word dokf dklfj"
          price={100}
          line1="pan cake for free"
          line2="pan cake for free"
          line3="pan cake for free"
        />
        <ProductCard productName="paneer cake word dokf dklfj" price={100} />
        <ProductCard productName="paneer cake word dokf dklfj" price={100} />
        <ProductCard productName="paneer cake word dokf dklfj" price={100} />
        <ProductCard productName="paneer cake word dokf dklfj" price={100} />
        <ProductCard productName="paneer cake word dokf dklfj" price={100} />
      </div>
    </details>
  );
}
