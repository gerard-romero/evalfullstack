// Importer le modele paramètre

import Settings from'../models/Settings.js';
import dotenv from 'dotenv';
dotenv.config();

// Fonction pour afficher les paramètres

export const registerSettings = async (req,res, next) =>{

    // déstructurer les données du corps de la requete
   const {preference,cookies} = req.body;

   //Créer un nouveau paramètre
    if (!preference || !cookies ) {
        return next({
            statusCode: 400,
            message: "Tous les champs sont obligatoires."
        });
        
    }
    try{
        // créer un nouveau paramètre
        const setting = await Settings.create({preference,cookies});

        // Renvoyer un message de confirmation

        res.status(201).json ({message : 'Le paramètre a bien été créé.', setting});



    }catch(error){
        next(error);
       
        
    }
};

// selectionner tous les paramètres

export const getAllSettings = async (req,res,next) =>{
    try{
        const allSetting = await Settings.find(); 
        
        res.status(200).json({message:`recupération de tous les paramètres`, allSetting});
    }catch (error){
        next(error);

    }

};

// mise à jour des données paramètres.

export const updateSettings = async(req,res,next) => {
    const{id} = req.params;
    const newPreference = req.body.preference;
    const newCookies = req.body.cookies;

try{
    const updateSettings = await Settings.findByIdAndUpdate(id,{preference:newPreference,cookies:newCookies},{new:true});

    if(!updateSettings){
        return res.status(400).json({message :'Paramètre non trouvé.'});
    }
    res.status(202).json(updateSettings);
}catch(error){
    next(error);
}};

//suppression des données paramètres.

export const deleteSettings = async (req,res,next) => {
    try{
        await Settings.findByIdAndDelete(req.params.id);
        res.status(204).json ({message:'Paramètre supprimé avec succès.'})
    }catch(error){
        next(error);
    }
};

//selectionner un paramètre

export const getOneSettings = async (req,res,next) => {
    try{
        const setting = await Settings.findById(req.params.id);
        if(!setting){
            return res.status(404).json({message:'Paramètre non trouvé.'});
        }
        res.status(200).json(setting);
    }catch(error){
        next(error);
    }
};