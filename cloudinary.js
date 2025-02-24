// Importation de la version 2 de la bibliothèque cloudinary
import { v2 as cloudinary } from 'cloudinary';
// Importation de la bibliothèque dotenv pour gérer les variables d'environnement
import dotenv from 'dotenv';

// Chargement des variables d'environnement depuis le fichier .env
dotenv.config();

// Configuration de Cloudinary avec les informations de connexion
cloudinary.config({
    cloud_name: 'duca2mjpm', // Nom du compte Cloudinary
    api_key: '632563349422154', // Clé API pour authentification
    api_secret: 'lniPToKWEcETRbWK5zgl0Wi8C3A' // Secret API pour authentification
});

// Exportation de l'objet cloudinary configuré pour une utilisation ultérieure
export default cloudinary;
