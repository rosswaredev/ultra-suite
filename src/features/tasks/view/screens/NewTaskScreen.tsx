import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, TextInput, View } from "react-native";
import { tw } from "../../../../theme";
import {
  TaskListPresenterProvider,
  useTaskListPresenter,
} from "../hooks/useTaskListPresenter";
import { Text } from "../../../../components";

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
        style={tw`text-base-content text-md bg-base-200 py-4 px-3 rounded-lg mb-2`}
        autoFocus
        onSubmitEditing={handleAddTask}
      />
      <View style={tw`items-end`}>
        <Pressable
          style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          onPress={handleAddTask}
        >
          <View style={tw`bg-primary-base/25 px-4 py-2 rounded-full`}>
            <Text style={tw`text-primary-base text-lg`}>Add Habit</Text>
          </View>
        </Pressable>
      </View>
    </ScrollView>
  );
};
