import { EventLog } from "./event-log";
import { loadActions, Loader, SyncEvent } from "./load-actions";
import { TestModel } from "./test-model";

const createSyncEvent = (version: number): SyncEvent => ({
  version,
  action: {
    actionName: "increment",
    args: [],
    serialized: true,
    modelIdOverrides: [],
    targetPath: [],
    targetPathIds: [],
  },
});

class TestLoader implements Loader {
  _onLoadAction: (event: SyncEvent) => void;

  async loadActionsFromVersion(
    version: number,
    onLoad: (events: SyncEvent[]) => void
  ) {
    const events = [...Array(3).keys()].map((i) =>
      createSyncEvent(i + version)
    );
    onLoad(events);
  }

  streamActions(onLoadAction: (event: SyncEvent) => void) {
    this._onLoadAction = onLoadAction;
  }

  forceLoadAction(version: number) {
    this._onLoadAction(createSyncEvent(version));
  }
}

const setup = () => {
  const store = new TestModel({ count: 0 });
  const loader = new TestLoader();
  const eventLog = new EventLog({ version: 0 });
  return { store, loader, eventLog };
};

describe("loadActions", () => {
  it("should load actions from the version of the event log", () => {
    const { store, eventLog, loader } = setup();

    loadActions(store, eventLog, loader);

    expect(store.count).toBe(3);
    expect(eventLog.version).toBe(3);
  });

  it("should stream actions from the loader", () => {
    const { store, eventLog, loader } = setup();

    loadActions(store, eventLog, loader);
    loader.forceLoadAction(3);

    expect(store.count).toBe(4);
    expect(eventLog.version).toBe(4);
  });
});
