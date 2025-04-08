//Array de metodos (C R U D)
const doctorsController = {};
import doctorsModel from "../models/doctors.js";

// SELECT
doctorsController.getDoctors = async (req, res) => {
  const doctors = await doctorsModel.find();
  res.json(doctors);
};

// INSERT
doctorsController.createDoctors = async (req, res) => {
  const { name, specialty, email, password } = req.body;
  const newDoctor = new doctorsModel({ name, specialty, email, password});
  await newDoctor.save();
  res.json({ message: "Doctor saved" });
};

// DELETE
doctorsController.deleteDoctors = async (req, res) => {
const deletedDoctors = await doctorsModel.findByIdAndDelete(req.params.id);
  if (!deletedDoctors) {
    return res.status(404).json({ message: "doctor wasn´t found" });
  }
  res.json({ message: "Doctor deleted" });
};

// UPDATE
doctorsController.updateDoctors = async (req, res) => {
  // Solicito todos los valores
  const { name, specialty, email, password  } = req.body;
  // Actualizo
  await DoctorsModel.findByIdAndUpdate(
    req.params.id,
    {
        name, 
        specialty,
         email, 
         password
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "Doctor updated" });
};

export default doctorsController;