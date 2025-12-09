"use client";

export default function DreamFilters({ filters, onFilterChange, tags }) {
  const moods = ["happy", "sad", "anxious", "calm", "confused", "excited", "fearful", "neutral"];

  return (
    <div className="glass-card rounded-2xl p-4 space-y-4">
      <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
        <span>☰</span>
        Filters
      </h3>

      {/* Mood Filter */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Mood</label>
        <select
          value={filters.mood || ""}
          onChange={(e) => onFilterChange({ ...filters, mood: e.target.value })}
          className="w-full px-3 py-2 glass-night rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Moods</option>
          {moods.map((mood) => (
            <option key={mood} value={mood} className="bg-slate-800">
              {mood.charAt(0).toUpperCase() + mood.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Favorite Filter */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Favorites</label>
        <select
          value={filters.isFavorite || ""}
          onChange={(e) => onFilterChange({ ...filters, isFavorite: e.target.value })}
          className="w-full px-3 py-2 glass-night rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" className="bg-slate-800">All Dreams</option>
          <option value="true" className="bg-slate-800">Favorites Only ⭐</option>
          <option value="false" className="bg-slate-800">Non-Favorites</option>
        </select>
      </div>

      {/* Date Range */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Date From</label>
        <input
          type="date"
          value={filters.dateFrom || ""}
          onChange={(e) => onFilterChange({ ...filters, dateFrom: e.target.value })}
          className="w-full px-3 py-2 glass-night rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">Date To</label>
        <input
          type="date"
          value={filters.dateTo || ""}
          onChange={(e) => onFilterChange({ ...filters, dateTo: e.target.value })}
          className="w-full px-3 py-2 glass-night rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Stickers Filter */}
      {tags && tags.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Stickers</label>
          <select
            value={filters.tags || ""}
            onChange={(e) => onFilterChange({ ...filters, tags: e.target.value })}
            className="w-full px-3 py-2 glass-night rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" className="bg-slate-800">All Stickers</option>
            {tags.map((sticker) => (
              <option key={sticker._id} value={sticker._id} className="bg-slate-800">
                {sticker.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Clear Filters */}
      <button
        onClick={() => onFilterChange({ mood: "", isFavorite: "", dateFrom: "", dateTo: "", tags: "" })}
        className="w-full px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-xl text-sm transition-colors duration-200"
      >
        Clear All Filters
      </button>
    </div>
  );
}
