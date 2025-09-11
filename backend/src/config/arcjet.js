import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/node";
import { ENV } from "./env.js";

const rules = [
  shield({ mode: "LIVE" }),
  tokenBucket({
    mode: "LIVE",
    refillRate: 10,
    interval: 10,
    capacity: 15,
  }),
];

// Only enable bot detection in production
if (ENV.NODE_ENV === "production") {
  rules.push(
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    })
  );
}

export const aj = arcjet({
  key: ENV.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules,
});
