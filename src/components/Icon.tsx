import {
  Check,
  TrendingUp,
  ListVideo,
  Calendar,
  Settings,
  Plus,
  Trash,
  Star,
  Award,
} from "lucide-react-native";

export const ICONS = {
  plus: Plus,
  check: Check,
  delete: Trash,
  "trending-up": TrendingUp,
  "list-video": ListVideo,
  calendar: Calendar,
  settings: Settings,
  star: Star,
  award: Award,
};

export type IconName = keyof typeof ICONS;

export const Icon = ({ name, size, color }) => {
  const IconComponent = ICONS[name];
  return <IconComponent size={size} color={color} />;
};
