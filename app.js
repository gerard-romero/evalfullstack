import mongoose from 'mongoose'; // Importation de la bibliothèque mongoose pour interagir avec MongoDB
import dotenv from 'dotenv'; // Importation de dotenv pour la gestion des variables d'environnement
import express from 'express'; // Importation d'express pour créer un serveur web
import connectDB from './config/db.js'; // Importation de la fonction de connexion à la base de données
import userRoutes from './routes/userRoutes.js'; // Importation des routes utilisateur
import skillRoutes from './routes/skillRoutes.js'; // Importation des routes des compétences
import settingsRoutes from './routes/settingsRoutes.js'; // Importation des routes des paramètres
import errorHandler from "./middleware/errorHandler.js"; // Importation du gestionnaire d'erreurs
import { v2 as cloudinary } from 'cloudinary'; // Importation de Cloudinary pour la gestion des fichiers en ligne
import multer from 'multer'; // Importation de multer pour le traitement des fichiers envoyés
import helmet from 'helmet'; // Importation de helmet pour la sécurité de l'application
import cookieParser from 'cookie-parser'; // Importation de cookie-parser pour analyser les cookies
import cors from 'cors'; // Importation de cors pour gérer les requêtes cross-origin
import fileUpload from 'express-fileupload'; // Importation de express-fileupload pour le téléchargement de fichiers
import fs from 'fs'; // Importation du module fs pour gérer les opérations sur les fichiers
import rateLimit from 'express-rate-limit'; // Importation de express-rate-limit pour limiter les requêtes

dotenv.config(); // Chargement des variables d'environnement à partir d'un fichier .env
const app = express(); // Création d'une instance de l'application Express
connectDB(); // Connexion à la base de données

const allowedOrigins = ['https://pedigree.vercel.app']; // Définition des origines autorisées
app.use(helmet()); // Middleware pour sécuriser l'application
// Configurer CORS pour autoriser seulement le frontend à accéder à l'API
app.use(cors({ // Middleware pour gérer les requêtes cross-origin
    origin: allowedOrigins, 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
//Limite de requêtes pour éviter le spam
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // 100 requêtes
});
app.use (limiter); // Utilisation du middleware de limitation des requêtes 
// Middleware pour analyser les requêtes avec des URL encodées
app.use(express.urlencoded({ extended: true }));

// Middleware pour analyser les requêtes avec du JSON
app.use(express.json());

// Middleware pour analyser les cookies
app.use(cookieParser());

// Middleware pour gérer les erreurs
app.use(errorHandler);

// Middleware pour le téléchargement de fichiers avec une limite de taille de 5 Mo
app.use(fileUpload({
    useTempFiles: true,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limite de taille de fichier (5 Mo)
}));

// Middleware pour sécuriser l'application en définissant la politique de frameguard sur SAMEORIGIN
app.use(helmet.frameguard({ action: "SAMEORIGIN" }));
// Définition des routes de l'application
app.use('api/users', userRoutes); // Routes utilisateur
app.use('api/skills', skillRoutes); // Routes des compétences
app.use('api/settings', settingsRoutes); // Routes des paramètres

// Middleware pour gérer les requêtes cross-origin
app.use(cors());

// Configuration du moteur de rendu pour les vues EJS
app.set('view engine', 'ejs'); // Définition du moteur de rendu
app.set('views', './views'); // Définition du répertoire des vues

// Variables d'environnement sensibles
const DB_URI = process.env.DB_URI; // URI de la base de données
const API_KEY = process.env.API_KEY; // Clé API
const API_SECRET = process.env.API_SECRET; // Secret API


cloudinary.config({ 
    cloud_name: 'duca2mjpm', 
    api_key: '632563349422154', 
    api_secret: 'lniPToKWEcETRbWK5zgl0Wi8C3A'
    }); // Configuration de Cloudinary avec les identifiants de l'utilisateur

const upload = multer({ dest: 'uploads/' }); // Configuration de Multer pour enregistrer les fichiers téléchargés dans le dossier 'uploads'

mongoose.connect(`mongodb+srv://gerard:gerard@clustertoday.ax26b.mongodb.net/`)
    .then(() => {
        console.log(`Connecté à MongoDB`); // Message de confirmation de la connexion à MongoDB
    })
    .catch((err) => {
        console.error('Error:', err); // Affichage des erreurs de connexion
    });

app.post('/upload', upload.single('skillFile'), async (req, res) => {
    const {title, description} = req.body;
    try {
        if(!req.file){
            return res.status(400).json({error: `Aucune image chargée.`}); // Vérification de la présence d'un fichier
        }
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
            folder: 'images',
        }); // Téléchargement de l'image sur Cloudinary
        fs.unlinkSync(req.file.path); // Suppression du fichier local après téléchargement
        const skill = new skill({
            title,
            description,
            public_id: uploadResult.public_id,
            url: uploadResult.secure_url,
        }); // Création d'un nouveau document Skill avec les informations de l'image
        await skill.save(); // Sauvegarde du document Skill dans MongoDB
        res.status(201).json({skill}); // Réponse en cas de succès
    } catch (error) {
        console.error(`Erreur sur le chargement de l'image.`, error); // Affichage des erreurs de téléchargement
        res.status(500).json({error: `Erreur lors du chargement.`}); // Réponse en cas d'échec
    }
});

app.get('/skill', async (req, res) => {
    try {
        const skill = await skill.find(); // Récupération de tous les documents Skill
        res.json({skill}); // Réponse avec les documents trouvés
    } catch (error) {
        console.error(`Erreur de chargement`, error); // Affichage des erreurs
        res.status(500).json({error: `Erreur lors du chargement.`}); // Réponse en cas d'échec
    }
});

app.put('/skill/:id', async (req, res) => {
    const {id} = req.params;
    const {title, description} = req.body;
    try {
        const skill = await skill.findByIdAndUpdate(
            id,
            {title, description},
            {new: true}
        ); // Mise à jour du document Skill avec l'id spécifié
        if(!skill){
            return res.status(500).json({message: `Image non chargée.`}); // Vérification si le document Skill existe
        }
        res.json({skill}); // Réponse en cas de succès
    } catch (error) {
        console.error(`Erreur de chargement.`, error); // Affichage des erreurs
    }
});

app.delete('/skill/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const skill = await skill.findByIdAndDelete(id); // Suppression du document Skill avec l'id spécifié
        if(!skill){
            return res.status(404).json({error: 'Image non trouvée'}); // Vérification si le document Skill existe
        }
        await cloudinary.uploader.destroy(skill.public_id); // Suppression de l'image sur Cloudinary
        res.json({message: `Image supprimée.`}); // Réponse en cas de succès
    } catch (error) {
        console.error(`Erreur de suppression`, error); // Affichage des erreurs
        res.status(500).json({error: `La suppression s'est mal passée.`}); // Réponse en cas d'échec
    }
});

app.get('upload', (req, res) => {
    res.render('form'); // Rendu du formulaire de téléchargement
});

app.use('/Uploads', express.static('Uploads')); // Middleware pour servir des fichiers statiques à partir du dossier 'Uploads'

const PORT = process.env.PORT || 3007; // Définition du port du serveur

app.listen(PORT, () => {
    console.log(`Le serveur tourne sur le port http://localhost:${PORT}`); // Démarrage du serveur avec un message de confirmation
});
