# Star Wars App

Application web React + TypeScript permettant de consulter des personnages de l'univers Star Wars grâce à l'API SWAPI.tech.

## Technologies utilisées

- React
- TypeScript
- Vite
- React Router
- SWAPI.tech
- Vitest
- Testing Library

## Fonctionnalités

L'application permet de :

- consulter la liste des personnages Star Wars ;
- rechercher un personnage ;
- filtrer les personnages ;
- consulter le détail d'un personnage ;
- ajouter des personnages à une sélection ;
- retirer des personnages de la sélection ;
- utiliser la sélection depuis plusieurs pages grâce au Context ;
- envoyer un formulaire de contact ;
- gérer les erreurs de l'API ;
- afficher un état de chargement ;
- gérer les routes inexistantes avec une page 404.

## API

Les personnages sont récupérés depuis l'API SWAPI.tech.

Les données sont chargées depuis l'API et affichées dans l'application React.

## Tests

Les tests sont réalisés avec Vitest et Testing Library.

La suite contient 8 tests couvrant notamment :

- l'affichage des personnages ;
- le chargement ;
- la gestion d'une erreur API ;
- la recherche ;
- le filtrage ;
- l'affichage du formulaire Contact ;
- l'envoi du formulaire ;
- l'ajout et la suppression d'un personnage dans la sélection.

Résultat actuel :

**8 tests réussis sur 8.**

## Optimisation

Un lazy loading des pages a été ajouté avec `React.lazy()` et `Suspense`.

Avant optimisation :

- JavaScript principal : 264,47 kB
- Gzip : 83,67 kB

Après optimisation :

- JavaScript principal : 260,43 kB
- Gzip : 82,74 kB

Les différentes pages sont maintenant chargées séparément.

## Installation

Installer les dépendances :

```bash
npm install