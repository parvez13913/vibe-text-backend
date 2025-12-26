import express from "express";
import { protectedRoute } from "../../../authMiddleware/auth.middleware";
import { upload } from "../../lib/multer";
import { AuthController } from "./auth.controller";

const router = express.Router();

// router.use(arcjetProtect);

router.post("/signUp", AuthController.signUp);
router.post("/signIn", AuthController.signIn);
router.post("/signOut", AuthController.signOut);
router.patch(
  "/update-profile",
  protectedRoute,
  upload.single("profilePic"),
  AuthController.updateProfile
);

export const AuthRoutes = router;
