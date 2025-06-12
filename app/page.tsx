import Image from "next/image";
import ButtonIcon from "./functions/buttonicon";
import OrderNowHome from "./functions/orderNowHome";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[var(--background)]">
      {/* Header with Logo */}
      <div className="bg-[var(--top-color)] h-[30vh] rounded-b-[80%] relative">
        <Image
          src="/imgs/Logo.png"
          alt="Logo"
          width={160}
          height={160}
          className="rounded-md mx-auto relative top-[7vh] md:w-[30vh]"
        />
      </div>

      {/* Order Now Section */}
      <OrderNowHome />

      {/* Footer with Buttons */}
      <footer className="fixed bottom-0 left-0 right-0 bg-[#FFDAD1] border-t border-gray-300 flex justify-evenly items-center py-2 z-50 shadow-md">
        <ButtonIcon url="icons/menu.svg" alt="Menu" address="/products" />
        <ButtonIcon url="icons/discount.svg" alt="Offers" address="/offers" />
        <ButtonIcon url="icons/account.svg" alt="Account" address="#" />
        <ButtonIcon url="icons/cart.svg" alt="Cart" address="/cart" />
      </footer>
    </div>
  );
}
