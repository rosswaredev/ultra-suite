import { Platform } from "react-native";
import {
  AppNotification,
  AppNotificationId,
  AppNotificationRequest,
  Notifier,
} from "../notifications";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { makeAutoObservable } from "mobx";

export class NativeNotifier implements Notifier {
  private registered = false;

  constructor() {
    makeAutoObservable(this);
  }

  setRegistered() {
    console.log("set registered");
    this.registered = true;
  }

  async register(): Promise<string> {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (!Device.isDevice) {
      alert("Must use physical device for Push Notifications");
      this.setRegistered();
      return undefined;
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
      this.setRegistered();
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    const { data: token } = await Notifications.getExpoPushTokenAsync();
    return token;
  }

  get isRegistered(): boolean {
    return this.registered;
  }

  async allNotifications(): Promise<AppNotification[]> {
    const notifications =
      await Notifications.getAllScheduledNotificationsAsync();

    return notifications.map((notification) => ({
      id: notification.identifier,
      title: notification.content.title,
      body: notification.content.body,
    }));
  }

  async scheduleNotification({
    title,
    body,
  }: AppNotificationRequest): Promise<AppNotificationId> {
    return await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger: null,
    });
  }

  async cancelNotification(notificationId: string): Promise<void> {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  }
}
