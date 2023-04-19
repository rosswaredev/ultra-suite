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
  CalendarPlus,
  X,
  Inbox,
  ChevronRight,
  Sun,
  CheckCircle,
  ArrowUp,
  Bell,
  BellOff,
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
  "calendar-plus": CalendarPlus,
  x: X,
  inbox: Inbox,
  "chevron-right": ChevronRight,
  sun: Sun,
  "check-circle": CheckCircle,
  "arrow-up": ArrowUp,
  bell: Bell,
  "bell-off": BellOff,
};

export type IconName = keyof typeof ICONS;

export type IconProps = {
  name: IconName;
  size: number;
  color: string;
  thick?: boolean;
};

export const Icon = ({ name, size, color, thick }: IconProps) => {
  const IconComponent = ICONS[name];
  return (
    <IconComponent size={size} color={color} strokeWidth={thick ? 3 : 2} />
  );
};
