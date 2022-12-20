import { InMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository";
import { NotificationNotFOund } from "./errors/notitication-not-found";
import { ReadNotification } from "./read-notification";
import { makeNotification } from "../../../test/factories/notification-factory";



describe('Read recipients notifications', () => {
    it('should be able to read a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository()
        const readNotifications = new ReadNotification(notificationsRepository);

        const notification = makeNotification()

        await notificationsRepository.create(notification);

        await readNotifications.execute({
            notificationId: notification.id
        })

        expect(notificationsRepository.notifications[0].readAt).toEqual(expect.any(Date))
    })

    it("should not be able to read a non existing notification", () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const readNotification = new ReadNotification(notificationsRepository);

        expect(() => {
            return readNotification.execute({
                notificationId: 'fake-notification-id',
            });
        }).rejects.toThrow(NotificationNotFOund)
    } )
})