/**
 * LoadingSpinner Component
 * @param {Object} props
 * @param {string} [props.size="md"] - Size of spinner: "sm", "md", "lg"
 * @param {string} [props.className=""] - Additional CSS classes
 * @param {string} [props.text] - Optional loading text
 */
export default function LoadingSpinner({ size = "md", className = "", text }) {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  };

  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <div 
        className={`animate-spin rounded-full border-2 border-zinc-600 border-t-white ${sizes[size]}`}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
      {text && <span className="text-sm text-zinc-400">{text}</span>}
    </div>
  );
}