import { RequestHandler } from "express";
import { WhatsAppService } from "src/services/whatsappService";

export class WhatsAppController {
  constructor(private readonly whatsappService: WhatsAppService) {}

  public verifyWebhook: RequestHandler = (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === process.env.WA_VERIFY_TOKEN) {
      console.log("✅ Webhook verified");
      res.status(200).send(challenge as string);
      return;
    }
    res.sendStatus(403);
    return;
  };

  /** POST /webhook – real events */
  public handleWebhook: RequestHandler = async (req, res, next) => {
    try {
      await this.whatsappService.processWebhookEvent(req.body);
      res.sendStatus(200);
      return;
    } catch (err) {
      console.log(`Warning: Error in webhook handler`);
      res.sendStatus(200);
      return;
    }
  };
  //   public async handleWebhook(req: Request, res: Response, next: NextFunction) {
  //     try {
  //       const body = req.body;
  //       console.log("Whatsapp incoming event", JSON.stringify(body));

  //       const event = this.whatsappService.extractStatusDetails(body);
  //       console.log("Whatsapp event details >>", event);

  //       if (event) {
  //         const messageId = event.id;
  //         const timestamp = event.timestamp;

  //         switch (event.status) {
  //           case "sent":
  //             await this.whatsappService.addSentEvent(messageId, timestamp);
  //             break;
  //           case "delivered":
  //             await this.whatsappService.addDeliveredEvent(messageId, timestamp);
  //             break;
  //           case "read":
  //             await this.whatsappService.addReadEvent(messageId, timestamp);
  //             break;
  //           case "failed":
  //             const failedReason = this.whatsappService.getFailedReason(body);
  //             await this.whatsappService.addFailedEvent(messageId, failedReason);
  //             break;
  //           default:
  //             if ("eventType" in event && event.eventType === "TEMPLATE_STATUS") {
  //               await this.whatsappService.updateTemplateStatus(
  //                 event.templateId,
  //                 event
  //               );
  //             }
  //         }

  //         return res.sendStatus(200);
  //       }

  //       const messageType = this.whatsappService.getMessageType(body);
  //       console.log("Whatsapp incoming message type >>", messageType);

  //       const integration = await this.whatsappService.getIntegrationRec(body);
  //       if (!integration) {
  //         throw new Error("Unable to find integration");
  //       }

  //       const { senderName, senderPhoneNumber } =
  //         this.whatsappService.getSenderDetails(body);
  //       const { botId, userId, phoneNumberId } = integration;
  //       const messageId = this.whatsappService.getMessageId(body);

  //       this.whatsappService
  //         .handleCampaignReply({
  //           userPhoneNumber: senderPhoneNumber,
  //           adminPhoneNumberId: phoneNumberId.toString(),
  //           incomingMessageId: messageId,
  //           timestamp: new Date(),
  //         })
  //         .catch((err) => console.error("Campaign error:", err.message));

  //       let userProfile = await this.whatsappService.createOrUpdateProfile({
  //         userId,
  //         adminPhoneNumberId: phoneNumberId.toString(),
  //         adminWhatsappProfileName: integration.whatsappName || "BusinessAccount",
  //         userPhoneNumber: senderPhoneNumber,
  //         userWhatsappProfileName: senderName,
  //       });

  //       if (userProfile.isBlocked) return res.sendStatus(200);

  //       if (
  //         userProfile.isEligibleForAI &&
  //         new Date() > new Date(userProfile.aiEligibilityExpiry)
  //       ) {
  //         userProfile = await this.whatsappService.updateUserProfile(
  //           userProfile._id.toString(),
  //           {
  //             isEligibleForAI: false,
  //             aiDisableReason: "AI chat time limit expired",
  //           }
  //         );
  //       }

  //       const sessionId = await this.whatsappService.getOrCreateSession(
  //         senderPhoneNumber,
  //         phoneNumberId.toString()
  //       );

  //       const chatHistory = await this.whatsappService.buildMessageHistory(
  //         phoneNumberId.toString(),
  //         senderPhoneNumber
  //       );

  //       switch (messageType) {
  //         case "button":
  //         case "interactive":
  //         case "text":
  //         case "image":
  //         case "video":
  //         case "audio":
  //           // Handle accordingly
  //           break;
  //         default:
  //           console.log("Unhandled message type");
  //       }

  //       return res.sendStatus(200);
  //     } catch (error) {
  //       console.error(error);
  //       return res.sendStatus(200); // Always respond 200 for webhook
  //     }
  //   }

  // public async handleWebhook(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const body = req.body;
  //     console.log("📩 Incoming WhatsApp webhook:", JSON.stringify(body));

  //     const event = this.whatsappService.extractStatusDetails(body);

  //     if (event) {
  //       const { id, status, timestamp } = event;

  //       switch (status) {
  //         case "sent":
  //           await this.whatsappService.addSentEvent(id, timestamp);
  //           break;
  //         case "delivered":
  //           await this.whatsappService.addDeliveredEvent(id, timestamp);
  //           break;
  //         case "read":
  //           await this.whatsappService.addReadEvent(id, timestamp);
  //           break;
  //         case "failed":
  //           const reason = this.whatsappService.getFailedReason(body);
  //           await this.whatsappService.addFailedEvent(id, reason);
  //           break;
  //         default:
  //           if (event.eventType === "TEMPLATE_STATUS") {
  //             await this.whatsappService.updateTemplateStatus(
  //               event.templateId,
  //               event
  //             );
  //           }
  //       }

  //       return res.sendStatus(200);
  //     }

  //     const messageType = this.whatsappService.getMessageType(body);
  //     const integration = await this.whatsappService.getIntegrationRec(body);
  //     if (!integration) throw new Error("Integration not found");

  //     const { senderName, senderPhoneNumber } =
  //       this.whatsappService.getSenderDetails(body);
  //     const messageId = this.whatsappService.getMessageId(body);
  //     const { userId, phoneNumberId, whatsappName } = integration;

  //     this.whatsappService
  //       .handleCampaignReply({
  //         userPhoneNumber: senderPhoneNumber,
  //         adminPhoneNumberId: phoneNumberId,
  //         incomingMessageId: messageId,
  //         timestamp: new Date(),
  //       })
  //       .catch(console.error);

  //     let userProfile = await this.whatsappService.createOrUpdateProfile({
  //       userId,
  //       adminPhoneNumberId: phoneNumberId,
  //       adminWhatsappProfileName: whatsappName,
  //       userPhoneNumber: senderPhoneNumber,
  //       userWhatsappProfileName: senderName,
  //     });

  //     if (userProfile.isBlocked) return res.sendStatus(200);

  //     if (
  //       userProfile.isEligibleForAI &&
  //       new Date() > new Date(userProfile.aiEligibilityExpiry)
  //     ) {
  //       userProfile = await this.whatsappService.updateUserProfile(
  //         userProfile._id,
  //         {
  //           isEligibleForAI: false,
  //           aiDisableReason: "AI chat time limit expired",
  //         }
  //       );
  //     }

  //     await this.whatsappService.getOrCreateSession(
  //       senderPhoneNumber,
  //       phoneNumberId
  //     );
  //     await this.whatsappService.buildMessageHistory(
  //       phoneNumberId,
  //       senderPhoneNumber
  //     );

  //     return res.sendStatus(200);
  //   } catch (error) {
  //     console.error("❌ Webhook error:", error);
  //     return res.sendStatus(200);
  //   }
  // }
}
