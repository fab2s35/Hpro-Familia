import patientsModel from "../models/patients.js";
import doctorsModel from "../models/doctors.js";
import bcrypt from "bcryptjs";
import jswonwebtoken from "jsonwebtoken";
import {config} from "../config.js";

const loginController = {};

loginController.login = async (req,res) => {

    const {email,password} = req.body;

    try {

        //Validamos los 3 posibles niveles

        //1 admin, 2, Empleado, 3, Cliente
     let userFound; 
     let userType; 

     //1-Admin
     
     if(email === config.emailAdmin.email && password === config.emailAdmin.password) {

        userType = "Admin"
        userFound   ={_id:"Admin"}
     }else {

             //2- Empleado

        userFound = await doctorsModel.findOne({email})
        userType = "Doctor";

             //3- Cliente

        if (!userFound){

            userFound = await patientsModel.findOne({email})
            userType ="Patient";

        }
     }

     if(!userFound){
        return res.json ({message: "User not found"})
     }

     if(userType !== "Admin") {
        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
            return res.json ({message: "invalid Password"})

        }
     }

     //Generar el token
     jswonwebtoken.sign(

        //1- Que se va a guardar
        {id: userFound._id, userType},
        //2 Clave secreta
        config.JWT.secret,
        //3-cuando expira
        {expiresIn: config.JWT.expiresIN},
        //4- Función flecha
        (error, token )=> {
        if (error) console.log(error)
            res.cookie("authToken", token)
            res.json({message: "login successful"})
        }
     )

    } catch(error) {

        console.log(error)
    }
}

export default loginController