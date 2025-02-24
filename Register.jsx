import api from "../api";
import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const fetchData = async () => {
try {
const response = await api.get("/data");
console.log("Données reçues:", response.data);
} catch (error) {
console.error("Erreur:", error.response?.data || error.message);
}
};
fetchData();

export default function Register() {
    //initialisation de useForm pour la validation des champs d'inscription
  
    const { register, handleSubmit, formState: { errors } ,} = useForm();
  
    // créer une fonction qui est appelée lors de la soumission du formulaire
    const onSubmit = async (data) => {
      try {
        // Envoi des requêtes POSTpour créer un nouvel utilisateur
        const response = await axios.post('http://localhost:5000/api/auth/register', data); alert('Utilisateur créé avec succès');
      }
      catch (error) {
        console.error("Erreur de l'inscription", error.response ? error.response.data : error.message);
      }
  
    };
    return (
      <div>
        <h2>Inscription</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Nom :</label>
            <input type="text" id="name" placeholder='Votre nom '{...register('name', {
              required: "Le nom est requis.", minLength: {
                value: 3,
                message: "Le nom doit comporter au moins 3 caractères."
              },
            })} />
            {errors.name && (<p style={{ color: "red" }}>{errors.name.message}</p>)}
  
          </div>
          {/**Email */}
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder='email@email.com'{...register('email', {
              required: "L'email est requis."
              
              
            })} />
            {errors.name && (<p style={{ color: "red" }}>{errors.email.message}</p>)}
          </div>
  
          {/**Mot de passe */}
          <div>
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" placeholder='Votre mot de passe '{...register('password', {
              required: "Le mot de passe est obligatoire.", minLength: {
                value: 6,
                message: "Le mot de passe doit comporter au moins 6 caractères."
              },
            })} />
            {errors.password && (<p style={{ color: "red" }}>{errors.password.message}</p>)}
  
  
  
  
          </div>
          <button type="submit">S'inscrire</button>
  
        </form>
  
      </div>
    );
  }