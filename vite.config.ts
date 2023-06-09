import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import commonjs from "vite-plugin-commonjs";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "react-native": "react-native-web",
      "lucide-react-native": "lucide-react",
      "src/utils/haptics": path.resolve(__dirname, "src/utils/haptics.web"),
    },
  },
  plugins: [commonjs(), react()],
  test: {
    globals: true,
  },
});
