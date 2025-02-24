// Importer express-validator

import { body,param } from "express-validator";

// Validation pour l'endpoint POST/register.
// Validation pour la création d'un utilisateur.

export const validateRegisterUser = [
    body ("name").trim().notEmpty().isLength({min:3}).withMessage("Le nom doit avoir au minimum trois caractères.").isLength({max: 15}).withMessage("Le nom doit avoir 15 caractères maximum.").withMessage("Le nom est obligatoire."),

    body("email").trim().notEmpty().withMessage("Le email est obligatoire.").isEmail().withMessage("Veuillez entrer une adresse email valide."),

    body("password").trim().notEmpty().withMessage("Le mot de passe est obligatoire.").isLength({min:6,max :200}).withMessage("Le mot de passe doit contenir entre 6 et 200 caractères.")
];

// Validation pour l'endpoint POST/login.
// Validation pour la connexion d'un utilisateur.

export const validateDeleteUser = [
    param("id").isMongoId().withMessage("ID utilisateur manquant ou invalide."),
];

// Validation pour l'endpoint GET/users.
// Validation pour la récupération de tous les utilisateurs.

export const validateUpdateUser = [
    body ("name").trim().notEmpty().isLength({min:3}).withMessage("Le nom doit avoir au minimum trois caractères.").isLength({max: 15}).withMessage("Le nom doit avoir 15 caractères maximum.").withMessage("Le nom est obligatoire."),

    body("email").trim().notEmpty().withMessage("Le email est obligatoire.").isEmail().withMessage("Veuillez entrer une adresse email valide."),

    body("password").trim().notEmpty().withMessage("Le mot de passe est obligatoire.").isLength({min:6,max :200}).withMessage("Le mot de passe doit contenir entre 6 et 200 caractères.")
];