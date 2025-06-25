"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SettingsPage() {
  const { user } = useUser();
  const [userImageUrl, setUserImageUrl] = useState("");
  const [emailAddress, setEmailAddress] = useState("");

  useEffect(() => {
    if (user) {
      setUserImageUrl(user.imageUrl);
      setEmailAddress(user.primaryEmailAddress?.emailAddress || "");
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
          <Link href="/account/address">
            <div className="bg-white hover:bg-[#FFF4F0] rounded-xl p-6 border border-[#FFD1C2] transition-all hover:shadow-md cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-[#FFEBE6]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#FF6B4A]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-[#5F2D2D]">Your Addresses</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Manage your delivery addresses
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/account/orders">
            <div className="bg-white hover:bg-[#FFF4F0] rounded-xl p-6 border border-[#FFD1C2] transition-all hover:shadow-md cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-[#FFEBE6]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#FF6B4A]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-[#5F2D2D]">Your Orders</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    View order history and track shipments
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/account/contactus">
            <div className="bg-white hover:bg-[#FFF4F0] rounded-xl p-6 border border-[#FFD1C2] transition-all hover:shadow-md cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-[#FFEBE6]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#FF6B4A]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-[#5F2D2D]">Contact Us</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Get help or send feedback
                  </p>
                </div>
              </div>
            </div>
          </Link>
          <Link href="/user-profile">
            <div className="bg-white hover:bg-[#FFF4F0] rounded-xl p-6 border border-[#FFD1C2] transition-all hover:shadow-md cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-[#FFEBE6]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#FF6B4A]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-[#5F2D2D]">
                    Security/Profile
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Manage password and security settings
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
