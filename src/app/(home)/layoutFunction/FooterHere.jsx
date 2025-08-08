"use client";

import Image from "next/image";
import Link from "next/link";

const currentYear = new Date().getFullYear();
const yearsOfService = currentYear - 2003;

const footerSections = [
  {
    title: "Company",
    items: {
      About: "/about",
      Careers: "/careers",
      Contact: "/contact",
    },
  },
  {
    title: "Support",
    items: {
      Help: "/help",
      FAQ: "/faq",
    },
  },
  // Add more sections as needed
];

export default function FooterHere() {
  return (
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
              We are serving since 2003 ({yearsOfService}+ Years)
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
  );
}
