"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import Link from "next/link";

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

// Pre-calculate static values outside component
const currentYear = new Date().getFullYear();
const yearsOfService = currentYear - 2003;

const footerSections = [
  {
    title: "Shop",
    items: {
      "All Products": "/shop",
      Offers: "/offers",
      Account: "/account",
    },
  },
  {
    title: "Contact",
    items: {
      "Email Us": "mailto:moorthy@gmail.com",
      "+91 9841733588": "tel:+919841733588",
    },
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
      <footer className="bg-topcolor text-background w-full py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row justify-between gap-10 mb-10">
            <div className="flex flex-col items-center lg:items-start">
              <Image
                src="/imgs/Logo.png"
                height={80}
                width={90}
                alt="Logo"
                className="mb-4"
              />
              <p className="text-background/80 text-sm max-w-xs text-center lg:text-left">
                We are serving since 2003 ({yearsOfService}
                {"+ "}
                Years)
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {footerSections.map((section) => (
                <div key={section.title}>
                  <h3 className="font-semibold text-lg mb-4 relative pb-2 after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-[#FF6B6B]">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {Object.entries(section.items).map(([key, val]) => (
                      <li key={key}>
                        <Link
                          href={val}
                          className="text-background/80 hover:text-[#FF6B6B] transition-colors duration-200 text-sm"
                        >
                          {key}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-background/20 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-background/70 text-sm">
                &copy; {currentYear} Your Brand. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
