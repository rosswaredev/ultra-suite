import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, DateInputSheet, Text, TextInput } from "src/components";
import { tw } from "src/theme";
import { useTaskListPresenter } from "../hooks/useTaskListPresenter";
import { InputRow } from "src/components/InputRow";

const NEW_TASK_PLACEHOLDER = "New task";
export const NewTaskForm = () => {
  const router = useRouter();
  const taskListPresenter = useTaskListPresenter();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(new Date());
  const [isShowingDateInputSheet, setIsShowingDateInputSheet] = useState(false);

  const handleNewTaskTextChange = (text: string) => setNewTaskTitle(text);

  const handleAddTask = () => {
    const trimmedTitle = newTaskTitle.trim();
    taskListPresenter.addTask(
      trimmedTitle.length > 0 ? trimmedTitle : NEW_TASK_PLACEHOLDER,
      dueDate
    );
    router.back();
  };

  return (
    <>
      <ScrollView
        style={tw`px-4`}
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={tw`flex-1`}
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
        <Text variant="heading" style={tw`mb-1`}>
          Due Date
        </Text>
        <InputRow
          title="Today"
          icon="calendar"
          onPress={() => setIsShowingDateInputSheet(true)}
          onClear={() => setDueDate(null)}
        />
        <View style={tw`items-end mt-6`}>
          <Button
            variant="primary"
            icon="plus"
            title="Add Task"
            onPress={handleAddTask}
          />
        </View>
      </ScrollView>
      <DateInputSheet
        isOpen={isShowingDateInputSheet}
        value={dueDate}
        onChange={setDueDate}
      />
    </>
  );
};
