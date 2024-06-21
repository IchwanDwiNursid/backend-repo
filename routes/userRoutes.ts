import express from "express";
import { ControllerUser } from "../controller/api";
import { AuthMiddleware } from "../middleware/authMiddleware";

export const router = express.Router();

router.post("/register", ControllerUser.REGISTER);
router.post("/login", ControllerUser.LOGIN);
router.get("/fetch-user-data", AuthMiddleware, ControllerUser.GET);
router.get("/fetch-user-data/:id", AuthMiddleware, ControllerUser.GETBYID);
router.patch("/update-user-data", AuthMiddleware, ControllerUser.UPDATE);
router.delete("/logout", AuthMiddleware, ControllerUser.LOGOUT);
