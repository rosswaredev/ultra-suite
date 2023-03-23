import { applyPatches, applySnapshot, Patch } from "mobx-keystone";

export interface Loader {
  collectionName: string;
  onPatch: (onPatchListener: (patches: Patch[]) => void) => void;
}

const OP_MAP = {
  create: "add",
  update: "replace",
  delete: "remove",
};

export const loadChanges = (obj: object, loader: Loader) => {
  loader.onPatch((patches) => {
    console.log({ patches });
    applyPatches(obj, patches);
  });
};
