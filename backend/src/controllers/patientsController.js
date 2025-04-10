//Array de metodos 
const patientsController = {};
import patientsModel from "../models/patients.js";

// SELECT
patientsController.getPatients= async (req, res) => {
  const pacients = await patientsModel.find();
  res.json(pacients);
};

// INSERT
patientsController.createPatients = async (req, res) => {
  const { name, age, email, password, phoneNumber, isVerified } = req.body;
  const newPatients = new patientsModel({ name, age, email, password, phoneNumber, isVerified });
  await newPatients.save();
  res.json({ message: "patient saved" });
};

// DELETE
patientsController.deletePatients = async (req, res) => {
const deletedpatient = await patientsModel.findByIdAndDelete(req.params.id);
  if (!deletedpatient) {
    return res.status(404).json({ message: "patient wasn´t found" });
  }
  res.json({ message: "patient deleted" });
};

// UPDATE
patientsController.updatePatients = async (req, res) => {
  // Solicito todos los valores
  const { name, age, email, password, phoneNumber, isVerified  } = req.body;
  // Actualizo
  await patientsModel.findByIdAndUpdate(
    req.params.id,
    {
      name, age, email, password, phoneNumber, isVerified
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "patient updated" });
};

export default patientsController;