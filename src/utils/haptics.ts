import * as Haptics from "expo-haptics";

export type IHaptics = {
  light: () => Promise<void>;
  medium: () => Promise<void>;
  heavy: () => Promise<void>;
  success: () => Promise<void>;
};

export const haptics: IHaptics = {
  light: async () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
  medium: async () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
  heavy: async () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),
  success: async () =>
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
};
