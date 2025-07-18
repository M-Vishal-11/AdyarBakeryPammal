"use client";
import { useEffect, useState } from "react";
import Prebtn from "./functions/prebtn";
import { useUser } from "@clerk/nextjs";
import { handleForm } from "@/app/api/users/postAddress/action";
import axios from "axios";

export default function Page() {
  const { user } = useUser();
  const userID = user?.id;

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [area, setArea] = useState("");
  const [street, setStreet] = useState("");
  const [flat, setFlat] = useState("");
  const [mapLink, setMapLink] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userID) return;

    const getData = async () => {
      try {
        const res = await axios.get("/api/users/getAddress", {
          params: { userID },
        });
        const result = res?.data.userObj[0];

        if (typeof result === "object") {
          setName(result.name ?? "");
          setArea(result.area ?? "");
          setStreet(result.street ?? "");
          setPhoneNumber(result.phoneNumber ?? "");
          setFlat(result.flat ?? "");
          setMapLink(result.googleMap ?? "");
          setNotes(result.notes ?? "");
        }
      } catch (err) {
        console.error("Error fetching address:", err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [userID]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-6">
        {/* Pin-inspired spinner (location theme) */}
        <div className="w-8 h-8 rounded-full border-[3px] border-indigo-500 border-t-transparent animate-spin duration-700"></div>

        {/* Text with map-inspired gradient */}
        <div className="text-2xl font-medium bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
          Loading your addresses...
        </div>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col p-6">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="font-medium text-3xl mb-4 text-[#333]">
          Delivery Address
        </h1>
        <hr className="border-t border-[#ffb8a1] mb-6" />

        <form className="bg-white rounded-xl p-6 shadow-md" action={handleForm}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[#555] font-medium">Name *</label>
              <input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter your full name"
                className="w-full bg-white text-gray-800 border border-[#ffb8a1] rounded-lg px-4 py-2 
        focus:outline-none focus:border-[#ff8a65] focus:ring-2 focus:ring-[#ffccbc] 
        transition duration-200 placeholder-[#aaa]"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[#555] font-medium">Phone Number *</label>
              <input
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="tel"
                placeholder="Enter your phone number"
                className="w-full bg-white text-gray-800 border border-[#ffb8a1] rounded-lg px-4 py-2 
        focus:outline-none focus:border-[#ff8a65] focus:ring-2 focus:ring-[#ffccbc] 
        transition duration-200 placeholder-[#aaa]"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[#555] font-medium">Area *</label>
              <input
                name="area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                type="text"
                placeholder="Your neighborhood/area"
                className="w-full bg-white text-gray-800 border border-[#ffb8a1] rounded-lg px-4 py-2 
        focus:outline-none focus:border-[#ff8a65] focus:ring-2 focus:ring-[#ffccbc] 
        transition duration-200 placeholder-[#aaa]"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[#555] font-medium">Street *</label>
              <input
                name="street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                type="text"
                placeholder="Street name"
                className="w-full bg-white text-gray-800 border border-[#ffb8a1] rounded-lg px-4 py-2 
        focus:outline-none focus:border-[#ff8a65] focus:ring-2 focus:ring-[#ffccbc] 
        transition duration-200 placeholder-[#aaa]"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[#555] font-medium">Flat/House No *</label>
              <input
                name="flat"
                value={flat}
                onChange={(e) => setFlat(e.target.value)}
                type="text"
                placeholder="Flat name or house number"
                className="w-full bg-white text-gray-800 border border-[#ffb8a1] rounded-lg px-4 py-2 
        focus:outline-none focus:border-[#ff8a65] focus:ring-2 focus:ring-[#ffccbc] 
        transition duration-200 placeholder-[#aaa]"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[#555] font-medium">
                Google Map Link (*recommended)
              </label>
              <input
                name="mapLink"
                value={mapLink}
                onChange={(e) => setMapLink(e.target.value)}
                type="url"
                placeholder="Paste your Google Maps link"
                className="w-full bg-white text-gray-800 border border-[#ffb8a1] rounded-lg px-4 py-2 
        focus:outline-none focus:border-[#ff8a65] focus:ring-2 focus:ring-[#ffccbc] 
        transition duration-200 placeholder-[#aaa]"
              />
            </div>
            <input type="hidden" name="userID" value={userID ?? ""} />

            <div className="md:col-span-2 space-y-1">
              <label className="text-[#555] font-medium">Delivery Notes</label>
              <textarea
                name="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any landmarks or special instructions"
                className="w-full bg-white text-gray-800 border border-[#ffb8a1] rounded-lg px-4 py-2 
        focus:outline-none focus:border-[#ff8a65] focus:ring-2 focus:ring-[#ffccbc] 
        transition duration-200 placeholder-[#aaa] min-h-[120px]"
                rows={4}
              ></textarea>
            </div>
          </div>

          <div className="flex justify-between mb-5 mt-3 md:mr-2">
            <Prebtn />
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 active:bg-amber-600 text-white text-lg rounded-xl px-4 py-2  
        shadow-md hover:shadow-lg
        cursor-pointer active:scale-90 transition-transform duration-200"
            >
              Next ➤
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
