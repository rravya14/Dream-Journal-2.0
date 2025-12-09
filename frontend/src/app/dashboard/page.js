"use client";

import { useState, useEffect } from "react";
import Topbar from "@/components/dashboard/Topbar";
import Widgets from "@/components/dashboard/Widgets";
import { dreamsApi } from "@/lib/api";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalDreams: 0,
    thisWeek: 0,
    analyzed: 0,
    recentDreams: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch all dreams for accurate statistics
      const response = await dreamsApi.getAll({ limit: 1000, page: 1 });
      const allDreams = response.data || [];
      
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      
      const weekDreams = allDreams.filter(dream => 
        new Date(dream.dreamDate) >= oneWeekAgo
      );
      
      const analyzedDreams = allDreams.filter(dream => dream.aiInterpretation);
      
      setStats({
        totalDreams: response.pagination?.total || allDreams.length,
        thisWeek: weekDreams.length,
        analyzed: analyzedDreams.length,
        recentDreams: allDreams.slice(0, 5)
      });
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Topbar stats={stats} />
      <Widgets stats={stats} loading={loading} />
    </div>
  );
}
