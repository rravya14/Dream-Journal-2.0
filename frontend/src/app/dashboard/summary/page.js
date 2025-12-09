"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { aiApi } from "@/lib/api";
import { useAuth } from "@/lib/auth";

export default function SummaryPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");

  const fetchSummary = useCallback(async () => {
    try {
      setGenerating(true);
      setError("");
      const data = await aiApi.getWeeklySummary();
      setSummary(data.summary || data);
    } catch (err) {
      setError(err.message || "Failed to generate summary");
    } finally {
      setGenerating(false);
    }
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-400">Loading...</div>;

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 flex items-center gap-3">
                <span className="text-3xl">🎯</span>
                Weekly Summary
              </h1>
              <p className="text-slate-400">AI-powered insights from your weekly dreams</p>
            </div>
            <button
              onClick={fetchSummary}
              disabled={generating}
              className="px-5 py-2.5 bg-linear-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition font-medium shadow-lg hover:shadow-purple-500/50 hover:scale-105 duration-200 flex items-center gap-2">
              {generating ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <span>✦</span>
                  Generate Summary
                </>
              )}
            </button>
          </div>
        </header>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}
        
        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="text-4xl">✦</div>
            <div className="flex-1">
              <h3 className="font-semibold text-white mb-2">AI-Powered Insights</h3>
              <p className="text-slate-400 text-sm">
                Click the button above to generate your weekly dream summary. The AI will analyze patterns, emotions, and symbols from the last 7 days.
              </p>
            </div>
          </div>
        </div>

        {summary && (
          <div className="glass-card rounded-2xl p-6 bg-linear-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <span>✨</span>
              Your Weekly Summary
            </h3>
            <div className="prose prose-invert max-w-none">
              <p className="text-white whitespace-pre-wrap leading-relaxed">{summary}</p>
            </div>
          </div>
        )}

        {!summary && !generating && (
          <div className="glass-card rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">💭</div>
            <p className="text-slate-400 mb-2">No summary generated yet</p>
            <p className="text-sm text-slate-500">Click &quot;Generate Summary&quot; to get AI insights from your weekly dreams</p>
          </div>
        )}
      </div>
    </div>
  );
}
