// Importation des modules

import express from 'express';

// Importation des controllers

import {registerSettings,updateSettings,deleteSettings,getAllSettings, } from'../controllers/settingsControllers.js';

const router = express.Router();

// Création des routes

router.post('/register',registerSettings);
router.get('/all',getAllSettings);
router.put('/:id',updateSettings);
router.delete('/:id',deleteSettings);

export default router;