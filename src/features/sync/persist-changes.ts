import {
  ActionTrackingResult,
  applySerializedActionAndTrackNewModelIds,
  onActionMiddleware,
  serializeActionCall,
} from "mobx-keystone";
import { eventLog } from "./event-log";
import { SyncEvent } from "./load-changes";

export interface Persister {
  persist: (event: SyncEvent) => Promise<void>;
}

export const persistActions = (subtreeRoot: object, persister: Persister) => {
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
      } else if (ret.result === ActionTrackingResult.Throw) {
        console.log("action error ", ret.value);
      }
    },
  });
};
