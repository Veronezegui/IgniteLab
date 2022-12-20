import { InMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository";
import { NotificationNotFOund } from "./errors/notitication-not-found";
import { CancelNotification } from "./cancel-notification";
import { makeNotification } from "../../../test/factories/notification-factory";



describe('Cancel recipients notifications', () => {
    it('should be able to cancel a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const cancelRecipientNotifications = new CancelNotification(notificationsRepository);

        const notification = makeNotification()

        await notificationsRepository.create(notification);

        await cancelRecipientNotifications.execute({
            notificationId: notification.id
        })

        expect(notificationsRepository.notifications[0].canceledAt).toEqual(expect.any(Date))
    })

    it("should not be able to cancel a non existing notification", () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const cancelNotification = new CancelNotification(notificationsRepository);

        expect(() => {
            return cancelNotification.execute({
                notificationId: 'fake-notification-id',
            });
        }).rejects.toThrow(NotificationNotFOund)
    } )
})