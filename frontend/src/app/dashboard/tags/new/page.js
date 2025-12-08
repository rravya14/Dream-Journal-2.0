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
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="text-gray-400 hover:text-white mb-4"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-white">Create New Tag</h1>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
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
