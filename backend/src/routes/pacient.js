import express from "express";
import pacientsController from "../controllers/pacientsController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(pacientsController.getPacients)
  .post(pacientsController.createPacients);

router
  .route("/:id")
  .put(pacientsController.updatePacients)
  .delete(pacientsController.deletePacients);

export default router;