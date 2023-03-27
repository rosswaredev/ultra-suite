import { Redirect } from "expo-router";

import "./output.css";

export default function AppHome() {
  return <Redirect href="/tasks" />;
}
