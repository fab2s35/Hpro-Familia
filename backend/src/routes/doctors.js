import express from "express";
import doctorsController from "../controllers/doctorsController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(doctorsController.getDoctors)
  .post(doctorsController.createDoctors);

router
  .route("/:id")
  .put(doctorsController.updateDoctors)
  .delete(doctorsController.deleteDoctors);

export default router;