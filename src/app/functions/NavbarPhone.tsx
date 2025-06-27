"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OffersSVG from "@/components/icons/svgs/OffersSVG";
import ShopSVG from "@/components/icons/svgs/ShopSVG";
import AccountSVG from "@/components/icons/svgs/AccountSVG";
import CartSVG from "@/components/icons/svgs/CartSVG";

const NavbarPhone = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("");
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll direction for hide/show behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsScrollingUp(false);
      } else {
        setIsScrollingUp(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Set active tab based on route
  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes("/offers")) setActiveTab("offers");
    else if (path.includes("/shop")) setActiveTab("shop");
    else if (path.includes("/cart")) setActiveTab("cart");
    else if (path.includes("/account")) setActiveTab("account");
  }, []);

  const handleNavigation = (path: string) => {
    setActiveTab(path.split("/")[1]);
    router.push(path);
  };

  const tabs = [
    {
      id: "offers",
      path: "/offers",
      icon: <OffersSVG />,
      label: "Offers",
    },
    {
      id: "shop",
      path: "/shop",
      icon: <ShopSVG />,
      label: "Shop",
    },
    {
      id: "account",
      path: "/account",
      icon: <AccountSVG />,
      label: "Account",
    },
    {
      id: "cart",
      path: "/cart",
      icon: <CartSVG />,
      label: "Cart",
    },
  ];

  return (
    <AnimatePresence>
      {isScrollingUp && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-3 z-50 shadow-lg"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => handleNavigation(tab.path)}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center justify-center relative"
            >
              <div
                className={`p-3 rounded-full transition-colors duration-300 ${
                  activeTab === tab.id ? "bg-[#FFDAD1]" : "bg-transparent"
                }`}
              >
                {tab.icon}
              </div>
              <span
                className={`text-xs mt-1 font-medium transition-colors duration-300 ${
                  activeTab === tab.id ? "text-black" : "text-gray-500"
                }`}
              >
                {tab.label}
              </span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute top-0 w-full h-1 bg-[#FF6B6B]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavbarPhone;
