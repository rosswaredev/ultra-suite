import { Loader, SyncEvent } from "../load-changes";
import { pocketBaseClient } from "./pocket-base";

export class PocketBaseLoader implements Loader {
  async loadFromVersion(
    version: number,
    onLoad: (events: SyncEvent[]) => void
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

  onSubscribe(onSubscribeListener: (event: SyncEvent) => void) {
    try {
      pocketBaseClient
        .collection("events")
        .subscribe("*", (recordSubscription) => {
          const { version, action } = recordSubscription.record;
          onSubscribeListener({ version, action });
        });
    } catch (err) {
      console.error(`Error subscribing to events: ${err}`);
    }
  }
}
