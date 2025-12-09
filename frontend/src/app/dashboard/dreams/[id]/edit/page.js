"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { dreamsApi } from "@/lib/api";
import DreamForm from "@/components/DreamForm";

export default function EditDreamPage() {
  const router = useRouter();
  const params = useParams();
  const [dream, setDream] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

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

  const handleSubmit = async (formData) => {
    try {
      setSubmitting(true);
      setError("");
      await dreamsApi.update(params.id, formData);
      router.push(`/dashboard/dreams/${params.id}`);
    } catch (err) {
      setError(err.message || "Failed to update dream");
      setSubmitting(false);
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

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        <header className="glass-card rounded-2xl p-6 mb-6">
          <button
            onClick={() => router.back()}
            className="text-slate-400 hover:text-white mb-4 flex items-center gap-2 transition-colors"
          >
            <span>←</span> Back
          </button>
          <h1 className="text-3xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 flex items-center gap-3">
            <span className="text-3xl">✏️</span>
            Edit Dream
          </h1>
          <p className="text-slate-400">Update the details of your dream</p>
        </header>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        <div className="glass-card rounded-2xl p-6">
          {dream && (
            <DreamForm
              dream={dream}
              onSubmit={handleSubmit}
              onCancel={() => router.back()}
            />
          )}
        </div>

        {submitting && (
          <div className="text-center mt-4 text-gray-400">
            Updating dream...
          </div>
        )}
      </div>
    </div>
  );
}
