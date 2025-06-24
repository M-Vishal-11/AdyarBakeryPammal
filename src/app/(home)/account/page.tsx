"use client";

import { UserButton } from "@clerk/nextjs";
import axios from "axios";

export default function SettingsPage() {
  const getUserData = async () => {
    const user = await axios("/api/user");
  };

  return (
    <div>
      <UserButton />
      <button
        onClick={getUserData}
        className="bg-red-400 hover:bg-red-600 rounded-lg p-2 text-white m-5"
      >
        Click me
      </button>
    </div>
  );
}
