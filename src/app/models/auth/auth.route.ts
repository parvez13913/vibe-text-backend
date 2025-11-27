import express from "express";
import { arcjetProtect } from "../../../authMiddleware/arcjet.middleware";
import { AuthController } from "./auth.controller";

const router = express.Router();

router.use(arcjetProtect);

router.post("/signUp", AuthController.signUp);
router.post("/signIn", AuthController.signIn);
router.post("/signOut", AuthController.signOut);

export const AuthRoutes = router;
