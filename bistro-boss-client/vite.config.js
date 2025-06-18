import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// tailwindcss
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // optimizeDeps: {
  //   // This is an example, you might need to adjust based on the actual problematic module
  //   exclude: ["events"], // If a package is trying to import 'events'
  //   // Or sometimes, you might need to manually include if it's not being processed correctly
  //   // include: ['some-problematic-library-that-uses-events']
  // },
  // resolve: {
  //   alias: {
  //     // Potentially polyfill if absolutely necessary, but generally avoided
  //     // 'events': 'events' // This would require installing 'events' npm package
  //   },
  // },
});
