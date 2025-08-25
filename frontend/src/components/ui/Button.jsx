export default function Button({ variant = "primary", className = "", as = "button", ...props }) {
  const base = "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white/60 ring-offset-black/0";
  const styles = {
    primary: "bg-white text-black hover:bg-white/90",
    secondary: "border border-white/20 text-white hover:bg-white/5",
    ghost: "text-white/80 hover:text-white"
  };
  const Component = as;
  return <Component className={`${base} ${styles[variant]} ${className}`} {...props} />;
}
