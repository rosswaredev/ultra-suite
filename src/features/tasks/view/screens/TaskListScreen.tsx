import { Stack, useRouter } from "expo-router";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Pressable, TextInput, View, StyleSheet, Keyboard } from "react-native";
import {
  KeyboardGestureArea,
  useReanimatedKeyboardAnimation,
} from "react-native-keyboard-controller";
import Animated, {
  Easing,
  interpolate,
  onChange,
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
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetSpringConfigs,
  useBottomSheetTimingConfigs,
} from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import { useFeature } from "src/hooks/useFeature";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

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
  const feature = useFeature();
  const router = useRouter();
  const quickAddTextInputRef = useRef(null);
  const [isQuickAdding, setIsQuickAdding] = useState(false);
  const [quickAddText, setQuickAddText] = useState("");
  const taskListPresenter = useTaskListPresenter();
  const bottomTabBarHeight = useBottomTabBarHeight();

  const handleAddTask = () => router.push("/tasks/new");
  const handleQuickAdd = () => {
    setIsQuickAdding(true);
    quickAddTextInputRef.current.focus();
  };
  const handleSubmitTask = () => {
    taskListPresenter.addTask(quickAddText, null);
    setQuickAddText("");
  };

  const { progress, height } = useReanimatedKeyboardAnimation();
  const animatedInputStyle = useAnimatedStyle(() => {
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

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["50%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    Keyboard.dismiss();
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleDateSheetAnimate = (_: number, toIndex: number) => {
    if (toIndex === -1) handleQuickAdd();
  };

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0}
      />
    ),
    []
  );

  // const animationConfigs = useBottomSheetTimingConfigs({
  //   duration: 250,
  //   easing: Easing.inOut(Easing.ease),
  // });

  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 800,
  });

  return (
    <View>
      <Animated.View style={[tw`absolute bottom-0 right-0 left-0 p-4`]}>
        <Pressable
          onPress={handleQuickAdd}
          onLongPress={handleAddTask}
          style={({ pressed }) => [
            tw.style(pressed && `opacity-75`),

            {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
            },
          ]}
          testID="add-task-button"
        >
          <View style={tw`flex-row rounded-lg bg-base-200 px-4 py-3`}>
            <Icon name="plus" size={24} color={tw.color("primary-base")} />
            <Text style={tw`text-primary-base ml-3`}>Add a Task</Text>
          </View>
        </Pressable>
      </Animated.View>
      <Animated.View
        style={[
          animatedInputStyle,
          tw`absolute bottom-0 right-0 left-0 bg-base-200 rounded-t-xl`,
          {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -8 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
          },
        ]}
      >
        <View style={[tw`flex-row items-center  pl-7 pr-2 `]}>
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
        <View>
          <Button
            icon="bell"
            variant="ghost"
            iconColor="base-400"
            onPress={handlePresentModalPress}
          />
        </View>
      </Animated.View>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={tw`bg-base-200`}
        handleIndicatorStyle={tw`bg-base-content`}
        backdropComponent={renderBackdrop}
        onAnimate={handleDateSheetAnimate}
        animationConfigs={animationConfigs}
        // style={{
        //   shadowColor: "#000",
        //   shadowOffset: {
        //     width: 0,
        //     height: -8,
        //   },
        //   shadowOpacity: 0.25,
        //   shadowRadius: 4,
        // }}
      >
        <View style={tw`h-full`}>
          <DateTimePicker
            value={new Date()}
            mode="date"
            display="inline"
            accentColor={tw.color(`${feature}-focus`)}
          />
        </View>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
