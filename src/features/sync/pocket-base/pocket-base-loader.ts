import { SerializedActionCallWithModelIdOverrides } from "mobx-keystone";
import { pocketBaseClient } from "./pocket-base";

import { z } from "zod";
import { Loader, LoadEvent } from "../load-changes";

export class PocketBaseLoader<T, K extends z.ZodTypeAny> implements Loader {
  constructor(public collectionName: string, private schema: K) {}

  async loadFromVersion(
    version: number,
    onLoad: (events: LoadEvent[]) => void
  ) {
    try {
      const records = await pocketBaseClient.collection("events").getFullList({
        filter: `version >= ${version}`,
      });
      const events = records.map(({ version, action }) => ({
        version,
        action,
      }));
      onLoad(events);
    } catch (err) {
      console.error(
        `Error fetching new events for version "${version}": ${err}`
      );
    }
  }

  // loadFromVersion(version: number, onLoad: (events: ) => void) {
  // }

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
