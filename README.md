# Arquiteto de Ideias - Landing Page Premium

Landing page em Next.js + Tailwind + Framer Motion para o infoproduto "Arquiteto de Ideias".

## Stack

- Next.js (App Router)
- React
- Tailwind CSS
- Framer Motion

## Executar localmente

```bash
npm install
npm run dev
```

Build de produção:

```bash
npm run build
npm start
```

## Estrutura principal

- `app/layout.jsx`: metadados SEO + fonte Titillium Web
- `app/page.jsx`: entrada da página
- `components/LandingPage.jsx`: estrutura completa da LP (20 seções)
- `lib/content.js`: textos, depoimentos e listas editáveis
- `components/ui/*`: componentes reutilizáveis (CTA, reveal, placeholder, container)

## Placeholders pendentes para fechamento comercial

- Preço oficial e parcelamento
- Bio curta final e credenciais numéricas
- Prazo de acesso
- Certificado (regras finais)
- Suporte/comunidade
- Fotos e vídeos reais de depoimentos
- Fotos oficiais finais do Diego e arquivos de logo
