"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { tagsApi } from "@/lib/api";
import TagForm from "@/components/TagForm";

export default function EditTagPage() {
  const router = useRouter();
  const params = useParams();
  const [tag, setTag] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchTag = useCallback(async () => {
    try {
      setLoading(true);
      const data = await tagsApi.getById(params.id);
      setTag(data);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to fetch tag");
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    fetchTag();
  }, [fetchTag]);

  const handleSubmit = async (formData) => {
    try {
      setSubmitting(true);
      setError("");
      await tagsApi.update(params.id, formData);
      router.push("/dashboard/tags");
    } catch (err) {
      setError(err.message || "Failed to update tag");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-2xl mx-auto text-center py-12 text-gray-400">
          Loading tag...
        </div>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold text-white">Edit Tag</h1>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
          {tag && (
            <TagForm
              tag={tag}
              onSubmit={handleSubmit}
              onCancel={() => router.back()}
            />
          )}
        </div>

        {submitting && (
          <div className="text-center mt-4 text-gray-400">
            Updating tag...
          </div>
        )}
      </div>
    </div>
  );
}
