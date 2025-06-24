"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import axios from "axios";

export default function SettingsPage() {
  const { user } = useUser(); // ✅ Correct usage

  const getUserData = async () => {
    console.log(user); // Now you can use it here
  };

  return (
    <div>
      <div className="">
        <UserButton />
      </div>
      <button
        onClick={getUserData}
        className="bg-red-400 hover:bg-red-600 rounded-lg p-2 text-white m-5"
      >
        Click me
      </button>
    </div>
  );
}
