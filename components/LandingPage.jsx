"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import {
  audience,
  benefits,
  deliverables,
  faq,
  notFor,
  painSignals,
  pillars,
  testimonials
} from "@/lib/content";

/* ── TESTIMONIAL MEDIA ITEMS ────────────────────────────────────── */
const testimonialMedia = [
  { type: "photo", src: "/depoimentos/01-depoimento-foto.jpg",           alt: "Depoimento de aluno. Arquiteto de Ideias" },
  { type: "video", src: "/depoimentos/02-depoimento-video.mp4",          alt: "" },
  { type: "video", src: "/depoimentos/03-depoimento-video.mp4",          alt: "" },
  { type: "photo", src: "/depoimentos/04-depoimento-whatsapp.jpg",       alt: "Depoimento via WhatsApp. Arquiteto de Ideias" },
  { type: "photo", src: "/depoimentos/05-depoimento-story-luciana.jpg",  alt: "Depoimento Luciana. Arquiteto de Ideias" },
];
import Container from "@/components/ui/Container";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Reveal from "@/components/ui/Reveal";

/* ── ANIMATION VARIANTS ─────────────────────────────────────────── */
const listStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } }
};

const listItem = {
  hidden: { opacity: 0, y: 20, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.19, 1, 0.22, 1] }
  }
};

