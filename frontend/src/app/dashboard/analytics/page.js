"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";
import Sidebar from "@/components/dashboard/Sidebar";
import Card from "@/components/ui/Card";

export default function AnalyticsPage() {
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

  if (loading) return <div className="min-h-screen bg-linear-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center text-slate-400">Loading...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] relative overflow-hidden">
      <div className="absolute inset-0"><div className="stars animate-twinkle"></div></div>
      <Sidebar user={user} />
      <main className="ml-64 p-6 relative z-10">
        <h1 className="text-3xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
          📊 Dream Analytics
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-semibold text-white mb-4">Emotion Trends</h3>
            <div className="text-center py-8 text-slate-400">
              Record dreams to see emotional patterns
            </div>
          </Card>
          
          <Card>
            <h3 className="font-semibold text-white mb-4">Symbol Frequency</h3>
            <div className="text-center py-8 text-slate-400">
              Track recurring dream symbols
            </div>
          </Card>
          
          <Card className="md:col-span-2">
            <h3 className="font-semibold text-white mb-4">Dream Timeline</h3>
            <div className="text-center py-8 text-slate-400">
              Your dream history will appear here
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
