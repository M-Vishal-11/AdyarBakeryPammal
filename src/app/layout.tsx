import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";

// const playfair = Playfair({
//   variable: "--font-playfair-head",
//   subsets: ["latin"],
// });

const montserrat = Montserrat({
  variable: "--font-montserrat", // fixed typo
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adyar Bakery Pammal",
  description: "door step delivery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="scroll-smooth">
        <body
          className={`${montserrat.variable} antialiased min-h-full flex flex-col`}
        >
          {children}
          <Toaster position="top-center" />
        </body>
      </html>
    </ClerkProvider>
  );
}
