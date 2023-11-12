import { Router } from "express";
import userCtrl from "../Controllers/user.controller.js";
const router= Router()

// Endpoints para busqueda
router.get("/getUsers",userCtrl.getAllUsers)
router.get("/getUsersDoctors", )
router.get("/getUsersPatients",)
router.get("/getUserById/:id", userCtrl.getUserById)

// EndPoints Auth
router.post("/sign-in", userCtrl.signIn)
router.post("/sign-up", userCtrl.createUser)

// EndPoints Changes Status
router.put("/updateById/:id",)
router.delete("/deleteById/:id",userCtrl.deleteUserById)



export default router;
