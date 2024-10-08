import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["formik", "yup", "fabric"], // Add formik here to externalize it
    },
  },
  optimizeDeps: {
    include: ["fabric"],
  },
});
