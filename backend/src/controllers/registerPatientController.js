import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcryptjs"; 
import nodemailer from "nodemailer"; 
import crypto from "crypto"; 
import patientsModel from "../models/patients.js"
import { config } from "../config.js"; 

//Creamos un array de funciones
const registerPatientController = {};

registerPatientController.register = async (req,res) => {

    //1- Solicitas las cosas que vamos a guardar
    const { name, age, email, password, phoneNumber, isVerified } = req.body;

    try {
        //Verificamos si el cliente ya existe
        const doesClientExist = await patientsModel.findOne({email}); //Se busca el empleado por el email

        if (doesClientExist) {

            return res.json({message : "Patient already exists"})
        
    }


    const passwordHash = await bcrypt.hash(password, 10);

    //Guardo al cliente en la base de datos
    const newPatient = new patientsModel({name, 
        age, 
        email, 
        password, 
        phoneNumber, 
        isVerified: isVerified || false, 
    
    });
    await newPatient.save();

    //Generamos un código aleatorio
    const verificationCode = crypto.randomBytes(3).toString("hex") 

    //Creamos el token, el cual va a validar si ya se inició sesión
    const tokenCode = jsonwebtoken.sign(
{email, verificationCode},
config.JWT.secret,
{expiresIn: "2H"}
    )
res.cookie("VerificationToken", tokenCode, {maxAge: 2*60*60*1000}) 


const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
        user: config.userEmail.email_user,
        pass: config.userEmail.password_user
    }
});

//¿Quién lo recibe?
const mailOptions = {

    from: config.userEmail.email_user,
    to: email,
    subject: "Verificación de correo",
    text:`Para verificar el correo utiliza el siguiente código :   ${verificationCode}
     \n el código vencerá en 2 horas`
}

//3 -Enviar el correo
transporter.sendMail(mailOptions, (error,info) => {
    if(error) return res.json({message: "Error"})
        console.log("Correo enviado" + info.response)
})

res.json({message: "Patient registered, please verify your email with the code sent"})
} 
catch (error) {
        res.json ({message: "Eror" + error})
    }
};

//Verificar el código
registerPatientController.verifyCodeEmail = async (req, res) => {

const {verificationCode} = req.body;

//Obtengo el token que contiene el código de verificación
const token =req.cookies.VerificationToken;

try {
//Verificar y decodificar el token
const decoded = jsonwebtoken.verify(token, config.JWT.secret)
const {email, verificationCode: storedCode} = decoded

//Comparar el código que se mando en el correo con el que el usuario escribe
if(verificationCode !== storedCode){
    return res.json ({message: "Invalid code"})

}

//Cambiamos el estado de "isVerified" a true
const   Patient = await patientsModel.findOne({email});
Patient.isVerified = true;
    await Patient.save()
    res.json({message: "Email verified"});

    //Se quita la cookie con el token
    res.clearCookie("VerificationToken");

}
catch(error) {
res.json ({message: "error"})
}


}

export default registerPatientController