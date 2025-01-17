# OUAMMOU MOURAD
   
# Learning Platform - NoSQL

## Description
**Learning Platform - NoSQL** est un projet backend développé avec **Node.js**, utilisant **MongoDB** pour le stockage des données et **Redis** pour la gestion du cache. Le projet permet de gérer des étudiants et des cours tout en fournissant des statistiques sur les étudiants. La documentation et les tests d'API sont réalisés avec **Swagger**.

## Fonctionnalités
- Ajouter des étudiants
- Récupérer tous les étudiants (avec mise en cache via Redis)
- Ajouter des cours
- Associer des étudiants à des cours
- Générer des statistiques sur les étudiants
- Documentation interactive et tests via Swagger

## Technologies utilisées
- **Node.js** : Framework backend
- **Express.js** : Framework minimaliste pour construire les API REST
- **MongoDB** : Base de données NoSQL pour le stockage des données
- **Redis** : Système de mise en cache pour optimiser les performances
- **Swagger** : Génération et tests de la documentation API
- **npm** : Gestionnaire de paquets pour Node.js

## Installation

### Prérequis
- **Node.js** installé sur votre machine
- **MongoDB** en cours d'exécution
- **Redis** installé et configuré
- **npm** (livré avec Node.js)

### Étapes d'installation

1. **Cloner le projet**
```bash
git clone https://github.com/MouradOuammou/learning-platform-nosql.git
cd learning-platform-nosql
```

2. **Installer les dépendances**
```bash
# Dépendances principales
npm install express mongoose redis

# Installation de Swagger
npm install swagger-jsdoc swagger-ui-express
```

3. **Configurer les variables d'environnement**
Créez un fichier `.env` à la racine du projet :
```env
PORT=3000
DB_URI=mongodb://localhost:27017/learning-platform
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

4. **Lancer le serveur**
```bash
npm start
```

## API Routes

### Routes Students
- **POST** `/students` - Créer un étudiant
- **GET** `/students` - Obtenir tous les étudiants
- **GET** `/students/:id` - Obtenir un étudiant spécifique
- **GET** `/students/stats` - Obtenir les statistiques des étudiants

### Routes Courses
- **POST** `/courses` - Créer un cours
- **GET** `/courses` - Obtenir tous les cours
- **GET** `/courses/:id` - Obtenir un cours spécifique
- **GET** `/courses/stats` - Obtenir les statistiques des cours

> **J'ai utilisé Fake API pour le test en utilisant ce site : [Fake API_Mockaroo](https://www.mockaroo.com//)**

### Documentation API
Accédez à la documentation Swagger à l'adresse :
`http://localhost:3000/api-docs`
![Swagger interface](https://github.com/MouradOuammou/learning-platform-nosql/blob/main/Swagger%20Interface.png)


## API Routes & Exemples

### Routes Students

#### Créer un étudiant (POST /students)
- Création d'un nouvel étudiant dans le système

Création d'un étudiant

#### Obtenir tous les étudiants (GET /students)
- Liste de tous les étudiants avec mise en cache Redis

#### Obtenir un étudiant spécifique (GET /students/:id)

#### Statistiques des étudiants (GET /students/stats)


### Routes Courses

#### Créer un cours (POST /courses)
- Création d'un nouveau cours

![Création d'un cours](https://github.com/MouradOuammou/learning-platform-nosql/blob/main/Course.png)

![Suite](https://github.com/MouradOuammou/learning-platform-nosql/blob/main/Responses.png)

![Dans MongoDb](https://github.com/MouradOuammou/learning-platform-nosql/blob/main/Dans%20Mongo.png)

#### Obtenir tous les cours (GET /courses)
- Liste de tous les cours disponibles

#### Obtenir un cours spécifique (GET /courses/:id)
- Détails d'un cours particulier

#### Statistiques des cours (GET /courses/stats)
- Statistiques globales sur les cours

