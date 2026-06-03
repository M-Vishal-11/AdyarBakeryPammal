import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import ClientWrapper from "./functions/ClientWrapper";

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

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "pk_test_Y29udGFjdC11cy1jbGVyay1rZXktOTkuY2xlcmsuYWNjb3VudHMuZGV2JA";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <html lang="en" className="scroll-smooth">
        <body
          className={`${montserrat.variable} antialiased min-h-full flex flex-col`}
        >
          {children}
          <ClientWrapper /> {/* contains navbar */}
          <Toaster position="top-center" />
        </body>
      </html>
    </ClerkProvider>
  );
}
