"use client";

const easeInOutCubic = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

function fastSmoothScrollTo(targetY, duration = 500) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 2) return;
  const startTime = performance.now();

  const step = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);
    window.scrollTo(0, startY + distance * eased);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export default function PrimaryButton({ children, href = "#oferta", className = "", primary = true }) {
  const isHashLink = typeof href === "string" && href.startsWith("#");

  const handleClick = (event) => {
    if (!isHashLink) return;
    const target = document.querySelector(href);
    if (!target) return;
    event.preventDefault();
    const navbar = document.querySelector(".navbar");
    const offset = navbar ? navbar.getBoundingClientRect().height : 0;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    fastSmoothScrollTo(top, 500);
  };

  return (
    <a
      href={href}
      onClick={isHashLink ? handleClick : undefined}
      className={`cta-btn ${primary ? "cta-primary" : ""} ${className}`}
    >
      <span className="cta-btn__label">{children}</span>
    </a>
  );
}
