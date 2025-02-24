import mongoose from'mongoose';

//  Création du schéma de données pour les compétences

const SkillSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        category: { type: String, required: true },
        level: { type: String, required: true },
        image: {public_id: String, // ID public généré par Cloudinary pour l'image.
                url: String,}, // URL sécurisée de l'image hébergée sur Cloudinary. 

        },
    // Ajout de la fonctionnalité de timestamp pour enregistrer la date de création et de modification des

   { timestamps : true }
);

//  Exportation du modèle de données pour les compétences
export default mongoose.model("Skill", SkillSchema);
   