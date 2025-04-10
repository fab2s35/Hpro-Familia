import express from "express";
import doctorRoute from "./src/routes/doctors.js";
import pacientRoute from "./src/routes/patient.js";
import appointmentRoute from "./src/routes/appointment.js"
import registerPatient from "./src/routes/registerPatient.js"
import registerDoctor from "./src/routes/registerDoctor.js"

// Creo una constante que es igual a la libreria que importé
const app = express();

//Que acepte datos en json
app.use(express.json());


app.use("/api/doctors", doctorRoute);
app.use("/api/pacients", pacientRoute);
app.use("/api/Appointment", appointmentRoute);
app.use("/api/registerPatient", registerPatient);
app.use("/api/registerDoctor", registerDoctor);

export default app;