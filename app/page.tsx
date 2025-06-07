import Image from "next/image";

export default function Home() {
  const text = "[#b02b03]";
  const bg = "[#ffebe6]";
  return (
    <div>
      <div className="bg-[#b02b03] h-[40vh] rounded-b-[80%]">
        <Image
          src="/imgs/Logo.png"
          alt="Logo"
          width={150}
          height={150}
          className="rounded-md mx-auto relative top-[7vh] md:w-[35vh]"
        />
      </div>
      <button
        style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }}
        className="bg-[#b02b03] text-[4.5vh] text-[#ffebe6] p-[1.5vh] rounded-xl block mx-auto mt-[15vh]"
      >
        Order Now
      </button>
      <footer className="absolute bottom-3 w-full bg-[#FFDAD1] flex flex-row justify-evenly items-center py-1">
        <Image
          src="icons/menu.svg"
          height={54}
          width={54}
          alt="menu"
          className="w-[7.5vh]"
        />
        <Image
          src="icons/discount.svg"
          height={54}
          width={54}
          alt="discount"
          className="w-[7.5vh]"
        />
        <Image
          src="icons/account.svg"
          height={54}
          width={54}
          alt="account"
          className="w-[7.5vh]"
        />
        <Image
          src="icons/cart.svg"
          height={54}
          width={54}
          alt="cart"
          className="w-[7.5vh]"
        />
      </footer>
    </div>
  );
}
