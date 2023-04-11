import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Text, TextInput } from "../../../../components";
import { Button } from "../../../../components/Button";
import { tw } from "../../../../theme";
import {
  TaskListPresenterProvider,
  useTaskListPresenter,
} from "../hooks/useTaskListPresenter";

export const NewTaskScreen = () => {
  return (
    <TaskListPresenterProvider>
      <Stack.Screen options={{ title: "New Task" }} />
      <NewTaskForm />
    </TaskListPresenterProvider>
  );
};

const NEW_TASK_PLACEHOLDER = "New task";

const NewTaskForm = () => {
  const router = useRouter();
  const taskListPresenter = useTaskListPresenter();
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleNewTaskTextChange = (text: string) => setNewTaskTitle(text);

  const handleAddTask = () => {
    const trimmedTitle = newTaskTitle.trim();
    taskListPresenter.addTask(
      trimmedTitle.length > 0 ? trimmedTitle : NEW_TASK_PLACEHOLDER
    );
    router.back();
  };

  return (
    <ScrollView
      style={tw`px-4`}
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
    >
      <Text variant="heading" style={tw`mb-1`}>
        Title
      </Text>
      <TextInput
        value={newTaskTitle}
        placeholder={NEW_TASK_PLACEHOLDER}
        onChangeText={handleNewTaskTextChange}
        style={tw`mb-2`}
        onSubmitEditing={handleAddTask}
      />
      <View style={tw`items-end`}>
        <Button
          variant="primary"
          icon="plus"
          title="Add Task"
          onPress={handleAddTask}
        />
      </View>
    </ScrollView>
  );
};
