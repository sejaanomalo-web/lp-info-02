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
  testimonials,
  videoTestimonials
} from "@/lib/content";
import Container from "@/components/ui/Container";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
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
function TestimonialCarousel({ items }) {
  const trackRef = useRef(null);
  const posRef = useRef(0);
  const dirRef = useRef(-1);
  const speedRef = useRef(0.6);
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
      speedRef.current = 0.6;
      dirRef.current = dir;
    }
  };

  const doubled = [...items, ...items];

  return (
    <div className="relative mt-12">
      {/* Fades laterais (cor navy) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-brand-navy to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-brand-navy to-transparent" />

      <button
        onClick={() => handleArrow(1)}
        onMouseEnter={() => { dirRef.current = 1; speedRef.current = 1.2; }}
        onMouseLeave={() => { speedRef.current = 0.6; }}
        className="absolute left-2 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-brand-cream/20 bg-brand-navy-surface text-brand-cream/70 transition-all hover:border-brand-terracotta hover:bg-brand-terracotta hover:text-white"
        aria-label="Rolar para a esquerda"
      >
        ←
      </button>

      <button
        onClick={() => handleArrow(-1)}
        onMouseEnter={() => { dirRef.current = -1; speedRef.current = 1.2; }}
        onMouseLeave={() => { speedRef.current = 0.6; }}
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
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-terracotta">
                {item.name}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── MAIN COMPONENT ─────────────────────────────────────────────── */
export default function LandingPage() {
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    // Navbar scroll-aware
    const onScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });

    // Scroll reveal para data-reveal
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

    // Section label line reveal
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
            <div className="inline-flex items-center gap-3">
              <span className="h-7 w-7 rounded-full border border-brand-cream/30 bg-brand-terracotta/20" />
              <span className="text-base font-bold uppercase tracking-[0.12em] text-brand-cream">
                Arquiteto de Ideias
              </span>
            </div>
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
        <div className="bg-noise absolute inset-0 opacity-60" />
        <div className="grid-overlay absolute inset-0 opacity-15" />
        <div className="absolute left-[12%] top-40 h-64 w-64 rounded-full bg-brand-terracotta/15 blur-[120px]" />
        <div className="absolute bottom-10 right-[8%] h-80 w-80 rounded-full bg-brand-cream/8 blur-[130px]" />

        <Container className="relative z-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
            <div>
              <p className="hero-label section-label">Diego Knebel apresenta</p>
              <h1 className="hero-headline mt-5 text-5xl font-black uppercase leading-[0.95] tracking-tight text-brand-cream md:text-7xl lg:text-8xl">
                Arquiteto
                <br />
                <span className="text-brand-terracotta">de Ideias</span>
              </h1>
              <p className="hero-sub mt-5 text-xl font-light uppercase tracking-[0.2em] text-brand-cream/70 md:text-2xl">
                Fale, Convença e Envolva
              </p>
              <p className="hero-body mt-6 max-w-2xl text-lg font-light leading-relaxed text-brand-cream/65">
                Você já venceu o medo de falar. O problema agora é diferente — e mais difícil.
                Você fala, mas as pessoas não chegam onde você quer.
              </p>
              <div className="hero-cta mt-10 flex flex-wrap items-center gap-5">
                <PrimaryButton href="#oferta">Quero construir minha clareza</PrimaryButton>
                <span className="text-sm font-light tracking-wide text-brand-cream/55">
                  Acesso vitalício · Garantia de 7 dias
                </span>
              </div>
            </div>

            <div className="hero-image relative mx-auto max-w-xl">
              <ImagePlaceholder
                label="Retrato premium do Diego Knebel (Hero)"
                className="bg-gradient-to-br from-brand-cream/5 to-brand-terracotta/10"
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

          <motion.ul
            className="mt-10 grid gap-4 md:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={listStagger}
          >
            {painSignals.map((signal) => (
              <motion.li
                key={signal}
                variants={listItem}
                className="rounded-2xl border border-brand-cream/10 bg-brand-navy-surface px-5 py-4 text-[1.02rem] font-light leading-relaxed text-brand-cream/70"
              >
                {signal}
              </motion.li>
            ))}
          </motion.ul>
        </Container>
      </section>

      {/* O PROBLEMA REAL */}
      <section id="dor" className="section-divider bg-brand-navy py-20 md:py-28">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <p className="section-label">O diagnóstico</p>
            <h2 className="mt-4 text-balance text-3xl font-bold uppercase text-brand-cream md:text-5xl">
              Você não é confuso
              <br />
              por saber pouco.
            </h2>
            <p className="mt-6 text-lg font-light leading-relaxed text-brand-cream/65">
              É o oposto. Você é confuso porque sabe demais — e o seu cérebro esqueceu como era não
              saber. A ciência chama isso de Maldição do Conhecimento. Você pulou etapas, usou
              termos que só você entende, e pressupôs que o óbvio para você é óbvio para o outro.
              Não é.
            </p>
            <p className="mt-4 text-lg font-light leading-relaxed text-brand-cream/65">
              Enquanto isso, pessoas com metade do seu preparo ocupam lugares que deveriam ser seus
              — simplesmente porque elas conseguem se fazer entender. Isso dói. E é evitável.
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

          <motion.div
            className="mt-12 grid gap-5 md:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={listStagger}
          >
            {[
              "Excesso de palavras gera ruído.",
              "Ornamento sem estratégia gera distração.",
              "Clareza com estrutura gera influência."
            ].map((item, i) => (
              <motion.div
                key={item}
                variants={listItem}
                className={`rounded-2xl border p-6 text-lg font-light leading-relaxed text-brand-cream/80 ${
                  i === 2
                    ? "border-brand-terracotta/40 bg-brand-terracotta/10"
                    : "border-brand-cream/10 bg-brand-navy-surface"
                }`}
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* A SOLUÇÃO */}
      <section id="solucao" className="section-divider bg-brand-navy py-20 md:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1.06fr_0.94fr]">
          <Reveal>
            <p className="section-label">A solução</p>
            <h2 className="mt-4 text-balance text-3xl font-black uppercase text-brand-cream md:text-5xl">
              Falar bem não é um dom.
              <br />
              <span className="text-brand-terracotta">É uma engenharia.</span>
            </h2>
            <p className="mt-6 text-lg font-light leading-relaxed text-brand-cream/65">
              Catedrais não ficam de pé por séculos porque alguém foi "criativo". Elas ficam porque
              alguém calculou as vigas antes de pintar os vitrais. A sua comunicação funciona igual.
            </p>
            <p className="mt-4 text-lg font-light leading-relaxed text-brand-cream/65">
              O Arquiteto de Ideias é o treinamento que constrói a estrutura invisível por trás de
              cada fala — de um Reels de 60 segundos a uma masterclass de 2 horas — para que você
              nunca mais se perca no meio do caminho.
            </p>
            <p className="mt-4 text-lg font-light leading-relaxed text-brand-cream/65">
              Não é sobre falar difícil. Não é sobre ser performático. É sobre ser inesquecível.
            </p>
            <ul className="mt-8 space-y-3 text-[1.04rem] font-light leading-relaxed text-brand-cream/65">
              {[
                "Método prático e aplicável a reuniões, aulas, lives e apresentações.",
                "Estrutura replicável para diferentes formatos e níveis de complexidade.",
                "Evolução de percepção: de conteúdo disperso para autoridade reconhecida."
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 text-brand-terracotta">▸</span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.12}>
            <ImagePlaceholder
              label="Mockup premium da área de membros do curso"
              ratio="aspect-[16/12]"
              className="border-brand-cream/10 bg-gradient-to-br from-brand-navy-surface to-brand-navy"
            />
          </Reveal>
        </Container>
      </section>

      {/* BENEFÍCIOS */}
      <section id="beneficios" className="section-divider bg-brand-navy-dark py-20 md:py-28">
        <Container>
          <SectionTitle
            eyebrow="Resultados práticos, emocionais e estratégicos."
            title="Cada etapa do método foi desenhada para elevar sua clareza, sua presença e seu poder de influência."
          />

          <motion.div
            className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={listStagger}
          >
            {benefits.map((benefit) => (
              <motion.article
                key={benefit.title}
                variants={listItem}
                className="card-interactive group rounded-[1.3rem] bg-brand-navy-surface p-6"
              >
                <div className="mb-4 h-[2px] w-10 bg-brand-terracotta transition-all duration-500 group-hover:w-20" />
                <h3 className="text-xl font-bold uppercase tracking-wide text-brand-cream">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-base font-light leading-relaxed text-brand-cream/60">
                  {benefit.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
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
        <TestimonialCarousel items={testimonials} />
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
                data-reveal="scale"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-terracotta">
                  Pilar {pillar.id} · {pillar.letter} — {pillar.letterLabel}
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
      <section id="recebe" className="section-divider bg-brand-navy-dark py-20 md:py-28">
        <Container>
          <SectionTitle
            eyebrow="O que você vai aprender"
            title="16 aulas. 4 módulos. Uma construção completa."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="rounded-[1.35rem] border border-brand-cream/10 bg-brand-navy-surface p-7">
                <p className="section-label">Módulos</p>
                <ul className="mt-5 space-y-4">
                  {deliverables.modules.map((module) => (
                    <li
                      key={module.title}
                      className="rounded-xl border border-brand-cream/8 bg-brand-navy p-4"
                    >
                      <p className="text-sm font-bold uppercase tracking-wide text-brand-cream">
                        {module.title}
                      </p>
                      <ul className="mt-2 space-y-1">
                        {module.lessons.map((lesson) => (
                          <li
                            key={lesson}
                            className="text-sm font-light leading-relaxed text-brand-cream/50"
                          >
                            — {lesson}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="rounded-[1.35rem] border border-brand-cream/10 bg-brand-navy-surface p-7">
                <p className="section-label">Bônus e ativos</p>
                <ul className="mt-5 space-y-3">
                  {deliverables.extras.map((extra) => (
                    <li
                      key={extra}
                      className="flex items-start gap-3 rounded-xl border border-brand-cream/8 bg-brand-navy px-4 py-3"
                    >
                      <span className="mt-0.5 text-brand-terracotta">✓</span>
                      <p className="text-sm font-light text-brand-cream/70">{extra}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* PARA QUEM É / NÃO É */}
      <section id="publico" className="section-divider bg-brand-navy py-20 md:py-28">
        <Container>
          <SectionTitle
            eyebrow="Para quem é"
            title="Este curso é para você se já superou o medo mas ainda luta com o caos."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[1.35rem] border border-brand-cream/10 bg-brand-navy-surface p-7">
                <motion.ul
                  className="space-y-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={listStagger}
                >
                  {audience.map((item) => (
                    <motion.li
                      key={item.id}
                      variants={listItem}
                      className="card-interactive rounded-xl border border-brand-cream/8 bg-brand-navy px-5 py-4"
                    >
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-terracotta">
                        {item.id} · {item.role}
                      </p>
                      <p className="mt-2 text-sm font-light leading-relaxed text-brand-cream/65">
                        {item.description}
                      </p>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="h-full rounded-[1.35rem] border border-brand-cream/10 bg-brand-navy-dark p-7">
                <p className="section-label">Não é para quem</p>
                <ul className="mt-6 space-y-4">
                  {notFor.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-base font-light leading-relaxed text-brand-cream/60"
                    >
                      <span className="mt-1 text-brand-cream/25">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* SOBRE DIEGO KNEBEL */}
      <section id="diego" className="section-divider bg-brand-navy-dark py-20 md:py-28">
        <Container className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <ImagePlaceholder
              label="Retrato premium do Diego Knebel (Seção Sobre)"
              ratio="aspect-[4/5]"
              className="border-brand-cream/10 bg-gradient-to-br from-brand-navy-surface to-brand-navy"
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
                "A resposta não estava no carisma nem no \"dom da palavra\". Estava na engenharia. Diego construiu um método — testado em centenas de mentores, criadores e líderes — que transforma o caos mental em clareza soberana.",
                "O Arquiteto de Ideias é esse método. Didático, denso, sem rodeio. Cada aula foi roteirizada para que você sinta a transformação antes de terminar o módulo.",
                "Diego não ensina oratória performática. Ele ensina engenharia verbal. A diferença é que uma você usa no palco. A outra você usa na vida inteira."
              ].map((p, i) => (
                <p key={i} className="text-lg font-light leading-relaxed text-brand-cream/65">{p}</p>
              ))}
            </div>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-brand-terracotta">
              @diegoknebel_
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { label: "Alunos impactados", value: "[DADOS REAIS]" },
                { label: "Horas de aula", value: "[DADOS REAIS]" },
                { label: "Cases", value: "[DADOS REAIS]" }
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-brand-cream/10 bg-brand-navy-surface p-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-terracotta">
                    {metric.label}
                  </p>
                  <p className="mt-2 text-xl font-bold text-brand-cream">{metric.value}</p>
                </div>
              ))}
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
                <p className="section-label text-brand-cream/40" style={{ color: "rgba(241,218,178,0.4)" }}>
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
      <section id="depoimentos-midia" className="section-divider bg-brand-navy-dark py-20 md:py-28">
        <Container>
          <SectionTitle
            eyebrow="Depoimentos em vídeo"
            title="Veja quem já saiu do caos para a clareza."
          />

          <motion.div
            className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={listStagger}
          >
            {videoTestimonials.map((item) => (
              <motion.div
                key={item.name}
                variants={listItem}
                className="card-interactive rounded-[1.2rem] border border-brand-cream/10 bg-brand-navy-surface p-5"
              >
                <ImagePlaceholder
                  label={`Vídeo — ${item.name}`}
                  ratio="aspect-[4/3]"
                  className="border-brand-cream/8 bg-brand-navy"
                />
                <div className="mt-4 px-1">
                  <p className="text-sm font-bold uppercase tracking-wide text-brand-cream">
                    {item.name}
                  </p>
                  <p className="text-xs font-light text-brand-cream/45">{item.role}</p>
                  <p className="mt-2 text-sm font-light italic leading-relaxed text-brand-cream/60">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <span className="mt-3 inline-block rounded-full border border-brand-terracotta/35 bg-brand-terracotta/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-terracotta">
                    {item.tag}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
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
            <p className="mt-4 text-lg font-light text-brand-cream/60">
              Condição de lançamento — válida por tempo limitado.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                "16 aulas + 1 aula bônus em vídeo com roteiros completos",
                "4 módulos — Base, Estrutura, Retórica e Soberania",
                "Pack de Templates GPS-C — preencha e aplique hoje",
                "Exercícios práticos em cada aula para fixação imediata",
                "Método do Paraquedas — improviso estruturado de emergência",
                "Aula Bônus: O Trono Vazio — a ponte para o próximo nível",
                "Acesso vitalício — incluindo atualizações futuras",
                "Certificado de conclusão  [DADOS REAIS]",
                "Suporte / Comunidade  [DADOS REAIS]"
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
              <p className="mt-5 text-5xl font-black text-brand-cream">R$ [DADOS REAIS]</p>
              <p className="mt-2 text-lg font-light text-brand-cream/60">
                ou [X]x de R$ [DADOS REAIS]
              </p>

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
              potente — devolvemos 100% do valor. Sem perguntas, sem burocracia.
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
              R$ [DADOS REAIS]&nbsp;·&nbsp;Acesso vitalício&nbsp;·&nbsp;Garantia de 7 dias
            </p>
          </Reveal>
        </Container>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-navy-dark py-10 text-center">
        <p className="text-sm font-light text-brand-cream/40">
          © 2025 Diego Knebel · @diegoknebel_ · Todos os direitos reservados
        </p>
        <p className="mt-2 text-xs text-brand-cream/25">
          [Links de política de privacidade e termos — DADOS REAIS]
        </p>
      </footer>
    </main>
  );
}
