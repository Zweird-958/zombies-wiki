## ADR-002 : Choix de Next.js pour le frontend et le SEO

**Date :** 2026-05-19
**Statut :** Accepté
**Décideurs :** Équipe technique

### Contexte

Le projet nécessite une forte visibilité SEO ainsi qu’un rendu performant côté frontend. Une solution supportant SSR/SSG est indispensable.

Le frontend est basé sur React.

### Options envisagées

1. Next.js
2. Remix
3. Vite + React SPA

### Décision

Next.js comme framework frontend principal.

### Justification

- SSR natif pour SEO optimal
- SSG / ISR pour performance et caching
- App Router moderne et structurant
- Bonne intégration API backend (Hono, REST, etc.)
- Écosystème React déjà maîtrisé
- Optimisations automatiques (images, routing, bundling)

### Conséquences

- ✅ Excellent SEO natif
- ✅ Temps de chargement réduit
- ✅ Architecture scalable
- ⚠️ Complexité accrue (server/client components)
- ⚠️ Discipline nécessaire sur data fetching et caching
- ⚠️ Risque de sur-engineering si mal structuré
