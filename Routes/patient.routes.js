import { Router } from "express";
import patientCtrl from '../Controllers/patient.controller.js'
const router = Router()

router.get("/getAllPatients", patientCtrl.getAllPatients)
router.get("/getPatientById/:id", patientCtrl.getPatientById)
router.post("/createPatient", patientCtrl.createPatient)
router.put("/UpdatePatient/:id", patientCtrl.editPatientById)
router.delete("/DeletePatient/:id", patientCtrl.deletePatientById)

export default router;
