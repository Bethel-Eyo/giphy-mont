/// <reference types="vitest" />
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "src/setupTests.ts",
    coverage: {
      provider: "v8",
      reporter: ["lcov", "html", "text"],
      // Make sure to add the exclude list to sonar project properties file
      exclude: [
        "**/**/*.test.{ts,tsx}",
        "**/**/*.d.{ts,tsx}",
        "src/setupTests.ts",
        "eslint.config.js",
      ],
    },
  },
});
