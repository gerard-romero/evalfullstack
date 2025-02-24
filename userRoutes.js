// Importer les modules nécessaires

import express from'express';

import {protect,adminCheck} from'../middleware/authMiddleware.js';

// Importer les controllers

import {registerUser, getAllUser, updateUser, deleteUser, login } from'../controllers/userControllers.js';

import{validateRequest} from"../middleware/validateRequest.js";

import {validateRegisterUser,validateUpdateUser,validateDeleteUser} from '../validations/authValidation.js';

const router = express.Router();

// Créer des routes

router.post('/register',validateRegisterUser,validateRequest,registerUser);
router.get('/',protect,adminCheck,getAllUser);
router.put('/:id',protect,validateUpdateUser,validateRequest,updateUser);
router.delete('/:id',protect,validateDeleteUser,validateRequest,deleteUser);
router.post('/login',login);

export default router;
