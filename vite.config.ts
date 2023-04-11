import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import commonjs from "vite-plugin-commonjs";

export default defineConfig({
  resolve: {
    alias: {
      "react-native": "react-native-web",
    },
  },
  plugins: [commonjs(), react()],
  test: {
    globals: true,
  },
});
