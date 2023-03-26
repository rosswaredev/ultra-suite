import { applySerializedActionAndSyncNewModelIds, SerializedActionCallWithModelIdOverrides, } from "mobx-keystone";

export interface Loader {
  collectionName: string;
  onSubscribe: (onSubscribeListener: (data: SerializedActionCallWithModelIdOverrides) => void) => void;
}

const OP_MAP = {
  create: "add",
  update: "replace",
  delete: "remove",
};

export const loadChanges = (subtreeRoot: object, loader: Loader) => {
  loader.onSubscribe((data) => {
    console.log({ data });
    
    applySerializedActionAndSyncNewModelIds(subtreeRoot, data);
  });
};
