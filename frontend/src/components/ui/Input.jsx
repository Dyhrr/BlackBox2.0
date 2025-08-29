/**
 * Enhanced Input Component with validation
 * @param {Object} props
 * @param {string} [props.label] - Input label
 * @param {string} [props.error] - Error message
 * @param {boolean} [props.required=false] - Whether input is required
 * @param {string} [props.className=""] - Additional CSS classes
 * @param {string} [props.placeholder] - Placeholder text
 * @param {string} [props.type="text"] - Input type
 * @param {string} props.value - Input value
 * @param {Function} props.onChange - Change handler
 * @param {...any} props - Additional props passed to input
 */
export default function Input({ 
  label, 
  error, 
  required = false, 
  className = "", 
  placeholder,
  type = "text",
  value,
  onChange,
  ...props 
}) {
  const inputId = props.id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = !!error;

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label 
          htmlFor={inputId}
          className={`block text-sm font-medium ${hasError ? 'text-red-400' : 'text-zinc-300'}`}
        >
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`
          w-full rounded-lg border px-3 py-2 text-sm transition-colors
          bg-zinc-950 text-white placeholder-zinc-500
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900
          ${hasError 
            ? 'border-red-600 focus:border-red-500 focus:ring-red-500/20' 
            : 'border-zinc-700 focus:border-zinc-500 focus:ring-white/20'
          }
        `}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${inputId}-error` : undefined}
        {...props}
      />
      {hasError && (
        <p id={`${inputId}-error`} className="text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}