/* ── SECTION TITLE ──────────────────────────────────────────────── */
function SectionTitle({ eyebrow, title, description }) {
  return (
    <Reveal className="mx-auto max-w-3xl text-left md:text-center">
      <p className="section-label" data-reveal>{eyebrow}</p>
      <h2 className="mt-4 text-balance text-3xl font-bold uppercase leading-tight text-brand-cream md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-balance text-lg font-light leading-relaxed text-brand-cream/65">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

/* ── ACCORDION ──────────────────────────────────────────────────── */
function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <motion.div
            key={item.question}
            layout
            className="accordion-item"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-lg font-semibold uppercase tracking-wide text-brand-cream leading-snug">
                {item.question}
              </span>
              <span
                className={`grid h-8 w-8 flex-shrink-0 place-items-center rounded-full border text-xl transition-all duration-300 ${
                  isOpen
                    ? "border-brand-terracotta text-brand-terracotta rotate-45"
                    : "border-brand-cream/25 text-brand-cream/60"
                }`}
              >
                +
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                >
                  <p className="px-6 pb-6 text-[1.03rem] font-light leading-relaxed text-brand-cream/65">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ── TESTIMONIAL CAROUSEL ───────────────────────────────────────── */
function TestimonialCarousel({ items, initialDir = -1, speed = 0.6 }) {
  const trackRef = useRef(null);
  const posRef = useRef(0);
  const dirRef = useRef(initialDir);
  const speedRef = useRef(speed);
  const rafRef = useRef(null);
  const pausedRef = useRef(false);

  const animate = useCallback(() => {
    const track = trackRef.current;
    if (!track || pausedRef.current) {
      rafRef.current = requestAnimationFrame(animate);
      return;
    }
    const halfWidth = track.scrollWidth / 2;
    posRef.current += dirRef.current * speedRef.current;
    if (posRef.current <= -halfWidth) posRef.current += halfWidth;
    if (posRef.current >= 0) posRef.current -= halfWidth;
    track.style.transform = `translateX(${posRef.current}px)`;
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  const handleArrow = (dir) => {
    if (dirRef.current === dir) {
      speedRef.current = Math.min(speedRef.current + 0.4, 3);
    } else {
      speedRef.current = speed;
      dirRef.current = dir;
    }
  };

  const doubled = [...items, ...items];

  return (
    <div className="relative mt-12">
      {/* Lateral fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-brand-navy to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-brand-navy to-transparent" />

      <button
        onClick={() => handleArrow(1)}
        onMouseEnter={() => { dirRef.current = 1; speedRef.current = 1.2; }}
        onMouseLeave={() => { speedRef.current = speed; }}
        className="absolute left-2 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-brand-cream/20 bg-brand-navy-surface text-brand-cream/70 transition-all hover:border-brand-terracotta hover:bg-brand-terracotta hover:text-white"
        aria-label="Rolar para a esquerda"
      >
        ←
      </button>

      <button
        onClick={() => handleArrow(-1)}
        onMouseEnter={() => { dirRef.current = -1; speedRef.current = 1.2; }}
        onMouseLeave={() => { speedRef.current = speed; }}
        className="absolute right-2 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-brand-cream/20 bg-brand-navy-surface text-brand-cream/70 transition-all hover:border-brand-terracotta hover:bg-brand-terracotta hover:text-white"
        aria-label="Rolar para a direita"
      >
        →
      </button>

      <div className="overflow-hidden px-12">
        <div
          ref={trackRef}
          className="flex gap-5 will-change-transform"
          style={{ width: "max-content" }}
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
        >
          {doubled.map((item, i) => (
            <article
              key={i}
              className="testi-card w-80 flex-shrink-0 rounded-[1.2rem] border border-brand-cream/10 bg-brand-navy-surface p-6"
            >
              <p className="text-base font-light italic leading-relaxed text-brand-cream/75">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="mt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-terracotta">
                  {item.name}
                </p>
                {item.role && (
                  <p className="mt-0.5 text-xs font-light text-brand-cream/40">{item.role}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── VIDEO CARD (play/pause) ────────────────────────────────────── */
function VideoCard({ src }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else          { v.pause(); setPlaying(false); }
  };

  return (
    <div className={`video-testi-thumb video-testi-thumb--video${playing ? " is-playing" : ""}`}>
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        loop
        playsInline
        preload="metadata"
        onClick={toggle}
        onEnded={() => setPlaying(false)}
      />
      <button
        className="play-btn"
        aria-label="Reproduzir depoimento"
        onClick={toggle}
      />
    </div>
  );
}

/* ── MEDIA TESTIMONIAL CAROUSEL ─────────────────────────────────── */
function VideoTestimonialCarousel({ items, inverted = false }) {
  const trackRef = useRef(null);
  const posRef = useRef(0);
  const dirRef = useRef(1);
  const speedRef = useRef(0.55);
  const rafRef = useRef(null);
  const pausedRef = useRef(false);

  const animate = useCallback(() => {
    const track = trackRef.current;
    if (!track || pausedRef.current) {
      rafRef.current = requestAnimationFrame(animate);
      return;
    }
    const halfWidth = track.scrollWidth / 2;
    posRef.current += dirRef.current * speedRef.current;
    if (posRef.current <= -halfWidth) posRef.current += halfWidth;
    if (posRef.current >= 0) posRef.current -= halfWidth;
    track.style.transform = `translateX(${posRef.current}px)`;
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  const handleArrow = (dir) => {
    if (dirRef.current === dir) {
      speedRef.current = Math.min(speedRef.current + 0.4, 3);
    } else {
      speedRef.current = 0.55;
      dirRef.current = dir;
    }
  };

  const doubled = [...items, ...items];

  const arrowClass = inverted
    ? "absolute top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-brand-navy/25 bg-transparent text-brand-navy/70 transition-all hover:border-brand-terracotta hover:bg-brand-terracotta hover:text-white"
    : "absolute top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-brand-cream/20 bg-brand-navy-surface text-brand-cream/70 transition-all hover:border-brand-terracotta hover:bg-brand-terracotta hover:text-white";

  return (
    <div className="relative mt-12">
      {/* Lateral fades */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
        style={{ background: inverted ? "linear-gradient(to right, #F1DAB2, transparent)" : "linear-gradient(to right, #150e30, transparent)" }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
        style={{ background: inverted ? "linear-gradient(to left, #F1DAB2, transparent)" : "linear-gradient(to left, #150e30, transparent)" }}
      />

      <button
        onClick={() => handleArrow(1)}
        onMouseEnter={() => { dirRef.current = 1; speedRef.current = 1.2; }}
        onMouseLeave={() => { speedRef.current = 0.55; }}
        className={`left-2 ${arrowClass}`}
        aria-label="Rolar para a esquerda"
      >
        ←
      </button>
      <button
        onClick={() => handleArrow(-1)}
        onMouseEnter={() => { dirRef.current = -1; speedRef.current = 1.2; }}
        onMouseLeave={() => { speedRef.current = 0.55; }}
        className={`right-2 ${arrowClass}`}
        aria-label="Rolar para a direita"
      >
        →
      </button>

      <div className="overflow-hidden px-12">
        <div
          ref={trackRef}
          className="flex gap-5 will-change-transform"
          style={{ width: "max-content" }}
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
        >
          {doubled.map((item, i) =>
            item.type === "video" ? (
              <div key={i} className="video-testi-card flex-shrink-0">
                <VideoCard src={item.src} />
              </div>
            ) : (
              <div key={i} className="video-testi-card flex-shrink-0">
                <div className="video-testi-thumb">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

/* ── MODULE COUNTER (inherits color from parent) ────────────────── */
function ModuleCounter({ target }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const dur = 1400;
          const start = performance.now();
          const update = (now) => {
            const p = Math.min((now - start) / dur, 1);
            const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
            setCount(Math.round(eased * target));
            if (p < 1) requestAnimationFrame(update);
          };
          requestAnimationFrame(update);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}</span>;
}

/* ── ANIMATED COUNTER ───────────────────────────────────────────── */
function AnimatedCounter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const dur = 1400;
          const start = performance.now();
          const update = (now) => {
            const p = Math.min((now - start) / dur, 1);
            const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
            setCount(Math.round(eased * target));
            if (p < 1) requestAnimationFrame(update);
          };
          requestAnimationFrame(update);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="text-2xl font-bold text-brand-cream">
      {count.toLocaleString("pt-BR")}{suffix}
    </span>
  );
}

/* ── MAIN COMPONENT ─────────────────────────────────────────────── */
export default function LandingPage() {
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const siblings = Array.from(
              entry.target.parentElement?.querySelectorAll("[data-reveal]") ?? []
            );
            const idx = siblings.indexOf(entry.target);
            entry.target.style.transitionDelay = `${idx * 80}ms`;
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    const labelObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("line-revealed");
            labelObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    document.querySelectorAll(".section-label").forEach((el) => labelObserver.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      labelObserver.disconnect();
    };
  }, []);

  return (
    <main className="bg-brand-navy">

      {/* TOPBAR */}
      <div className="bg-brand-navy-dark py-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-brand-cream/80">
        Módulo 1 já disponível&nbsp;&nbsp;·&nbsp;&nbsp;Acesso imediato após a inscrição
      </div>

      {/* NAVBAR */}
      <nav className={`navbar px-4 py-4 ${navScrolled ? "scrolled" : ""}`}>
        <Container>
          <div className="flex items-center justify-between gap-6">
            <span className="navbar-logo">
              <img
                src="/logos/logo-navbar.png"
                alt="Diego Knebel"
                className="logo-navbar-img"
                width="208"
                height="32"
                loading="eager"
              />
            </span>
            <PrimaryButton className="hidden md:inline-flex" href="#oferta">
              Quero garantir minha vaga
            </PrimaryButton>
          </div>
        </Container>
      </nav>

      {/* HERO */}
      <section
        id="hero"
        className="relative isolate overflow-hidden bg-brand-navy pb-24 pt-12 text-white md:pb-32"
      >
        {/* Background layer */}
        <div className="hero-bg-layer" aria-hidden="true">
          <img
            src="/hero/hero-bg-desktop.jpg"
            alt=""
            className="hero-bg-img hero-bg-img--desktop"
            loading="eager"
            fetchPriority="high"
          />
          <img
            src="/hero/hero-bg-mobile.jpg"
            alt=""
            className="hero-bg-img hero-bg-img--mobile"
            loading="eager"
            fetchPriority="high"
          />
          <div className="hero-bg-overlay" aria-hidden="true" />
        </div>

        <div className="grid-overlay absolute inset-0 z-[1] opacity-10" />

        <Container className="relative z-10">
          <div className="hero-grid grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
            <div className="hero-text">
              <h1 className="hero-headline text-5xl font-black uppercase leading-[0.95] tracking-tight text-brand-cream md:text-7xl lg:text-8xl">
                Arquiteto
                <br />
                <span className="text-brand-terracotta">de Ideias</span>
              </h1>
              <p className="hero-sub mt-5 text-xl font-light uppercase tracking-[0.2em] text-brand-cream/70 md:text-2xl">
                Fale, Convença e Envolva
              </p>
              <p className="hero-body mt-6 max-w-2xl text-lg font-light leading-relaxed text-brand-cream/65">
                Você já venceu o medo de falar. O problema agora é diferente, e mais difícil.
                Você fala, mas as pessoas não chegam onde você quer.
              </p>
              <div className="hero-cta mt-10">
                <PrimaryButton href="#oferta">Quero construir minha clareza</PrimaryButton>
                <p className="cta-microcopy mt-3">Acesso vitalício · Garantia de 7 dias</p>
              </div>
            </div>

            <div className="hero-image relative mx-auto max-w-xl">
              <img
                src="/images/hero-principal.jpg"
                alt="Diego Knebel"
                className="hero-photo"
              />
              <motion.div
                className="glass-card absolute -left-8 top-12 rounded-2xl border border-brand-cream/15 p-4 md:p-5"
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-xs uppercase tracking-[0.18em] text-brand-cream/60">
                  Direção central
                </p>
                <p className="mt-1 text-sm font-semibold uppercase text-brand-cream">
                  Clareza que guia
                </p>
              </motion.div>
              <motion.div
                className="glass-card absolute -bottom-8 right-5 rounded-2xl border border-brand-cream/15 p-4 md:p-5"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-xs uppercase tracking-[0.18em] text-brand-terracotta">
                  Resultado esperado
                </p>
                <p className="mt-1 text-sm font-semibold uppercase text-brand-cream">
                  Autoridade percebida
                </p>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* DIAGNÓSTICO DA DOR */}
      <section id="identificacao" className="section-divider bg-brand-navy-dark py-16">
        <Container>
          <Reveal>
            <h2 className="max-w-3xl text-balance text-3xl font-bold uppercase leading-tight text-brand-cream md:text-4xl">
              Quando a comunicação está confusa,
              <br className="hidden md:block" />
              o valor do seu repertório fica{" "}
              <span className="text-brand-terracotta">invisível.</span>
            </h2>
          </Reveal>

          <ul className="pain-list mt-10">
            {painSignals.map((signal, i) => {
              const icons = ["🧠", "🔇", "📡", "🏗️"];
              return (
                <li key={signal} className="pain-list__item" data-reveal>
                  <span className="pain-list__icon" aria-hidden="true">{icons[i]}</span>
                  <span className="pain-list__text">{signal}</span>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* O PROBLEMA REAL */}
      <section id="dor" className="section-divider section--inv py-20 md:py-28">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <p className="section-label">O diagnóstico</p>
            <h2 className="mt-4 text-balance text-3xl font-bold uppercase text-brand-cream md:text-5xl">
              Você não é confuso
              <br />
              por saber pouco.
            </h2>
            <p className="mt-6 text-lg leading-relaxed">
              É o oposto. Você é confuso porque sabe{" "}
              <strong>demais,</strong> e o seu cérebro esqueceu como era não saber.
              A ciência chama isso de <strong>Maldição do Conhecimento.</strong>{" "}
              Você pulou etapas, usou termos que só você entende, e pressupôs que
              o óbvio para você é óbvio para o outro. Não é.
            </p>
            <p className="mt-4 text-lg leading-relaxed">
              Enquanto isso, pessoas com metade do seu preparo ocupam lugares que
              deveriam ser seus, simplesmente porque elas conseguem se fazer entender.
              Isso dói. E é evitável.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[1.4rem] border border-brand-terracotta/30 bg-brand-navy-surface p-8">
              <p className="section-label">Sinal crítico</p>
              <p className="mt-4 text-2xl font-bold uppercase leading-tight text-brand-cream">
                Quanto mais conhecimento sem estrutura, maior o risco de ser mal interpretado.
              </p>
              <p className="mt-6 text-base font-light leading-relaxed text-brand-cream/60">
                Estrutura não engessa sua identidade. Ela sustenta sua presença e amplifica sua
                autoridade.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* QUEBRA DE CRENÇA */}
      <section id="quebra-crenca" className="section-divider bg-brand-navy-dark py-20 md:py-28">
        <Container>
          <SectionTitle
            eyebrow="Quebra de crença"
            title="Falar mais, falar bonito ou falar difícil não resolve."
            description="Autoridade real nasce quando sua mensagem é compreendida com precisão e sentida com força."
          />

        </Container>
      </section>

      {/* A SOLUÇÃO */}
      <section id="solucao" className="section-divider section--inv py-20 md:py-28">
        <Container>
          <Reveal>
            <p className="section-label">A solução</p>
            <h2 className="mt-4 text-balance text-3xl font-black uppercase md:text-5xl">
              Falar bem não é um dom.
              <br />
              <em className="not-italic text-brand-terracotta">É uma engenharia.</em>
            </h2>
            <div className="mt-8 max-w-3xl space-y-4">
              <p className="text-lg leading-relaxed">
                Catedrais não ficam de pé por séculos porque alguém foi criativo.
                Elas ficam porque alguém calculou as vigas antes de pintar os vitrais.
                A sua comunicação funciona igual.
              </p>
              <p className="text-lg leading-relaxed">
                O Arquiteto de Ideias é o treinamento que constrói a estrutura invisível
                por trás de cada fala, de um Reels de 60 segundos a uma masterclass de
                2 horas, para que você nunca mais se perca no meio do caminho.
              </p>
              <p className="text-lg leading-relaxed">
                Não é sobre falar difícil. Não é sobre ser performático.{" "}
                <strong>É sobre ser inesquecível.</strong>
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* BENEFÍCIOS */}
      <section id="beneficios" className="section-divider section--inv py-20 md:py-28">
        <Container>
          <Reveal>
            <p className="section-label">Resultados práticos, emocionais e estratégicos</p>
            <h2 className="mt-4 text-balance text-3xl font-bold uppercase md:text-5xl">
              Cada etapa do método foi desenhada para elevar
              sua clareza, sua presença e seu poder de influência.
            </h2>
          </Reveal>

          <div className="benefits-grid mt-12" data-reveal>
            {[
              {
                num: "01",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                title: "Mensagem com direção",
                text: "Construa narrativas com começo, meio e fim para conduzir atenção e gerar entendimento imediato."
              },
              {
                num: "02",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                title: "Presença sem agressividade",
                text: "Comunique com firmeza e segurança, mantendo elegância e autenticidade em qualquer contexto."
              },
              {
                num: "03",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                title: "Retórica aplicada",
                text: "Use analogias, silêncio e perguntas estratégicas para tornar sua fala irresistível sem artificialidade."
              },
              {
                num: "04",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                title: "Improviso estruturado",
                text: "Nunca mais fique em branco. Aprenda a montar respostas poderosas em segundos com memória modular."
              },
              {
                num: "05",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
                  </svg>
                ),
                title: "Autoridade percebida",
                text: "Seja reconhecido pela forma como organiza ideias e conduz conversas, mesmo antes de abrir a boca."
              },
              {
                num: "06",
                icon: (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M17 2.1l4 4-4 4M3 12.2a9 9 0 0 1 14-7.1M7 22l-4-4 4-4M21 11.8a9 9 0 0 1-14 7.1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
                title: "Comunicação com método",
                text: "Pare de depender de inspiração. Tenha um sistema replicável para qualquer situação: ao vivo, em vídeo, em reunião."
              }
            ].map((b) => (
              <div key={b.num} className="benefit-card">
                <span className="benefit-card__num" aria-hidden="true">{b.num}</span>
                <div className="benefit-card__icon" aria-hidden="true">{b.icon}</div>
                <h3 className="benefit-card__title">{b.title}</h3>
                <p className="benefit-card__text">{b.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* DEPOIMENTOS EM TEXTO */}
      <section id="depoimentos" className="section-divider bg-brand-navy py-20 md:py-28">
        <Container>
          <SectionTitle
            eyebrow="O que estão dizendo"
            title="Quem construiu. Quem transformou."
          />
        </Container>
        <TestimonialCarousel items={testimonials} initialDir={-1} speed={0.6} />
      </section>

      {/* OS 4 PILARES */}
      <section id="pilares" className="section-divider bg-brand-navy-dark py-20 md:py-28">
        <Container>
          <SectionTitle
            eyebrow="O método central"
            title="Uma arquitetura de comunicação que sustenta performance de alto nível."
            description="Clareza, estrutura, retórica e domínio situacional em um sistema único."
          />

          <motion.div
            className="mt-12 grid gap-5 md:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={listStagger}
          >
            {pillars.map((pillar) => (
              <motion.article
                key={pillar.id}
                variants={listItem}
                className="card-interactive rounded-[1.4rem] bg-brand-navy-surface p-7"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-terracotta">
                  Pilar {pillar.id} · {pillar.letter} · {pillar.letterLabel}
                </p>
                <h3 className="mt-3 text-xl font-bold uppercase tracking-wide text-brand-cream">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-base font-light leading-relaxed text-brand-cream/60">
                  {pillar.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* POSICIONAMENTO CONCEITUAL */}
      <section id="posicionamento" className="section-divider bg-brand-navy py-24 md:py-36">
        <Container>
          <Reveal className="mx-auto max-w-5xl text-center">
            <p className="text-balance text-4xl font-black uppercase leading-tight text-brand-cream md:text-6xl lg:text-7xl">
              Não é sobre parecer inteligente.
              <br className="hidden md:block" />
              É sobre ser{" "}
              <span className="text-brand-terracotta">impossível de ignorar.</span>
            </p>
            <p className="mx-auto mt-8 max-w-3xl text-balance text-xl font-light leading-relaxed text-brand-cream/60">
              Quando sua mensagem combina profundidade e clareza,
              <br className="hidden md:block" />
              sua presença deixa de competir por atenção
              <br className="hidden md:block" />e passa a{" "}
              <strong className="font-semibold text-brand-cream">comandar atenção.</strong>
            </p>
          </Reveal>
        </Container>
      </section>

      {/* O QUE VOCÊ RECEBE */}
      <section id="modulos" className="section-divider modules-section py-20 md:py-28">
        <Container>

          <div className="modules-header" data-reveal>
            <p className="section-label">O que você vai aprender</p>
            <h2 className="mt-4 text-balance text-3xl font-black uppercase text-brand-cream md:text-5xl">
              16 aulas. 4 módulos.<br /><em className="not-italic text-brand-terracotta">Uma construção completa.</em>
            </h2>
            <div className="modules-stats">
              {[
                { target: 16, label: "Aulas" },
                { target: 4,  label: "Módulos" },
                { target: 1,  label: "Bônus exclusivo" }
              ].map(({ target, label }) => (
                <div key={label} className="modules-stat">
                  <span className="modules-stat__num">
                    <ModuleCounter target={target} />
                  </span>
                  <span className="modules-stat__label">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="modules-layout">

            <div className="modules-list">

              <div className="module-item" data-reveal>
                <div className="module-item__header">
                  <span className="module-item__tag">Módulo 01</span>
                  <h3 className="module-item__title">O Fim da Encheção de Linguiça</h3>
                </div>
                <ul className="module-item__aulas">
                  <li><span className="aula-num">01</span>A Maldição do Conhecimento: por que o seu saber te sabota</li>
                  <li><span className="aula-num">02</span>Mapa Mental vs. Mapa Verbal: pensar é uma teia, falar é uma linha</li>
                  <li><span className="aula-num">03</span>O Objetivo Único: o tiro de sniper que não deixa ninguém para trás</li>
                  <li><span className="aula-num">04</span>Como falar a língua de quem está te ouvindo</li>
                </ul>
              </div>

              <div className="module-item" data-reveal>
                <div className="module-item__header">
                  <span className="module-item__tag">Módulo 02</span>
                  <h3 className="module-item__title">O Esqueleto da Mensagem</h3>
                </div>
                <ul className="module-item__aulas">
                  <li><span className="aula-num">05</span>O método GPS-C: a viga que sustenta qualquer fala</li>
                  <li><span className="aula-num">06</span>Storytelling em 3 minutos: os 4 atos que abrem o coração</li>
                  <li><span className="aula-num">07</span>Roteiros para vídeos curtos: Reels e TikTok com profundidade real</li>
                  <li><span className="aula-num">08</span>Roteiros para aulas longas: sem perder o ritmo em 90 minutos</li>
                </ul>
              </div>

              <div className="module-item" data-reveal>
                <div className="module-item__header">
                  <span className="module-item__tag">Módulo 03</span>
                  <h3 className="module-item__title">A Caixa de Ferramentas da Retórica</h3>
                </div>
                <ul className="module-item__aulas">
                  <li><span className="aula-num">09</span>Gatilhos de atenção: como sequestrar a mente em 7 segundos</li>
                  <li><span className="aula-num">10</span>Analogias e metáforas: o Cavalo de Troia do conhecimento</li>
                  <li><span className="aula-num">11</span>O poder do silêncio: a moldura que dá peso às suas palavras</li>
                  <li><span className="aula-num">12</span>A arte de fazer perguntas: transformar monólogo em movimento</li>
                </ul>
              </div>

              <div className="module-item" data-reveal>
                <div className="module-item__header">
                  <span className="module-item__tag">Módulo 04</span>
                  <h3 className="module-item__title">O Domínio do Imprevisto</h3>
                </div>
                <ul className="module-item__aulas">
                  <li><span className="aula-num">13</span>Improviso estruturado: as peças de LEGO que nunca falham</li>
                  <li><span className="aula-num">14</span>Ler a sala: detectar tédio e mudar a rota em pleno voo</li>
                  <li><span className="aula-num">15</span>Perguntas difíceis: o Aikido verbal que transforma ataque em autoridade</li>
                  <li><span className="aula-num">16</span>Da técnica à influência: quando a estrutura vira instinto</li>
                </ul>
              </div>

              <div className="module-item module-item--bonus" data-reveal>
                <div className="module-item__header">
                  <span className="module-item__tag module-item__tag--bonus">Aula Bônus</span>
                  <h3 className="module-item__title">O Trono Vazio</h3>
                </div>
                <ul className="module-item__aulas">
                  <li><span className="aula-num aula-num--bonus">✦</span>O que separa o Arquiteto do Líder de Comando</li>
                  <li><span className="aula-num aula-num--bonus">✦</span>A Semiótica do Poder: como sua imagem comunica antes da sua voz</li>
                  <li><span className="aula-num aula-num--bonus">✦</span>O convite para o próximo nível</li>
                </ul>
              </div>

            </div>

            <div className="modules-extras" data-reveal>
              <div className="extras-card">
                <span className="extras-card__label">Bônus e ativos inclusos</span>
                <ul className="extras-list">
                  <li className="extras-list__item">
                    <span className="extras-check" aria-hidden="true">✓</span>
                    <div>
                      <strong>Biblioteca de exemplos comentados</strong>
                      <span>Analogias e ganchos reais para usar imediatamente</span>
                    </div>
                  </li>
                  <li className="extras-list__item">
                    <span className="extras-check" aria-hidden="true">✓</span>
                    <div>
                      <strong>Plano de treino semanal guiado</strong>
                      <span>Estrutura de prática para sair do curso aplicando</span>
                    </div>
                  </li>
                  <li className="extras-list__item">
                    <span className="extras-check" aria-hidden="true">✓</span>
                    <div>
                      <strong>Acesso à área de membros</strong>
                      <span>Navegação por módulo com progresso salvo</span>
                    </div>
                  </li>
                  <li className="extras-list__item">
                    <span className="extras-check" aria-hidden="true">✓</span>
                    <div>
                      <strong>Suporte</strong>
                      <span>Canal direto para dúvidas durante o curso</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* PARA QUEM É / NÃO É */}
      <section id="publico" className="section-divider section--inv py-20 md:py-28">
        <Container>

          <p className="section-label" data-reveal>Para quem é</p>
          <h2 className="mt-4 text-balance text-3xl font-black uppercase md:text-5xl" data-reveal>
            Este curso é para você se já superou o medo
            mas ainda luta com o caos.
          </h2>

          <div className="forwho-is" data-reveal>
            {[
              { num: "01", role: "Mentor", text: "Você domina o seu assunto, mas suas aulas às vezes deixam o aluno perdido. Você quer que cada palavra sua seja um degrau claro para quem está começando." },
              { num: "02", role: "Especialista", text: "Você tem anos de experiência que ninguém aproveita porque você ainda não aprendeu a traduzir o que sabe para quem precisa saber." },
              { num: "03", role: "Criador de Conteúdo", text: "Seus vídeos estão tecnicamente bons, mas faltam estrutura e impacto. Você quer parar de improvisar e começar a construir." },
              { num: "04", role: "Líder", text: "Você apresenta projetos, conduz reuniões, lidera equipes. E sente que o que você comunica raramente chega com a força que você pretendia." }
            ].map((item) => (
              <div key={item.num} className="forwho-card">
                <div className="forwho-card__num" aria-hidden="true">{item.num}</div>
                <div className="forwho-card__body">
                  <h3 className="forwho-card__role">{item.role}</h3>
                  <p className="forwho-card__text">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="forwho-divider" data-reveal>
            <span>Não é para você se…</span>
          </div>

          <div className="forwho-not" data-reveal>
            {[
              "Busca fórmulas mágicas sem compromisso com prática real.",
              "Quer apenas parecer comunicativo sem mudar a estrutura do pensamento.",
              "Espera transformar a comunicação sem aplicar os exercícios de cada módulo."
            ].map((text) => (
              <div key={text} className="notfor-item">
                <span className="notfor-item__x" aria-hidden="true">✕</span>
                <p className="notfor-item__text">{text}</p>
              </div>
            ))}
          </div>

        </Container>
      </section>

      {/* FAIXA PROVA SOCIAL */}
      <section id="prova-social" className="proof-band section-divider">
        <div className="proof-band-bg">
          <img
            src="/images/palco-prova-social-principal.jpg"
            alt="Diego Knebel palestrando para audiência corporativa"
          />
        </div>
        <div className="proof-band-overlay" />
        <Container className="relative z-10 py-20 md:py-28">
          <div className="max-w-xl">
            <p className="section-label" data-reveal>Prova real</p>
            <h2
              className="mt-4 text-balance text-3xl font-bold uppercase leading-tight text-brand-cream md:text-5xl"
              data-reveal
            >
              Centenas de profissionais
              <br />
              <span className="text-brand-terracotta">já transformaram sua voz.</span>
            </h2>
            <p
              className="mt-5 text-lg font-light leading-relaxed text-brand-cream/70"
              data-reveal
            >
              Em palestras, treinamentos corporativos e mentorias presenciais. O método funciona
              em qualquer formato, para qualquer audiência.
            </p>
          </div>
        </Container>
      </section>

      {/* SOBRE DIEGO KNEBEL */}
      <section id="diego" className="section-divider relative overflow-hidden bg-brand-navy-dark py-20 md:py-28">
        {/* Atmospheric background */}
        <div className="absolute inset-0">
          <img
            src="/images/sobre-background.jpg"
            alt=""
            aria-hidden="true"
            className="sobre-bg-img"
          />
          <div className="absolute inset-0 bg-brand-navy-dark/72" />
        </div>

        <Container className="relative z-10 grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <img
              src="/images/sobre-com-livro.jpg"
              alt="Diego Knebel"
              className="about-photo"
            />
          </Reveal>

          <Reveal delay={0.08}>
            <p className="section-label">Quem vai te guiar</p>
            <h2 className="mt-4 text-balance text-3xl font-black uppercase text-brand-cream md:text-5xl">
              Autoridade com presença
              <br />
              <span className="text-brand-terracotta">didática e direção</span> estratégica.
            </h2>
            <div className="mt-6 space-y-4">
              {[
                "Há anos Diego estuda uma pergunta que ninguém pergunta alto: por que especialistas brilhantes são ignorados enquanto comunicadores mediocres são seguidos?",
                "A resposta não estava no carisma nem no dom da palavra. Estava na engenharia. Diego construiu um método, testado em centenas de mentores, criadores e líderes, que transforma o caos mental em clareza soberana.",
                "O Arquiteto de Ideias é esse método. Didático, denso, sem rodeio. Cada aula foi roteirizada para que você sinta a transformação antes de terminar o módulo.",
                "Diego não ensina oratória performática. Ele ensina engenharia verbal. A diferença é que uma você usa no palco. A outra você usa na vida inteira."
              ].map((p, i) => (
                <p key={i} className="text-lg font-light leading-relaxed text-brand-cream/65">{p}</p>
              ))}
            </div>

            {/* Avatar + handle */}
            <div className="mt-6 flex items-center gap-4">
              <img
                src="/images/sobre-humanizado.jpg"
                alt="Diego Knebel"
                className="about-avatar"
              />
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-terracotta">
                @diegoknebel_
              </p>
            </div>

            {/* Animated stats */}
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-brand-cream/10 bg-brand-navy-surface p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-terracotta">
                  Alunos impactados
                </p>
                <AnimatedCounter target={500} suffix="+" />
              </div>
              <div className="rounded-2xl border border-brand-cream/10 bg-brand-navy-surface p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-terracotta">
                  Aulas estruturadas
                </p>
                <AnimatedCounter target={16} />
              </div>
              <div className="rounded-2xl border border-brand-cream/10 bg-brand-navy-surface p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-terracotta">
                  Horas de conteúdo
                </p>
                <AnimatedCounter target={12} suffix="h" />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* DEMONSTRAÇÃO DE TÉCNICA */}
      <section id="tecnica" className="section-divider bg-brand-navy py-20 md:py-28">
        <Container>
          <SectionTitle
            eyebrow="Demonstração de técnica"
            title="Da frase comum para a frase com força retórica."
            description="A diferença não está em palavras difíceis, mas em estrutura, ritmo e intenção."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[1.3rem] border border-brand-cream/10 bg-brand-navy-surface p-7">
                <p className="section-label" style={{ color: "rgba(241,218,178,0.4)" }}>
                  Antes
                </p>
                <p className="mt-4 text-2xl font-light italic leading-relaxed text-brand-cream/50">
                  &ldquo;Eu queria compartilhar algumas ideias que talvez possam te ajudar a
                  melhorar a sua comunicação.&rdquo;
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="h-full rounded-[1.3rem] border border-brand-terracotta/40 bg-brand-terracotta/8 p-7">
                <p className="section-label">Depois</p>
                <p className="mt-4 text-2xl font-semibold italic leading-relaxed text-brand-cream">
                  &ldquo;Se você quer ser lembrado pelo que sabe, precisa primeiro ser compreendido
                  pelo que diz.&rdquo;
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* DEPOIMENTOS EM MÍDIA */}
      <section id="depoimentos-midia" className="section-divider section--inv py-20 md:py-28">
        <Container>
          <SectionTitle
            eyebrow="Depoimentos em vídeos e fotos"
            title="Veja quem já saiu do caos para a clareza."
          />
        </Container>
        <VideoTestimonialCarousel items={testimonialMedia} inverted={true} />
      </section>

      {/* FAQ */}
      <section id="objecoes" className="section-divider bg-brand-navy py-20 md:py-28">
        <Container>
          <SectionTitle
            eyebrow="Antes de decidir, leia isso."
            title="Respostas diretas para as dúvidas mais comuns."
          />
          <div className="mt-12">
            <Accordion items={faq} />
          </div>
        </Container>
      </section>

      {/* OFERTA */}
      <section id="oferta" className="section-divider bg-brand-navy-dark py-20 md:py-28">
        <Container className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <p className="section-label">O investimento</p>
            <h2 className="mt-4 text-balance text-3xl font-black uppercase leading-tight text-brand-cream md:text-5xl">
              Uma habilidade que ninguém
              <br />
              vai tirar de você.
            </h2>
            <ul className="mt-7 space-y-3">
              {[
                "16 aulas + 1 aula bônus em vídeo com roteiros completos",
                "4 módulos: Base, Estrutura, Retórica e Soberania",
                "Exercícios práticos em cada aula para fixação imediata",
                "Método do Paraquedas: improviso estruturado de emergência",
                "Aula Bônus: O Trono Vazio, a ponte para o próximo nível",
                "Acesso vitalício, incluindo atualizações futuras",
                "Suporte"
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-base font-light leading-relaxed text-brand-cream/70"
                >
                  <span className="mt-1 text-brand-terracotta">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="price-card rounded-[1.4rem] bg-brand-navy-surface p-7">
              <p className="section-label">Condição de lançamento</p>
              <div className="price-installment mt-5">
                <span className="price-installment__times">12x de</span>
                <span className="price-installment__value">R$&nbsp;3,80</span>
              </div>
              <p className="price-lump">ou R$ 37,00 à vista</p>

              <div className="mt-7 grid gap-3">
                <PrimaryButton className="w-full" href="#comprar">
                  Garantir minha inscrição
                </PrimaryButton>
                <a
                  href="#contato"
                  className="inline-flex w-full items-center justify-center rounded-full border border-brand-cream/25 px-7 py-3.5 text-sm font-bold uppercase tracking-[0.18em] text-brand-cream/70 transition-all hover:border-brand-cream/50 hover:text-brand-cream"
                >
                  Falar com a equipe
                </a>
              </div>

              <p
                id="comprar"
                className="mt-5 text-center text-xs font-light leading-relaxed text-brand-cream/40"
              >
                Pagamento seguro · Acesso em poucos minutos · Suporte para configuração inicial
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* GARANTIA */}
      <section id="garantia" className="section-divider bg-brand-navy py-20 md:py-24">
        <Container>
          <Reveal className="mx-auto max-w-4xl rounded-[1.4rem] border border-brand-terracotta/25 bg-brand-navy-surface p-9 text-center">
            <p className="section-label justify-center">Garantia</p>
            <h2 className="mt-4 text-4xl font-black uppercase text-brand-cream">
              7 dias de garantia total
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg font-light leading-relaxed text-brand-cream/65">
              Você pode testar o conteúdo com segurança. Acesse o curso, aplique os primeiros
              exercícios e, se não sentir que a sua mente está mais organizada e a sua fala mais
              potente, devolvemos 100% do valor. Sem perguntas, sem burocracia.
            </p>
            <p className="mt-4 text-lg font-bold uppercase tracking-wide text-brand-terracotta">
              O risco é todo nosso.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* FECHAMENTO */}
      <section id="fechamento" className="section-divider bg-brand-navy-dark py-20 md:py-28">
        <Container>
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="section-label justify-center">A decisão é agora</p>
            <h2 className="mt-4 text-balance text-4xl font-black uppercase leading-tight text-brand-cream md:text-6xl">
              Seu conhecimento merece
              <br />
              <span className="text-brand-terracotta">uma forma à altura.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-balance text-xl font-light leading-relaxed text-brand-cream/60">
              Você pode continuar tentando explicar o seu oceano com gotas.
              <br className="hidden md:block" />
              Ou pode aprender a construir a ponte que leva o seu público até você.
              <br className="hidden md:block" />
              <br className="hidden md:block" />
              O mundo está em silêncio esperando pelo seu comando.
            </p>
            <div className="mt-10">
              <PrimaryButton href="#oferta">Quero minha vaga no Arquiteto de Ideias</PrimaryButton>
            </div>
            <p className="mt-5 text-sm font-light text-brand-cream/40">
              R$ 37&nbsp;·&nbsp;Acesso vitalício&nbsp;·&nbsp;Garantia de 7 dias
            </p>
          </Reveal>
        </Container>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-navy-dark py-14 text-center">
        <div className="flex justify-center">
          <img
            src="/logos/logo-footer-escuro.png"
            alt="Diego Knebel. Mentoria e Desenvolvimento"
            className="logo-footer-img"
            width="160"
            height="56"
            loading="lazy"
          />
        </div>
        <p className="mt-8 text-sm font-light text-brand-cream/40">
          © 2026 Diego Knebel · @diegoknebel_ · Todos os direitos reservados
        </p>
      </footer>
    </main>
  );
}
