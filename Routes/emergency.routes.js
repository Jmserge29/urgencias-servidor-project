import { Router } from "express";
import EmergencyCtrl from '../Controllers/emergency.controller.js'
const router= Router()

router.get("/getEmergencies",)
router.post("/createEmergency", EmergencyCtrl.createEmergency)
router.put("/UpdateEmergency/:id",)
router.delete("/DeleteEmergency/:id",)
export default router;