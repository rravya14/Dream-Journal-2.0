export default function Card({ 
  children, 
  className = "", 
  ...props 
}) {
  return (
    <div
      className={`glass-card rounded-2xl p-6 hover:scale-[1.01] transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
