"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";
import Sidebar from "@/components/dashboard/Sidebar";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function NewDreamPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    emotion: "",
    symbols: "",
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // This would call dreamsApi.create() when backend is ready
    console.log("Dream data:", formData);
  };

  if (loading) return <div className="min-h-screen bg-linear-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center text-slate-400">Loading...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-linear-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] relative overflow-hidden">
      <div className="absolute inset-0"><div className="stars animate-twinkle"></div></div>
      <Sidebar user={user} />
      <main className="ml-64 p-6 relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-3xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
            ✨ Record a New Dream
          </h1>
          
          <Card>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Dream Title"
                name="title"
                placeholder="Give your dream a title..."
                value={formData.title}
                onChange={handleChange}
                required
              />
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Dream Content
                </label>
                <textarea
                  name="content"
                  className="w-full min-h-[200px] px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 backdrop-blur-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  placeholder="Describe your dream in detail..."
                  value={formData.content}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Primary Emotion"
                  name="emotion"
                  placeholder="e.g., Joy, Fear, Anxiety..."
                  value={formData.emotion}
                  onChange={handleChange}
                />
                
                <Input
                  label="Symbols (comma-separated)"
                  name="symbols"
                  placeholder="e.g., water, flying, forest..."
                  value={formData.symbols}
                  onChange={handleChange}
                />
              </div>
              
              <div className="flex gap-3">
                <Button type="submit">
                  Save & Analyze Dream
                </Button>
                <Button type="button" variant="secondary" onClick={() => router.push("/dashboard")}>
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
}
