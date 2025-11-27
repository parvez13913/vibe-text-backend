import express from "express";
import { AuthRoutes } from "../models/auth/auth.route";
import { MessageRouter } from "../models/message/message.router";

const router = express.Router();
const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/message",
    route: MessageRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
