import { pb } from "./pocket-base";
import { Persister } from "../persist-changes";

export class PocketBasePersister implements Persister {
  constructor(public collectionName: string) {}

  async add(data: any) {
    console.log(`Persisting to ${this.collectionName}`, data.id.length, data);
    await pb
      .collection(this.collectionName)
      .create({ id: data.id, title: data.title });
    return;
  }
}

// const baseLocalId = nanoid()
let localId = 0;
function generateModelId() {
  return localId.toString(36) + "-" + baseLocalId;
}
