import { isSpoofedBot } from "@arcjet/inspect";
import { NextFunction, Request, Response } from "express";
import { aj } from "../app/lib/arcjet";

export async function arcjetProtect(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ error: "Too Many Requests" });
      }
      if (decision.reason.isBot()) {
        return res.status(403).json({ error: "No bots allowed" });
      }
      return res.status(403).json({ error: "Forbidden" });
    }

    if (decision.ip.isHosting()) {
      return res.status(403).json({ error: "Hosting IP blocked" });
    }

    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({ error: "Spoofed bot detected" });
    }
    next();
  } catch (err) {
    console.error("Arcjet error:", err);
    res.status(500).json({ error: "Internal Server Error" });
    next();
  }
}
