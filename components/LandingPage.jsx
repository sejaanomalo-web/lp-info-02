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

const listStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

const listItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.56,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

function SectionTitle({ eyebrow, title, description, light = false }) {
  return (
    <Reveal className="mx-auto max-w-3xl text-left md:text-center">
      <p
        className={`text-xs font-semibold uppercase tracking-[0.22em] ${
          light ? "text-brand-cream/85" : "text-brand-terracotta"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-3 text-balance text-3xl font-semibold leading-tight md:text-5xl ${
          light ? "text-white" : "text-brand-navy"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-5 text-balance text-lg leading-relaxed ${
            light ? "text-brand-cream/90" : "text-[#2e2657]/85"
          }`}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

function BrandSignature() {
  return (
    <div className="inline-flex items-center gap-4 rounded-full border border-white/20 bg-white/5 px-4 py-2">
      <span className="h-8 w-8 rounded-full border border-brand-cream/35 bg-brand-cream/15" />
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-brand-cream/80">Logo principal</p>
        <p className="text-base font-semibold text-white">Arquiteto de Ideias</p>
      </div>
    </div>
  );
}

function Accordion({ items, tone = "light" }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <motion.div
            key={item.question}
            layout
            className={`overflow-hidden rounded-3xl border ${
              tone === "dark"
                ? "border-white/20 bg-white/5 text-white"
                : "border-[#dac9ab] bg-[#fffaf1] text-brand-navy"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-lg font-semibold leading-snug">{item.question}</span>
              <span
                className={`grid h-8 w-8 place-items-center rounded-full border text-xl ${
                  tone === "dark"
                    ? "border-brand-cream/35 text-brand-cream"
                    : "border-brand-navy/30 text-brand-navy"
                }`}
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  <p
                    className={`px-6 pb-6 text-[1.03rem] leading-relaxed ${
                      tone === "dark" ? "text-brand-cream/90" : "text-[#3a2f64]/90"
                    }`}
                  >
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

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
      {/* Fades laterais */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#f8f1e4] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#f8f1e4] to-transparent" />

      {/* Seta esquerda */}
      <button
        onClick={() => handleArrow(1)}
        onMouseEnter={() => { dirRef.current = 1; speedRef.current = 1.2; }}
        onMouseLeave={() => { speedRef.current = 0.6; }}
        className="absolute left-2 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-[#d7c6a7] bg-white shadow-soft transition hover:border-brand-terracotta hover:bg-brand-terracotta hover:text-white text-brand-navy"
        aria-label="Rolar para a esquerda"
      >
        ←
      </button>

      {/* Seta direita */}
      <button
        onClick={() => handleArrow(-1)}
        onMouseEnter={() => { dirRef.current = -1; speedRef.current = 1.2; }}
        onMouseLeave={() => { speedRef.current = 0.6; }}
        className="absolute right-2 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-[#d7c6a7] bg-white shadow-soft transition hover:border-brand-terracotta hover:bg-brand-terracotta hover:text-white text-brand-navy"
        aria-label="Rolar para a direita"
      >
        →
      </button>

      {/* Track */}
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
              className="w-80 flex-shrink-0 rounded-[1.2rem] border border-[#ddcdb0] bg-white p-6 shadow-soft"
            >
              <p className="text-base leading-relaxed text-[#34295e]">
                &ldquo;{item.quote}&rdquo;
              </p>
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-brand-terracotta">
                {item.name}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <main className="bg-[#f6f1e8]">
      {/* TOPBAR */}
      <div className="bg-brand-terracotta py-2 text-center text-xs font-semibold uppercase tracking-[0.18em] text-white">
        Módulo 1 já disponível&nbsp;&nbsp;·&nbsp;&nbsp;Acesso imediato após a inscrição
      </div>

      {/* HERO */}
      <section
        id="hero"
        className="relative isolate overflow-hidden bg-brand-navy pb-24 pt-8 text-white md:pb-32"
      >
        <div className="bg-noise absolute inset-0 opacity-80" />
        <div className="grid-overlay absolute inset-0 opacity-20" />
        <motion.div
          className="absolute left-[12%] top-40 h-56 w-56 rounded-full bg-brand-terracotta/20 blur-[110px]"
          animate={{ y: [0, -10, 0], x: [0, 6, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-[8%] h-72 w-72 rounded-full bg-brand-cream/20 blur-[120px]"
          animate={{ y: [0, 14, 0], x: [0, -8, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />

        <Container className="relative z-10">
          <div className="flex items-center justify-between gap-6">
            <BrandSignature />
            <PrimaryButton className="hidden md:inline-flex" href="#oferta">
              Quero garantir minha vaga
            </PrimaryButton>
          </div>

          <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr]">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.22em] text-brand-cream/85">
                Diego Knebel apresenta
              </p>
              <h1 className="mt-5 text-balance text-5xl font-semibold leading-[1.04] md:text-7xl">
                Arquiteto
                <br />
                de Ideias
              </h1>
              <p className="mt-4 text-2xl font-light text-brand-cream/90">
                Fale, Convença e Envolva
              </p>
              <p className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-brand-cream/85">
                Você já venceu o medo de falar. O problema agora é diferente — e mais difícil.
                Você fala, mas as pessoas não chegam onde você quer.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <PrimaryButton href="#oferta">Quero construir minha clareza</PrimaryButton>
                <span className="text-sm tracking-wide text-brand-cream/80">
                  Acesso vitalício · Garantia de 7 dias
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="relative mx-auto max-w-xl">
                <ImagePlaceholder
                  label="Retrato premium do Diego Knebel (Hero)"
                  className="bg-gradient-to-br from-white/10 to-brand-terracotta/10"
                />

                <motion.div
                  className="glass-card absolute -left-8 top-12 rounded-2xl border border-white/20 p-4 md:p-5"
                  animate={{ y: [0, -7, 0] }}
                  transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-brand-cream/80">
                    Direção central
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    Clareza que guia, não que explica
                  </p>
                </motion.div>

                <motion.div
                  className="glass-card absolute -bottom-8 right-5 rounded-2xl border border-white/20 p-4 md:p-5"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-brand-cream/80">
                    Resultado esperado
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    Autoridade percebida em cada fala
                  </p>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* DIAGNÓSTICO DA DOR */}
      <section id="identificacao" className="section-divider bg-[#171033] py-16 text-brand-cream">
        <Container>
          <Reveal>
            <h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold leading-tight text-white md:text-4xl">
              Quando a comunicação está confusa,
              <br className="hidden md:block" />
              o valor do seu repertório fica invisível.
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
                className="rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-[1.02rem] leading-relaxed"
              >
                {signal}
              </motion.li>
            ))}
          </motion.ul>
        </Container>
      </section>

      {/* O PROBLEMA REAL */}
      <section id="dor" className="section-divider bg-[#f6f1e8] py-20 md:py-28">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-terracotta">
              O diagnóstico
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold text-brand-navy md:text-5xl">
              Você não é confuso por saber pouco.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[#32295e]/90">
              É o oposto. Você é confuso porque sabe demais — e o seu cérebro esqueceu como era não
              saber. A ciência chama isso de Maldição do Conhecimento. Você pulou etapas, usou
              termos que só você entende, e pressupôs que o óbvio para você é óbvio para o outro.
              Não é.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[#32295e]/90">
              Enquanto isso, pessoas com metade do seu preparo ocupam lugares que deveriam ser seus
              — simplesmente porque elas conseguem se fazer entender. Isso dói. E é evitável.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[1.4rem] border border-[#e2d5c0] bg-[#fffaf1] p-8 shadow-soft">
              <p className="text-xs uppercase tracking-[0.2em] text-brand-terracotta">
                Sinal crítico
              </p>
              <p className="mt-4 text-2xl font-semibold leading-tight text-brand-navy">
                Quanto mais conhecimento sem estrutura, maior o risco de ser mal interpretado.
              </p>
              <p className="mt-6 text-base leading-relaxed text-[#3a2f64]/85">
                Estrutura não engessa sua identidade. Ela sustenta sua presença e amplifica sua
                autoridade.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* QUEBRA DE CRENÇA */}
      <section id="quebra-crenca" className="section-divider bg-brand-navy py-20 text-white md:py-28">
        <Container>
          <SectionTitle
            light
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
            ].map((item) => (
              <motion.div
                key={item}
                variants={listItem}
                className="rounded-2xl border border-white/15 bg-white/5 p-6 text-lg leading-relaxed text-brand-cream"
              >
                {item}
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* A SOLUÇÃO */}
      <section id="solucao" className="section-divider bg-[#fbf7ee] py-20 md:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1.06fr_0.94fr]">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.22em] text-brand-terracotta">A solução</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold text-brand-navy md:text-5xl">
              Falar bem não é um dom.
              <br />
              É uma engenharia.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[#372d62]/90">
              Catedrais não ficam de pé por séculos porque alguém foi "criativo". Elas ficam porque
              alguém calculou as vigas antes de pintar os vitrais. A sua comunicação funciona igual.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[#372d62]/90">
              O Arquiteto de Ideias é o treinamento que constrói a estrutura invisível por trás de
              cada fala — de um Reels de 60 segundos a uma masterclass de 2 horas — para que você
              nunca mais se perca no meio do caminho.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[#372d62]/90">
              Não é sobre falar difícil. Não é sobre ser performático. É sobre ser inesquecível.
            </p>
            <ul className="mt-8 space-y-3 text-[1.04rem] leading-relaxed text-[#372d62]/90">
              <li>• Método prático e aplicável a reuniões, aulas, lives e apresentações.</li>
              <li>• Estrutura replicável para diferentes formatos e níveis de complexidade.</li>
              <li>• Evolução de percepção: de conteúdo disperso para autoridade reconhecida.</li>
            </ul>
          </Reveal>

          <Reveal delay={0.12}>
            <ImagePlaceholder
              label="Mockup premium da área de membros do curso"
              ratio="aspect-[16/12]"
              className="border-[#d7c7aa] bg-gradient-to-br from-[#fff6e7] to-white"
            />
          </Reveal>
        </Container>
      </section>

      {/* BENEFÍCIOS */}
      <section id="beneficios" className="section-divider bg-[#f1e7d4] py-20 md:py-28">
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
                className="group rounded-[1.3rem] border border-[#d7c6a7] bg-[#fffaf2] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-terracotta/50 hover:shadow-soft"
              >
                <div className="mb-4 h-[2px] w-12 bg-brand-terracotta/70 transition-all duration-300 group-hover:w-20" />
                <h3 className="text-2xl font-semibold text-brand-navy">{benefit.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-[#3a2f64]/90">
                  {benefit.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* DEPOIMENTOS EM TEXTO */}
      <section id="depoimentos" className="section-divider bg-[#f8f1e4] py-20 md:py-28">
        <Container>
          <SectionTitle
            eyebrow="O que estão dizendo"
            title={`Quem construiu.\nQuem transformou.`}
          />
        </Container>
        <TestimonialCarousel items={testimonials} />
      </section>

      {/* OS 4 PILARES */}
      <section id="pilares" className="section-divider bg-brand-navy py-20 text-white md:py-28">
        <Container>
          <SectionTitle
            light
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
                className="rounded-[1.4rem] border border-white/20 bg-white/5 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-cream/45 hover:bg-white/[0.08]"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-cream/85">
                  Pilar {pillar.id}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-white">
                  {pillar.title}{" "}
                  <span className="text-brand-cream/60">
                    [{pillar.letter} — {pillar.letterLabel}]
                  </span>
                </h3>
                <p className="mt-4 text-base leading-relaxed text-brand-cream/90">
                  {pillar.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* POSICIONAMENTO CONCEITUAL */}
      <section id="posicionamento" className="section-divider bg-[#100b26] py-24 text-white md:py-32">
        <Container>
          <Reveal className="mx-auto max-w-5xl text-center">
            <p className="mt-6 text-balance text-4xl font-semibold leading-tight md:text-6xl">
              Não é sobre parecer inteligente.
              <br className="hidden md:block" /> É sobre ser impossível de ignorar.
            </p>
            <p className="mx-auto mt-8 max-w-3xl text-balance text-xl font-light leading-relaxed text-brand-cream/85">
              Quando sua mensagem combina profundidade e clareza,
              <br className="hidden md:block" />
              sua presença deixa de competir por atenção
              <br className="hidden md:block" />e passa a comandar atenção.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* O QUE VOCÊ RECEBE */}
      <section id="recebe" className="section-divider bg-[#f8f2e6] py-20 md:py-28">
        <Container>
          <SectionTitle
            eyebrow="O que você vai aprender"
            title="16 aulas. 4 módulos. Uma construção completa."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="rounded-[1.35rem] border border-[#ddcdb0] bg-white p-7 shadow-soft">
                <p className="text-xs uppercase tracking-[0.2em] text-brand-terracotta">Módulos</p>
                <ul className="mt-5 space-y-4">
                  {deliverables.modules.map((module) => (
                    <li key={module.title} className="rounded-xl border border-[#ece2d3] bg-[#fffcf6] px-4 py-3">
                      <p className="text-base font-semibold text-brand-navy">{module.title}</p>
                      <ul className="mt-2 space-y-1">
                        {module.lessons.map((lesson) => (
                          <li key={lesson} className="text-sm leading-relaxed text-[#3a2f64]/80">
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
              <div className="rounded-[1.35rem] border border-[#ddcdb0] bg-white p-7 shadow-soft">
                <p className="text-xs uppercase tracking-[0.2em] text-brand-terracotta">
                  Bônus e ativos
                </p>
                <ul className="mt-5 space-y-3">
                  {deliverables.extras.map((extra) => (
                    <li key={extra} className="rounded-xl border border-[#ece2d3] bg-[#fffcf6] px-4 py-3">
                      <p className="text-base font-semibold text-brand-navy">{extra}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* PARA QUEM É / NÃO É */}
      <section id="publico" className="section-divider bg-[#f1e7d4] py-20 md:py-28">
        <Container>
          <SectionTitle
            eyebrow="Para quem é"
            title="Este curso é para você se já superou o medo mas ainda luta com o caos."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[1.35rem] border border-[#d9c8a7] bg-[#fff8ea] p-7">
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
                      className="rounded-xl border border-[#e4d4b8] bg-white px-5 py-4"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-terracotta">
                        {item.id} · {item.role}
                      </p>
                      <p className="mt-2 text-[1.02rem] leading-relaxed text-[#3c3168]">
                        {item.description}
                      </p>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="h-full rounded-[1.35rem] border border-[#d9c8a7] bg-brand-navy p-7 text-brand-cream">
                <p className="text-xs uppercase tracking-[0.2em] text-brand-cream/75">
                  Não é para quem
                </p>
                <ul className="mt-6 space-y-3">
                  {notFor.map((item) => (
                    <li key={item} className="text-[1.04rem] leading-relaxed text-brand-cream/90">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* SOBRE DIEGO KNEBEL */}
      <section id="diego" className="section-divider bg-[#fffaf2] py-20 md:py-28">
        <Container className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <ImagePlaceholder
              label="Retrato premium do Diego Knebel (Seção Sobre)"
              ratio="aspect-[4/5]"
              className="border-[#ddcdb0] bg-gradient-to-br from-[#fff6e8] to-white"
            />
          </Reveal>

          <Reveal delay={0.08}>
            <p className="text-xs uppercase tracking-[0.22em] text-brand-terracotta">
              Quem vai te guiar
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold text-brand-navy md:text-5xl">
              Autoridade com presença didática e direção estratégica.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[#3a2f64]/90">
              Há anos Diego estuda uma pergunta que ninguém pergunta alto: por que especialistas
              brilhantes são ignorados enquanto comunicadores mediocres são seguidos?
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[#3a2f64]/90">
              A resposta não estava no carisma nem no "dom da palavra". Estava na engenharia. Diego
              construiu um método — testado em centenas de mentores, criadores e líderes — que
              transforma o caos mental em clareza soberana.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[#3a2f64]/90">
              O Arquiteto de Ideias é esse método. Didático, denso, sem rodeio. Cada aula foi
              roteirizada para que você sinta a transformação antes de terminar o módulo — não numa
              semana, não "quando você praticar bastante".
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[#3a2f64]/90">
              Diego não ensina oratória performática. Ele ensina engenharia verbal. A diferença é
              que uma você usa no palco. A outra você usa na vida inteira.
            </p>
            <p className="mt-4 text-base font-semibold text-brand-terracotta">@diegoknebel_</p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                { label: "Alunos impactados", value: "[DADOS REAIS]" },
                { label: "Horas de aula produzidas", value: "[DADOS REAIS]" },
                { label: "Cases documentados", value: "[DADOS REAIS]" }
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-[#ddcdb0] bg-[#fff6e8] p-4"
                >
                  <p className="text-sm uppercase tracking-[0.14em] text-brand-terracotta">
                    {metric.label}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-brand-navy">{metric.value}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* DEMONSTRAÇÃO DE TÉCNICA */}
      <section id="tecnica" className="section-divider bg-brand-navy py-20 text-white md:py-28">
        <Container>
          <SectionTitle
            light
            eyebrow="Demonstração de técnica"
            title="Da frase comum para a frase com força retórica."
            description="A diferença não está em palavras difíceis, mas em estrutura, ritmo e intenção."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-[1.3rem] border border-white/20 bg-white/5 p-7">
                <p className="text-xs uppercase tracking-[0.2em] text-brand-cream/75">Antes</p>
                <p className="mt-4 text-2xl font-semibold text-white/80">
                  &ldquo;Eu queria compartilhar algumas ideias que talvez possam te ajudar a
                  melhorar a sua comunicação.&rdquo;
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="h-full rounded-[1.3rem] border border-brand-cream/40 bg-brand-cream/10 p-7">
                <p className="text-xs uppercase tracking-[0.2em] text-brand-cream">Depois</p>
                <p className="mt-4 text-2xl font-semibold text-white">
                  &ldquo;Se você quer ser lembrado pelo que sabe, precisa primeiro ser compreendido
                  pelo que diz.&rdquo;
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* DEPOIMENTOS EM MÍDIA */}
      <section id="depoimentos-midia" className="section-divider bg-[#fffaf2] py-20 md:py-28">
        <Container>
          <SectionTitle
            eyebrow="Depoimentos em vídeo"
            title={`Veja quem já saiu\ndo caos para a clareza.`}
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
                className="rounded-[1.2rem] border border-[#ddcdb0] bg-gradient-to-b from-[#fff9ef] to-white p-5"
              >
                <ImagePlaceholder
                  label={`Vídeo — ${item.name}`}
                  ratio="aspect-[4/3]"
                  className="border-[#d8c6a8]"
                />
                <div className="mt-4 px-1">
                  <p className="text-sm font-semibold text-brand-navy">{item.name}</p>
                  <p className="text-xs text-[#3a2f64]/60">{item.role}</p>
                  <p className="mt-2 text-sm italic leading-relaxed text-[#34295e]/80">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <span className="mt-3 inline-block rounded-full border border-brand-terracotta/30 bg-brand-terracotta/8 px-3 py-1 text-xs font-semibold text-brand-terracotta">
                    {item.tag}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* FAQ */}
      <section id="objecoes" className="section-divider bg-brand-navy py-20 text-white md:py-28">
        <Container>
          <SectionTitle
            light
            eyebrow="Antes de decidir, leia isso."
            title="Respostas diretas para as dúvidas mais comuns."
          />
          <div className="mt-12">
            <Accordion items={faq} tone="dark" />
          </div>
        </Container>
      </section>

      {/* OFERTA */}
      <section id="oferta" className="section-divider bg-[#130d2b] py-20 text-white md:py-28">
        <Container className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.22em] text-brand-cream/80">
              O investimento
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight md:text-5xl">
              Uma habilidade que ninguém
              <br />
              vai tirar de você.
            </h2>
            <p className="mt-4 text-lg text-brand-cream/80">
              Condição de lançamento — válida por tempo limitado.
            </p>
            <ul className="mt-7 space-y-3 text-base leading-relaxed text-brand-cream/90">
              {[
                "✓ 16 aulas + 1 aula bônus em vídeo com roteiros completos",
                "✓ 4 módulos — Base, Estrutura, Retórica e Soberania",
                "✓ Pack de Templates GPS-C — preencha e aplique hoje",
                "✓ Exercícios práticos em cada aula para fixação imediata",
                "✓ Método do Paraquedas — improviso estruturado de emergência",
                "✓ Aula Bônus: O Trono Vazio — a ponte para o próximo nível",
                "✓ Acesso vitalício — incluindo atualizações futuras",
                "✓ Certificado de conclusão  [DADOS REAIS]",
                "✓ Suporte / Comunidade  [DADOS REAIS]"
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-[1.4rem] border border-brand-cream/25 bg-white/5 p-7 shadow-premium">
              <p className="text-xs uppercase tracking-[0.2em] text-brand-cream/75">
                Condição de lançamento
              </p>
              <p className="mt-3 text-4xl font-semibold text-white">R$ [DADOS REAIS]</p>
              <p className="mt-2 text-lg text-brand-cream/90">ou [X]x de R$ [DADOS REAIS]</p>

              <div className="mt-7 grid gap-3">
                <PrimaryButton className="w-full" href="#comprar">
                  Garantir minha inscrição
                </PrimaryButton>
                <PrimaryButton className="w-full bg-transparent ring-1 ring-brand-cream/45 hover:bg-white/10">
                  Falar com a equipe
                </PrimaryButton>
              </div>

              <p id="comprar" className="mt-5 text-center text-sm leading-relaxed text-brand-cream/80">
                Pagamento seguro&nbsp;·&nbsp;Acesso em poucos minutos&nbsp;·&nbsp;Suporte para
                configuração inicial
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* GARANTIA */}
      <section id="garantia" className="section-divider bg-[#f8f1e4] py-20 md:py-24">
        <Container>
          <Reveal className="mx-auto max-w-4xl rounded-[1.4rem] border border-[#ddcdb0] bg-white p-9 text-center shadow-soft">
            <p className="text-xs uppercase tracking-[0.22em] text-brand-terracotta">Garantia</p>
            <h2 className="mt-3 text-4xl font-semibold text-brand-navy">7 dias de garantia total</h2>
            <p className="mt-4 text-lg leading-relaxed text-[#3a2f64]/90">
              Você pode testar o conteúdo com segurança. Acesse o curso, aplique os primeiros
              exercícios e, se não sentir que a sua mente está mais organizada e a sua fala mais
              potente — devolvemos 100% do valor. Sem perguntas, sem burocracia.
            </p>
            <p className="mt-4 text-lg font-semibold text-brand-navy">O risco é todo nosso.</p>
          </Reveal>
        </Container>
      </section>

      {/* FECHAMENTO */}
      <section id="fechamento" className="section-divider bg-brand-navy py-20 text-white md:py-28">
        <Container>
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="text-xs uppercase tracking-[0.22em] text-brand-cream/80">
              A decisão é agora
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold leading-tight md:text-6xl">
              Seu conhecimento merece
              <br />
              uma forma à altura.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-balance text-xl leading-relaxed text-brand-cream/90">
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
            <p className="mt-5 text-sm text-brand-cream/70">
              R$ [DADOS REAIS]&nbsp;·&nbsp;Acesso vitalício&nbsp;·&nbsp;Garantia de 7 dias
            </p>
          </Reveal>
        </Container>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0d0920] py-8 text-center text-sm text-brand-cream/50">
        <p>
          © 2025 Diego Knebel · @diegoknebel_ · Todos os direitos reservados
        </p>
        <p className="mt-2 text-xs">
          [Links de política de privacidade e termos — DADOS REAIS]
        </p>
      </footer>
    </main>
  );
}
