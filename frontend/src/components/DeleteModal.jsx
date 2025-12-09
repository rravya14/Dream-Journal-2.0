"use client";

export default function DeleteModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white/10 backdrop-blur-md rounded-lg p-5 max-w-sm w-full border border-white/20 shadow-xl">
        <h3 className="text-lg font-semibold text-white mb-2">{title || "Delete Item"}</h3>
        <p className="text-gray-300 text-sm mb-5">
          {message || "Are you sure? This can't be undone."}
        </p>
        
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 px-4 py-2 bg-red-500/80 hover:bg-red-500 text-white rounded-md transition text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
