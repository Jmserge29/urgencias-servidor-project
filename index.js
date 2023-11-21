import dotenv from 'dotenv'
import express from 'express'
import cors from "cors";
import moment from "moment";
import './db.js'
import { createRoles, createUsers, createListMedicines } from './Libs/InitialSetups.js';
import routerUser from './Routes/user.routes.js'
import routerEmergency from './Routes/emergency.routes.js'
import routerMedicine from './Routes/medicine.routes.js'

dotenv.config()
const app = express()
var time = moment().format('MMMM Do YYYY, h:mm:ss a');

//App uses
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "https://urgencias-clinica-project.vercel.app", credentials: true}))
app.use("/User", routerUser)
app.use("/Emergency", routerEmergency)
app.use("/Medicine", routerMedicine)


createRoles();
createUsers();
createListMedicines();

app.listen(process.env.PORT || 8089, async()=> {
    console.log(`The server is running in the Port ${process.env.PORT}, Hellow Dev ${time}`)
})

app.use("/", (req, res)=>{
    res.send(`Hey Dev!, the server is running ${time}`)
})