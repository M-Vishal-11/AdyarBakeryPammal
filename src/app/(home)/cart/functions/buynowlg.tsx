"use client";
import { useRouter } from "next/navigation";

const BuyNowlg = ({ cartData }: { cartData: { [key: string]: number } }) => {
  const router = useRouter();
  const isCartEmpty = Object.keys(cartData).length <= 0;

  return (
    <button
      onClick={() => {
        if (!isCartEmpty) router.push("/address");
      }}
      disabled={isCartEmpty}
      className={`hidden lg:block text-white p-4 shadow-md text-2xl w-52 rounded-xl mb-5 
        cursor-pointer transition-all duration-200 ${
          isCartEmpty
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-amber-500 hover:bg-amber-600 active:bg-amber-600 hover:shadow-lg active:scale-90"
        }`}
      aria-disabled={isCartEmpty}
      title={isCartEmpty ? "Your cart is empty" : "Proceed to checkout"}
    >
      {isCartEmpty ? "Cart Empty" : "Buy Now"}
    </button>
  );
};

export default BuyNowlg;
