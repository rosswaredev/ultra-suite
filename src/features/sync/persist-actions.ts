import {
  ActionTrackingResult,
  applySerializedActionAndTrackNewModelIds,
  onActionMiddleware,
  serializeActionCall,
} from "mobx-keystone";
import { EventLog } from "./event-log";
import { SyncEvent } from "./load-actions";

export interface Persister {
  persist: (event: SyncEvent) => Promise<void>;
}

export const persistActions = (
  subtreeRoot: object,
  eventLog: EventLog,
  persister: Persister
) => {
  onActionMiddleware(subtreeRoot, {
    onStart(actionCall) {
      const serializedActionCall = serializeActionCall(actionCall, subtreeRoot);
      const { serializedActionCall: serializedActionCallWithModelIdOverrides } =
        applySerializedActionAndTrackNewModelIds(
          subtreeRoot,
          serializedActionCall
        );

      return {
        result: ActionTrackingResult.Return,
        value: serializedActionCallWithModelIdOverrides,
      };
    },

    onFinish(actionCall, _, ret) {
      if (actionCall.actionName === "$$applyPatches") return;

      if (eventLog.isReplaying) return;

      if (ret.result === ActionTrackingResult.Return) {
        persister.persist({ version: eventLog.version, action: ret.value });
        eventLog.bumpVersion();
      }
    },
  });
};
