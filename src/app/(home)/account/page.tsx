"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Image from "next/image";
import GeneralIcon from "./functions/generalIcon";
import AddressSVG from "@/components/icons/svgs/AddressSVG";
import OrdersSVG from "@/components/icons/svgs/OrdersSVG";
import ContactusSVG from "@/components/icons/svgs/ContactusSVG";
import ProfileiconSVG from "@/components/icons/svgs/ProfileiconSVG";
import AdminSVG from "@/components/icons/svgs/AdminSVG";

export default function SettingsPage() {
  const { user } = useUser();
  const [userImageUrl, setUserImageUrl] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setUserImageUrl(user.imageUrl);
      setEmailAddress(user.primaryEmailAddress?.emailAddress || "");
      setRole((user.publicMetadata.role as string) || "");
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <>
        <div className="flex flex-col items-center justify-center gap-3 py-8">
          {/* Smoother spinner with softer pink */}
          <div className="w-8 h-8 rounded-full border-[3px] border-rose-400 border-t-transparent animate-spin duration-700"></div>

          {/* More professional gradient text */}
          <div className="text-2xl font-semibold bg-gradient-to-r from-rose-500 to-fuchsia-500 bg-clip-text text-transparent">
            Loading your account...
          </div>
        </div>
      </>
    );
  }

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
            <AddressSVG />
          </GeneralIcon>

          <GeneralIcon
            address="/account/orders"
            IconName="Your Orders"
            IconDescription="View order history and track shipments"
          >
            <OrdersSVG />
          </GeneralIcon>

          <GeneralIcon
            address="/account/contactus"
            IconName="Contact Us"
            IconDescription="Get help or send feedback"
          >
            <ContactusSVG />
          </GeneralIcon>
          <GeneralIcon
            address="/user-profile"
            IconName="Security/Profile"
            IconDescription="Manage password and security settings"
          >
            <ProfileiconSVG />
          </GeneralIcon>

          {role === "admin" && (
            <>
              <GeneralIcon
                address="/operator-dashboard"
                IconName="Order Management"
                IconDescription="Accept and manage incoming orders"
              >
                <ProfileiconSVG />
              </GeneralIcon>
              <GeneralIcon
                address="/admin-dashboard"
                IconName="Admin Console"
                IconDescription="Manage menu and settings"
              >
                <AdminSVG />
              </GeneralIcon>
            </>
          )}
          {role === "operator" && (
            <GeneralIcon
              address="/operator-dashboard"
              IconName="Order Management"
              IconDescription="Accept and manage incoming orders"
            >
              <ProfileiconSVG />
            </GeneralIcon>
          )}
        </div>
      </div>
    </div>
  );
}
