"use client";

export default function DreamCard({ dream, onView, onEdit, onDelete, onToggleFavorite }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleCardClick = (e) => {
    // Don't trigger if clicking on buttons
    if (e.target.closest('button')) return;
    onView(dream);
  };

  const getMoodColor = (mood) => {
    const colors = {
      happy: "text-yellow-400",
      sad: "text-blue-400",
      anxious: "text-orange-400",
      calm: "text-green-400",
      confused: "text-purple-400",
      excited: "text-pink-400",
      fearful: "text-red-400",
      neutral: "text-gray-400",
    };
    return colors[mood] || colors.neutral;
  };

  const getMoodEmoji = (mood) => {
    const emojis = {
      happy: "😊",
      sad: "😢",
      anxious: "😰",
      calm: "😌",
      confused: "😕",
      excited: "🤩",
      fearful: "😨",
      neutral: "😐",
    };
    return emojis[mood] || emojis.neutral;
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-white truncate group-hover:text-indigo-300 transition">{dream.title}</h3>
            {dream.isFavorite && <span className="text-yellow-400 text-lg">⭐</span>}
          </div>
          <p className="text-sm text-gray-400 flex items-center gap-1.5">
            <span>📅</span>
            {formatDate(dream.dreamDate)}
          </p>
        </div>
        <button
          onClick={() => onToggleFavorite(dream._id, !dream.isFavorite)}
          className="text-2xl hover:scale-125 transition-transform duration-200"
          title={dream.isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {dream.isFavorite ? "⭐" : "☆"}
        </button>
      </div>

      <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">{dream.description}</p>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 rounded-full">
          <span className={`text-base ${getMoodColor(dream.mood)}`}>
            {getMoodEmoji(dream.mood)}
          </span>
          <span className="text-xs text-gray-400 capitalize font-medium">{dream.mood}</span>
        </div>
        
        {dream.tags && dream.tags.length > 0 && (
          <div className="flex gap-1.5 flex-wrap">
            {dream.tags.slice(0, 3).map((sticker) => (
              <span
                key={sticker._id}
                className="px-2.5 py-1 rounded-full text-xs font-medium transition hover:scale-105"
                style={{ backgroundColor: `${sticker.color}25`, color: sticker.color, borderColor: `${sticker.color}40` }}
              >
                {sticker.name}
              </span>
            ))}
            {dream.tags.length > 3 && (
              <span className="px-2.5 py-1 rounded-full text-xs bg-white/10 text-gray-400 font-medium">
                +{dream.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(dream)}
          className="flex-1 px-3 py-2 text-sm bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition font-medium"
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => onDelete(dream._id)}
          className="flex-1 px-3 py-2 text-sm bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-300 rounded-lg transition font-medium"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}
