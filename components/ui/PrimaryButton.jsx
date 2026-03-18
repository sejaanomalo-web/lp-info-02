export default function PrimaryButton({ children, href = "#oferta", className = "", primary = true }) {
  return (
    <a
      href={href}
      className={`cta-btn ${primary ? "cta-primary" : ""} ${className}`}
    >
      {children}
    </a>
  );
}
