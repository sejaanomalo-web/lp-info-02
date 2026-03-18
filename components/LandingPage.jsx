"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  audience,
  benefits,
  deliverables,
  faqs,
  mediaPlaceholders,
  notFor,
  objections,
  painSignals,
  pillars,
  testimonials
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

export default function LandingPage() {
  return (
    <main className="bg-[#f6f1e8]">
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
                Treinamento premium de comunicação estratégica
              </p>
              <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.04] md:text-6xl">
                Transforme conhecimento em comunicação clara, memorável e influente.
              </h1>
              <p className="mt-6 max-w-2xl text-balance text-xl font-light leading-relaxed text-brand-cream/90">
                O <strong>Arquiteto de Ideias</strong> é o método do Diego Knebel para quem quer
                comunicar com profundidade, presença e estrutura, sem ruído e sem exagero.
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-cream/85">
                Não é sobre falar mais. É sobre construir mensagens impossíveis de ignorar.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <PrimaryButton href="#oferta">Quero me tornar Arquiteto de Ideias</PrimaryButton>
                <span className="text-sm tracking-wide text-brand-cream/80">
                  Garantia incondicional de 7 dias.
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
                  <p className="mt-1 text-sm font-semibold text-white">Profundidade com clareza</p>
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
                    Autoridade tranquila e memorável
                  </p>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section id="identificacao" className="section-divider bg-[#171033] py-16 text-brand-cream">
        <Container>
          <Reveal>
            <p className="text-xs uppercase tracking-[0.22em] text-brand-cream/75">
              Identificação imediata
            </p>
            <h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold leading-tight text-white md:text-4xl">
              Quando a comunicação está confusa, o valor do seu repertório fica invisível.
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

      <section id="dor" className="section-divider bg-[#f6f1e8] py-20 md:py-28">
        <Container className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-terracotta">
              Dor e consciência
            </p>
            <h2 className="mt-4 text-balance text-3xl font-semibold text-brand-navy md:text-5xl">
              O problema não é falta de capacidade. É falta de arquitetura.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[#32295e]/90">
              Você já tem conteúdo. Já estudou, já viveu, já acumulou repertório. Mas sem estrutura,
              as ideias ficam dispersas, a fala perde força e a mensagem não gera a influência que
              poderia gerar.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[#32295e]/90">
              O Arquiteto de Ideias organiza sua comunicação para que profundidade e clareza coexistam
              com elegância e presença.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[1.4rem] border border-[#e2d5c0] bg-[#fffaf1] p-8 shadow-soft">
              <p className="text-xs uppercase tracking-[0.2em] text-brand-terracotta">Sinal crítico</p>
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

      <section id="solucao" className="section-divider bg-[#fbf7ee] py-20 md:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1.06fr_0.94fr]">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.22em] text-brand-terracotta">A solução</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold text-brand-navy md:text-5xl">
              Arquiteto de Ideias: método sólido para transformar fala em posicionamento.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[#372d62]/90">
              Você aprende a organizar pensamento, construir narrativa e aplicar recursos retóricos
              com intenção. O resultado é uma comunicação clara, elegante e estrategicamente
              irresistível.
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

      <section id="beneficios" className="section-divider bg-[#f1e7d4] py-20 md:py-28">
        <Container>
          <SectionTitle
            eyebrow="Benefícios principais"
            title="Resultados práticos, emocionais e estratégicos."
            description="Cada etapa do método foi desenhada para elevar sua clareza, sua presença e seu poder de influência."
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
                <p className="mt-3 text-base leading-relaxed text-[#3a2f64]/90">{benefit.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </section>

      <section id="pilares" className="section-divider bg-brand-navy py-20 text-white md:py-28">
        <Container>
          <SectionTitle
            light
            eyebrow="Os 4 pilares do método"
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
                <h3 className="mt-3 text-2xl font-semibold text-white">{pillar.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-brand-cream/90">{pillar.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </section>

      <section id="posicionamento" className="section-divider bg-[#100b26] py-24 text-white md:py-32">
        <Container>
          <Reveal className="mx-auto max-w-5xl text-center">
            <p className="text-xs uppercase tracking-[0.22em] text-brand-cream/80">
              Posicionamento conceitual
            </p>
            <p className="mt-6 text-balance text-4xl font-semibold leading-tight md:text-6xl">
              Não é sobre parecer inteligente.
              <br className="hidden md:block" /> É sobre ser impossível de ignorar.
            </p>
            <p className="mx-auto mt-6 max-w-3xl text-balance text-xl font-light leading-relaxed text-brand-cream/85">
              Quando sua mensagem combina profundidade e clareza, sua presença deixa de competir por
              atenção e passa a comandar atenção.
            </p>
          </Reveal>
        </Container>
      </section>

      <section id="recebe" className="section-divider bg-[#f8f2e6] py-20 md:py-28">
        <Container>
          <SectionTitle
            eyebrow="O que você recebe"
            title="Entregáveis organizados para gerar valor desde a primeira aplicação."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="rounded-[1.35rem] border border-[#ddcdb0] bg-white p-7 shadow-soft">
                <p className="text-xs uppercase tracking-[0.2em] text-brand-terracotta">Módulos</p>
                <ul className="mt-5 space-y-3">
                  {deliverables.modules.map((module) => (
                    <li key={module} className="rounded-xl border border-[#ece2d3] bg-[#fffcf6] px-4 py-3">
                      <p className="text-base font-semibold text-brand-navy">{module}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="rounded-[1.35rem] border border-[#ddcdb0] bg-white p-7 shadow-soft">
                <p className="text-xs uppercase tracking-[0.2em] text-brand-terracotta">Bônus e ativos</p>
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

      <section id="publico" className="section-divider bg-[#f1e7d4] py-20 md:py-28">
        <Container className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[1.35rem] border border-[#d9c8a7] bg-[#fff8ea] p-7">
              <p className="text-xs uppercase tracking-[0.2em] text-brand-terracotta">Para quem é</p>
              <h3 className="mt-3 text-3xl font-semibold text-brand-navy">Perfil ideal do aluno</h3>
              <ul className="mt-6 space-y-3">
                {audience.map((item) => (
                  <li key={item} className="text-[1.04rem] leading-relaxed text-[#3c3168]">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-[1.35rem] border border-[#d9c8a7] bg-brand-navy p-7 text-brand-cream">
              <p className="text-xs uppercase tracking-[0.2em] text-brand-cream/75">Não é para quem</p>
              <h3 className="mt-3 text-3xl font-semibold text-white">Busca atalhos sem método</h3>
              <ul className="mt-6 space-y-3">
                {notFor.map((item) => (
                  <li key={item} className="text-[1.04rem] leading-relaxed text-brand-cream/90">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

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
            <p className="text-xs uppercase tracking-[0.22em] text-brand-terracotta">Sobre Diego Knebel</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold text-brand-navy md:text-5xl">
              Autoridade com presença didática e direção estratégica.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[#3a2f64]/90">
              Diego Knebel orienta profissionais a transformarem conhecimento em comunicação de alto
              impacto, combinando estrutura, influência e clareza. Sua abordagem une profundidade
              intelectual com aplicação prática e linguagem acessível.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-[#3a2f64]/90">
              Bio curta oficial, números e credenciais detalhadas serão inseridos aqui:
              <span className="font-semibold text-brand-navy"> [Placeholder de bio e autoridade]</span>.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                "Alunos impactados [Placeholder]",
                "Horas de aula [Placeholder]",
                "Cases e resultados [Placeholder]"
              ].map((metric) => (
                <div key={metric} className="rounded-2xl border border-[#ddcdb0] bg-[#fff6e8] p-4">
                  <p className="text-sm uppercase tracking-[0.14em] text-brand-terracotta">Autoridade</p>
                  <p className="mt-2 text-lg font-semibold text-brand-navy">{metric}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

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
                  &ldquo;Eu queria compartilhar algumas ideias que talvez possam te ajudar.&rdquo;
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

      <section id="depoimentos" className="section-divider bg-[#f8f1e4] py-20 md:py-28">
        <Container>
          <SectionTitle
            eyebrow="Depoimentos"
            title="Resultados percebidos por quem aplicou o método."
          />

          <motion.div
            className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={listStagger}
          >
            {testimonials.map((item) => (
              <motion.article
                key={item.name}
                variants={listItem}
                className="rounded-[1.2rem] border border-[#ddcdb0] bg-white p-6 shadow-soft"
              >
                <p className="text-base leading-relaxed text-[#34295e]">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-brand-terracotta">
                  {item.name}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </section>

      <section id="depoimentos-midia" className="section-divider bg-[#fffaf2] py-20 md:py-28">
        <Container>
          <SectionTitle
            eyebrow="Depoimentos em mídia"
            title="Espaços reservados para fotos e vídeos de prova social premium."
          />

          <motion.div
            className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={listStagger}
          >
            {mediaPlaceholders.map((slot) => (
              <motion.div
                key={slot}
                variants={listItem}
                className="rounded-[1.2rem] border border-[#ddcdb0] bg-gradient-to-b from-[#fff9ef] to-white p-5"
              >
                <ImagePlaceholder label={slot} ratio="aspect-[4/3]" className="border-[#d8c6a8]" />
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      <section id="objecoes" className="section-divider bg-brand-navy py-20 text-white md:py-28">
        <Container>
          <SectionTitle
            light
            eyebrow="Quebra de objeções"
            title="Respostas diretas para as dúvidas mais comuns."
          />
          <div className="mt-12">
            <Accordion items={objections} tone="dark" />
          </div>
        </Container>
      </section>

      <section id="bonus" className="section-divider bg-[#f4e8d2] py-20 md:py-28">
        <Container>
          <Reveal className="rounded-[1.5rem] border border-[#d7c29a] bg-gradient-to-br from-[#fff9ee] to-[#fff1de] p-8 md:p-12">
            <p className="text-xs uppercase tracking-[0.22em] text-brand-terracotta">Bônus especial</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold text-brand-navy md:text-5xl">
              Pack de Templates de Roteiro
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#3b3067]">
              Modelos prontos para organizar ideias com rapidez e manter padrão de comunicação em
              alto nível.
            </p>
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-brand-terracotta/35 bg-brand-terracotta/10 px-5 py-2">
              <span className="text-xs uppercase tracking-[0.18em] text-brand-terracotta">
                Valor percebido
              </span>
              <span className="text-lg font-semibold text-brand-navy">[R$ Placeholder]</span>
            </div>
          </Reveal>
        </Container>
      </section>

      <section id="oferta" className="section-divider bg-[#130d2b] py-20 text-white md:py-28">
        <Container className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.22em] text-brand-cream/80">Oferta</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight md:text-5xl">
              Invista em uma comunicação que sustenta seu posicionamento por anos.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-cream/90">
              Condição comercial final, parcelamento e data limite devem ser inseridos neste bloco com
              os dados oficiais da campanha.
            </p>
            <ul className="mt-7 space-y-3 text-base leading-relaxed text-brand-cream/90">
              <li>• Acesso imediato à plataforma [Placeholder]</li>
              <li>• Prazo de acesso [Placeholder]</li>
              <li>• Certificado e suporte [Placeholder]</li>
            </ul>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-[1.4rem] border border-brand-cream/25 bg-white/5 p-7 shadow-premium">
              <p className="text-xs uppercase tracking-[0.2em] text-brand-cream/75">Condição premium</p>
              <p className="mt-3 text-4xl font-semibold text-white">[R$ Preço oficial]</p>
              <p className="mt-2 text-lg text-brand-cream/90">ou [Parcelamento Placeholder]</p>

              <div className="mt-7 grid gap-3">
                <PrimaryButton className="w-full" href="#comprar">
                  Garantir minha inscrição
                </PrimaryButton>
                <PrimaryButton className="w-full bg-transparent ring-1 ring-brand-cream/45 hover:bg-white/10">
                  Falar com a equipe
                </PrimaryButton>
              </div>

              <p id="comprar" className="mt-5 text-sm leading-relaxed text-brand-cream/80">
                Pagamento seguro | Acesso em poucos minutos | Suporte para configuração inicial
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section id="garantia" className="section-divider bg-[#f8f1e4] py-20 md:py-24">
        <Container>
          <Reveal className="mx-auto max-w-4xl rounded-[1.4rem] border border-[#ddcdb0] bg-white p-9 text-center shadow-soft">
            <p className="text-xs uppercase tracking-[0.22em] text-brand-terracotta">Garantia</p>
            <h2 className="mt-3 text-4xl font-semibold text-brand-navy">7 dias de garantia total</h2>
            <p className="mt-4 text-lg leading-relaxed text-[#3a2f64]/90">
              Você pode testar o conteúdo com segurança. Se não perceber valor real, solicite o
              reembolso dentro do prazo oficial.
            </p>
          </Reveal>
        </Container>
      </section>

      <section id="faq" className="section-divider bg-[#fffaf2] py-20 md:py-28">
        <Container>
          <SectionTitle eyebrow="FAQ" title="Perguntas frequentes" />
          <div className="mt-12">
            <Accordion items={faqs} />
          </div>
        </Container>
      </section>

      <section id="fechamento" className="section-divider bg-brand-navy py-20 text-white md:py-28">
        <Container>
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="text-xs uppercase tracking-[0.22em] text-brand-cream/80">Fechamento</p>
            <h2 className="mt-4 text-balance text-4xl font-semibold leading-tight md:text-6xl">
              Seu conhecimento merece uma forma à altura.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-balance text-xl leading-relaxed text-brand-cream/90">
              Entre no Arquiteto de Ideias e transforme sua comunicação em um ativo de autoridade,
              influência e presença.
            </p>
            <div className="mt-10">
              <PrimaryButton href="#oferta">Quero minha vaga no Arquiteto de Ideias</PrimaryButton>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  );
}
