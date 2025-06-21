// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";

// // tailwindcss
// import tailwindcss from "@tailwindcss/vite";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   resolve: {
//     alias: {
//       // Define your aliases here
//       // Example 1: Alias for the 'src' directory
//       "@": path.resolve(__dirname, "./src"),
//       // Example 2: Alias for a specific 'components' directory
//       "@components": path.resolve(__dirname, "./src/components"),
//       // Example 3: Alias for a 'utils' directory
//       "@utils": path.resolve(__dirname, "./src/utils"),
//     },
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// Import 'fileURLToPath' from the 'url' module
import { fileURLToPath } from "url";

// tailwindcss
import tailwindcss from "@tailwindcss/vite";

// Get the directory name for the current module in an ESM context
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Define your aliases here
      // Example 1: Alias for the 'src' directory
      "@": path.resolve(__dirname, "./src"),
      // Example 2: Alias for a specific 'components' directory
      "@components": path.resolve(__dirname, "./src/components"),
      // Example 3: Alias for a 'utils' directory
      "@utils": path.resolve(__dirname, "./src/utils"
    },
  },
});
