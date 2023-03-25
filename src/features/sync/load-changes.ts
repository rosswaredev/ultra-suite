import { applyPatches, applySnapshot, Patch } from "mobx-keystone";

export interface Loader {
  collectionName: string;
  onSubscribe: (onSubscribeListener: (data: object) => void) => void;
}

const OP_MAP = {
  create: "add",
  update: "replace",
  delete: "remove",
};

export const loadChanges = (obj: object, loader: Loader) => {
  loader.onSubscribe((data) => {
    console.log({ data });
    // applyPatches(obj, patches);
  });
};
