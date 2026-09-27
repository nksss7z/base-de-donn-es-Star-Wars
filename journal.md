# Journal de décisions — Projet Star Wars

## Décision 1 — Utilisation de SWAPI.tech

### Date
Septembre 2026

### Décision
Utiliser l'API SWAPI.tech pour récupérer les personnages Star Wars.

### Pourquoi ?
L'API permet de récupérer les données des personnages sans avoir à créer une base de données locale.

### Résultat
Les personnages sont récupérés dynamiquement et affichés dans l'application React.

---

## Décision 2 — Utilisation de React Router

### Date
Septembre 2026

### Décision
Utiliser React Router pour gérer les différentes pages de l'application.

### Pourquoi ?
Cela permet de naviguer entre l'accueil, les personnages, le détail d'un personnage, la sélection et le contact sans recharger toute l'application.

### Résultat
Les routes principales sont fonctionnelles et une page 404 est prévue pour les routes inexistantes.

---

## Décision 3 — Utilisation du Context

### Date
Septembre 2026

### Décision
Utiliser un Context React pour gérer la sélection des personnages.

### Pourquoi ?
La sélection doit être accessible depuis plusieurs pages de l'application.

### Résultat
Un personnage peut être ajouté ou retiré de la sélection et l'information reste disponible lors de la navigation.

---

## Décision 4 — Mise en place des tests

### Date
Septembre 2026

### Décision
Utiliser Vitest et Testing Library pour tester l'application.

### Pourquoi ?
Les tests permettent de vérifier automatiquement les principales fonctionnalités.

### Résultat
8 tests ont été créés et les 8 tests passent avec succès.

---

## Décision 5 — Lazy loading

### Date
Septembre 2026

### Décision
Utiliser `React.lazy()` et `Suspense` pour charger les pages uniquement lorsqu'elles sont nécessaires.

### Pourquoi ?
Cela permet de séparer le code des différentes pages et d'améliorer le chargement initial de l'application.

### Résultat
Les pages sont générées dans des fichiers JavaScript séparés lors du build.

Avant optimisation :

- JavaScript principal : 264,47 kB
- Gzip : 83,67 kB

Après optimisation :

- JavaScript principal : 260,43 kB
- Gzip : 82,74 kB

---

## Bilan

Les principales décisions techniques ont permis de construire une application React fonctionnelle utilisant une API externe, un système de navigation, un Context pour la sélection, des tests automatisés et une optimisation du chargement des pages.