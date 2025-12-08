import { memo } from 'react';

const Button = memo(function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}) {
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 hover:scale-[1.02] shadow-lg shadow-blue-500/30',
    secondary: 'bg-slate-800/50 text-slate-200 border border-slate-700 hover:bg-slate-700/50 hover:scale-[1.02]',
    ghost: 'bg-transparent text-slate-300 hover:bg-slate-800/30 hover:scale-[1.02]',
  };

  return (
    <button
      className={`${variants[variant]} px-6 py-3 rounded-xl font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
