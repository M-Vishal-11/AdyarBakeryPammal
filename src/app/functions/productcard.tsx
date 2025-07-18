import AddToCartBtn from "./AddToCartbtn";
import ImageClicked from "./ImageClicked";

interface ProductCardProps {
  productName: string;
  price: number;
  discountedPrice?: number;
  descriptions?: string[];
  isAvailable: boolean;
  imageURL: string;
  qnty?: number;
  setChanged?: (change: { productName: string; value: number }) => void;
}

const ProductCard = ({
  productName,
  price,
  discountedPrice,
  descriptions,
  isAvailable,
  imageURL,
  qnty,
  setChanged,
}: ProductCardProps) => {
  return (
    <article
      className={`relative rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden ${
        isAvailable ? "bg-[#ffebe6]" : "bg-gray-100"
      }`}
    >
      {/* Out of Stock Badge - Only shown when not available */}
      {!isAvailable && (
        <div className="absolute top-3 right-3 bg-gray-700 text-white text-xs font-bold px-2 py-1 rounded z-10">
          Out of Stock
        </div>
      )}

      <div
        className={`flex flex-col h-full ${!isAvailable ? "opacity-75" : ""}`}
      >
        {/* Product Image */}
        <div className="relative h-48 w-full overflow-hidden bg-gray-200">
          {imageURL && <ImageClicked imageURL={imageURL} />}
          {discountedPrice && isAvailable && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {Math.round(((price - discountedPrice) / price) * 100)}% OFF
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 flex-grow">
          <h1
            className={`text-lg font-bold mb-1 line-clamp-1 ${
              isAvailable ? "text-gray-800" : "text-gray-500"
            }`}
          >
            {productName}
          </h1>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            {discountedPrice ? (
              <>
                <span
                  className={`text-lg font-bold ${
                    isAvailable ? "text-orange-500" : "text-gray-400"
                  }`}
                >
                  ₹{discountedPrice}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ₹{price}
                </span>
              </>
            ) : (
              <span
                className={`text-lg font-bold ${
                  isAvailable ? "text-gray-800" : "text-gray-400"
                }`}
              >
                ₹{price}
              </span>
            )}
          </div>

          {/* Description Lines */}
          <div className="space-y-1 text-sm">
            {descriptions &&
              descriptions.map((line, i) => (
                <p
                  className={`line-clamp-1 ${
                    isAvailable ? "text-gray-600" : "text-gray-400"
                  }`}
                  key={i}
                >
                  {line}
                </p>
              ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <div className="px-4 pb-4">
          <AddToCartBtn
            disabled={!isAvailable}
            isAvailable={isAvailable}
            productName={productName}
            userQnty={qnty}
            setChanged={setChanged}
          />
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
