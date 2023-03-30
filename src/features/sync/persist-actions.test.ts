import {
  applyPatches,
  Model,
  model,
  modelAction,
  Patch,
  prop,
} from "mobx-keystone";
import { EventLog } from "./event-log";
import { SyncEvent } from "./load-actions";
import { persistActions, Persister } from "./persist-actions";

@model("test/TestModel")
class TestModel extends Model({
  count: prop<number>(),
}) {
  @modelAction
  increment() {
    this.count += 1;
  }

  @modelAction
  oops() {
    throw new Error("oops");
  }
}

class TestPersister implements Persister {
  events: SyncEvent[] = [];

  async persist(event: SyncEvent) {
    this.events.push(event);
  }
}

const setup = () => {
  const store = new TestModel({ count: 0 });
  const persister = new TestPersister();
  const eventLog = new EventLog({ version: 0 });
  return { store, persister, eventLog };
};

describe("persistChanges", () => {
  it("should persist valid action", () => {
    const { store, eventLog, persister } = setup();

    persistActions(store, eventLog, persister);
    store.increment();

    expect(persister.events).toEqual([
      expect.objectContaining({
        version: 0,
        action: expect.objectContaining({
          actionName: "increment",
          args: [],
          serialized: true,
        }),
      }),
    ]);
  });

  it("should not persist patches", () => {
    const { store, eventLog, persister } = setup();

    persistActions(store, eventLog, persister);

    const patch: Patch = {
      op: "replace",
      path: ["count"],
      value: 1,
    };
    applyPatches(store, [patch]);

    expect(persister.events).toEqual([]);
  });

  it("should not persist action when replaying", () => {
    const { store, eventLog, persister } = setup();

    persistActions(store, eventLog, persister);
    eventLog.setIsReplaying(true);
    store.increment();

    expect(persister.events).toEqual([]);
  });
});
