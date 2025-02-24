//importation des dépendances

import Skill from '../models/Skill.js';
import dotenv from 'dotenv';
dotenv.config();


// Fonction pour afficher les utilisateurs

export const registerSkill = async (req,res) =>{

    // déstructurer les données du corps de la requete
   const {title,category,level} = req.body;

   //Créer une nouvelle compétence
    if (!title || !category || !level ) {
        return next ({statusCode: 400, message : 'Tous les champs doivent être remplis'});
        
    }
    try{
        // creer une nouvelle compétence
        const skill = await Skill.create({title,category,level});

        // Renvoyer un message de confirmation

        res.status(201).json ({message : 'La compétence a bien été créé.', skill});

    }catch (error) {
        next (error);
        
    }
};


// mise à jour des données compétences.

export const updateSkill = async (req,res,next) => {
    const{id} = req.params;
    const newTitle = req.body.title;
    const newCategory = req.body.category;
    
    try {
        const updateSkill = await Skill.findByIdAndUpdate(id,{title:newTitle,category: newCategory},{new:true});

        if(!updateSkill){
        return res.status(400).json({message:'Compétence non trouvée'});
    }
    
    res.status(202).json(updateSkill);
    }catch(error) {
        next(error);
    }
};

// Suppression des données compétence.

export const deleteSkill = async(req,res,next) => {
    try{
        await Skill.findByIdAndDelete(req.params.id);

        res.status(204).json({message:'Compétence supprimée avec succès.'})
    }catch (error) 
    {
        next(error);
    }
};
