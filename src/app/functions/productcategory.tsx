import DropdownSVG from "../../components/icons/svgs/DropdownSVG";
import ProductCard from "./productcard";

interface ProductCardProps {
  open: boolean;
  category: string;
}

export default function ProductCategory({
  open = true,
  category,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 transition-all duration-300 hover:shadow-xl">
      <details className="group" open={open}>
        <summary className="flex justify-between items-center p-6 cursor-pointer bg-gradient-to-r from-orange-100 to-orange-200 hover:from-orange-200 hover:to-orange-300 transition-all duration-300 mb-3">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold text-gray-800">{category}</h2>
          </div>
          <div className="flex items-center gap-3">
            <DropdownSVG />
          </div>
        </summary>

        <div className="p-6 pt-0">
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <ProductCard
              productName="Paneer Cake Word Dokf Dklfj"
              price={100}
              line1="Pan cake for free"
              line2="Limited time only"
              line3="pan cake for free"
            />
            <ProductCard productName="Simple Cake" price={100} />
            <ProductCard productName="Choco Lava Cake" price={120} />
            <ProductCard productName="Vanilla Delight" price={90} />
            <ProductCard productName="Classic Brownie" price={80} />
            <ProductCard productName="Blueberry Pie" price={110} />
          </div>
        </div>
      </details>
    </div>
  );
}
