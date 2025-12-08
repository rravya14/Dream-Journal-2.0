"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";
import Sidebar from "@/components/dashboard/Sidebar";
import Card from "@/components/ui/Card";

export default function DreamsPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  if (loading) return <div className="min-h-screen bg-linear-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center text-slate-400">Loading...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-linear-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] relative overflow-hidden">
      <div className="absolute inset-0"><div className="stars animate-twinkle"></div></div>
      <Sidebar user={user} />
      <main className="ml-64 p-6 relative z-10">
        <h1 className="text-3xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
          📖 My Dreams
        </h1>
        
        <Card>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💭</div>
            <h3 className="text-xl font-semibold text-white mb-2">No dreams yet</h3>
            <p className="text-slate-400 mb-6">Start recording your dreams to see them here</p>
            <button
              onClick={() => router.push("/dashboard/dreams/new")}
              className="px-6 py-3 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:scale-105 transition-all duration-200"
            >
              Record Your First Dream
            </button>
          </div>
        </Card>
      </main>
    </div>
  );
}
