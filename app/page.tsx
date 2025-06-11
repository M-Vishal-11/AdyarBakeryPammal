import Image from "next/image";
import ButtonIcon from "./functions/buttonicon";
import OrderNowHome from "./functions/orderNowHome";

export default function Home() {
  return (
    <div>
      <div className="bg-[#b02b03] h-[30vh] rounded-b-[80%]">
        <Image
          src="/imgs/Logo.png"
          alt="Logo"
          width={160}
          height={160}
          className="rounded-md mx-auto relative top-[7vh] md:w-[30vh]"
        />
      </div>
      <OrderNowHome />
      <footer className="absolute bottom-3 w-full bg-[#FFDAD1] flex flex-row justify-evenly items-center py-1">
        <ButtonIcon url="icons/menu.svg" alt="menu" address="/products" />
        <ButtonIcon url="icons/discount.svg" alt="discount" address="/offers" />
        <ButtonIcon url="icons/account.svg" alt="account" address="#" />
        <ButtonIcon url="icons/cart.svg" alt="cart" address="/cart" />
      </footer>
    </div>
  );
}
