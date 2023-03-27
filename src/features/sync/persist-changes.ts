import {
  ActionTrackingResult,
  applySerializedActionAndTrackNewModelIds,
  Model,
  onActionMiddleware,
  onPatches,
  onSnapshot,
  PatchAddOperation,
  serializeActionCall,
} from "mobx-keystone";
import { Habit } from "../habits/habit-store";
import { eventLog } from "./event-log";
import { pocketBaseClient } from "./pocket-base/pocket-base";

export interface Persister {
  onAction: (data: object) => Promise<void>;
}

export const persistActions = <T>(
  subtreeRoot: object
  // persister: Persister
) => {
  // const patchDisposer = onPatches(subtreeRoot, (patches) => {
  //   scanPatchesForModelIdChanges(subtreeRoot, modelIdOverrides, patches)
  // })

  onActionMiddleware(subtreeRoot, {
    onStart(actionCall, actionContext) {
      const serializedActionCall = serializeActionCall(actionCall, subtreeRoot);
      const { serializedActionCall: serializedActionCallWithModelIdOverrides } =
        applySerializedActionAndTrackNewModelIds(
          subtreeRoot,
          serializedActionCall
        );

      // console.log(JSON.stringify({ actionResult }));

      return {
        result: ActionTrackingResult.Return,
        value: serializedActionCallWithModelIdOverrides,
      };
    },

    onFinish(actionCall, actionContext, ret) {
      console.log(">onFinish");

      if (actionCall.actionName === "$$applyPatches") return;

      if (ret.result === ActionTrackingResult.Return) {
        // const serializedActionCall = serializeActionCall(
        //   actionCall,
        //   subtreeRoot
        // );
        const version = eventLog.version;

        console.log({
          actionCall,
          actionContext,
          ret: ret.value,
          version,
        });
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
