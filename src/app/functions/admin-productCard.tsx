import Link from "next/link";
import ImageClicked from "./ImageClicked";
import { useState } from "react";
import Availabilitybtn from "./admin-availablebtn";

interface adminProductCardProps {
  productName: string;
  price: number;
  discountedPrice?: number;
  descriptions?: Array<string>;
}

const AdminProductCard = ({
  productName,
  price,
  discountedPrice,
  descriptions,
}: adminProductCardProps) => {
  const [isAvailable, setIsAvailable] = useState(true);

  return (
    <article className="relative bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="flex flex-col h-full">
        {/* Product Image */}
        <div className="relative h-48 w-full overflow-hidden bg-gray-100">
          <ImageClicked />
          {discountedPrice && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {Math.round(((price - discountedPrice) / price) * 100)}% OFF
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 flex-grow">
          <Link
            href={`/admin-dashboard/productDetails?productName=${productName}`}
          >
            <h1 className="text-lg font-bold text-gray-800 mb-1 hover:text-orange-500 active:text-orange-500 transition-colors duration-300 line-clamp-1">
              {productName}
            </h1>
          </Link>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            {discountedPrice ? (
              <>
                <span className="text-lg font-bold text-orange-500">
                  ₹{discountedPrice}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ₹{price}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-800">₹{price}</span>
            )}
          </div>

          {/* Description Lines */}
          <div className="space-y-1 text-sm text-gray-600">
            {descriptions &&
              descriptions.map((line, i) => (
                <p key={i} className="line-clamp-1">
                  {line}
                </p>
              ))}
          </div>
        </div>

        {/* Availability Toggle */}
        <div className="px-4 pb-4">
          <Availabilitybtn
            isAvailable={isAvailable}
            setIsAvailable={setIsAvailable}
          />
        </div>
      </div>
    </article>
  );
};

export default AdminProductCard;
