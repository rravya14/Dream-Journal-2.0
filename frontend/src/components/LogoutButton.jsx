"use client";

import { useState } from "react";
import { logoutUser } from "@/lib/api";

export default function LogoutButton() {
  const [status, setStatus] = useState("idle");

  const handleLogout = async () => {
    setStatus("loading");
    try {
      await logoutUser();

      setStatus("success");
    } catch (error) {
      setStatus("error");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={handleLogout}
        disabled={status === "loading"}
        className="rounded border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-100 disabled:opacity-70"
      >
        {status === "loading" ? "Logging out..." : "Logout"}
      </button>
      {status === "success" && (
        <span className="text-xs text-green-600">Logged out</span>
      )}
      {status === "error" && (
        <span className="text-xs text-red-600">Something went wrong</span>
      )}
    </div>
  );
}
