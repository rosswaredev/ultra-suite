import {
  applySnapshot,
  Patch,
  SerializedActionCallWithModelIdOverrides,
} from "mobx-keystone";
import { pocketBaseClient } from "./pocket-base";

import { Loader } from "../load-changes";
import { z } from "zod";
import { CollectionRecords, CollectionResponses, HabitsRecord } from "./types";

// Make a better enum type
type X = CollectionResponses[keyof CollectionResponses];
//   ^?

export class PocketBaseLoader<T, K extends z.ZodTypeAny> implements Loader {
  constructor(public collectionName: string, private schema: K) {}

  onSubscribe(
    onSubscribeListener: (event: {
      version: number;
      action: SerializedActionCallWithModelIdOverrides;
    }) => void
  ) {
    try {
      pocketBaseClient
        .collection("events")
        .subscribe("*", (recordSubscription) => {
          const { version, action } = recordSubscription.record;
          onSubscribeListener({ version, action });
        });
    } catch (err) {
      console.error(
        `Error parsing data on add for "${this.collectionName}": ${err}`
      );
    }
    return;
  }
}
