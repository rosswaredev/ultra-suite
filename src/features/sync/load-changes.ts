import {
  applySerializedActionAndSyncNewModelIds,
  SerializedActionCallWithModelIdOverrides,
} from "mobx-keystone";
import { eventLog } from "./event-log";

export type SyncEvent = {
  version: number;
  action: SerializedActionCallWithModelIdOverrides;
};

export interface Loader {
  loadFromVersion: (
    version: number,
    onLoad: (events: SyncEvent[]) => void
  ) => Promise<void>;

  onSubscribe: (onSubscribeListener: (event: SyncEvent) => void) => void;
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
