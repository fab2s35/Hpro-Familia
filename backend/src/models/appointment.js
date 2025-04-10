/* 
Campos:
    fecha 
    hora
    motivo
    doctor
    asignado
    paciente asignado
*/ 


import { Schema, model } from "mongoose";

const appointmentSchema = new Schema (
    {
    date:{
        type:String,
        require: true, 
    },
    hour: {
        type:String,
        require: true,
       
    },
    motive:{
        type:String,
        require:true,
        maxLenght:250
    },
    idDoctor:{
        type: Schema.Types.ObjectId,
        ref: "Doctor",
        require:true
    },
    idPatient:{
        type: Schema.Types.ObjectId,
        ref: "Patient",
        require:true
    }

},
{
    timestamps:true,
    strict:false
})

export default model ("Appointment", appointmentSchema);
