import express from "express";
import { arcjetProtect } from "../../../authMiddleware/arcjet.middleware";
import { protectedRoute } from "../../../authMiddleware/auth.middleware";
import { MessageController } from "./message.controller";

const router = express.Router();

router.use(arcjetProtect, protectedRoute);

router.get("/contacts", MessageController.getAllContacts);
router.get("/chats", MessageController.getAllChats);
router.get("/:id", MessageController.getMessageByUserId);
router.post("/send/:id", MessageController.sendMessage);

export const MessageRouter = router;
