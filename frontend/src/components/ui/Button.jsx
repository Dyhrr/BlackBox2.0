export default function Button({ variant = "primary", className = "", as = "button", ...props }) {
  const base = "btn";
  const styles = {
    primary: "btn--accent",
    secondary: "btn--ghost",
    ghost: "btn--ghost",
  };
  const Component = as;
  return <Component className={`${base} ${styles[variant]} ${className}`} {...props} />;
}
