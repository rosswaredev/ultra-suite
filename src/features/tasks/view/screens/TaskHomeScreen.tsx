import { Alert, ScrollView, ViewProps } from "react-native";
import { tw } from "src/theme";
import { TaskHomeLinks } from "../components/TaskHomeLinks";
import { TaskListPresenterProvider } from "../hooks/useTaskListPresenter";
import { ContextMenuButton } from "react-native-ios-context-menu";
import { Button } from "src/components";
import {
  DueDateBottomSheetStack,
  DueDateBottomSheetStackHandle,
} from "src/components/DueDateBottomSheetStack";
import { useRef } from "react";

export const TaskHomeScreen = () => {
  const dueDateSheetRef = useRef<DueDateBottomSheetStackHandle>(null);

  const handleShowDateSheet = () => {
    dueDateSheetRef.current.show();
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" style={tw`py-4`}>
      <TaskListPresenterProvider>
        <TaskHomeLinks />
        {/* <Skeleton width={200} height={64} colorMode="dark" /> */}
        <ContextMenuButton
          menuConfig={{
            menuTitle: "ContextMenuButtonSimpleExample01",
            menuItems: [
              {
                actionKey: "key-01",
                actionTitle: "Action #1",
              },
              {
                actionKey: "key-02",
                actionTitle: "Action #2",
              },
              {
                actionKey: "key-03",
                actionTitle: "Action #3",
              },
            ],
          }}
          onPressMenuItem={({ nativeEvent }) => {
            Alert.alert(
              "onPressMenuItem Event",
              `actionKey: ${nativeEvent.actionKey} - actionTitle: ${nativeEvent.actionTitle}`
            );
          }}
          isMenuPrimaryAction
        >
          <Button icon="award" title="Menu" style={tw`m-6`} />
        </ContextMenuButton>
        <Button title="Date" onPress={handleShowDateSheet} />
        <DueDateBottomSheetStack
          ref={dueDateSheetRef}
          onDate={(d) => console.log(d)}
        />
      </TaskListPresenterProvider>
    </ScrollView>
  );
};
