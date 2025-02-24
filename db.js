// Importation de la bibliothèque mongoose pour gérer les connexions MongoDB
import mongoose from 'mongoose';
// Importation de la bibliothèque dotenv pour gérer les variables d'environnement
import dotenv from 'dotenv';
// Chargement des variables d'environnement depuis le fichier .env
dotenv.config();

// Fonction asynchrone pour se connecter à la base de données MongoDB
const connectDB = async () => {
    try {
        // Connexion à la base de données avec l'URI de MongoDB stocké dans les variables d'environnement
        await mongoose.connect(process.env.MONGO_URI);
        console.log('base de données connectée'); // Message de succès en cas de connexion réussie
        
    } catch (error) {
        // Affiche une erreur en cas d'échec de la connexion
        console.error('Erreur lors de la connection à la DB', error);
        process.exit(1); // Quitte le processus avec un statut d'échec
    }
};

// Exportation de la fonction connectDB pour une utilisation ultérieure
export default connectDB;
