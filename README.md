# TechCorp Équipe - correction des défis du TP 1 bonus

Même application que `../decouverte-angular/` (fin du module 21), avec **toutes les solutions des défis** intermédiaires et avancés des cinq phases. Chaque ajout est repéré dans le code par un commentaire `Defi intermediaire phase N` ou `Defi avance phase N`.

Les explications détaillées sont dans `corrections/jour1-bonus-decouverte-angular.md`.

## Installation et commandes

```bash
npm install
npm start        # http://localhost:4200
npm run build    # la page "Ajouter" apparait dans "Lazy chunk files"
```

## Où trouver chaque défi

| Phase | Défi | Fichiers |
|---|---|---|
| 1 | Intermédiaire : bouton "Effacer" | `pages/home/` |
| 1 | Avancé : pipe `uppercase`, champ d'essai avec `#tryInput` | `pages/home/` |
| 2 | Intermédiaire : `usedPercent` | `leave-counter/` |
| 2 | Avancé : "Poser une semaine", historique | `leave-counter/` |
| 3 | Intermédiaire : `StatusBadge`, résumé de l'équipe | `status-badge/`, `pages/team-page/` |
| 3 | Avancé : mode compact, initiales, `$index` / `$count` | `employee-card/`, `pages/team-page/` |
| 4 | Intermédiaire : fiche `/equipe/:id` | `pages/employee-detail/`, `team-store.ts`, `app.config.ts`, `app.routes.ts` |
| 4 | Avancé : `remoteCount`, filtre par service, `loadComponent`, `MatIconButton` | `team-store.ts`, `pages/team-page/`, `app.routes.ts` |
| 5 | Intermédiaire : récapitulatif d'erreurs, bouton désactivé pendant l'envoi | `pages/add-employee/` |
| 5 | Avancé : domaine, doublon, jours de télétravail, guard | `pages/add-employee/`, `unsaved-changes-guard.ts`, `models/employee.ts` |
