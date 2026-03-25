export default function PrimaryButton({ children, href = "#oferta", className = "", primary = true }) {
  return (
    <a
      href={href}
      className={`cta-btn ${primary ? "cta-primary" : ""} ${className}`}
    >
      <span className="cta-btn__label">{children}</span>
    </a>
  );
}
