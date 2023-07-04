# 🚀gestion-note-app 🚀

## MERN Stack

### React / Express / MongoDB

 Démarrer le server :   <code>npm run server</code>
 
 Démarrer le front :   <code>cd client</code>+ <code>npm start</code>

 <hr style="background-color: #cdebad; padding: 3px;"></hr>

 ### Back config :
 - Mettez vos informations de cluster dans <code>/config/db.js</code>
 
 - Créez le fichier <code>.env</code> dans les données suivantes :

      - PORT = 8080 <code>Votre Port localhost</code>

      - MONGO_URL = [MONGODB URL] <code>Votre MongoDb URL</code>

      - JWT_SECRET= HAFHGEAD1212432475 <code>Vvotre cle secréte aléatoire</code>


 ### front config :
 - Mettez dans le package.json :

     - "proxy": "http://localhost:8080"  <code>url de votre serveur</code>

 
