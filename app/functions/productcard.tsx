import Image from "next/image";

interface ProductCardProps {
  productName: string;
  price: number;
  line1?: string;
  line2?: string;
  line3?: string;
  line4?: string;
  line5?: string;
}

const ProductCard = ({
  productName,
  price,
  line1,
  line2,
  line3,
  line4,
  line5,
}: ProductCardProps) => {
  return (
    <article className="flex flex-row gap-[2vh] relative">
      <Image
        src="imgs/img.svg"
        width={120}
        height={60}
        alt="img"
        className=""
      />
      <div className="leading-normal">
        <h1 className="w-full line-clamp-1 font-semibold text-xl">
          {productName}
        </h1>
        {line1 && (
          <div className="text-sm leading-4">
            <p className="text-green-900 font-bold">{line1}</p>
            {line2 && <p className="text-green-900 font-bold">{line2}</p>}
            {line3 && <p className="text-green-900 font-bold">{line3}</p>}
            {line4 && <p className="text-green-900 font-bold">{line4}</p>}
            {line5 && <p className="text-green-900 font-bold">{line5}</p>}
          </div>
        )}
        <h1>₹{price}</h1>
      </div>
      <button className="bg-[#ff1a1a] text-white p-1 rounded-lg absolute bottom-1 right-2">
        Add To Cart
      </button>
    </article>
  );
};

export default ProductCard;
