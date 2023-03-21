import { createContext, useContext, useRef, PropsWithChildren } from "react";
import {
  createHabitListPresenter,
  HabitListPresenter,
} from "../habit-list-presenter";

const habitListPresenter = createHabitListPresenter();

const HabitListPresenterContext = createContext<HabitListPresenter | null>(
  null
);

export const HabitListPresenterProvider = ({
  children,
}: PropsWithChildren<unknown>) => {
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
