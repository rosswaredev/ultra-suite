import PocketBase from "pocketbase";
import eventsource from "react-native-sse";

// @ts-ignore
global.EventSource = eventsource;

const url = 'http://localhost:8090'
export const pocketBaseClient = new PocketBase('https://ultra-suite.pockethost.io');
