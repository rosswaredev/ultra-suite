import PocketBase from "pocketbase";
import eventsource from "react-native-sse";

// @ts-ignore
global.EventSource = eventsource;

export const pb = new PocketBase("http://127.0.0.1:8090");
