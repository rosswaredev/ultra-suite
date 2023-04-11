import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

export const slop = {
  all: (value: number) => ({
    top: value,
    bottom: value,
    left: value,
    right: value,
  }),
};

export const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

export const haptics = {
  light: () =>
    Platform.OS !== "web" &&
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
  medium: () =>
    Platform.OS !== "web" &&
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
  heavy: () =>
    Platform.OS !== "web" &&
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),
  success: () =>
    Platform.OS !== "web" &&
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
};
