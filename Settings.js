import mongoose from'mongoose';

// Création du schéma de données pour les paramètres de l'application

const SettingsSchema = new mongoose.Schema ({
    preference:{
        type : String,
        required : true,
    },
    cookies:{
        type : String,
        required : true,
    },
},

// Ajout de la fonctionnalité de timestamp pour enregistrer la date de création et de modification des données
{
    timestamps : true

});

//  Exportation du modèle de données pour les paramètres de l'application

export default mongoose.model("Settings", SettingsSchema);