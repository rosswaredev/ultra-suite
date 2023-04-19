import { makeAutoObservable } from "mobx";

export type PushToken = string;
export type AppNotificationId = string;

export type AppNotification = {
  id: AppNotificationId;
  title?: string;
  body?: string;
};
export type AppNotificationRequest = Omit<AppNotification, "id">;

export interface Notifier {
  register: () => Promise<PushToken | undefined>;
  allNotifications: () => Promise<AppNotification[]>;
  scheduleNotification: (
    notification: AppNotificationRequest
  ) => Promise<AppNotificationId>;
  cancelNotification: (notificationId: AppNotificationId) => Promise<void>;
  isRegistered: boolean;
}

export class Notifications {
  private registered = false;

  constructor(private notifier: Notifier) {
    makeAutoObservable(this);
  }

  async register(): Promise<PushToken> {
    return this.notifier.register();
  }

  get isRegistered(): boolean {
    return this.notifier.isRegistered;
  }

  async allNotifications(): Promise<AppNotification[]> {
    return this.notifier.allNotifications();
  }

  async scheduleNotification(notification: AppNotificationRequest) {
    return this.notifier.scheduleNotification(notification);
  }

  async cancelNotification(notificationId: AppNotificationId) {
    return this.notifier.cancelNotification(notificationId);
  }
}
