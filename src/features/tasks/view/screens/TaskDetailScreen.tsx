import { Stack, useRouter, useSearchParams } from "expo-router";
import { observer } from "mobx-react";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useTaskDetailPresenter } from "../hooks/useTaskDetailPresenter";
import { TaskDetailHeader } from "../components/TaskDetailHeader";
import { Text } from "../../../../components";
import { tw } from "../../../../theme";
import { Button } from "../../../../components/Button";

const useTaskId = () => {
  const { taskId } = useSearchParams();
  const id =
    typeof taskId !== "string" && taskId && taskId[0]
      ? taskId[0]
      : (taskId as string);
  return id;
};

export const TaskDetailScreen = observer(() => {
  const router = useRouter();
  const taskId = useTaskId();
  const task = useTaskDetailPresenter(taskId);
  const [taskTitle, setTaskTitle] = useState(task.title);

  const handleChangeTitle = (title: string) => setTaskTitle(title);
  const handleSubmitTitle = () => task.updateTitle(taskTitle);
  const handleDelete = () => {
    task.removeTask();
    router.back();
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Stack.Screen options={{ headerLargeTitle: false, title: "" }} />
      <TaskDetailHeader
        title={taskTitle}
        completed={task.completed}
        onToggleCompletion={task.toggleCompletion}
        onChangeTitle={handleChangeTitle}
        onSubmitTitle={handleSubmitTitle}
      />
      <View style={tw`px-3`}>
        <Button variant="error" title="Delete Task" onPress={handleDelete} />
      </View>
    </ScrollView>
  );
});
