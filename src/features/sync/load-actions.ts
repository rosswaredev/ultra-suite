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

    console.log(`Replaying ${events.length} events`);

    for (const { version, action } of events) {
      if (version === eventLog.version) {
        try {
          console.log(`Applying action ${version}:`);
          applySerializedActionAndSyncNewModelIds(subtreeRoot, action);
        } catch (err) {
          console.error(
            `Error applying action ${version}:\n\n${JSON.stringify(
              action,
              null,
              2
            )}\n\n${err}`
          );
        }
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
