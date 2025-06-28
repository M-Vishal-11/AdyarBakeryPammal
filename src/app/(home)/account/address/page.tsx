"use client";
import { useEffect, useState } from "react";
import Prebtn from "./functions/prebtn";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { handleForm } from "@/app/api/users/postAddress/action";
import axios from "axios";
import toast from "react-hot-toast";

export default function Page() {
  const router = useRouter();
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

  const handleNext = () => {
    toast.success("Data updated");
  };

  if (loading) return <p className="text-center">Loading...</p>;

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
              onClick={handleNext}
              className="relative bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 
      text-white font-medium text-lg rounded-xl px-6 py-3  
      shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-95 
      transition-all duration-200 ease-in-out
      flex items-center justify-center gap-2
      disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                  clipRule="evenodd"
                />
              </svg>
              Publish Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
