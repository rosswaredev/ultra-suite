import { setGlobalConfig } from "mobx-keystone";
import { nanoid } from "nanoid";
import { PocketBaseLoader } from "./features/sync/pocket-base/pocket-base-loader";

import "react-native-get-random-values";
import { z } from "zod";
import { HabitStore } from "./features/habits/habit-store";
import { loadChanges } from "./features/sync/load-changes";
import { persistActions } from "./features/sync/persist-changes";
import { Collections } from "./features/sync/pocket-base/types";
import { RootStore } from "./root-store";
import { PocketBasePersister } from "./features/sync/pocket-base/pocket-base-persister";

setGlobalConfig({ modelIdGenerator: () => nanoid(15) });

const habitStore = new HabitStore({});

export const rootStore = new RootStore({ habitStore });

const habitSchema = z.object({
  id: z.string(),
  title: z.string(),
});

persistActions(rootStore, new PocketBasePersister());
loadChanges(rootStore, new PocketBaseLoader(Collections.Habits, habitSchema));
