import User from'../models/User.js';
import JWT from'jsonwebtoken';// On importe la bibliothèque `jsonwebtoken` pour travailler avec les JWT.
const JWT_SECRET = process.env.JWT_SECRET;

// const token = localStorage.getItem('token');
// const response = await api.get('/protected-route', {
//     headers:{Authorization: `Bearer ${token}`}
// });

// Fonction pour protéger les routes

export const protect = async (req,res,next) => {
    try{
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json ({message:'Token manquant'});
        }
        const decoded = JWT.verify(token,JWT_SECRET);
        req.user = await User.findById(decoded._id);
        next();
    }catch(error){
        res.status (500).json({message:'Erreur lors de la verif du token',error});

    }
};

// Fonction pour vérifier si l'utilisateur est admin

export const adminCheck = async(req,res, next) => {
    try{
        if(req.user.role === "admin"){
            next();

        }else{
            return res.status(401).json ({message:'Unauthorized not admin'});
        }

    }catch(error){
        res.status(500).json({message:`Erreur d'authentification admin`});
    }
}
// Exporter le middleware
export default {protect,adminCheck};
   
