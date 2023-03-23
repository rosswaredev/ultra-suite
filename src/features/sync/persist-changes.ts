import { Model, onPatches, onSnapshot } from "mobx-keystone";

export interface Persister {
  collectionName: string;
  add: (data: object) => Promise<void>;
}

type Persistable = object;

export const persistChanges = (obj: Persistable, persister: Persister) => {
  onPatches(obj, (patches) => {
    console.log("patches", patches);

    if (patches.length === 0) return;

    if (patches.length > 1) {
      console.warn("TODO: Handle multiple patches");
      return;
    }

    const [patch] = patches;

    if (patch.op === "add") {
      console.log("add", patch.value);
      persister.add(patch.value).catch((err) => console.log(err));
    }
  });
};
