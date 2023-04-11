import { Platform } from "react-native";

import {
  Check,
  TrendingUp,
  ListVideo,
  Calendar,
  Settings,
  Plus,
  Delete,
  Trash,
} from "lucide-react-native";

export const ICONS = {
  plus: Plus,
  check: Check,
  delete: Trash,
  "trending-up": TrendingUp,
  "list-video": ListVideo,
  calendar: Calendar,
  settings: Settings,
};

export type IconName = keyof typeof ICONS;

export const Icon = ({ name, size, color }) => {
  console.log(Platform.OS);
  const IconComponent = ICONS[name];
  return <IconComponent size={size} color={color} />;
};
