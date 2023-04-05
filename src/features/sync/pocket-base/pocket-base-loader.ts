import { Loader, SyncEvent } from "../load-actions";
import { pocketBaseClient } from "./pocket-base";

export class PocketBaseLoader implements Loader {
  async loadActionsFromVersion(
    version: number,
    onLoad: (events: SyncEvent[]) => void
  ) {
    const records = await pocketBaseClient.collection("events").getFullList({
      filter: `version >= ${version}`,
    });
    const events = records.map(({ version, action }) => ({
      version,
      action,
    }));
    onLoad(events);
  }

  streamActions(onSubscribeListener: (event: SyncEvent) => void) {
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
