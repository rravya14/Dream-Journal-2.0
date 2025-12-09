"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";

export default function Sidebar({ userName = "User" }) {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "🏠", href: "/dashboard" },
    { id: "dreams", label: "Dreams", icon: "🌙", href: "/dashboard/dreams" },
    { id: "tags", label: "Stickers", icon: "🔖", href: "/dashboard/tags" },
    { id: "analytics", label: "Analytics", icon: "🔎", href: "/dashboard/analytics" },
    { id: "summary", label: "Summary", icon: "🎯", href: "/dashboard/summary" },
  ];

  const handleLogout = async () => {
    try {
      await authApi.logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
      // Still redirect even if API fails
      router.push('/');
    }
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 glass-card border-r border-slate-700/50 z-50 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-white text-lg">Dream Journal</h1>
            <p className="text-xs text-slate-400">Track your dreams</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
        {menuItems.map((item) => (
          <Link key={item.id} href={item.href}>
            <div
              onClick={() => setActiveItem(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${
                activeItem === item.id
                  ? "bg-linear-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-white"
                  : "text-slate-400 hover:bg-slate-800/30 hover:text-white"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </div>
          </Link>
        ))}
      </nav>

      {/* User Profile at Bottom */}
      <div className="p-4 border-t border-slate-700/50 space-y-3">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{userName}</p>
            <p className="text-xs text-slate-400">Account</p>
          </div>
        </div>
        
        {/* Separate Logout Button */}
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all border border-red-500/20 hover:border-red-500/30"
        >
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
