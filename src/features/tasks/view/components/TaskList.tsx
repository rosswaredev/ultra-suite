import { useRouter } from "expo-router";
import { observer } from "mobx-react";
import { FlatList, ListRenderItem, View } from "react-native";
import {
  AbsolutePosition,
  FloatingButton,
  Separator,
} from "../../../../components";
import { tw } from "../../../../theme";
import { TaskViewModel } from "../../presenters/task-list-presenter";
import { useTaskListPresenter } from "../hooks/useTaskListPresenter";
import { TaskListItem } from "./TaskListItem";

export const TaskList = observer(() => {
  const router = useRouter();
  const taskListPresenter = useTaskListPresenter();

  const handleNewTask = () => router.push("/tasks/new");

  const handlePressTask = (taskId: string) => () =>
    router.push(`/tasks/${taskId}`);

  const renderItem: ListRenderItem<TaskViewModel> = ({ item }) => (
    <View style={tw`px-4`}>
      <TaskListItem item={item} onPress={handlePressTask(item.id)} />
    </View>
  );

  return (
    <>
      <FlatList
        data={taskListPresenter.tasks}
        style={tw`pt-4`}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentInsetAdjustmentBehavior="automatic"
        ItemSeparatorComponent={Separator}
      />
      <AbsolutePosition bottom={16} right={16}>
        <FloatingButton onPress={handleNewTask} />
      </AbsolutePosition>
    </>
  );
});
