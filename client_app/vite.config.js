import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import commonjs from "@rollup/plugin-commonjs";

// https://vitejs.dev/config/
export default {
  plugins: [react(), commonjs()],
  build: {
    rollupOptions: {
      external: ["formik", "yup", "fabric"],
    },
  },
};
