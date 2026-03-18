export default function PrimaryButton({ children, href = "#oferta", className = "" }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-full bg-brand-terracotta px-7 py-3.5 text-base font-semibold tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#bb3a1a] hover:shadow-premium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-terracotta ${className}`}
    >
      {children}
    </a>
  );
}
