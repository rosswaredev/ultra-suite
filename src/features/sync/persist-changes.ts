import { ActionTrackingResult, Model, onActionMiddleware, onPatches, onSnapshot, PatchAddOperation, serializeActionCall } from "mobx-keystone";
import { Habit } from "../habits/habit-store";
import { eventLog } from "./event-log";
import { pocketBaseClient } from "./pocket-base/pocket-base";

export interface Persister {
  onAction: (data: object) => Promise<void>;
}

export const persistActions = <T>(
  subtreeRoot: object,
  // persister: Persister
) => {

  // const patchDisposer = onPatches(subtreeRoot, (patches) => {
  //   scanPatchesForModelIdChanges(subtreeRoot, modelIdOverrides, patches)
  // })

  onActionMiddleware(subtreeRoot, {
    // onStart(actionCall, actionContext) {
      


    // },

    onFinish(actionCall, actionContext, ret) {
      if (ret.result === ActionTrackingResult.Return) {
        const serializedActionCall = serializeActionCall(actionCall, subtreeRoot);
        const version = eventLog.version;
        
        console.log({ actionCall, actionContext, serializedActionCall, version })
        pocketBaseClient.collection('events').create({ version, event: serializedActionCall }).catch(err => `Error saving event to pb: ${serializedActionCall}: ${err}`)
        
        // On success
        eventLog.bumpVersion()

      } else if (ret.result === ActionTrackingResult.Throw) {
        console.log('action error ', ret.value);
      }
    }
  });
};
