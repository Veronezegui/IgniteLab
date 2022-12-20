import { InMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository";
import { NotificationNotFOund } from "./errors/notitication-not-found";
import { UnreadNotification } from "./unread-notification";
import { makeNotification } from "../../../test/factories/notification-factory";



describe('Unread recipients notifications', () => {
    it('should be able to unread a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const unreadNotifications = new UnreadNotification(notificationsRepository);

        const notification = makeNotification({
            readAt: new Date()
        })

        await notificationsRepository.create(notification);

        await unreadNotifications.execute({
            notificationId: notification.id
        })

        expect(notificationsRepository.notifications[0].readAt).toBeNull()
    })

    it("should not be able to unread a non existing notification", () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const unreadNotification = new UnreadNotification(notificationsRepository);

        expect(() => {
            return unreadNotification.execute({
                notificationId: 'fake-notification-id',
            });
        }).rejects.toThrow(NotificationNotFOund)
    } )
})