import api from './api';
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

export default function Login() {
    // useForm gère le formulaire, ici on récupère register pour lier les inputs,
    // handleSubmit pour la soumission et errors pour afficher les erreurs de validation.
  
     const { register, handleSubmit, formState:{errors },} = useForm();
  
     const onSubmit = async (data) => {
       try {
         const response = await axios.post('http://localhost:5173/api/auth/login', data);
         localStorage.setItem('token', response.data.token);
         alert('Connexion réussie');
       } catch (error) {
         console.error('Erreur lors de la connexion',error.response ? error.response.data : error.message);
         alert("Erreur lors de la connexion, veuillez verifier vos informations !!!");
       }
     };
  
  
  
     return (
      <div>
      <h2>Connexion</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Nom</label>
            <input type="text" id="name" placeholder='nom ...'{...register('name', {
              required: "Le nom est requis.",
                message: "Le nom doit comporter au moins 3 caractères."
              
            })} />
            {errors.name && (<p style={{ color: "red" }}>{errors.name.message}</p>)}
  
          </div>
          {/**Email */}
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder='Votre email'{...register('email', {
              required: "L'email est requis."
              
              
            })} />
            {errors.name && (<p style={{ color: "red" }}>{errors.email.message}</p>)}
          </div>
  
          {/**Mot de passe */}
          <div>
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" placeholder='mot de passe ...'{...register('password', {
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
  