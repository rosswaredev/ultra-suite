import { setGlobalConfig } from "mobx-keystone";
import { nanoid } from "nanoid";
import { PocketBaseLoader } from "./features/sync/pocket-base/pocket-base-loader";

import "react-native-get-random-values";
import { Habit, habitStore } from "./features/habits/habit-store";
import { persistChanges } from "./features/sync/persist-changes";
import { PocketBasePersister } from "./features/sync/pocket-base/pocket-base-persister";
import { loadChanges } from "./features/sync/load-changes";
import { Collections, HabitsRecord } from "./features/sync/pocket-base/types";
import { Schema, Type } from "pocketbase-ts";
import { z } from "zod";

setGlobalConfig({ modelIdGenerator: () => nanoid(15) });

const habitSchema = z.object({
  id: z.string(),
  title: z.string(),
});
persistChanges(
  habitStore,
  new PocketBasePersister(Collections.Habits, habitSchema)
);
loadChanges(
  habitStore,
  new PocketBaseLoader<T>(Collections.Habits, habitSchema)
);
