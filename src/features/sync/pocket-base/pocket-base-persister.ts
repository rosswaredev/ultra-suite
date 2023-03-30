import { SyncEvent } from "../load-changes";
import { Persister } from "../persist-changes";
import { pocketBaseClient } from "./pocket-base";

export class PocketBasePersister implements Persister {
  async persist(event: SyncEvent) {
    try {
      await pocketBaseClient.collection("events").create(event);
    } catch (err) {
      console.error(`Error saving event to pb: ${event.action}: ${err}`);
    }
  }
}
