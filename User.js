import mongoose from'mongoose';
import bcrypt from'bcrypt';

// Création du schéma de données pour les utilisateurs

const UserSchema = new mongoose.Schema ({
    name:{
        type : String,
        required : true,
        unique: true,
    },
    email:{
        type : String,
        required : true,
        unique : true,
    },
    password:{
        type : String,
        required : true,
    },
    role:{
        type:String,
        enum:["user","admin"],default:"user"
    },

},

// Ajout de la fonctionnalité de timestamp pour enregistrer la date de création et de modification des données
{
    timestamps : true

});

//  Exportation du modèle de données pour les utilisateurs

UserSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


export default mongoose.model("User", UserSchema);