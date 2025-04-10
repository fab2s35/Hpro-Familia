const appointmentController = {}
import appointmentModel from "../models/Appointment.js";

//Select
appointmentController.getAppointment = async (req,res) => {

    const Appointment =  await appointmentModel.find().populate("idDoctor").populate("idPatient");
    res.json(Appointment)
   
}

appointmentController.insertAppointment = async (req,res) => {

    const {date, hour, motive, idDoctor, idPatient} = req.body;
    const newAppointment = new appointmentModel({date, hour, motive, idDoctor, idPatient})
    await newAppointment.save();
    res.json ({message: "Appointment saved"});
}

appointmentController.updateAppointment = async (req,res) => {
    const {date, hour, motive, idDoctor, idPatient} = req.body;
     const updatedAppointment = await appointmentModel.findByIdAndUpdate(req.params.id,{date, hour, motive, idDoctor, idPatient},{new:true})
     res.json ({message: "Appointment updated"});

}

appointmentController.deleteAppointment= async (req,res) => {

    await appointmentModel.findByIdAndDelete(req.params.id);
    res.json ({message: "Appointment deleted"});

}

export default appointmentController;