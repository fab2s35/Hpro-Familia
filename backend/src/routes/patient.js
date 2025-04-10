import express from "express";
import pacientsController from "../controllers/patientsController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(pacientsController.getPatients)
  .post(pacientsController.createPatients);

router
  .route("/:id")
  .put(pacientsController.updatePatients)
  .delete(pacientsController.deletePatients);

export default router;