"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";
import Sidebar from "@/components/dashboard/Sidebar";
import Card from "@/components/ui/Card";

export default function SummaryPage() {
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

  if (loading) return <div className="min-h-screen bg-liner-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center text-slate-400">Loading...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-liner-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] relative overflow-hidden">
      <div className="absolute inset-0"><div className="stars animate-twinkle"></div></div>
      <Sidebar user={user} />
      <main className="ml-64 p-6 relative z-10">
        <h1 className="text-3xl font-bold bg-liner-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
          📝 Weekly Mind Summary
        </h1>
        
        <Card className="mb-6">
          <div className="flex items-start gap-4">
            <div className="text-4xl">🤖</div>
            <div className="flex-1">
              <h3 className="font-semibold text-white mb-2">AI-Powered Insights</h3>
              <p className="text-slate-400">
                Your weekly summary will be generated automatically after you record multiple dreams.
                The AI will analyze patterns, emotions, and symbols to provide personalized insights.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-semibold text-white mb-4">This Week&apos;s Themes</h3>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-liner-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-center text-slate-400">
                No themes detected yet
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold text-white mb-4">Emotional Overview</h3>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-liner-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 text-center text-slate-400">
                Record dreams to see your emotional patterns
              </div>
            </div>
          </Card>

          <Card className="md:col-span-2">
            <h3 className="font-semibold text-white mb-4">Personalized Recommendations</h3>
            <div className="p-4 rounded-lg bg-linear-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-center text-slate-400">
              AI recommendations will appear here based on your dream patterns
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
