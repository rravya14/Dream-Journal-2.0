"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import Widgets from "@/components/dashboard/Widgets";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const data = await authApi.getProfile();
      setUser(data.user || data);
    } catch (error) {
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-4 animate-glow">
            <span className="text-3xl">🌙</span>
          </div>
          <p className="text-slate-400">Loading your dreams...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="stars animate-twinkle"></div>
      </div>
      
      <Sidebar user={user} />
      <main className="ml-64 p-6 relative z-10">
        <Topbar user={user} />
        <Widgets />
      </main>
    </div>
  );
}
