"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { tagsApi } from "@/lib/api";
import TagForm from "@/components/TagForm";

export default function NewTagPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError("");
      await tagsApi.create(formData);
      router.push("/dashboard/tags");
    } catch (err) {
      setError(err.message || "Failed to create tag");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto">
        <header className="glass-card rounded-2xl p-6 mb-6">
          <button
            onClick={() => router.back()}
            className="text-slate-400 hover:text-white mb-4 flex items-center gap-2 transition-colors"
          >
            <span>←</span> Back to Stickers
          </button>
          <h1 className="text-3xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 flex items-center gap-3">
            <span className="text-3xl">✨</span>
            Create New Sticker
          </h1>
          <p className="text-slate-400">Add a new colorful sticker to organize your dreams</p>
        </header>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        <div className="glass-card rounded-2xl p-6">
          <TagForm
            onSubmit={handleSubmit}
            onCancel={() => router.back()}
          />
        </div>

        {loading && (
          <div className="text-center mt-4 text-gray-400">
            Creating tag...
          </div>
        )}
      </div>
    </div>
  );
}
