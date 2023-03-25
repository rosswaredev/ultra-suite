import { ActionTrackingResult, Model, onActionMiddleware, onPatches, onSnapshot, PatchAddOperation, serializeActionCall } from "mobx-keystone";
import { Habit } from "../habits/habit-store";
import { pocketBaseClient } from "./pocket-base/pocket-base";

export interface Persister {
  onAction: (data: object) => Promise<void>;
}

export const persistActions = <T>(
  subtreeRoot: object,
  // persister: Persister
) => {
  onActionMiddleware(subtreeRoot, {
    onFinish(actionCall, actionContext, ret) {
      if (ret.result === ActionTrackingResult.Return) {
        const serializedActionCall = serializeActionCall(actionCall, subtreeRoot);
        console.log({ actionCall, actionContext, serializedActionCall })


        pocketBaseClient.collection('events').create({ event: serializedActionCall }).catch(err => `Error saving event to pb: ${serializedActionCall}: ${err}`)

      } else if (ret.result === ActionTrackingResult.Throw) {
        console.log('action error ', ret.value);
      }
    }
  });
};
