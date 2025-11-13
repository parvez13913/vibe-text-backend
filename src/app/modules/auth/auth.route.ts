import express from "express";
import { AuthController } from "./auth.controller";

const router = express.Router();

router.post("/signUp", AuthController.signUp);
router.post("/signIn", AuthController.signIn);
router.post("/signOut", AuthController.signOut);

export const AuthRoutes = router;
