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
      className={`relative rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 ${
        isAvailable ? "bg-white" : "bg-gray-100"
      }`}
    >
      {/* Out of Stock Badge */}
      {!isAvailable && (
        <div className="absolute top-3 right-3 bg-gray-800/80 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1.5 rounded-lg z-10 shadow-md">
          Out of Stock
        </div>
      )}

      {/* Image Section */}
      <div className="relative h-52 w-full bg-gray-200">
        {imageURL && <ImageClicked imageURL={imageURL} />}
        {discountedPrice && isAvailable && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md">
            {Math.round(((price - discountedPrice) / price) * 100)}% OFF
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="p-5 flex flex-col flex-grow">
        <h1
          className={`text-lg font-semibold mb-1 line-clamp-1 ${
            isAvailable ? "text-gray-900" : "text-gray-500"
          }`}
        >
          {productName}
        </h1>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          {discountedPrice ? (
            <>
              <span className="text-xl font-bold text-orange-500">
                ₹{discountedPrice}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ₹{price}
              </span>
            </>
          ) : (
            <span
              className={`text-xl font-bold ${
                isAvailable ? "text-gray-800" : "text-gray-400"
              }`}
            >
              ₹{price}
            </span>
          )}
        </div>

        {/* Description */}
        <div className="space-y-1 text-sm text-gray-600 flex-grow">
          {descriptions &&
            descriptions.map((line, i) => (
              <p
                key={i}
                className={`line-clamp-1 ${
                  isAvailable ? "text-gray-600" : "text-gray-400"
                }`}
              >
                {line}
              </p>
            ))}
        </div>
      </div>

      {/* Add to Cart */}
      <div className="px-5 pb-5">
        <AddToCartBtn
          disabled={!isAvailable}
          isAvailable={isAvailable}
          productName={productName}
          userQnty={qnty}
          setChanged={setChanged}
        />
      </div>
    </article>
  );
};

export default ProductCard;
