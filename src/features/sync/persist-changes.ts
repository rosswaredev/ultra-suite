import { Model, onPatches, onSnapshot, PatchAddOperation } from "mobx-keystone";
import { Habit } from "../habits/habit-store";

export interface Persister {
  add: (data: object) => Promise<void>;
}

export const persistChanges = <T>(
  subtreeRoot: object,
  persister: Persister
) => {
  onPatches(subtreeRoot, (patches) => {
    if (patches.length === 0) return;

    if (patches.length > 1) {
      console.warn("TODO: Handle multiple patches");
      return;
    }

    const [patch] = patches;

    if (patch.op === "add") {
      persister.add(patch.value).catch((err) => console.log(err));
    }
  });
};
