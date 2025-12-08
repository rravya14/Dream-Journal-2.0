"use client";

export default function TagCard({ tag, onEdit, onDelete }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/10 transition">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full"
            style={{ backgroundColor: tag.color }}
          />
          <div>
            <h3 className="text-lg font-medium text-white">{tag.name}</h3>
            <p className="text-sm text-gray-400">
              Created {new Date(tag.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(tag)}
            className="px-3 py-1 text-sm bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 rounded-md transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(tag._id)}
            className="px-3 py-1 text-sm bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-md transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
