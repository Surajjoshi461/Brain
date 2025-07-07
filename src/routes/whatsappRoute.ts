import express from "express";
import { WhatsAppController } from "src/controllers/whatsappController";
import { WhatsAppRepository } from "src/repositories/whatsappRepository";
import { WhatsAppService } from "src/services/whatsappService";

const whatsappRouter = express.Router();

const whatsappRepository = new WhatsAppRepository();
const whatsappService = new WhatsAppService(whatsappRepository);
const whatsappController = new WhatsAppController(whatsappService);

whatsappRouter.get("/webhook", whatsappController.verifyWebhook);
whatsappRouter.post("/webhook", whatsappController.handleWebhook);

export const router = whatsappRouter;
export const basePath = "/api/v1/whatsapp";
