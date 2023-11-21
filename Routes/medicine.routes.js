import { Router } from "express";
import medicineCtrl from "../Controllers/medicines.controller.js"
const router = Router()

// Endopints busqueda
router.get("/getMedicines", medicineCtrl.getMedicinesAlls)
router.get("/getMedicineById/:id", medicineCtrl.getMedicineById)
router.get("/getMedicinesByCategory/:category", medicineCtrl.getMedicinesByCategory)

export default router;