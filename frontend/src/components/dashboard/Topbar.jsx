"use client";

import { useAuth } from "@/lib/auth";

export default function Topbar({ stats }) {
  const { user } = useAuth();
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="glass-card rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Welcome back, {user?.name?.split(' ')[0] || 'Dreamer'}! 👋
          </h1>
          <p className="text-slate-400 mt-1">{currentDate}</p>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <div className="glass-night rounded-xl px-4 py-2 transition-transform duration-200 hover:scale-105">
            <p className="text-xs text-slate-400">Total Dreams</p>
            <p className="text-2xl font-bold text-blue-400">{stats?.totalDreams || 0}</p>
          </div>
          <div className="glass-night rounded-xl px-4 py-2 transition-transform duration-200 hover:scale-105">
            <p className="text-xs text-slate-400">This Week</p>
            <p className="text-2xl font-bold text-purple-400">{stats?.thisWeek || 0}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
