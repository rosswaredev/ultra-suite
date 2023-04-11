import { View } from "react-native";
import { Button, ButtonProps } from "./Button";
import { Text } from "./Text";
import { Icon, IconName } from "./Icon";
import { tw } from "../theme";
import { capitalize } from "../utils";

type ListEmptyStateProps = {
  title: string;
  icon: IconName;
} & Pick<ButtonProps, "onPress">;
export const ListEmptyState = ({
  title,
  icon,
  onPress,
}: ListEmptyStateProps) => (
  <View style={tw`justify-center items-center pt-10`}>
    <Icon name={icon} size={64} color={tw.color("base-300")} />
    <Text
      style={tw`mb-4 text-base-300`}
    >{`No ${title.toLowerCase()}s yet. Why not create one?`}</Text>
    <Button
      variant="primary"
      icon="plus"
      title={`New ${capitalize(title)}`}
      onPress={onPress}
    />
  </View>
);
