"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";

// Lazy load components that aren't immediately needed
const NavbarPhone = dynamic(() => import("../functions/NavbarPhone"), {
  loading: () => <div className="h-16" />,
  ssr: false,
});

// Static SVG components - optimized with memo
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path
      d="M21 21L15 15M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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

const socialLinks = [
  {
    icon: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
    name: "Facebook",
    url: "https://facebook.com",
  },
  {
    icon: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z",
    name: "Instagram",
    url: "https://instagram.com",
  },
  {
    icon: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84",
    name: "Twitter",
    url: "https://twitter.com",
  },
];

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
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsClient(true);
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

          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Search products..."
              className="bg-white/90 text-gray-800 p-3 rounded-full w-full pl-5 pr-12 focus:ring-2 focus:ring-[#FF6B6B] focus:outline-none transition-all duration-200 shadow-sm"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-[#FF6B6B] p-2 rounded-full hover:bg-[#e60000] transition-colors duration-200">
              <SearchIcon />
            </button>
          </div>

          <div className="flex items-center space-x-6">
            <Link
              href="/cart"
              className="flex items-center gap-2 text-background hover:text-[#FF6B6B] transition-colors duration-200 relative"
            >
              <CartIcon />
              <span className="font-medium text-lg">Cart</span>
              <span className="absolute -top-1 -right-2 bg-[#FF6B6B] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
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

          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search..."
              className="bg-white/90 text-gray-800 p-2 rounded-full w-full pl-4 pr-10 focus:ring-2 focus:ring-[#FF6B6B] focus:outline-none transition-all duration-200 text-sm"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <SearchIcon />
            </button>
          </div>
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

              <div className="flex space-x-5">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    aria-label={social.name}
                    className="text-background/80 hover:text-[#FF6B6B] transition-colors duration-200"
                  >
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d={social.icon}
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Navigation - Client-side only */}
      {isClient && (
        <div className="lg:hidden">
          <NavbarPhone />
        </div>
      )}
    </div>
  );
}
