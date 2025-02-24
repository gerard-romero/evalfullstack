ien github : git@github.com:gerard-romero/full2.git.

Création du dossier de l'application .
Création des sous-dossiers : backend et frontend.
________________________________________________________________________
Dans le sous-dossier backend :

Architecture de travail.

Dossier config => fichier db.js
Dossier controllers => fichiers settingsControllers.js
                                skillControllers.js
                                userControllers.js

Dossier middleware => fichiers  authMiddleware.js
                                errorHandler.js
                                validateRequest.js

Dossier models => fichiers  Settings.js
                            Skills.js
                            User.js

Dossier routes => fichiers  settingsRoutes.js
                            skillRoutes.js
                            userRoutes.js

Dossier validations => fichiers authValidation.js

fichier .env : Renseignements utiles pour l'application :
               le PORT / MONGO_URI / DB_HOST / DB_NAME / DB_USER /
               DB_PASS / JWT_SECRET / identifiants Cloudinary.
__________________________________________________________________________

Dans le terminal : 
    - téléchargement du package json (npm install -y).
    - téléchargement des dépendances utilisées dans les imports
      (npm i bcrypt cors express helmet jsonwebtoken mongoose nodemon axios cloudinary cookie-parser dotenv ejs express-validator fs multer ).
    - lancement du serveur (npm start).

______________________________________________________________________________________________________________________________________________________