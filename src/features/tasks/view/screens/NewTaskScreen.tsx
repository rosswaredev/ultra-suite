import { Stack } from "expo-router";
import React from "react";
import { TaskListPresenterProvider } from "../hooks/useTaskListPresenter";
import { NewTaskForm } from "../components/NewTaskForm";

export const NewTaskScreen = () => {
  return (
    <TaskListPresenterProvider>
      <Stack.Screen options={{ title: "New Task", headerLargeTitle: false }} />
      <NewTaskForm />
    </TaskListPresenterProvider>
  );
};
