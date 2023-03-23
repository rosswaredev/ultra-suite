import PocketBase from "pocketbase";
import eventsource from "react-native-sse";
import {
  init,
  collection,
  list,
  Schema,
  Type,
  authPassword,
  Admins,
} from "pocketbase-ts";

// @ts-ignore
global.EventSource = eventsource;

// init("http://127.0.0.1:8090");

export const pb = new PocketBase("http://127.0.0.1:8090");
