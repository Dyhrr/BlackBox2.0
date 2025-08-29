/**
 * Banner Component - For displaying announcements, alerts, and status messages
 * @param {Object} props
 * @param {React.ReactNode} props.children - Banner content
 * @param {string} [props.variant="info"] - Banner style: "info", "success", "warning", "error"
 * @param {boolean} [props.dismissible=false] - Whether banner can be dismissed
 * @param {Function} [props.onDismiss] - Callback when banner is dismissed
 * @param {string} [props.className=""] - Additional CSS classes
 * @param {boolean} [props.fixed=false] - Whether banner is fixed positioned
 * @param {string} [props.icon] - Icon type to display
 */
export default function Banner({ 
  children, 
  variant = "info", 
  dismissible = false, 
  onDismiss, 
  className = "",
  fixed = false,
  icon
}) {
  const variants = {
    info: "bg-blue-900/30 border-blue-800/50 text-blue-200",
    success: "bg-green-900/30 border-green-800/50 text-green-200",
    warning: "bg-yellow-900/30 border-yellow-800/50 text-yellow-200",
    error: "bg-red-900/30 border-red-800/50 text-red-200"
  };

  const icons = {
    info: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    ),
    success: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    warning: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
    error: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    )
  };

  const getIcon = () => {
    if (icon && icons[icon]) return icons[icon];
    return icons[variant];
  };

  const baseClasses = `
    rounded-lg border p-4 text-sm
    ${variants[variant]}
    ${fixed ? 'fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md' : ''}
    ${className}
  `;

  return (
    <div className={baseClasses} role="alert" aria-live="polite">
      <div className="flex items-start gap-3">
        {getIcon() && (
          <div className="flex-shrink-0 mt-0.5">
            {getIcon()}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          {children}
        </div>
        
        {dismissible && onDismiss && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 rounded hover:bg-black/20 p-1 transition-colors"
            aria-label="Dismiss banner"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}