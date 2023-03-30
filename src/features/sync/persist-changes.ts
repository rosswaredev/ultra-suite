import {
  ActionTrackingResult,
  applySerializedActionAndTrackNewModelIds,
  onActionMiddleware,
  serializeActionCall,
} from "mobx-keystone";
import { eventLog } from "./event-log";
import { pocketBaseClient } from "./pocket-base/pocket-base";

export interface Persister {
  onAction: (data: object) => Promise<void>;
}

export const persistActions = <T>(subtreeRoot: object) => {
  onActionMiddleware(subtreeRoot, {
    onStart(actionCall, actionContext) {
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

    onFinish(actionCall, actionContext, ret) {
      if (actionCall.actionName === "$$applyPatches") return;

      if (eventLog.isReplaying) return;

      if (ret.result === ActionTrackingResult.Return) {
        const version = eventLog.version;

        pocketBaseClient
          .collection("events")
          .create({ version, action: ret.value })
          .catch((err) => `Error saving event to pb: ${ret.value}: ${err}`);

        // On success
        eventLog.bumpVersion();
      } else if (ret.result === ActionTrackingResult.Throw) {
        console.log("action error ", ret.value);
      }
    },
  });
};
