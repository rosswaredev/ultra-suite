import { applySnapshot, Patch } from "mobx-keystone";
import { pocketBaseClient } from "./pocket-base";

import { Loader } from "../load-changes";
import { z } from "zod";
import { CollectionRecords, CollectionResponses, HabitsRecord } from "./types";

// Make a better enum type
type X = CollectionResponses[keyof CollectionResponses];
//   ^?

export class PocketBaseLoader<T, K extends z.ZodTypeAny> implements Loader {
  constructor(public collectionName: string, private schema: K) {}

  onSubscribe(onSubscribeListener: (patch) => void) {
    try {
      pocketBaseClient.collection("events").subscribe("*", (recordSubscription) => {
        const { version, event } = recordSubscription.record;
        onSubscribeListener({ version, event })
      });

    } catch (err) {
      console.error(
        `Error parsing data on add for "${this.collectionName}": ${err}`
      );
    }
    return;
  }
}
