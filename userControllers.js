// Importer le modele utilisateur

import User from'../models/User.js';
import bcrypt from'bcrypt';
import JWT from'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Fonction pour afficher les utilisateurs

export const registerUser = async (req,res, next) =>{

    // déstructurer les données du corps de la requete
   const {name,email,password,role} = req.body;

   //Créer un nouvel utilisateur
    if (!name || !email || !password || !role) {
        return next({
            statusCode: 400,
            message: "Tous les champs sont obligatoires."
        });
        
    }
    try{
        // creer un nouvel utilisateur
        const user = await User.create({name,email,password,role});

        // Renvoyer un message de confirmation

        res.status(201).json ({message : `L'utilisateur a bien été créé.`, user});

    }catch(error){
        next(error);   
    }
};

// selectionner tous les utilisateurs

export const getAllUser = async (req,res,next) =>{
    try{
        const allUser = await User.find().select('-password'); // select allUser sans le mot de passe
        
        res.status(200).json({message:`recupération de tous les utilisateurs`, allUser});
    }catch (error){
        next(error);
    }

};

//  mise à jour des données utilisateurs.

export const updateUser = async(req,res,next) => {
    const{id} = req.params;
    const newName = req.body.name;
    const newPassword = req.body.password;

try{
    const updateUser = await User.findByIdAndUpdate(id,{name:newName,password:newPassword},{new:true});

    if(!updateUser){
        return res.status(400).json({message :`Utilisateur non trouvé.`});
    }
    res.status(202).json(updateUser);
}catch(error){
    next(error);
}};

//suppression des données utilisateurs.

export const deleteUser = async (req,res,next) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(204).json ({message:'User deleted successfull'})
    }catch(error){
        next(error);
    }
};

// Fonction pour se connecter

const generateToken = (_id) =>{
    const token = JWT.sign({_id},JWT_SECRET,{expiresIn:"3d"});
    return token;
}
// Fonction pour se connecter
export const login = async(req,res) => {
    try{
        const {email, password} = req.body;
        const userLogin = await User.findOne({email});
        if(!userLogin){
            return res.status(401).json ({message:'Utilisateur n\'exite pas.'});
        }
        const isMatch = await bcrypt.compare(password, userLogin.password);
        if(!isMatch){

            return  res.status (401).json({message :'Email ou mot de passe incorrect'});
        }

        const token = generateToken(userLogin._id);
        res.cookie('jwt',token,{
            httpOnly: true,
            secure:true,
        });

        res.status(201).json({userLogin, token});

    }catch(error){
        next(error);
    }
};
