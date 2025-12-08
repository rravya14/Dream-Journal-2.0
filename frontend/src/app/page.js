"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(true);

  return (
    <main className="min-h-screen relative overflow-hidden bg-linear-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      {/* Simple Stars Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="stars animate-twinkle"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="text-center max-w-5xl mx-auto">
          {/* Hero Moon */}
          <div className={`inline-block mb-8 transition-all duration-700 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500 rounded-full animate-glow"></div>
              <div className="absolute inset-1 bg-linear-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                <span className="text-4xl">🌙</span>
              </div>
            </div>
          </div>

          {/* Hero Title */}
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 transition-all duration-700 delay-100 opacity-100 translate-y-0`}>
            <span className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Dream Journal 2.0
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`text-xl md:text-2xl text-slate-300 mb-4 transition-all duration-700 delay-200 opacity-100 translate-y-0`}>
            AI-Powered Dream Interpretation & Analysis
          </p>

          <p className={`text-lg text-slate-400 mb-12 max-w-2xl mx-auto transition-all duration-700 delay-300 opacity-100 translate-y-0`}>
            Unlock the secrets of your subconscious with intelligent dream analysis and pattern recognition.
          </p>

          {/* Feature Cards */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 transition-all duration-700 delay-400 opacity-100 translate-y-0`}>
            <div className="glass-card rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-200">
              <div className="w-16 h-16 mx-auto mb-4 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">AI Analysis</h3>
              <p className="text-slate-400">
                Advanced algorithms interpret symbols, emotions, and patterns in your dreams
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-200">
              <div className="w-16 h-16 mx-auto mb-4 bg-linear-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Pattern Recognition</h3>
              <p className="text-slate-400">
                Track recurring themes, symbols, and emotions across your dream history
              </p>
            </div>

            <div className="glass-card rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-200">
              <div className="w-16 h-16 mx-auto mb-4 bg-linear-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center">
                <span className="text-3xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Visualization</h3>
              <p className="text-slate-400">
                Beautiful charts and insights to understand your subconscious mind
              </p>
            </div>
          </div>

          {/* Additional Features */}
          <div className={`glass-card rounded-3xl p-8 mb-12 transition-all duration-700 delay-500 opacity-100 translate-y-0`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-left">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-linear-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-xl">🔮</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white">Weekly Summaries</h4>
                </div>
                <p className="text-slate-400">
                  Get AI-generated insights about your week&apos;s dreams and mental patterns
                </p>
              </div>

              <div className="text-left">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-linear-to-br from-violet-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-xl">🔍</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white">Smart Search</h4>
                </div>
                <p className="text-slate-400">
                  Find specific dreams by symbols, emotions, dates, or keywords
                </p>
              </div>

              <div className="text-left">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-linear-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                    <span className="text-xl">💭</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white">Dream Symbols</h4>
                </div>
                <p className="text-slate-400">
                  Understand the meaning behind common and personal dream symbols
                </p>
              </div>

              <div className="text-left">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-linear-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                    <span className="text-xl">📈</span>
                  </div>
                  <h4 className="text-lg font-semibold text-white">Analytics Dashboard</h4>
                </div>
                <p className="text-slate-400">
                  Visualize your dream data with interactive charts and statistics
                </p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 delay-600 opacity-100 translate-y-0`}>
            <Link
              href="/signup"
              className="group relative px-10 py-4 rounded-xl font-semibold text-lg overflow-hidden transition-all duration-200 hover:scale-105"
            >
              <div className="absolute inset-0 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500"></div>
              <span className="relative text-white flex items-center gap-2">
                Get Started Free
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>

            <Link
              href="/login"
              className="px-10 py-4 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700 text-white font-semibold text-lg hover:bg-slate-700/50 hover:scale-105 transition-all duration-200"
            >
              Sign In
            </Link>
          </div>

          {/* Social Proof */}
          <div className={`mt-12 flex items-center justify-center gap-8 text-slate-400 flex-wrap transition-all duration-700 delay-700 opacity-100`}>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-400 to-blue-500 border-2 border-slate-800"></div>
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-purple-400 to-purple-500 border-2 border-slate-800"></div>
                <div className="w-8 h-8 rounded-full bg-linear-to-br from-pink-400 to-pink-500 border-2 border-slate-800"></div>
              </div>
              <span className="text-sm">Join dreamers worldwide</span>
            </div>
            <div className="text-sm">🔒 Secure & Private</div>
            <div className="text-sm">✨ AI-Powered</div>
          </div>
        </div>
      </div>
    </main>
  );
}
