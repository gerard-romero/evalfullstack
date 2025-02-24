// Importation des modules

import express from'express';

// Importation des controllers

import {registerSkill,updateSkill,deleteSkill } from'../controllers/skillControllers.js';

const router = express.Router();

// Création des routes

router.post('/register',registerSkill);
router.put('/:id',updateSkill);
router.delete('/:id',deleteSkill);

export default router;