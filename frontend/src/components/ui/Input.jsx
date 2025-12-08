export default function Input({ 
  label, 
  error, 
  className = "", 
  ...props 
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-300 mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 rounded-xl bg-slate-800/50 border backdrop-blur-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all ${error ? 'border-red-500' : 'border-slate-700'} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
