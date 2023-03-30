import { createContext, useContext, useRef, PropsWithChildren } from "react";
import { rootStore } from "../../../init";
import { HabitListPresenter } from "../habit-list-presenter";

const HabitListPresenterContext = createContext<HabitListPresenter | null>(
  null
);

export const HabitListPresenterProvider = ({
  children,
}: PropsWithChildren<unknown>) => {
  const habitListPresenter = useRef(
    new HabitListPresenter(rootStore.habitStore)
  ).current;

  return (
    <HabitListPresenterContext.Provider value={habitListPresenter}>
      {children}
    </HabitListPresenterContext.Provider>
  );
};

export const useHabitListPresenter = () => {
  const context = useContext(HabitListPresenterContext);

  if (context === null) {
    throw new Error(
      "useHabitListPresenter must be used within a HabitListPresenterProvider"
    );
  }

  return context;
};
