"use client";
import { useEffect, useState } from "react";
import NavbarPhone from "./NavbarPhone";
import { usePathname } from "next/navigation";

export default function ClientWrapper() {
  const [isClient, setIsClient] = useState(false);
  const pathNames = usePathname();

  const noNavBar = ["/waiting", "/orderAccepted"];
  const hideNavBar = noNavBar.includes(pathNames);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
    <div className="lg:hidden">{!hideNavBar && <NavbarPhone />}</div>
  ) : null;
}
