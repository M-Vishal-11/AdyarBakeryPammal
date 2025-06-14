import Image from "next/image";
import OrderNowHome from "./functions/orderNowHome";
import NavbarPhone from "./functions/NavbarPhone";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[var(--background)] flex flex-col">
      {/* Header with Logo - Improved with priority loading and sizes prop */}
      <header className="bg-[var(--top-color)] h-[30vh] rounded-b-[80%] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--top-color)] to-transparent opacity-90"></div>
        <Image
          src="/imgs/Logo.png"
          alt="Company Logo"
          width={160}
          height={160}
          priority
          sizes="(max-width: 768px) 160px, 300px"
          className="rounded-md mx-auto relative top-[7vh] md:w-[30vh] object-contain drop-shadow-lg"
        />
      </header>

      {/* Main Content - Added flex-grow for proper footer positioning */}
      <main className="flex-grow">
        {/* Order Now Section - Wrapped in container for better spacing */}
        <div className="container mx-auto px-4 py-8">
          <OrderNowHome />
        </div>
      </main>

      {/* Footer Navigation - Positioned at bottom */}
      <footer className="sticky bottom-0 z-10">
        <NavbarPhone />
      </footer>
    </div>
  );
}
