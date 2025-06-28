"use client";
import { useRouter } from "next/navigation";

const BuyNowPhone = ({ cartData }: { cartData: { [key: string]: number } }) => {
  const router = useRouter();
  const isCartEmpty = Object.keys(cartData).length <= 0;

  return (
    <button
      onClick={() => {
        if (!isCartEmpty) router.push("/address");
      }}
      disabled={isCartEmpty}
      className={`inline-block lg:hidden text-white shadow-md text-lg w-30 rounded-xl mb-5 p-2 ml-auto mt-3 mr-2 
        transition-all duration-200 ${
          isCartEmpty
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-amber-500 hover:bg-amber-600 active:bg-amber-600 hover:shadow-lg active:scale-90 cursor-pointer"
        }`}
      aria-disabled={isCartEmpty}
      title={isCartEmpty ? "Your cart is empty" : "Proceed to checkout"}
    >
      {isCartEmpty ? "Cart Empty" : "Buy Now"}
    </button>
  );
};

export default BuyNowPhone;
