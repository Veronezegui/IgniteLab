import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from '../repositories/notification-repository'
import { NotificationNotFOund } from "./errors/notitication-not-found";

interface CancelNotificationRequest {
    notificationId: string;
}

type CancelNotificationResponse = void;


@Injectable()
export class CancelNotification {
    constructor(
        private notificationsRepository: NotificationsRepository
    ) { }

    async execute(request: CancelNotificationRequest): Promise<CancelNotificationResponse> {
        const { notificationId } = request;

        const notification = await this.notificationsRepository.findById(notificationId);

        if (!notification) {
            throw new NotificationNotFOund();
        }

        notification.cancel();

        await this.notificationsRepository.save(notification);
    }
}