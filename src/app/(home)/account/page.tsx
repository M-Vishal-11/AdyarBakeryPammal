"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Image from "next/image";
import Address from "./functions/Address";
import GeneralIcon from "./functions/generalIcon";
import Orders from "./functions/Orders";
import ContactUS from "./functions/ContactUs";
import ProfileIcon from "./functions/profileIcon";
import Operator from "./functions/Operator";
import Admin from "./functions/Admin";

export default function SettingsPage() {
  const { user } = useUser();
  const [userImageUrl, setUserImageUrl] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user) {
      setUserImageUrl(user.imageUrl);
      setEmailAddress(user.primaryEmailAddress?.emailAddress || "");
      setRole((user.publicMetadata.role as string) || "");
    }
  }, [user]);

  return (
    <div className="min-h-screen p-6 bg-[#FFEBE6]">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-[#5F2D2D]">
          Account Settings
        </h1>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-[#FFD1C2]">
          <div className="flex items-center gap-6">
            {userImageUrl ? (
              <div className="relative">
                <Image
                  src={userImageUrl}
                  width={80}
                  height={80}
                  alt="User Profile"
                  className="rounded-full border-4 border-[#FFD1C2]"
                  priority
                />
                <div className="absolute -bottom-2 -right-2">
                  <UserButton />
                </div>
              </div>
            ) : (
              <div className="w-20 h-20 bg-gray-200 rounded-full animate-pulse" />
            )}

            <div>
              <h2 className="text-xl font-semibold text-[#5F2D2D]">
                {user?.firstName || "User"} {user?.lastName}
              </h2>
              <p className="text-gray-600 mt-1">
                {emailAddress || "Loading email..."}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GeneralIcon
            address="/account/address"
            IconName="Your Addresses"
            IconDescription="Manage your delivery addresses"
          >
            <Address />
          </GeneralIcon>

          <GeneralIcon
            address="/account/orders"
            IconName="Your Orders"
            IconDescription="View order history and track shipments"
          >
            <Orders />
          </GeneralIcon>

          <GeneralIcon
            address="/account/contactus"
            IconName="Contact Us"
            IconDescription="Get help or send feedback"
          >
            <ContactUS />
          </GeneralIcon>
          <GeneralIcon
            address="/user-profile"
            IconName="Security/Profile"
            IconDescription="Manage password and security settings"
          >
            <ProfileIcon />
          </GeneralIcon>

          {role === "admin" && (
            <>
              <GeneralIcon
                address="/operator"
                IconName="Order Management"
                IconDescription="Accept and manage incoming orders"
              >
                <Operator />
              </GeneralIcon>
              <GeneralIcon
                address="/admin-dashboard"
                IconName="Admin Console"
                IconDescription="Manage menu and settings"
              >
                <Admin />
              </GeneralIcon>
            </>
          )}
          {role === "operator" && (
            <GeneralIcon
              address="/operator"
              IconName="Order Management"
              IconDescription="Accept and manage incoming orders"
            >
              <Operator />
            </GeneralIcon>
          )}
        </div>
      </div>
    </div>
  );
}
