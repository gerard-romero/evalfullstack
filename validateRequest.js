// importer le module express-validator

import { validationResult } from "express-validator";

export const validateRequest = (req,res,next) => {
    // Valider des données de la requête.

    const errors = validationResult (req);

    // si les données sont invalides, renvoyer une erreur.

    if(!errors.isEmpty()) {
        return res.status(400).json ({errors: errors.array()});
    }
    next();
};