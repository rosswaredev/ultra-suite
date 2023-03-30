import {
  applySerializedActionAndSyncNewModelIds,
  SerializedActionCallWithModelIdOverrides,
} from "mobx-keystone";
import { eventLog } from "./event-log";

export type LoadEvent = {
  version: number;
  action: SerializedActionCallWithModelIdOverrides;
};

export interface Loader {
  collectionName: string;

  loadFromVersion: (
    version: number,
    onLoad: (events: LoadEvent[]) => void
  ) => Promise<void>;

  onSubscribe: (onSubscribeListener: (event: LoadEvent) => void) => void;
}

export const loadChanges = (subtreeRoot: object, loader: Loader) => {
  loader.loadFromVersion(eventLog.version, (events) => {
    eventLog.setIsReplaying(true);

    for (const { version, action } of events) {
      if (version === eventLog.version) {
        applySerializedActionAndSyncNewModelIds(subtreeRoot, action);
        eventLog.bumpVersion();
      }
    }

    eventLog.setIsReplaying(false);
  });

  loader.onSubscribe(({ version, action }) => {
    eventLog.setIsReplaying(true);

    if (version === eventLog.version) {
      applySerializedActionAndSyncNewModelIds(subtreeRoot, action);
      eventLog.bumpVersion();
    }

    eventLog.setIsReplaying(false);
  });
};
