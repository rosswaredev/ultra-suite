import { Stack, Link } from "expo-router";
import { observer } from "mobx-react";
import { ScrollView } from "react-native";
import { Button, Text } from "src/components";
import { notifications } from "src/init";

export default observer(function NotificationsScreen() {
  const enableNotificationsIcon = notifications.isRegistered
    ? "bell"
    : "bell-off";

  const handleEnableNotificationsPress = () => {
    notifications.register();
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Stack.Screen options={{ title: "Notifications" }} />
      <Button
        icon={enableNotificationsIcon}
        title="Enable Notifictions"
        onPress={handleEnableNotificationsPress}
      />
    </ScrollView>
  );
});
