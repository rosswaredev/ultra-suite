import { setGlobalConfig } from "mobx-keystone";
import { nanoid } from "nanoid";
import { PocketBaseLoader } from "./features/sync/pocket-base/pocket-base-loader";

import "react-native-get-random-values";
import { HabitStore } from "./features/habits/habit-store";
import { loadChanges } from "./features/sync/load-changes";
import { persistActions } from "./features/sync/persist-changes";
import { PocketBasePersister } from "./features/sync/pocket-base/pocket-base-persister";
import { RootStore } from "./root-store";

setGlobalConfig({ modelIdGenerator: () => nanoid(15) });

const habitStore = new HabitStore({});

export const rootStore = new RootStore({ habitStore });

persistActions(rootStore, new PocketBasePersister());
loadChanges(rootStore, new PocketBaseLoader());
