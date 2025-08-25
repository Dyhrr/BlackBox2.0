export default function Container({ variant = "wide", className = "", children }) {
  const base =
    variant === "fluid"
      ? "w-full px-4 sm:px-6 lg:px-10"
      : variant === "wide"
      ? "mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10"
      : "mx-auto w-full max-w-6xl px-4 sm:px-6"; // legacy boxed

  return <div className={`${base} ${className}`}>{children}</div>;
}
