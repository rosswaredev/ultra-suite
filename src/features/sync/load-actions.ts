import {
  applySerializedActionAndSyncNewModelIds,
  SerializedActionCallWithModelIdOverrides,
} from "mobx-keystone";
import { EventLog } from "./event-log";

export type SyncEvent = {
  version: number;
  action: SerializedActionCallWithModelIdOverrides;
};

export interface Loader {
  loadActionsFromVersion: (
    version: number,
    onLoadAction: (events: SyncEvent[]) => void
  ) => Promise<void>;

  streamActions: (onLoadAction: (event: SyncEvent) => void) => void;
}

export const loadActions = (
  subtreeRoot: object,
  eventLog: EventLog,
  loader: Loader
) => {
  loader.loadActionsFromVersion(eventLog.version, (events) => {
    eventLog.setIsReplaying(true);

    for (const { version, action } of events) {
      if (version === eventLog.version) {
        applySerializedActionAndSyncNewModelIds(subtreeRoot, action);
        eventLog.bumpVersion();
      }
    }

    eventLog.setIsReplaying(false);
  });

  loader.streamActions(({ version, action }) => {
    eventLog.setIsReplaying(true);

    if (version === eventLog.version) {
      applySerializedActionAndSyncNewModelIds(subtreeRoot, action);
      eventLog.bumpVersion();
    }

    eventLog.setIsReplaying(false);
  });
};
