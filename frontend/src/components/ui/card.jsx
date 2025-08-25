export function Card({ className = '', children, ...props }) {
  return (
    <div className={`border border-white/10 bg-white/5 ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardContent({ className = '', children, ...props }) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}
