import PocketBase from "pocketbase";
import eventsource from "react-native-sse";

// @ts-ignore
global.EventSource = eventsource;

const url = "http://127.0.0.1:8090";
export const pocketBaseClient = new PocketBase(url);
