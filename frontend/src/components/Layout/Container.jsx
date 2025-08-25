export default function Container({ className = "", children }) {
  return <div className={`max-w-[1280px] mx-auto px-6 md:px-8 ${className}`}>{children}</div>;
}
