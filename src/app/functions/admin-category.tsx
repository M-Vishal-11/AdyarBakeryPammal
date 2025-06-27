import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import AdminProductCard from "./admin-productCard";
import DropdownSVG from "../../components/icons/svgs/DropdownSVG";

interface AdminCategoryProps {
  category: string;
  expand: boolean;
}

export default function AdminCategory({
  category,
  expand,
}: AdminCategoryProps) {
  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8 transition-all duration-300 hover:shadow-xl">
        <details className="group" open={expand}>
          <summary className="flex justify-between items-center p-6 cursor-pointer bg-gradient-to-r from-orange-100 to-orange-200 hover:from-orange-200 hover:to-orange-300 transition-all duration-300">
            <div className="flex items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {category}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href={`/admin-dashboard/add-product?category=${category}`}
                className="p-2 bg-green-500 hover:bg-green-600 rounded-full text-white transition-colors duration-300 flex items-center justify-center"
                title="Add Product"
              >
                <FiPlus className="text-lg" />
              </Link>
              <DropdownSVG />
            </div>
          </summary>

          <div className="p-6 pt-0">
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <AdminProductCard
                productName="Paneer Cake"
                price={100}
                discountedPrice={80}
                line1="Pan cake for free"
                line2="Limited time only"
              />
              <AdminProductCard
                productName="Simple Cake"
                price={120}
                line1="Classic recipe"
                line2="Best seller"
              />
            </div>
          </div>
        </details>
      </div>
    </>
  );
}
