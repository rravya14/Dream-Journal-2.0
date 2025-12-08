"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { tagsApi } from "@/lib/api";
import TagCard from "@/components/TagCard";
import Pagination from "@/components/Pagination";

export default function TagsPage() {
  const router = useRouter();
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Pagination & filters
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("createdAt:desc");

  const fetchTags = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 10,
        search: searchQuery,
        sort: sortBy,
      };
      
      const response = await tagsApi.getAll(params);
      setTags(response.data);
      setTotalPages(response.pagination.totalPages);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to fetch tags");
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery, sortBy]);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const handleDelete = async (tagId) => {
    if (!confirm("Are you sure you want to delete this tag?")) return;
    
    try {
      await tagsApi.delete(tagId);
      fetchTags();
    } catch (err) {
      alert(err.message || "Failed to delete tag");
    }
  };

  const handleEdit = (tag) => {
    router.push(`/dashboard/tags/${tag._id}/edit`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchTags();
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">My Tags</h1>
          <button
            onClick={() => router.push("/dashboard/tags/new")}
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition"
          >
            + Create Tag
          </button>
        </div>

        {/* Search & Sort */}
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 mb-6 border border-white/10">
          <div className="flex flex-col md:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tags..."
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </form>
            
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="createdAt:desc">Newest First</option>
              <option value="createdAt:asc">Oldest First</option>
              <option value="name:asc">Name (A-Z)</option>
              <option value="name:desc">Name (Z-A)</option>
            </select>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-12 text-gray-400">
            Loading tags...
          </div>
        )}

        {/* Tags List */}
        {!loading && tags.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No tags found</p>
            <button
              onClick={() => router.push("/dashboard/tags/new")}
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition"
            >
              Create Your First Tag
            </button>
          </div>
        )}

        {!loading && tags.length > 0 && (
          <>
            <div className="space-y-3">
              {tags.map((tag) => (
                <TagCard
                  key={tag._id}
                  tag={tag}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
}
