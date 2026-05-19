## ADR-001 : Choix de PostgreSQL comme base de données principale

**Date :** 2026-05-19
**Statut :** Accepté
**Décideurs :** Équipe technique

### Contexte

Le projet repose sur un modèle de données fortement relationnel (utilisateurs, contenus, relations métier complexes). Une base robuste et fiable est nécessaire pour garantir l’intégrité et la scalabilité des données.

L’équipe possède déjà une forte expertise sur PostgreSQL.

### Options envisagées

1. PostgreSQL (relationnel mature)
2. MongoDB (document NoSQL)
3. Firebase / Firestore (BaaS)

### Décision

PostgreSQL comme base de données principale.

### Justification

- Modèle relationnel adapté aux données du projet
- Très bonnes performances sur requêtes complexes
- Support des transactions ACID
- Extension JSONB pour flexibilité hybride si besoin
- Écosystème mature (Prisma, Drizzle, etc.)
- Expertise déjà présente dans l’équipe

### Conséquences

- ✅ Développement rapide grâce aux compétences existantes
- ✅ Intégrité des données forte (relations, contraintes)
- ✅ Outils ORM compatibles et éprouvés
- ⚠️ Nécessite une bonne conception de schéma dès le départ
- ⚠️ Moins flexible qu’une base NoSQL pour données très non structurées
