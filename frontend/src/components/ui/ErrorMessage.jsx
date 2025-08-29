/**
 * ErrorMessage Component
 * @param {Object} props
 * @param {string} props.message - Error message to display
 * @param {string} [props.className=""] - Additional CSS classes
 * @param {Function} [props.onDismiss] - Optional dismiss handler
 * @param {string} [props.variant="error"] - Style variant: "error", "warning", "info"
 */
export default function ErrorMessage({ message, className = "", onDismiss, variant = "error" }) {
  if (!message) return null;

  const variants = {
    error: "bg-red-900/30 border-red-800/50 text-red-200",
    warning: "bg-yellow-900/30 border-yellow-800/50 text-yellow-200", 
    info: "bg-blue-900/30 border-blue-800/50 text-blue-200"
  };

  return (
    <div 
      className={`rounded-lg border p-3 text-sm ${variants[variant]} ${className}`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2">
          {variant === "error" && (
            <svg className="h-4 w-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          )}
          <span>{message}</span>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 rounded hover:bg-black/20 p-1"
            aria-label="Dismiss error"
          >
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}