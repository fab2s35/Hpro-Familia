import express from "express";
import doctorRoute from "./src/routes/doctors.js";
import pacientRoute from "./src/routes/pacient.js"

// Creo una constante que es igual a la libreria que importé
const app = express();

//Que acepte datos en json
app.use(express.json());


app.use("/api/doctors", doctorRoute);
app.use("/api/pacients", pacientRoute);

export default app;