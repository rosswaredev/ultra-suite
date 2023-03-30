import { createContext, PropsWithChildren, useContext } from "react";
import { rootStore } from "../../../init";
import { HabitListPresenter } from "../habit-list-presenter";

const habitListPresenter = new HabitListPresenter(rootStore.habitStore);

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
