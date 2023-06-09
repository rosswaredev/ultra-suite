import { setGlobalConfig } from "mobx-keystone";
import { nanoid } from "nanoid";
import { PocketBaseLoader } from "./features/sync/pocket-base/pocket-base-loader";

import "react-native-get-random-values";
import { HabitStore } from "./features/habits/habit-store";
import { loadActions } from "./features/sync/load-actions";
import { persistActions } from "./features/sync/persist-actions";
import { PocketBasePersister } from "./features/sync/pocket-base/pocket-base-persister";
import { RootStore } from "./root-store";
import { EventLog } from "./features/sync/event-log";
import { TaskStore } from "./features/tasks/task-store";
import { isMaestro } from "react-native-is-maestro";
import { Notifications } from "./features/notifications/notifications";
import { NativeNotifier } from "./features/notifications/expo/native-notifier";

setGlobalConfig({ modelIdGenerator: () => nanoid(15) });

const taskStore = new TaskStore({});
const habitStore = new HabitStore({});
export const rootStore = new RootStore({ taskStore, habitStore });
const eventLog = new EventLog({});

export const notifications = new Notifications(new NativeNotifier());

if (!isMaestro()) {
  persistActions(rootStore, eventLog, new PocketBasePersister());
  loadActions(rootStore, eventLog, new PocketBaseLoader());
}
