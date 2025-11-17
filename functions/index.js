// functions/index.js
import { https } from "firebase-functions";
import logger from "firebase-functions/logger";
import app from "./server.js"; // твоя server.js

// (по желание) глобални настройки
logger.info("Initializing Firebase Functions...");

// Wrap Express app като Firebase Function, set maxInstances (по избор)
// export const backend = functions.runWith({ maxInstances: 10 }).https.onRequest(app);

//функция без ограничения
export const backend = https.onRequest(app);