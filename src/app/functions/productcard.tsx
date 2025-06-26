import AddToCartbtn from "./AddToCartbtn";
import ImageClicked from "./ImageClicked";

interface ProductCardProps {
  productName: string;
  price: number;
  discountedPrice?: number;
  line1?: string;
  line2?: string;
  line3?: string;
  line4?: string;
  line5?: string;
}

const ProductCard = ({
  productName,
  price,
  discountedPrice,
  line1,
  line2,
  line3,
  line4,
  line5,
}: ProductCardProps) => {
  return (
    <article className="flex gap-4 bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-shadow duration-200 relative ">
      <div className="flex-shrink-0">
        <ImageClicked />
      </div>

      <div className="flex flex-col justify-between w-full">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 line-clamp-1">
            {productName}
          </h1>
          <div className="mt-1 space-y-1 text-green-700 text-sm font-medium leading-snug">
            {line1 && <p>{line1}</p>}
            {line2 && <p>{line2}</p>}
            {line3 && <p>{line3}</p>}
            {line4 && <p>{line4}</p>}
            {line5 && <p>{line5}</p>}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          {discountedPrice ? (
            <div className="flex flex-col">
              <span className="text-sm line-through text-gray-500">
                ₹{price}
              </span>
              <span className="text-lg font-bold text-green-700">
                ₹{discountedPrice}
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold text-black">₹{price}</span>
          )}
          <AddToCartbtn />
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
