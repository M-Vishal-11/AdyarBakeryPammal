"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
// import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";

// Static SVG components - optimized with memo

const CartIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <path
      d="M4 7V5a1 1 0 011-1h14a1 1 0 011 1v2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20 7H4a1 1 0 00-1 1v11a2 2 0 002 2h14a2 2 0 002-2V8a1 1 0 00-1-1z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 11a4 4 0 11-8 0"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FooterHere = dynamic(
  () => import("@/app/(home)/layoutFunction/FooterHere"),
  {
    ssr: false,
  }
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // stop watching after first load
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = observerRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Desktop Header */}
      <header
        className={`bg-topcolor w-full py-2 hidden lg:block sticky top-0 z-50 transition-shadow duration-300 mb-[3vh] ${
          scrolled ? "shadow-lg" : ""
        }`}
      >
        <div className="container mx-auto flex justify-between items-center px-6">
          <div className="flex items-center space-x-10">
            <Link href="/" passHref>
              <Image
                src="/imgs/Logo.png"
                height={90}
                width={100}
                alt="Logo"
                priority
                className="hover:scale-105 transition-transform duration-200"
              />
            </Link>

            <nav className="flex space-x-8">
              {["Offers", "Shop", "Account"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-background hover:text-[#FF6B6B] transition-colors duration-200 font-medium text-lg relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6B6B] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-6">
            <Link
              href="/cart"
              className="flex items-center gap-2 text-background hover:text-[#FF6B6B] transition-colors duration-200 relative"
            >
              <CartIcon />
              <span className="font-medium text-lg">Cart</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header
        className={`bg-topcolor w-full py-3 lg:hidden sticky top-0 z-40 transition-shadow duration-300 mb-[3vh] ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" passHref>
            <Image
              src="/imgs/Logo.png"
              height={70}
              width={80}
              alt="Logo"
              priority
              className="hover:scale-105 transition-transform duration-200"
            />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <div ref={observerRef}>
        {isVisible ? (
          <FooterHere />
        ) : (
          <div className="h-64 bg-gray-300 animate-pulse">Loading...</div>
        )}
      </div>
    </div>
  );
}
