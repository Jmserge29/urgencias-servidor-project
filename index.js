import dotenv from 'dotenv'
import express from 'express'
import cors from "cors";
import moment from "moment";
import './db.js'
import { createDoctors, createAssitance } from './Libs/InitialSetups.js';
import routerPatient from './Routes/patient.routes.js'
import routerDoctor from './Routes/doctor.routes.js'
import routerEmergency from './Routes/emergency.routes.js'
import routerAssistance from './Routes/assistent.routes.js'


dotenv.config()

const app = express()
var time = moment().format('MMMM Do YYYY, h:mm:ss a');

//App uses
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", credentials: true}))
app.use("/Patient", routerPatient)
app.use("/Doctor", routerDoctor)
app.use("/Emergency", routerEmergency)
app.use("/Assistance", routerAssistance)

createDoctors();
createAssitance();

app.listen(process.env.PORT || 8089, async()=> {
    console.log(`The server is running in the Port ${process.env.PORT}, Hellow Dev ${time}`)
})

app.use("/", (req, res)=>{
    res.send(`Hey Dev!, the server is running ${time}`)
})