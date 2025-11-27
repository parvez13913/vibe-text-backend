import arcjet, { detectBot, shield, slidingWindow } from "@arcjet/node";
import config from "../../config";

export const aj = arcjet({
  key: config.arc_jet_key as string,
  rules: [
    shield({ mode: "LIVE" }),

    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    slidingWindow({
      mode: "LIVE",
      max: 100,
      interval: 60,
    }),
  ],
});
