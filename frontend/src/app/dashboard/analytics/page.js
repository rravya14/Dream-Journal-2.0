"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { dreamsApi } from "@/lib/api";
import { useAuth } from "@/lib/auth";

export default function AnalyticsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({
    moodDistribution: {},
    totalDreams: 0,
    avgDreamsPerWeek: 0,
    mostCommonMood: "",
    recentTrends: []
  });

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      const response = await dreamsApi.getAll({ limit: 100, page: 1 });
      const dreams = response.data || [];
      
      // Calculate mood distribution
      const moodCounts = {};
      dreams.forEach(dream => {
        moodCounts[dream.mood] = (moodCounts[dream.mood] || 0) + 1;
      });
      
      const mostCommon = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0];
      
      setAnalytics({
        moodDistribution: moodCounts,
        totalDreams: dreams.length,
        avgDreamsPerWeek: (dreams.length / 4).toFixed(1),
        mostCommonMood: mostCommon ? mostCommon[0] : "neutral",
        recentTrends: dreams.slice(0, 10)
      });
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const moodEmojis = {
    happy: "😊",
    sad: "😢",
    anxious: "😰",
    calm: "😌",
    confused: "😕",
    excited: "🤩",
    fearful: "😨",
    neutral: "😐"
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-400">Loading analytics...</div>;

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="glass-card rounded-2xl p-6 mb-6">
          <h1 className="text-3xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 flex items-center gap-3">
            <span className="text-3xl">🔎</span>
            Dream Analytics
          </h1>
          <p className="text-slate-400">Insights and patterns from your dreams</p>
        </header>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="glass-card rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Total Dreams</p>
                <p className="text-3xl font-bold text-blue-400">{analytics.totalDreams}</p>
              </div>
              <span className="text-4xl">📖</span>
            </div>
          </div>
          
          <div className="glass-card rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Avg Per Week</p>
                <p className="text-3xl font-bold text-purple-400">{analytics.avgDreamsPerWeek}</p>
              </div>
              <span className="text-4xl">📅</span>
            </div>
          </div>
          
          <div className="glass-card rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Most Common</p>
                <p className="text-xl font-bold text-pink-400 capitalize">{analytics.mostCommonMood}</p>
              </div>
              <span className="text-4xl">{moodEmojis[analytics.mostCommonMood] || "😐"}</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mood Distribution */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <span>🎨</span>
              Mood Distribution
            </h3>
            {Object.keys(analytics.moodDistribution).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(analytics.moodDistribution)
                  .sort((a, b) => b[1] - a[1])
                  .map(([mood, count]) => (
                    <div key={mood} className="flex items-center gap-3">
                      <span className="text-2xl">{moodEmojis[mood]}</span>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-white capitalize">{mood}</span>
                          <span className="text-slate-400">{count}</span>
                        </div>
                        <div className="w-full bg-slate-700/30 rounded-full h-2">
                          <div
                            className="bg-linear-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
                            style={{ width: `${(count / analytics.totalDreams) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">
                Record dreams to see mood patterns
              </div>
            )}
          </div>
          
          {/* Recent Trends */}
          <div className="glass-card rounded-2xl p-6">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <span>🕒</span>
              Recent Dreams
            </h3>
            {analytics.recentTrends.length > 0 ? (
              <div className="space-y-3">
                {analytics.recentTrends.map((dream) => (
                  <div
                    key={dream._id}
                    onClick={() => router.push(`/dashboard/dreams/${dream._id}`)}
                    className="p-3 rounded-xl glass-night hover:bg-slate-700/50 transition cursor-pointer hover:scale-[1.02] duration-200"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xl">{moodEmojis[dream.mood]}</span>
                      <p className="text-white font-medium truncate flex-1">{dream.title}</p>
                    </div>
                    <p className="text-xs text-slate-400">
                      {new Date(dream.dreamDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">
                No dreams recorded yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
