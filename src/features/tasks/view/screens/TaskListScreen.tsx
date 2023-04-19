import { Stack, useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import {
  KeyboardGestureArea,
  useReanimatedKeyboardAnimation,
} from "react-native-keyboard-controller";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { AbsolutePosition, Button, Icon, Text } from "src/components";
import { useLocalParam } from "src/hooks/useLocalParam";
import { tw } from "src/theme";
import { capitalize } from "src/utils";
import { ListType, TaskList } from "../components/TaskList";
import {
  TaskListPresenterProvider,
  useTaskListPresenter,
} from "../hooks/useTaskListPresenter";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export const TaskListScreen = () => {
  const list = (useLocalParam("list") as ListType) ?? ListType.inbox;

  return (
    <TaskListPresenterProvider>
      {/* <View style={tw`flex-1`}> */}
      <Stack.Screen options={{ title: capitalize(list) }} />
      {/* <KeyboardGestureArea interpolator="ios"> */}
      <TaskList list={list} />
      {/* </KeyboardGestureArea> */}
      <AddTaskInput />
      {/* </View> */}
    </TaskListPresenterProvider>
  );
};

const AddTaskInput = () => {
  const router = useRouter();
  const quickAddTextInputRef = useRef(null);
  const [quickAddText, setQuickAddText] = useState("");
  const taskListPresenter = useTaskListPresenter();
  const bottomTabBarHeight = useBottomTabBarHeight();

  const handleAddTask = () => router.push("/tasks/new");
  const handleQuickAdd = () => quickAddTextInputRef.current.focus();
  const handleSubmitTask = () => {
    taskListPresenter.addTask(quickAddText, null);
    setQuickAddText("");
  };

  const { progress, height } = useReanimatedKeyboardAnimation();
  const animatedInputStyle = useAnimatedStyle(() => {
    console.log(height.value);
    return {
      opacity: progress.value,
      transform: [
        {
          translateY:
            interpolate(height.value, [0, -336], [0, -336]) +
            bottomTabBarHeight,
        },
      ],
    };
  });
  // const animatedButtonStyle = useAnimatedStyle(() => {
  //   return {
  //     opacity: 1 - progress.value,
  //     transform: [
  //       {
  //         translateY: interpolate(height.value, [0, -336], [0, 50]),
  //       },
  //     ],
  //   };
  // });

  return (
    <View>
      <Animated.View style={[tw`absolute bottom-0 right-0 left-0 p-4`]}>
        <Pressable
          onPress={handleQuickAdd}
          onLongPress={handleAddTask}
          style={({ pressed }) => tw.style(pressed && `opacity-75`)}
          testID="add-task-button"
        >
          <View style={tw`flex-row rounded-lg bg-base-200 px-4 py-3`}>
            <Icon name="plus" size={24} color={tw.color("primary-base")} />
            <Text style={tw`text-primary-base ml-3`}>Add a Task</Text>
          </View>
        </Pressable>
      </Animated.View>
      <Animated.View
        style={[animatedInputStyle, tw`absolute bottom-0 right-0 left-0`]}
      >
        <View
          style={[tw`flex-row items-center bg-base-200 pl-7 pr-2 rounded-t-xl`]}
        >
          <View
            style={tw`w-6 h-6 rounded-full border-2 border-primary-base/50`}
          />
          <TextInput
            style={tw`flex-1 pl-3 py-4 text-base text-base-content leading-tight`}
            ref={quickAddTextInputRef}
            placeholder="Add a task"
            value={quickAddText}
            onChangeText={setQuickAddText}
            onSubmitEditing={handleSubmitTask}
            blurOnSubmit={false}
          />
        </View>
      </Animated.View>
    </View>
  );
};
