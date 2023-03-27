import { PatchAddOperation } from "mobx-keystone";
import { Collection, collection, create, Schema } from "pocketbase-ts";
import { z, ZodSchema } from "zod";
import { Persister } from "../persist-changes";
// import { pb } from "./pocket-base";

export class PocketBasePersister<T extends z.ZodTypeAny> implements Persister {
  constructor(private collectionName: string, private schema: T) {}

  async onAction(data: unknown) {
    try {
      const parsedData = this.schema.parse(data);
      await pb.collection(this.collectionName).create(parsedData);
    } catch (err) {
      console.error(
        `Error parsing data on add for "${this.collectionName}": ${err}`
      );
    }

    return;
  }
}
