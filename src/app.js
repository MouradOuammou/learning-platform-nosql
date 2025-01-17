const express = require('express');
const config = require('./config/env');
const db = require('./config/db');
const cors = require('cors');
const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoutes');
const swaggerUI = require("swagger-ui-express");
const swaggerS = require("./config/swagger");

const app = express();

async function startServer() {
  try {
    // Initialisation des connexions aux bases de données
    console.log('Connexion à MongoDB...');
    await db.connectMongo();
    console.log('Connexion à Re dis...');
    await db.connectRedis();

    // Configuration des middlewares Express
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    const customCss = `
    /* Barre supérieure */
    .swagger-ui .topbar { 
      background-color: #4caf50;
      padding: 15px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  
    /* Titre principal */
    .swagger-ui .info h1 { 
      color: #ff5722;
      font-size: 30px;
      font-weight: 600;
      margin: 20px 0;
    }
  
    /* Titre de section */
    .swagger-ui .info .title {
      font-size: 24px;
      color: #333;
      border-bottom: 2px solid #eee;
      padding-bottom: 10px;
    }
  
    /* Description */
    .swagger-ui .info .description {
      font-size: 16px;
      color: #666;
      line-height: 1.6;
    }
  
    /* Bouton Authorize */
    .swagger-ui .btn.authorize { 
      background-color: #2196f3;
      color: white;
      border-radius: 5px;
      padding: 8px 16px;
      transition: all 0.3s ease;
      border: none;
    }
  
    .swagger-ui .btn.authorize:hover {
      background-color: #1976d2;
      transform: translateY(-1px);
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
  
    /* Méthodes HTTP */
    .swagger-ui .opblock-summary-method { 
      background-color: #ffe0b2;
      color: #000;
      font-weight: 500;
      padding: 8px 12px;
      border-radius: 4px;
    }
  
    /* Personnalisation des méthodes spécifiques */
    .swagger-ui .opblock-get .opblock-summary-method {
      background-color: #e3f2fd;
      color: #1565c0;
    }
  
    .swagger-ui .opblock-post .opblock-summary-method {
      background-color: #e8f5e9;
      color: #2e7d32;
    }
  
    .swagger-ui .opblock-put .opblock-summary-method {
      background-color: #fff3e0;
      color: #e65100;
    }
  
    .swagger-ui .opblock-delete .opblock-summary-method {
      background-color: #ffebee;
      color: #c62828;
    }
  
    .swagger-ui .opblock-patch .opblock-summary-method {
      background-color: #f3e5f5;
      color: #7b1fa2;
    }
  
    /* Amélioration des sections */
    .swagger-ui .opblock {
      margin: 15px 0;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      transition: box-shadow 0.3s ease;
    }
  
    .swagger-ui .opblock:hover {
      box-shadow: 0 3px 8px rgba(0,0,0,0.15);
    }
  
    /* Style des descriptions */
    .swagger-ui .markdown p {
      color: #616161;
      line-height: 1.6;
    }
  
    /* Tableaux de paramètres */
    .swagger-ui table thead tr td,
    .swagger-ui table thead tr th {
      font-size: 14px;
      font-weight: 600;
      background-color: #fafafa;
      color: #333;
      padding: 12px;
    }
  
    .swagger-ui table tbody tr td {
      font-size: 14px;
      padding: 12px;
      border-top: 1px solid #eee;
    }
  
    /* Champs de saisie */
    .swagger-ui input[type=text],
    .swagger-ui textarea {
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 8px;
      font-size: 14px;
      transition: border-color 0.3s ease;
    }
  
    .swagger-ui input[type=text]:focus,
    .swagger-ui textarea:focus {
      border-color: #2196f3;
      outline: none;
    }
  
    /* Boutons Try it out */
    .swagger-ui .try-out__btn {
      background-color: #4caf50;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 8px 16px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
  
    .swagger-ui .try-out__btn:hover {
      background-color: #388e3c;
      transform: translateY(-1px);
    }
  
    /* Réponses */
    .swagger-ui .responses-inner {
      padding: 15px;
      background-color: #fafafa;
      border-radius: 4px;
    }
  
    .swagger-ui .response-col_status {
      font-weight: 600;
      color: #333;
    }
  
    /* Tags et sections */
    .swagger-ui .opblock-tag {
      font-size: 20px;
      font-weight: 600;
      color: #333;
      padding: 10px 0;
      border-bottom: 2px solid #eee;
      margin: 20px 0;
    }
  
    /* Schémas */
    .swagger-ui .model-box {
      background-color: #fff;
      border-radius: 4px;
      border: 1px solid #eee;
      padding: 15px;
    }
  
    /* Code d'exemple */
    .swagger-ui .highlight-code {
      background-color: #f5f5f5;
      border-radius: 4px;
      padding: 15px;
      font-family: monospace;
    }
  
    /* Messages d'erreur */
    .swagger-ui .errors-wrapper {
      background-color: #ffebee;
      border: 1px solid #ffcdd2;
      border-radius: 4px;
      padding: 10px;
      margin: 10px 0;
    }
  `;
    // Montage des routes
    app.use('/courses', courseRoutes);
    app.use('/students', studentRoutes);
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerS,{
      customCss: customCss}
    ));


    // Gestion des erreurs globales
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ message: 'Une erreur interne est survenue.', error: err.message });
    });

    // Démarrage du serveur
    const PORT = config.port || 3002;
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
      console.log(
        `Swagger Docs available at http://localhost:${config.port}/api-docs`
      );
    });
  } catch (error) {
    console.error('Échec du démarrage du serveur:', error.message);
    process.exit(1); // Sortie en cas d'échec du démarrage
  }
}

// Gestion propre de l'arrêt
process.on('SIGTERM', async () => {
  console.log('Arrêt du serveur...');
  try {
    if (db.mongoClient) {
      await db.mongoClient.close();
      console.log('Connexion MongoDB fermée.');
    }
    if (db.redisClient) {
      await db.redisClient.quit();
      console.log('Connexion Redis fermée.');
    }
    process.exit(0); // Sortie après l'arrêt du serveur
  } catch (error) {
    console.error('Erreur lors de l\'arrêt du serveur:', error.message);
    process.exit(1); // Sortie en cas d'erreur lors de l'arrêt
  }
});

startServer();
