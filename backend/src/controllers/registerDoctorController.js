//Importamos el modelo de la base de datos
import DoctorModel from "../models/doctors.js"
import bcryptjs from "bcryptjs"; 
import jsonwebtoken from "jsonwebtoken" 
import {config} from "../config.js" 

//creamos un array de funciones
const registerDoctorController = {}

registerDoctorController.register = async (req, res) => {

    //Pedimos todos los datos
    const { name, specialty, email, password } = req.body;

    try{
    //Verificamos si ya existe
        const doesDoctorExist = await DoctorModel.findOne({email}); 

        if (doesDOctorExist) {

            return res.json({message : "Doctor already exists"})
        }

        const passwordHash = await bcryptjs.hash(password, 10); 

        //Guardar  en la base de datos
 const newDoctor = new DoctorModel({name,
    specialty, 
    email,
    password: passwordHash, 
 });
 await newDoctor.save();
  

    jsonwebtoken.sign(
            {id: newDoctor._id},
 config.JWT.secret,

 { expiresIn: 
    config.JWT.expiresIN},
(error, token) => {
    if(error) console.log(error);
    res.cookie("authToken", token);
    res.json ({message: "Doctor registrado"})

}

    )
    }
    

catch (error) {
console.log(error);
res.json ({message: "Error al registrar al Doctor"})

}


}

export default registerDoctorController