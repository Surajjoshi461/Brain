import get from "lodash/get";

import { WhatsAppRepository } from "src/repositories/whatsappRepository";

export class WhatsAppService {
  constructor(private readonly whatsappRepository: WhatsAppRepository) {}

  public async verifyToken(token: string): Promise<boolean> {
    // Placeholder logic, can be replaced with DB query
    const integration = await this.whatsappRepository.getIntegrationByToken(
      token
    );
    return !!integration;
  }

  public async processWebhookEvent(body: any): Promise<void> {
    const status = get(
      body,
      "entry[0].changes[0].value.statuses[0].status",
      null
    );
    const messageId = get(
      body,
      "entry[0].changes[0].value.statuses[0].id",
      null
    );
    const timestamp = get(
      body,
      "entry[0].changes[0].value.statuses[0].timestamp",
      null
    );
    const templateId = get(
      body,
      "entry[0].changes[0].value.message_template_id",
      null
    );

    // Handle status events
    if (status) {
      this.handleStatusEvent(status, messageId, timestamp, body);
    }

    // Handle template status
    if (templateId) {
      const templateStatus = get(
        body,
        "entry[0].changes[0].value.status",
        "UNKNOWN"
      );
      this.handleTemplateStatus(templateId, templateStatus);
    }

    // Handle incoming messages
    const messages = get(body, "entry[0].changes[0].value.messages", []);
    if (messages.length > 0) {
      this.handleIncomingMessage(messages[0]);
    }
  }

  private handleStatusEvent(
    status: string,
    messageId: string,
    timestamp: string,
    body: any
  ) {
    switch (status) {
      case "sent":
        console.log(`✅ SENT: ID=${messageId} at ${timestamp}`);
        break;
      case "delivered":
        console.log(`📦 DELIVERED: ID=${messageId} at ${timestamp}`);
        break;
      case "read":
        console.log(`👀 READ: ID=${messageId} at ${timestamp}`);
        break;
      case "failed":
        const reason = get(
          body,
          "entry[0].changes[0].value.statuses[0].errors[0].error_data.details",
          "No reason provided"
        );
        console.log(`❌ FAILED: ID=${messageId}, Reason=${reason}`);
        break;
      default:
        console.log(`ℹ️ UNKNOWN STATUS: ${status}`);
    }
  }

  private handleTemplateStatus(templateId: string, status: string) {
    console.log(`📋 TEMPLATE STATUS: ID=${templateId}, Status=${status}`);
    if (status === "REJECTED") {
      const reason = get(templateId, "reason", "No rejection reason provided");
      console.log(`🚫 TEMPLATE REJECTED: Reason=${reason}`);
    }
  }

  private handleIncomingMessage(message: any) {
    const type = message.type;
    const from = message.from;

    let content: any = null;
    switch (type) {
      case "text":
        content = message.text?.body;
        break;
      case "image":
        content = message.image?.caption || "[Image]";
        break;
      case "interactive":
        content = message.interactive?.button_reply?.title || "[Interactive]";
        break;
      case "template":
        content = message.template?.name || "[Template]";
        break;
      default:
        content = "[Unsupported message type]";
    }

    console.log(`💬 MESSAGE: Type=${type}, From=${from}, Content=`, content);
  }
}
