import "./index.css";
import "../app/styles.css";

import type { GlobalProvider } from "@ladle/react";
import React from "react";
import { View } from "react-native";
import { tw } from "../src/theme";

export const Provider: GlobalProvider = ({ children }) => {
  return <View style={tw`bg-base-100 px-6 py-8 rounded-lg`}>{children}</View>;
};
