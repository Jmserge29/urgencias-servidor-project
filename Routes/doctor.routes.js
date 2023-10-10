import { Router } from "express";
import doctorCtrl from "../Controllers/doctor.controller.js";
const router= Router()

router.get("/getDoctors",)
// router.post("/createDoctor",)
router.post("/signInDoctor", doctorCtrl.signInDoctor)
// router.put("/UpdateDoctor/:id",)
// router.delete("/DeleteDoctor/:id",)
export default router;