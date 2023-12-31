import { Router } from "express";
import EmergencyCtrl from '../Controllers/emergency.controller.js'
const router= Router()

router.get("/getEmergencies", EmergencyCtrl.getAllEmergencies)
router.get("/getEmergencyById/:id", EmergencyCtrl.getEmergencyById)
router.get("/getAllUnattendedEmergencies", EmergencyCtrl.getAllUnattendedEmergencies)
router.post("/createEmergency", EmergencyCtrl.createEmergency)
router.put("/updateEmergencyClasification/:id", EmergencyCtrl.assignDoctorToEmergency)
// router.put("/UpdateEmergency/:id",)
// router.delete("/DeleteEmergency/:id",)
export default router;