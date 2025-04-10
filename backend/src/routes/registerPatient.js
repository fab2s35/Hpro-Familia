import express from "express";
import registerPatientController from "../controllers/registerPatientController.js";

const router = express.Router();

router.route("/").post(registerPatientController.register);
router.route("/verifyCodeEmail").post(registerPatientController.verifyCodeEmail);

export default router; 