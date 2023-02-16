import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices"

interface handleSendNotificationPayload {
    content: string;
    category: string;
    recipientId: string
}

@Controller()
export class NotificationsController {
    @EventPattern('notifications.send-notification')
    async handleSendNotification(
        @Payload() content: handleSendNotificationPayload
    ) {
        console.log('asd')
    }
}