//Array de metodos 
const pacientsController = {};
import pacientsModel from "../models/pacients.js";

// SELECT
pacientsController.getPacients = async (req, res) => {
  const pacients = await pacientsModel.find();
  res.json(pacients);
};

// INSERT
pacientsController.createPacients = async (req, res) => {
  const { name, age, email, password, phoneNumber, isVerified } = req.body;
  const newPacients = new customersModel({ name, age, email, password, phoneNumber, isVerified });
  await newPacients.save();
  res.json({ message: "Pacient saved" });
};

// DELETE
pacientsController.deletePacients = async (req, res) => {
const deletedPacients = await pacientsModel.findByIdAndDelete(req.params.id);
  if (!deletedPacients) {
    return res.status(404).json({ message: "Pacient wasn´t found" });
  }
  res.json({ message: "Pacient deleted" });
};

// UPDATE
pacientsController.updatePacients = async (req, res) => {
  // Solicito todos los valores
  const { name, age, email, password, phoneNumber, isVerified  } = req.body;
  // Actualizo
  await pacientsModel.findByIdAndUpdate(
    req.params.id,
    {
      name, age, email, password, phoneNumber, isVerified
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "Pacient updated" });
};

export default pacientsController;