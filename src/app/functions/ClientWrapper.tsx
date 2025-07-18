"use client";
import { useEffect, useState } from "react";
import NavbarPhone from "./NavbarPhone";

export default function ClientWrapper() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
    <div className="lg:hidden">
      <NavbarPhone />
    </div>
  ) : null;
}
