import Image from "next/image";
import OrderNowHome from "./functions/orderNowHome";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#ffebe6] flex flex-col items-center">
      {/* Simplified Header */}
      <header className="w-full bg-[#b02b03] py-8 md:py-12 flex justify-center rounded-b-3xl shadow-md">
        <div className="relative w-40 h-40 md:w-48 md:h-48">
          <Image
            src="/imgs/Logo.png"
            alt="Company Logo"
            fill
            priority
            className="object-contain drop-shadow-md"
          />
        </div>
      </header>

      {/* Clean Main Content */}
      <main className="flex-1 w-full max-w-3xl px-4 flex flex-col items-center">
        {/* Minimal Hero Text */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#333] mt-12 mb-6 text-center">
          Taste the Difference
        </h1>

        {/* Simple Down Arrow */}
        <div className="mt-5 mb-5 animate-bounce">
          <svg
            className="w-8 h-8 text-[#b02b03]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>

        {/* Prominent CTA Button */}
        <OrderNowHome />
      </main>
    </div>
  );
}
