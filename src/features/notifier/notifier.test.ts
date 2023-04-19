import { nanoid } from "nanoid";

type PushToken = string;
type NotificationId = string;

type PushNotification = {
  id: NotificationId;
  title?: string;
  body?: string;
};
type PushNotificationInput = Omit<PushNotification, "id">;

interface Notifier {
  register: () => Promise<PushToken>;
  allNotifications: () => Promise<PushNotification[]>;
  scheduleNotification: (
    notification: PushNotificationInput
  ) => Promise<NotificationId>;
  cancelNotification: (notificationId: NotificationId) => Promise<void>;
}

class TestNotifier implements Notifier {
  private notifications: PushNotification[] = [];

  async register(): Promise<PushToken> {
    return Promise.resolve("test-token");
  }

  async scheduleNotification(notification: PushNotificationInput) {
    const id = nanoid();
    this.notifications.push({ id, ...notification });
    return Promise.resolve(id);
  }

  async cancelNotification(notificationId: NotificationId) {
    this.notifications = this.notifications.filter(
      (notification) => notification.id !== notificationId
    );
    return Promise.resolve();
  }

  async allNotifications(): Promise<PushNotification[]> {
    return Promise.resolve(this.notifications);
  }
}

class Notifications {
  constructor(private notifier: Notifier) {}

  async register(): Promise<PushToken> {
    return this.notifier.register();
  }

  async allNotifications(): Promise<PushNotification[]> {
    return this.notifier.allNotifications();
  }

  async scheduleNotification(notification: PushNotificationInput) {
    return this.notifier.scheduleNotification(notification);
  }

  async cancelNotification(notificationId: NotificationId) {
    return this.notifier.cancelNotification(notificationId);
  }
}

const setup = () => {
  const notifier = new TestNotifier();
  const notifications = new Notifications(notifier);

  return { notifications };
};

describe("Notifier", () => {
  it("should register for push notifications", async () => {
    const { notifications } = setup();

    expect(notifications.register()).resolves.toBe("test-token");
  });

  it("should return no notifications", async () => {
    const { notifications } = setup();

    expect(notifications.allNotifications()).resolves.toEqual([]);
  });

  it("should add a notification", async () => {
    const { notifications } = setup();

    notifications.scheduleNotification({ title: "Test notification" });
    const allNotifications = await notifications.allNotifications();

    expect(allNotifications).toEqual([
      expect.objectContaining({ title: "Test notification" }),
    ]);
  });

  it("should add multiple notifications", async () => {
    const { notifications } = setup();

    notifications.scheduleNotification({ title: "Test notification" });
    notifications.scheduleNotification({ title: "Test notification 2" });
    const allNotifications = await notifications.allNotifications();

    expect(allNotifications).toHaveLength(2);
  });

  it("should remove a notification", async () => {
    const { notifications } = setup();

    const notificationId = await notifications.scheduleNotification({
      title: "Test notification",
    });
    notifications.cancelNotification(notificationId);
    const allNotifications = await notifications.allNotifications();

    expect(allNotifications).toHaveLength(0);
  });
});
