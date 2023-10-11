import { Router } from "express";
import assistanceCtrl from "../Controllers/assistance.controller.js";
const router= Router()

router.get("/getAssistents",)
router.post("/createAssistent",)
router.put("/UpdateAssistent/:id",)
router.delete("/DeleteAssistent/:id",)
router.post("/signInAssistance/", assistanceCtrl.signInAssistance)
export default router;
