"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { dreamsApi, aiApi } from "@/lib/api";

export default function DreamDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [dream, setDream] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [interpreting, setInterpreting] = useState(false);
  const [interpretError, setInterpretError] = useState("");

  const fetchDream = useCallback(async () => {
    try {
      setLoading(true);
      const data = await dreamsApi.getById(params.id);
      setDream(data);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to fetch dream");
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchDream();
  }, [fetchDream]);

  const getMoodEmoji = (mood) => {
    const emojis = {
      happy: "😊",
      sad: "😢",
      anxious: "😰",
      calm: "😌",
      confused: "😕",
      excited: "🤩",
      fearful: "😨",
      neutral: "😐",
    };
    return emojis[mood] || emojis.neutral;
  };

  const handleInterpret = async () => {
    try {
      setInterpreting(true);
      setInterpretError("");
      const updatedDream = await aiApi.interpretDream(params.id);
      setDream(updatedDream);
    } catch (err) {
      setInterpretError(err.message || "Failed to generate AI interpretation");
    } finally {
      setInterpreting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto text-center py-12 text-gray-400">
          Loading dream...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!dream) return null;

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="glass-card rounded-2xl p-6 mb-6">
          <button
            onClick={() => router.back()}
            className="text-slate-400 hover:text-white mb-4 flex items-center gap-2 transition-colors"
          >
            <span>←</span> Back to Dreams
          </button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 flex items-center gap-3">
                {dream.isFavorite && <span>⭐</span>}
                {dream.title}
              </h1>
              <p className="text-slate-400">
                {new Date(dream.dreamDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <button
              onClick={() => router.push(`/dashboard/dreams/${dream._id}/edit`)}
              className="px-5 py-2.5 bg-linear-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl transition font-medium shadow-lg hover:shadow-purple-500/50 hover:scale-105 duration-200 flex items-center gap-2"
            >
              <span>✏️</span>
              Edit Dream
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="glass-card rounded-2xl p-6 space-y-6">
          {/* Mood */}
          <div>
            <h3 className="text-sm font-medium text-slate-400 mb-2">Mood</h3>
            <div className="flex items-center gap-2">
              <span className="text-3xl">{getMoodEmoji(dream.mood)}</span>
              <span className="text-lg text-white capitalize">{dream.mood}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-medium text-slate-400 mb-2">Description</h3>
            <p className="text-white whitespace-pre-wrap leading-relaxed">
              {dream.description}
            </p>
          </div>

          {/* Stickers */}
          {dream.tags && dream.tags.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-slate-400 mb-2">Stickers</h3>
              <div className="flex flex-wrap gap-2">
                {dream.tags.map((sticker) => (
                  <span
                    key={sticker._id}
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{ backgroundColor: `${sticker.color}40`, color: sticker.color }}
                  >
                    {sticker.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* AI Interpretation */}
          {dream.aiInterpretation ? (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">✦</span>
                <h3 className="text-lg font-semibold text-white">AI Interpretation</h3>
              </div>
              <div className="glass-card rounded-2xl p-6 bg-linear-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/30 shadow-lg">
                <div className="prose prose-invert max-w-none">
                  {dream.aiInterpretation.split('\n').map((paragraph, index) => {
                    // Check if it's a heading (starts with number followed by period or contains **text**)
                    const isNumberedHeading = /^\d+\./.test(paragraph.trim());
                    const isBoldText = /\*\*(.*?)\*\*/.test(paragraph);
                    
                    if (paragraph.trim() === '') {
                      return <div key={index} className="h-3" />;
                    }
                    
                    if (isNumberedHeading) {
                      return (
                        <h4 key={index} className="text-blue-300 font-semibold text-base mt-4 mb-2 flex items-center gap-2">
                          <span className="text-blue-400">✦</span>
                          {paragraph.trim()}
                        </h4>
                      );
                    }
                    
                    if (isBoldText) {
                      // Remove ** markers and wrap content in strong tags
                      const formatted = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-purple-300">$1</strong>');
                      return (
                        <p key={index} className="text-gray-200 leading-relaxed mb-3" dangerouslySetInnerHTML={{ __html: formatted }} />
                      );
                    }
                    
                    return (
                      <p key={index} className="text-gray-200 leading-relaxed mb-3">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>✦</span>
                    <span>Generated by AI</span>
                  </div>
                  <button
                    onClick={handleInterpret}
                    disabled={interpreting}
                    className="text-xs text-blue-400 hover:text-blue-300 transition"
                  >
                    {interpreting ? 'Regenerating...' : '↻ Regenerate'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">✦</span>
                <h3 className="text-lg font-semibold text-white">AI Interpretation</h3>
              </div>
              <div className="glass-night rounded-2xl p-6">
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">✨</div>
                  <p className="text-slate-400 mb-6">Unlock deeper insights about your dream</p>
                  <button
                    onClick={handleInterpret}
                    disabled={interpreting}
                    className="px-6 py-3 bg-linear-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg hover:shadow-purple-500/50 hover:scale-105 duration-200"
                  >
                    {interpreting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Analyzing your dream...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <span>✦</span>
                        Interpret with AI
                      </span>
                    )}
                  </button>
                  {interpretError && (
                    <p className="text-red-400 text-sm mt-4">{interpretError}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="pt-4 border-t border-white/10">
            <div className="text-xs text-gray-500 space-y-1">
              <p>Created: {new Date(dream.createdAt).toLocaleString()}</p>
              <p>Last Updated: {new Date(dream.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
