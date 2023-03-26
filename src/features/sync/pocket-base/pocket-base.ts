import PocketBase from "pocketbase";
import eventsource from "react-native-sse";

// @ts-ignore
global.EventSource = eventsource;

const url = 'http://localhost:8090'
export const pocketBaseClient = new PocketBase('https://rosswaredev-legendary-meme-qrg5r779p75h47p-8090.preview.app.github.dev/');
