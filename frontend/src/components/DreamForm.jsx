"use client";

import { useState, useEffect } from "react";
import { tagsApi } from "@/lib/api";

export default function DreamForm({ dream, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: dream?.title || "",
    description: dream?.description || "",
    dreamDate: dream?.dreamDate ? new Date(dream.dreamDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    mood: dream?.mood || "neutral",
    tags: dream?.tags?.map(t => t._id || t) || [],
    isFavorite: dream?.isFavorite || false,
  });

  const [availableTags, setAvailableTags] = useState([]);
  const [loadingTags, setLoadingTags] = useState(false);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      setLoadingTags(true);
      const response = await tagsApi.getAll({ limit: 100 });
      setAvailableTags(response.data);
    } catch (err) {
      console.error("Failed to fetch tags:", err);
    } finally {
      setLoadingTags(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleTagToggle = (tagId) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter(id => id !== tagId)
        : [...prev.tags, tagId]
    }));
  };

  const moods = [
    { value: "happy", label: "Happy 😊", color: "bg-yellow-500/20 text-yellow-300" },
    { value: "sad", label: "Sad 😢", color: "bg-blue-500/20 text-blue-300" },
    { value: "anxious", label: "Anxious 😰", color: "bg-orange-500/20 text-orange-300" },
    { value: "calm", label: "Calm 😌", color: "bg-green-500/20 text-green-300" },
    { value: "confused", label: "Confused 😕", color: "bg-purple-500/20 text-purple-300" },
    { value: "excited", label: "Excited 🤩", color: "bg-pink-500/20 text-pink-300" },
    { value: "fearful", label: "Fearful 😨", color: "bg-red-500/20 text-red-300" },
    { value: "neutral", label: "Neutral 😐", color: "bg-gray-500/20 text-gray-300" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Dream Title *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Give your dream a title..."
          required
          maxLength={200}
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full min-h-[150px] px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
          placeholder="Describe your dream in detail..."
          required
          minLength={10}
        />
      </div>

      {/* Date and Favorite */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Dream Date
          </label>
          <input
            type="date"
            value={formData.dreamDate}
            onChange={(e) => setFormData({ ...formData, dreamDate: e.target.value })}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition w-full">
            <input
              type="checkbox"
              checked={formData.isFavorite}
              onChange={(e) => setFormData({ ...formData, isFavorite: e.target.checked })}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-300">Mark as favorite ⭐</span>
          </label>
        </div>
      </div>

      {/* Mood */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Mood
        </label>
        <div className="grid grid-cols-4 gap-2">
          {moods.map((mood) => (
            <button
              key={mood.value}
              type="button"
              onClick={() => setFormData({ ...formData, mood: mood.value })}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                formData.mood === mood.value
                  ? mood.color + " ring-2 ring-offset-2 ring-offset-gray-900"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {mood.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stickers */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Stickers {loadingTags && <span className="text-xs text-gray-500">(Loading...)</span>}
        </label>
        {availableTags.length === 0 && !loadingTags ? (
          <p className="text-sm text-gray-500">No stickers available. Create some stickers first!</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {availableTags.map((sticker) => (
              <button
                key={sticker._id}
                type="button"
                onClick={() => handleTagToggle(sticker._id)}
                className={`px-3 py-1 rounded-full text-sm transition ${
                  formData.tags.includes(sticker._id)
                    ? "ring-2 ring-offset-2 ring-offset-gray-900"
                    : "opacity-50 hover:opacity-100"
                }`}
                style={{
                  backgroundColor: formData.tags.includes(sticker._id) ? sticker.color : `${sticker.color}40`,
                  color: "#fff",
                }}
              >
                {sticker.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Submit Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition"
        >
          {dream ? "Update Dream" : "Create Dream"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
