## ADR-003 : Utilisation de Docker pour l’environnement local

**Date :** 2026-05-19
**Statut :** Accepté
**Décideurs :** Équipe technique

### Contexte

Le projet nécessite un environnement de développement reproductible et identique pour tous les développeurs.

Plusieurs services doivent fonctionner ensemble (PostgreSQL, backend, frontend).

### Options envisagées

1. Installation locale manuelle
2. Docker / Docker Compose
3. Environnements cloud dev (Gitpod, Codespaces)

### Décision

Utilisation de Docker et Docker Compose pour l’environnement local.

### Justification

- Environnement identique pour toute l’équipe
- Simplification du setup projet
- Isolation des services (DB, backend, frontend)
- Compatible CI/CD et production
- Réduction des problèmes de dépendances locales

### Conséquences

- ✅ Setup rapide pour nouveaux développeurs
- ✅ Environnements reproductibles
- ✅ Isolation propre des services
- ⚠️ Consommation CPU/RAM plus élevée
- ⚠️ Courbe d’apprentissage Docker nécessaire
- ⚠️ Debug réseau parfois plus complexe
