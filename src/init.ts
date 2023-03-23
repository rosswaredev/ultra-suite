import { setGlobalConfig } from "mobx-keystone";
import { nanoid } from "nanoid";
import { pocketBaseLoader } from "./features/sync/pocket-base/pocket-base-loader";

import "react-native-get-random-values";

setGlobalConfig({ modelIdGenerator: () => nanoid(15) });

pocketBaseLoader();
