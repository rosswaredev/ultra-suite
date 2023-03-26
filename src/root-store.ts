import { Model, model, prop } from "mobx-keystone";
import { HabitStore } from "./features/habits/habit-store";

@model("app/RootStore")
export class RootStore extends Model({
  habitStore: prop<HabitStore>().withSetter(),
}) {}
