"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { dreamsApi, tagsApi } from "@/lib/api";
import DreamCard from "@/components/DreamCard";
import DreamFilters from "@/components/DreamFilters";
import Pagination from "@/components/Pagination";
import DeleteModal from "@/components/DeleteModal";

export default function DreamsPage() {
  const router = useRouter();
  const [dreams, setDreams] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Pagination & filters
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("dreamDate:desc");
  const [filters, setFilters] = useState({
    mood: "",
    isFavorite: "",
    dateFrom: "",
    dateTo: "",
    tags: "",
  });
  
  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [dreamToDelete, setDreamToDelete] = useState(null);

  const fetchDreams = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 9,
        search: searchQuery,
        sort: sortBy,
        ...filters,
      };
      
      const response = await dreamsApi.getAll(params);
      setDreams(response.data);
      setTotalPages(response.pagination.totalPages);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to fetch dreams");
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery, sortBy, filters]);

  useEffect(() => {
    fetchDreams();
  }, [fetchDreams]);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await tagsApi.getAll({ limit: 100 });
      setTags(response.data);
    } catch (err) {
      console.error("Failed to fetch tags:", err);
    }
  };

  const handleDeleteClick = (dreamId) => {
    setDreamToDelete(dreamId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!dreamToDelete) return;
    
    try {
      await dreamsApi.delete(dreamToDelete);
      fetchDreams();
      setDreamToDelete(null);
    } catch (err) {
      setError(err.message || "Failed to delete dream");
    }
  };

  const handleToggleFavorite = async (dreamId, isFavorite) => {
    try {
      await dreamsApi.update(dreamId, { isFavorite });
      fetchDreams();
    } catch (err) {
      alert(err.message || "Failed to update favorite status");
    }
  };

  const handleView = (dream) => {
    router.push(`/dashboard/dreams/${dream._id}`);
  };

  const handleEdit = (dream) => {
    router.push(`/dashboard/dreams/${dream._id}/edit`);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 flex items-center gap-3">
                <span className="text-3xl">🌙</span>
                Dream Journal
              </h1>
              <p className="text-slate-400">Explore your subconscious mind</p>
            </div>
            <button
              onClick={() => router.push("/dashboard/dreams/new")}
              className="px-5 py-2.5 bg-linear-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl transition font-medium shadow-lg hover:shadow-purple-500/50 hover:scale-105 duration-200 flex items-center gap-2"
            >
              <span>✨</span>
              Record Dream
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <DreamFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              tags={tags}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search & Sort */}
            <div className="glass-card rounded-2xl p-5 mb-6">
              <div className="flex flex-col md:flex-row gap-3">
                <form onSubmit={handleSearch} className="flex-1">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search your dreams..."
                      className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    />
                  </div>
                </form>
                
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition cursor-pointer"
                >
                  <option value="dreamDate:desc">Newest First</option>
                  <option value="dreamDate:asc">Oldest First</option>
                  <option value="title:asc">Title (A-Z)</option>
                  <option value="title:desc">Title (Z-A)</option>
                  <option value="createdAt:desc">Recently Added</option>
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
                Loading dreams...
              </div>
            )}

            {/* Dreams Grid */}
            {!loading && dreams.length === 0 && (
              <div className="text-center py-12">
                <p className="text-6xl mb-4">💭</p>
                <p className="text-gray-400 mb-4">No dreams found</p>
                <button
                  onClick={() => router.push("/dashboard/dreams/new")}
                  className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition"
                >
                  Record Your First Dream
                </button>
              </div>
            )}

            {!loading && dreams.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {dreams.map((dream) => (
                    <DreamCard
                      key={dream._id}
                      dream={dream}
                      onView={handleView}
                      onEdit={handleEdit}
                      onDelete={handleDeleteClick}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Pagination at bottom */}
        {!loading && dreams.length > 0 && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
      
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Dream"
        message="This dream and its AI interpretation will be permanently removed."
      />
    </div>
  );
}
