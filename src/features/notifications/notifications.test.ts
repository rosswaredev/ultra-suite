import { nanoid } from "nanoid";
import {
  Notifier,
  Notifications,
  AppNotificationId,
  AppNotificationRequest,
  PushToken,
  AppNotification,
} from "./notifications";
import { makeAutoObservable } from "mobx";

export class TestNotifier implements Notifier {
  private notifications: AppNotification[] = [];
  private registered = false;

  constructor() {
    makeAutoObservable(this);
  }

  async register(): Promise<PushToken> {
    this.registered = true;
    return Promise.resolve("test-token");
  }

  get isRegistered(): boolean {
    return this.registered;
  }

  async scheduleNotification(notification: AppNotificationRequest) {
    const id = nanoid();
    this.notifications.push({ id, ...notification });
    return Promise.resolve(id);
  }

  async cancelNotification(notificationId: AppNotificationId) {
    this.notifications = this.notifications.filter(
      (notification) => notification.id !== notificationId
    );
    return Promise.resolve();
  }

  async allNotifications(): Promise<AppNotification[]> {
    return Promise.resolve(this.notifications);
  }
}

const setup = () => {
  const notifier = new TestNotifier();
  const notifications = new Notifications(notifier);

  return { notifications };
};

describe("Notifier", () => {
  it("should not be registered by default", async () => {
    const { notifications } = setup();

    expect(notifications.isRegistered).toBe(false);
  });

  it("should register for push notifications", async () => {
    const { notifications } = setup();

    const token = await notifications.register();

    expect(token).toBe("test-token");
  });

  it("should inidicate when registered for push notifications", async () => {
    const { notifications } = setup();
    await notifications.register();

    expect(notifications.isRegistered).toBe(true);
  });

  it("should return no notifications", async () => {
    const { notifications } = setup();

    const allNotifications = await notifications.allNotifications();

    expect(allNotifications).toEqual([]);
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
